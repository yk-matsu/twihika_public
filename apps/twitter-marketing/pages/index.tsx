import {Layout} from '../components/layout';
import type {NextPageContext} from 'next';
import {WithSubnavigation} from '../components/navbar';
import {ScrollingSemiModal} from '@twihika/ui/Modal';
import {Master_Batch_Search_Queries} from '@twihika/hasura';
import {decodeFromSessinoCokie} from '../serverside/firebase-admin';
import {FixedSearchHeader} from '../components/fixed_search_header';
import ReactPaginate from 'react-paginate';
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {PropsWithChildren, ReactElement, useContext, useRef} from 'react';
import {dataV1ToV2} from '../components/lib/TweetV1ToV1';
import queryString from 'query-string';
import {ParsedUrlQuery} from 'querystring';
import Link from 'next/link';
import {isProduction} from '@twihika/env';
import {
  DefinedUseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {TweetsApiResponse} from './api/tweets';
import axios from 'axios';
type PickedMaster_Batch_Search_Queries = Partial<
  Pick<Master_Batch_Search_Queries, 'query_id' | 'query'> & {
    selected: boolean;
    count: number;
  }
>;

export async function getServerSideProps(context: NextPageContext) {
  const key = `/api/tweets?${queryString.stringify(context.query)}`;
  const api: TweetsApiResponse = await axios(
    `${process.env.TWI_MARKETING_INNER_API_HOST}${key}`
  ).then(res => res.data);

  const {decoded} = await decodeFromSessinoCokie(context.req);

  return {
    props: {
      fallback: {
        result: api!.result!,
        queryCount: api!.queryCount!,
        categoryCount: api!.categoryCount!,
        expertUsers: api!.expertUsers!,
        conversations: api!.conversations!,
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

type Props<T> = T extends (...args: any[]) => infer Prop
  ? Prop extends Promise<infer Props>
    ? Props
    : never
  : never;

type PageProps = Props<typeof getServerSideProps>['props'];

export type ElasticTweet = PageProps['fallback']['result']['hits']['hits'][0];
export type MappedConversations = PageProps['fallback']['conversations'];
export type Conversations = PageProps['fallback']['conversations'] extends {
  [key in string]: infer Conver;
}
  ? Conver
  : never;

import {createContext} from 'react';
import {TwitterCardWithProvider} from '@components/TwitterCard';
import {SemiModalWithProvider} from '@components/Semimodal';

////////////////////////////////////////////////////////
export type IndexPageContext = {
  apiTweetsResult: DefinedUseQueryResult<PageProps['fallback']>;
  apiTweetDrilledDownResult: DefinedUseQueryResult<string[]>;
  apiTweetsResultInvalidate: () => void;
};

export const indexPageContext = createContext<IndexPageContext | undefined>(
  undefined
);

const {Provider} = indexPageContext;

type UseIndexPageContext = () => IndexPageContext;

export const useIndexPageContext: UseIndexPageContext = () => {
  const context = useContext(indexPageContext);
  if (!context) throw new Error(); // Custom Error

  return context;
};
////////////////////////////////////////////////////////

export const useApiAuthTweetDrilledDownPostMutation = () => {
  return useMutation((tweet: ElasticTweet) => {
    return axios.post(
      `/api/auth/tweet_drilled_down`,
      dataV1ToV2(tweet._source!)
    );
  });
};

export const useApiAuthTweetDeleteMutation = () => {
  return useMutation((tweetId: string) => {
    return axios.delete(`/api/auth/tweets/${tweetId}`);
  });
};

export const useApiAuthTweetUserDeleteMutation = () => {
  return useMutation((tweetUserId: string) => {
    return axios.delete(`/api/auth/tweet_users/${tweetUserId}`);
  });
};

export type MutationResult<T> = T extends (...args: any[]) => infer Result
  ? Result
  : never;

export default function IndexPageWithProvider(props: PageProps) {
  const {alreadyLoggedIn, decoded} = props;
  const {query} = useRouter();
  const key = `/api/tweets?${queryString.stringify(query)}`;
  const apiTweetsResult = useQuery<PageProps['fallback']>(
    [key],
    () => fetcher(key),
    {
      initialData: props.fallback,
    }
  );
  const apiTweetDrilledDownResult = useQuery<string[]>(
    ['api/tweet_drilled_down'],
    () => fetcher('api/tweet_drilled_down'),
    {initialData: []}
  );

  const queryClient = useQueryClient();
  const apiTweetsResultInvalidate = () => {
    return new Promise((resolve, reject) => {
      try {
        queryClient.invalidateQueries([key]);
        resolve(undefined);
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <Provider
      value={{
        apiTweetsResult,
        apiTweetDrilledDownResult,
        apiTweetsResultInvalidate,
      }}
    >
      <WithSubnavigation
        alredeLoggedIn={alreadyLoggedIn}
        decoded={decoded!}
        url={props.url}
      />
      <Main {...props} query={{...props.query, ...query}}></Main>
    </Provider>
  );
}

function Main(props: PageProps) {
  const {
    apiTweetsResult,
    apiTweetsResultInvalidate: mutate,
    apiTweetDrilledDownResult,
  } = useIndexPageContext();
  const {data: apiTweets} = apiTweetsResult;
  const {query} = props;
  const router = useRouter();

  const {isOpen, onOpen, onClose} = useDisclosure();
  const {isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2} = useDisclosure();
  const btnRef = useRef(null);
  const btnRef2 = useRef(null);

  return (
    <>
      <FixedSearchHeader>
        <HStack spacing={4}>
          <Button mt={3} ref={btnRef} onClick={onOpen} color="black">
            絞り込み
          </Button>
        </HStack>
      </FixedSearchHeader>
      <Box w="100vw" whiteSpace={'nowrap'} overflowX={'scroll'} py={2}>
        <WordList
          categories={apiTweets!.queryCount}
          inheritParams={{...router.query, ...{page: undefined}}}
        ></WordList>
      </Box>
      <Divider></Divider>
      <Heading as="h4" fontSize={'20px'}>
        勝手にマーケティング・エキスパート認定
      </Heading>
      <Box>
        <>
          {apiTweets!.expertUsers.map(item => {
            return (
              <Link
                key={item.twitter_user_id}
                href={`/expert_users?${queryString.stringify({
                  tweet_user_id: item.twitter_user_id,
                  page: undefined,
                })}`}
              >
                <Button mt={'2'} mr={'2'}>
                  {item.screen_name}
                </Button>
              </Link>
            );
          })}
        </>
      </Box>
      <Stack>
        {apiTweets!.result.hits.hits.map(tweet => {
          return (
            <TwitterCardWithProvider
              key={tweet._source?.id_str!}
              tweet={tweet}
              conversations={
                apiTweets.conversations[tweet._source?.id_str!] || []
              }
            ></TwitterCardWithProvider>
          );
        })}
      </Stack>
      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose2}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SemiModalWithProvider
        btnRef={btnRef}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        query={query}
        categoryCount={apiTweets?.categoryCount!}
      ></SemiModalWithProvider>
      <PaginatedItems
        itemsPerPage={50}
        query={query}
        //@ts-ignore
        itemCount={apiTweets!.result!.hits.total!.value as any as number}
      />
    </>
  );
}

export async function fetcher(key: string) {
  return axios(key).then(res => res.data);
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

const WordList = (
  props: PropsWithChildren<{
    categories: PickedMaster_Batch_Search_Queries[];
    inheritParams: ParsedUrlQuery;
  }>
): ReactElement => {
  return (
    <>
      {props.categories.map(item => {
        return (
          <Link
            key={item.query_id}
            href={`?${queryString.stringify({
              ...props.inheritParams,
              queryIds: item.query_id,
              paege: undefined,
            })}`}
          >
            <Button
              rightIcon={<div>{item.count}</div>}
              disabled={!item.count}
              mt={'2'}
              mr={'2'}
              isActive={item.selected}
            >
              {item.query}
            </Button>
          </Link>
        );
      })}
    </>
  );
};

Main.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
