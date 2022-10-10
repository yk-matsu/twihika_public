import {Layout} from '../components/layout';
import type {NextPageContext} from 'next';
import {WithSubnavigation} from '../components/navbar';
import {DecodedIdToken} from 'firebase-admin/lib/auth/token-verifier';
import {ScrollingSemiModal} from '@twihika/ui/Modal';
import {
  Master_Batch_Search_Queries,
  Master_Batch_Search_Query_Categories,
  Master_Batch_Search_Users,
} from '@twihika/hasura';
import {decodeFromSessinoCokie} from '../serverside/firebase-admin';
import {searchState} from '../store/searchState';
import {withUrqlClient} from 'next-urql';
import type {SearchResponse} from '@twihika/elasticsearch';
import {Tweet} from '../components/Tweet';
import ReactPaginate from 'react-paginate';
import {
  Box,
  Button,
  Stack,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {dataV1ToV2, TweeetLiteType} from '../components/lib/TweetV1ToV1';
import {useRecoilState} from 'recoil';
import queryString from 'query-string';
import useSWR, {SWRConfig} from 'swr';
import Link from 'next/link';
import {isProduction} from '@twihika/env';

export default withUrqlClient(
  ssr => ({
    url: 'https://twi-hika.com',
  }),
  {ssr: false}
)(Page);

export async function getServerSideProps(context: NextPageContext) {
  const key = `/api/expert_users?${queryString.stringify(context.query)}`;
  const api = await (
    await fetch(`${process.env.TWI_MARKETING_INNER_API_HOST}${key}`)
  )
    .json()
    .catch(e => {
      console.log(e);
    });
  const {decoded} = await decodeFromSessinoCokie(context.req);

  return {
    props: {
      fallback: {
        [key]: {
          result: api.result,
          expertUsers: api.expertUsers,
        },
      },
      query: context.query,
      decoded: decoded,
      alreadyLoggedIn: !!decoded,
      url: `?ref=${encodeURIComponent(
        new URL(
          context.req?.url!,
          `${isProduction() ? 'https' : 'http'}://${context.req?.headers.host!}`
        ).href
      )}`,
    },
  };
}

type PickedMaster_Batch_Search_QueryCategories = Pick<
  Master_Batch_Search_Query_Categories,
  'query_category_id' | 'name'
> & {selected: boolean; count: number};

type PickedMaster_Batch_Search_Queries = Pick<
  Master_Batch_Search_Queries,
  'query_id' | 'query'
> & {selected: boolean; count: number};

type PickedMaster_Batch_Search_Users_Queries = Pick<
  Master_Batch_Search_Users,
  'twitter_user_id' | 'screen_name'
> & {selected: boolean};

async function fetcher(key: string, init?: RequestInit) {
  return fetch(key, init).then(res => res.json());
}

function PaginatedItems({itemsPerPage, query, itemCount}: any) {
  const router = useRouter();
  // We start with an empty list of items.
  const handlePageClick = (event: any, query: any) => {
    console.log(event);
    router.push(
      `?${queryString.stringify({...query, ...{page: event.selected + 1}})}`
    );
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        pageRangeDisplayed={5}
        onPageChange={event => {
          handlePageClick(event, query);
        }}
        pageCount={Math.ceil(itemCount / itemsPerPage)}
        pageClassName="px-2"
        pageLinkClassName="page-link"
        previousClassName="px-2"
        previousLinkClassName="page-link"
        nextClassName="px-2"
        nextLinkClassName="page-link"
        breakClassName="px-2"
        breakLinkClassName="page-link"
        containerClassName="flex"
        activeClassName="active"
        hrefBuilder={(pageIndex, pageCount, selectedPage) => {
          return `?${queryString.stringify({...query, ...{page: pageIndex}})}`;
        }}
        previousLabel="< previous"
        renderOnZeroPageCount={undefined}
      />
    </>
  );
}
function Article(props: {query: {[key: string]: any}}) {
  const [search, setSearch] = useRecoilState(searchState);
  const {query} = props;
  // `data` will always be available as it's in `fallback`.
  const key = `/api/expert_users?${queryString.stringify(query)}`;
  const router = useRouter();

  let {data, mutate} = useSWR<{
    result: SearchResponse<TweeetLiteType & {pickup: TweeetLiteType}>;
    expertUsers: PickedMaster_Batch_Search_Users_Queries[];
  }>(key, fetcher);

  return (
    <>
      <Box>
        <>
          {data!.expertUsers.map(item => {
            return (
              <Link
                key={item.twitter_user_id}
                href={`/expert_users?${queryString.stringify({
                  ...router.query,
                  tweet_user_id: item.twitter_user_id,
                  paege: undefined,
                })}`}
              >
                <Button
                  mt={'2'}
                  mr={'2'}
                  isActive={item.selected}
                >
                  {item.screen_name}
                </Button>
              </Link>
            );
          })}
        </>
      </Box>
      <Stack>
        {data!.result.hits.hits.map(tweet => {
          return (
            <Box key={tweet._source!.id_str} px={'2'}>
              <Tweet metadata={dataV1ToV2(tweet._source!)}></Tweet>
            </Box>
          );
        })}
      </Stack>

      <PaginatedItems
        itemsPerPage={50}
        query={query}
        //@ts-ignore
        itemCount={data!.result!.hits.total!.value as any as number}
      />
    </>
  );
}


function Page(props: {
  fallback: {
    result: SearchResponse<TweeetLiteType & {pickup: TweeetLiteType}>;
    expertUsers: any[]
  };
  query: {[key: string]: any};
  alreadyLoggedIn: boolean;
  decoded: DecodedIdToken;
  url: string;
}) {
  const {alreadyLoggedIn, decoded} = props;
  const {query} = useRouter();

  return (
    <>
      <WithSubnavigation
        alredeLoggedIn={alreadyLoggedIn}
        decoded={decoded}
        url={props.url}
      />
      <SWRConfig value={{fallback: props.fallback}}>
        <Article query={{...props.query, ...query}} />
      </SWRConfig>
    </>
  );
}

Page.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
