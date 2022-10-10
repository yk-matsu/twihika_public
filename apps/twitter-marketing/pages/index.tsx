import {Layout} from '../components/layout';
import type {NextPageContext} from 'next';
import {WithSubnavigation} from '../components/navbar';
import {ScrollingSemiModal} from '@twihika/ui/Modal';
import {
  Master_Batch_Search_Queries,
  Master_Batch_Search_Query_Categories,
  Master_Batch_Search_Users,
} from '@twihika/hasura';
import {decodeFromSessinoCokie} from '../serverside/firebase-admin';
import {searchState} from '../store/searchState';
import {Tweet} from '../components/Tweet';
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
  Image,
  SimpleGrid,
  useToast,
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
import {
  MutableRefObject,
  PropsWithChildren,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {dataV1ToV2, TweeetLiteType} from '../components/lib/TweetV1ToV1';
import {useRecoilState} from 'recoil';
import queryString from 'query-string';
import useSWR, {SWRConfig} from 'swr';
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
type ElasticTweet = PageProps['fallback']['result']['hits']['hits'][0];
type MappedConversations = PageProps['fallback']['conversations'];
type Conversations = PageProps['fallback']['conversations'] extends {
  [key in string]: infer Conver;
}
  ? Conver
  : never;

type PickedMaster_Batch_Search_QueryCategories = Partial<
  Pick<Master_Batch_Search_Query_Categories, 'query_category_id' | 'name'> & {
    selected: boolean;
    count: number;
  }
>;

type PickedMaster_Batch_Search_Queries = Partial<
  Pick<Master_Batch_Search_Queries, 'query_id' | 'query'> & {
    selected: boolean;
    count: number;
  }
>;

type PickedMaster_Batch_Search_Users_Queries = Pick<
  Master_Batch_Search_Users,
  'twitter_user_id' | 'screen_name'
> & {selected: boolean};
import {createContext, ReactNode, FC} from 'react';
import {ApiTweetCountResponse} from './api/tweets/count';

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

const useApiAuthTweetDrilledDownPostMutation = () => {
  return useMutation((tweet: ElasticTweet) => {
    return axios.post(
      `/api/auth/tweet_drilled_down`,
      dataV1ToV2(tweet._source!)
    );
  });
};

const useApiAuthTweetDeleteMutation = () => {
  return useMutation((tweetId: string) => {
    return axios.delete(`/api/auth/tweets/${tweetId}`);
  });
};

const useApiAuthTweetUserDeleteMutation = () => {
  return useMutation((tweetUserId: string) => {
    return axios.delete(`/api/auth/tweet_users/${tweetUserId}`);
  });
};

type MutationResult<T> = T extends (...args: any[]) => infer Result
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

const clientSideLogingRequiredRedirect = () => {
  window.location.href = isProduction()
    ? `https://id.twi-hika.com/login?ref=${window.location.href}`
    : `http://localhost:4002/login?ref=${window.location.href}`;
};
const wait = (milisec: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(undefined);
    }, milisec);
  });
};

////////////////////////////////////////////////////////
export type TwitterCardContext = {
  useApiAuthTweetDrilledDownPostMutation: () => MutationResult<
    typeof useApiAuthTweetDrilledDownPostMutation
  >;
  useApiAuthTweetDeleteMutation: () => MutationResult<
    typeof useApiAuthTweetDeleteMutation
  >;
  useApiAuthTweetUserDeleteMutation: () => MutationResult<
    typeof useApiAuthTweetUserDeleteMutation
  >;
};

export const twitterCardContext = createContext<TwitterCardContext | undefined>(
  undefined
);

const {Provider: TwitterCardProvider} = twitterCardContext;

type UseTwitterCardContext = () => TwitterCardContext;

export const useTwitterCardContext: UseTwitterCardContext = () => {
  const context = useContext(twitterCardContext);
  if (!context) throw new Error(); // Custom Error

  return context;
};

function TwitterCardWithProvider(props: {
  tweet: ElasticTweet;
  conversations: Conversations;
}) {
  return (
    <TwitterCardProvider
      value={{
        useApiAuthTweetDrilledDownPostMutation,
        useApiAuthTweetUserDeleteMutation,
        useApiAuthTweetDeleteMutation,
      }}
    >
      <TwitterCard {...props}></TwitterCard>
    </TwitterCardProvider>
  );
}
function TwitterCard(props: {
  tweet: ElasticTweet;
  conversations: Conversations;
}) {
  const {tweet, conversations} = props;
  const {
    useApiAuthTweetDeleteMutation,
    useApiAuthTweetUserDeleteMutation,
    useApiAuthTweetDrilledDownPostMutation,
  } = useTwitterCardContext();
  const authTweetDeleteMutation = useApiAuthTweetDeleteMutation();
  const authTweetUserDeleteMutation = useApiAuthTweetUserDeleteMutation();
  const authTweetDrilledDownPostMutation =
    useApiAuthTweetDrilledDownPostMutation();
  const {apiTweetsResultInvalidate, apiTweetDrilledDownResult} =
    useIndexPageContext();
  const toast = useToast();

  return (
    <Box px={'2'}>
      <Tweet metadata={dataV1ToV2(tweet._source!)}></Tweet>
      {/* <Button ref={btnRef2} onClick={onOpen2} color="black">
                分類
              </Button> */}

      <Button
        isLoading={authTweetDeleteMutation.isLoading}
        onClick={async () => {
          authTweetDeleteMutation.mutate(tweet._source?.id_str!, {
            onError: async (error, variables, context) => {
              toast({
                title: 'ログインが必要です。リダイレクトします。',
                status: 'error',
                isClosable: true,
              });
              clientSideLogingRequiredRedirect();
            },
            onSuccess: async () => {
              await wait(1000);
              apiTweetsResultInvalidate();
            },
          });
        }}
      >
        関連なし
      </Button>

      <Button
        isLoading={authTweetUserDeleteMutation.isLoading}
        onClick={async () => {
          authTweetUserDeleteMutation.mutate(tweet._source?.user.id_str!, {
            onError: async (error, variables, context) => {
              toast({
                title: 'ログインが必要です。リダイレクトします。',
                status: 'error',
                isClosable: true,
              });
              await wait(3000);
              clientSideLogingRequiredRedirect();
            },
            onSuccess: async () => {
              await wait(1000);
              apiTweetsResultInvalidate();
            },
          });
        }}
      >
        Botユーザーとして報告
      </Button>

      <Button
        isLoading={authTweetDrilledDownPostMutation.isLoading}
        onClick={async () => {
          authTweetDrilledDownPostMutation.mutate(tweet, {
            onError: async (error, variables, context) => {
              toast({
                title: 'ログインが必要です。リダイレクトします。',
                status: 'error',
                isClosable: true,
              });
              await wait(3000);
              clientSideLogingRequiredRedirect();
            },
            onSuccess: async () => {
              await wait(1000);
              apiTweetsResultInvalidate();
            },
          });
        }}
      >
        {apiTweetDrilledDownResult!.data.includes(tweet._source!.id_str!) ||
        authTweetDrilledDownPostMutation.isSuccess
          ? '開始済み'
          : 'ChatStart'}
      </Button>
      <SimpleGrid columns={30} spacing={10} mt={4}>
        {conversations.map(item => {
          return (
            <Link
              key={`${tweet._source!.id_str!}:${item.firebaseUserId}`}
              href={`http://${
                process.env.DEVELOPMENT_MODE == 'local'
                  ? 'localhost:4999'
                  : 'chat.twi-hika.com'
              }/${tweet._source!.id_str!}:${item.firebaseUserId}`}
            >
              <Box w="40px" h="40px">
                {/* @ts-ignore */}
                <Image
                  rounded={'full'}
                  src={item.firebaseUser?.photoUrl!}
                ></Image>
              </Box>
            </Link>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
////////////////////////////////////////////////////////

function Main(props: PageProps) {
  const {
    apiTweetsResult,
    apiTweetsResultInvalidate: mutate,
    apiTweetDrilledDownResult,
  } = useIndexPageContext();
  const {data: apiTweets} = apiTweetsResult;
  const {data: apiTweetDrilledDown} = apiTweetDrilledDownResult;

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
          inheritParams={{...router.query,...{page: undefined}}}
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


////////////////////////////////////////////////////////
export type SemiModalContext = {
  apiTweetsCountResult: DefinedUseQueryResult<ApiTweetCountResponse>;
  apiTweetsCountInvalidate: () => void;
};

export const semiModalContext = createContext<SemiModalContext | undefined>(
  undefined
);

const {Provider: SemiModalProvider} = semiModalContext;

type UseSemiModalContext = () => SemiModalContext;

export const useSemiModalContext: UseSemiModalContext = () => {
  const context = useContext(semiModalContext);
  if (!context) throw new Error(); // Custom Error

  return context;
};

type ModalProps = PropsWithChildren<{
  btnRef: MutableRefObject<null>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  defaultCategory?: string;
  defaultRange?: string;
  query: ParsedUrlQuery;
  categoryCount: PickedMaster_Batch_Search_QueryCategories[];
}>;

////////////////////////////////////////////////////////
function SemiModalWithProvider(props: ModalProps) {
  const {query} = useRouter();
  const [search, setSearch] = useRecoilState(searchState);
  const client = useQueryClient();
  const router = useRouter();

  const onSubmit = () => {
    router.push({
      pathname: '/',
      query: queryString.stringify({
        ...props.query,
        ...query,
        createdAtGte: search.createdAtGte,
      }),
    });
    props.onClose();
  };

  const apiTweetsCountKey = `/api/tweets/count?${queryString.stringify({
    query,
    createdAtGte: search.createdAtGte,
  })}`;
  const apiTweetsCountResult = useQuery<ApiTweetCountResponse>(
    [apiTweetsCountKey],
    () => fetcher(apiTweetsCountKey),
    {initialData: {queryCount: [], categoryCount: props.categoryCount as any}}
  );
  const apiTweetsCountInvalidate = () => {
    client.invalidateQueries([apiTweetsCountKey]);
  };
  const handleDataRangeItemClick = (createdAtGte: string) => {
    apiTweetsCountInvalidate();
    setSearch({...search, ...{createdAtGte}});
  };

  return (
    <SemiModalProvider
      value={{
        apiTweetsCountResult,
        apiTweetsCountInvalidate,
      }}
    >
      {/* <ScrollingSemiModal {...props}></ScrollingSemiModal> */}
      <ScrollingSemiModalContainer
        {...props}
        onSubmit={onSubmit}
        handleDataRangeItemClick={handleDataRangeItemClick}
      ></ScrollingSemiModalContainer>
    </SemiModalProvider>
  );
}

function ScrollingSemiModalContainer(props: {
  btnRef: MutableRefObject<null>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: () => void;
  defaultCategory?: string;
  defaultRange?: string;
  query: ParsedUrlQuery;
  categoryCount: PickedMaster_Batch_Search_QueryCategories[];
  handleDataRangeItemClick: (dateString: string) => void;
}) {
  const {
    btnRef,
    isOpen,
    onClose,
    onOpen,
    onSubmit,
    defaultRange = 'now-1y',
    handleDataRangeItemClick,
  } = props;
  const {apiTweetsCountInvalidate, apiTweetsCountResult} =
    useSemiModalContext();
  const {data} = apiTweetsCountResult;
  const dateRanges = [
    {date: 'now-1M', selected: false},
    {date: 'now-3M', selected: false},
    {date: 'now-1y', selected: false},
    {date: 'now-1d', selected: false},
  ].map(item => {
    return item.date == defaultRange
      ? {...item, ...{selected: true}}
      : {...item, ...{selected: false}};
  });

  return (
    <ScrollingSemiModal
      btnRef={btnRef}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <Heading as="h2" size="md" noOfLines={1} fontWeight={'normal'} mt={'4'}>
        カテゴリー
      </Heading>
       <CategoryList categories={data.categoryCount}></CategoryList>
      <Heading as="h2" size="md" noOfLines={1} fontWeight={'normal'} mt={'4'}>
        期間
      </Heading>
      <DateRangeList
        dataRanges={dateRanges}
        onClick={handleDataRangeItemClick}
      ></DateRangeList>
      <Stack></Stack>
    </ScrollingSemiModal>
  );
}

const DateRangeList = (
  props: PropsWithChildren<{
    dataRanges: {date: string; selected: boolean}[];
    onClick: (dateRageString: string) => void;
  }>
): ReactElement => {
  return (
    <>
      {props.dataRanges.map(item => {
        return (
          <Button
            key={item.date}
            mt={'2'}
            mr={'2'}
            isActive={item.selected}
            onClick={() => {
              props.onClick(item.date);
            }}
          >
            {item.date}
          </Button>
        );
      })}
    </>
  );
};

const CategoryList = (
  props: PropsWithChildren<{
    categories: PickedMaster_Batch_Search_QueryCategories[];
  }>
): ReactElement => {
  const [categoriesSelected, categoriesSelectedSelected] = useState<
    PickedMaster_Batch_Search_QueryCategories[]
  >(props.categories);

  return (
    <>
      {props.categories.map(item => {
        return (
          <Button
            rightIcon={<div>{item.count}</div>}
            disabled={!item.count}
            key={item.query_category_id}
            mt={'2'}
            mr={'2'}
            isActive={item.selected}
          >
            {item.name}
          </Button>
        );
      })}
    </>
  );
};

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

async function fetcher(key: string) {
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

Main.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
