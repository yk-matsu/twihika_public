import {Layout} from '../components/layout';
import type {NextPageContext} from 'next';
import {WithSubnavigation} from '../components/navbar';
import {DecodedIdToken} from 'firebase-admin/lib/auth/token-verifier';
import {ScrollingSemiModal} from '@twihika/ui/Modal';
import {
  Master_Batch_Search_Queries,
  Master_Batch_Search_Query_Categories,
} from '@twihika/hasura';
import {decodeFromSessinoCokie} from '../serverside/firebase-admin';
import {searchState} from '../store/searchState';
import {withUrqlClient} from 'next-urql';
import type {SearchResponse} from '@twihika/elasticsearch';
import {Tweet} from '../components/Tweet';
import {FixedSearchHeader} from '../components/fixed_search_header';
import ReactPaginate from 'react-paginate';
import {
  Box,
  Button,
  ButtonProps,
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
  useEffect,
  useRef,
  useState,
} from 'react';
import {dataV1ToV2, TweeetLiteType} from '../components/lib/TweetV1ToV1';
import {useRecoilState} from 'recoil';
import queryString from 'query-string';
import useSWR, {SWRConfig} from 'swr';
import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from '@ajna/pagination';
import {ParsedUrlQuery} from 'querystring';
import Link from 'next/link';
import {isProduction} from '@twihika/env';

export default withUrqlClient(
  ssr => ({
    url: 'https://twi-hika.com',
  }),
  {ssr: false}
)(Page);


export async function getServerSideProps(context: NextPageContext) {
  const key = `/api/tweets?${queryString.stringify(context.query)}`;
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
          queryCount: api.queryCount,
          categoryCount: api.categoryCount,
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

async function fetcher(key: string, init?: RequestInit) {
  return fetch(key, init).then(res => res.json());
}

function LoadingButton(
  props: ButtonProps & {
    handleprocess?: () => Promise<void>;
  }
) {
  const [isLoading, setIsLoading] = useState(false);
  const {handleprocess} = props;
  const process = async () => {
    setIsLoading(true);
    await handleprocess!();
    setIsLoading(false);
  };
  return (
    <Button isLoading={props.isLoading || isLoading} onClick={process}>
      {props.children}
    </Button>
  );
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
  const key = `/api/tweets?${queryString.stringify(query)}`;
  const router = useRouter();

  let {data, mutate} = useSWR<{
    result: SearchResponse<TweeetLiteType & {pickup: TweeetLiteType}>;
    queryCount: PickedMaster_Batch_Search_Queries[];
    categoryCount: PickedMaster_Batch_Search_QueryCategories[];
  }>(key, fetcher);

  let {
    data: conversations,
    mutate: conversationsMutate,
    error,
  } = useSWR<string[]>('api/tweet_drilled_down', fetcher);

  const {isOpen, onOpen, onClose} = useDisclosure();
  const {isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2} = useDisclosure();
  const btnRef = useRef(null);
  const btnRef2 = useRef(null);
  const toast = useToast();

  const onSubmit = () => {
    console.log(search);
    console.log(
      queryString.stringify({
        ...query,
        queryIds: search.queryIds,
        createdAtGte: search.createdAtGte,
      })
    );
    router.push({
      pathname: '/',
      query: queryString.stringify({
        ...query,
        queryIds: search.queryIds,
        createdAtGte: search.createdAtGte,
      }),
    });
    onClose();
  };

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
          categories={data!.queryCount}
          inheritParams={router.query}
        ></WordList>
      </Box>
      <Stack>
        {data!.result.hits.hits.map(tweet => {
          return (
            <Box key={tweet._source!.id_str} px={'2'}>
              <Tweet metadata={dataV1ToV2(tweet._source!)}></Tweet>
              <Button mt={3} ref={btnRef2} onClick={onOpen2} color="black">
                分類
              </Button>
              <LoadingButton
                handleprocess={async () => {
                  await fetch(`/api/tweets/${tweet._source?.id_str}`, {
                    method: 'delete',
                  });
                  await (() => {
                    return new Promise((resolve, reject) => {
                      setTimeout(() => {
                        resolve(undefined);
                      }, 3000);
                    });
                  })();
                  await mutate();
                }}
              >
                関連なし
              </LoadingButton>
              <LoadingButton
                handleprocess={async () => {
                  await fetch(
                    `/api/tweet_users/${tweet._source?.user.id_str}`,
                    {method: 'delete'}
                  );
                  await (() => {
                    return new Promise((resolve, reject) => {
                      setTimeout(() => {
                        resolve(undefined);
                      }, 3000);
                    });
                  })();
                  await mutate();
                }}
              >
                Botユーザーとして報告
              </LoadingButton>

              {!error && !conversations ? (
                <Button isLoading={true}></Button>
              ) : conversations &&
                conversations!.includes(tweet._source!.id_str!) ? (
                <></>
              ) : (
                <LoadingButton
                  handleprocess={async () => {
                    const res = await fetch(`/api/tweet_drilled_down`, {
                      body: JSON.stringify(dataV1ToV2(tweet._source!)),
                      method: 'post',
                    });
                    if (res.status != 200) {
                      console.log(error);
                      toast({
                        title: 'ログインが必要です。',
                        status: 'error',
                        isClosable: true,
                      });
                      await (() => {
                        return new Promise((resolve, reject) => {
                          setTimeout(() => {
                            resolve(undefined);
                          }, 3000);
                        });
                      })();
                      window.location.href = isProduction()
                        ? `https://id.twi-hika.com/login?ref=${window.location.href}`
                        : `http://localhost:4002/login?ref=${window.location.href}`;
                    }
                    await (() => {
                      return new Promise((resolve, reject) => {
                        setTimeout(() => {
                          resolve(undefined);
                        }, 3000);
                      });
                    })();
                    await conversationsMutate();
                    await mutate();
                  }}
                  isLoading={!error && !conversations}
                >
                  要深掘り
                </LoadingButton>
              )}
              <SimpleGrid columns={30} spacing={10} mt={4}>
                {/* @ts-ignore */}
                {tweet.conversations.map(item => {
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
                          src={item.firebaseUser.photoUrl}
                        ></Image>
                      </Box>
                    </Link>
                  );
                })}
              </SimpleGrid>
            </Box>
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
      <ScrollingSemiModalContainer
        btnRef={btnRef}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        onOpen={onOpen}
        query={query}
        categoryCount={data?.categoryCount!}
      ></ScrollingSemiModalContainer>
      {/* <ScrollingSemiModal
          btnRef={btnRef}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          onSubmit={onSubmit}
        >
          <Divider orientation="horizontal" />
          <Heading
            as="h2"
            size="md"
            noOfLines={1}
            fontWeight={'normal'}
            mt={'4'}
          >
            カテゴリー
          </Heading>
          <CategoryList categories={data!.categoryCount}></CategoryList>
          <Divider orientation="horizontal" />
          <Heading
            as="h2"
            size="md"
            noOfLines={1}
            fontWeight={'normal'}
            mt={'4'}
          >
            期間
          </Heading>
          <DateRangeList
            selected={(router.query.createdAtGte as string) || 'now-1y'}
            update={update}
          ></DateRangeList>
          <Stack></Stack>
        </ScrollingSemiModal> */}
      {/* @ts-ignore */}
      <PaginatedItems
        itemsPerPage={50}
        query={query}
        //@ts-ignore
        itemCount={data!.result!.hits.total!.value as any as number}
      />
    </>
  );
}

function ScrollingSemiModalContainer(
  props: PropsWithChildren<{
    btnRef: MutableRefObject<null>;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onSubmit: () => void;
    defaultCategory?: string;
    defaultRange?: string;
    query: {[key in string]: string};
    categoryCount: PickedMaster_Batch_Search_QueryCategories[];
  }>
) {
  const {
    btnRef,
    isOpen,
    onClose,
    onOpen,
    onSubmit,
    defaultCategory,
    defaultRange = 'now-1y',
    categoryCount,
    query,
  } = props;
  const [search, setSearch] = useRecoilState(searchState);
  const key = `/api/tweets/count?${queryString.stringify({
    query,
    createdAtGte: search.createdAtGte,
  })}`;
  const {data, mutate} = useSWR<{
    categoryCount: PickedMaster_Batch_Search_QueryCategories[];
  }>(key, fetcher, {fallbackData: {categoryCount}});
  const updater = async () => {
    await mutate();
  };
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
      <CategoryList categories={data?.categoryCount!}></CategoryList>
      <Heading as="h2" size="md" noOfLines={1} fontWeight={'normal'} mt={'4'}>
        期間
      </Heading>
      <DateRangeList
        selected={defaultRange}
        updater={updater}
        query={query}
      ></DateRangeList>
      <Stack></Stack>
    </ScrollingSemiModal>
  );
}

function Page(props: {
  fallback: {
    result: SearchResponse<TweeetLiteType & {pickup: TweeetLiteType}>;
    queryCount: PickedMaster_Batch_Search_Queries[];
    categoryCount: PickedMaster_Batch_Search_QueryCategories[];
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

const DateRangeList = (
  props: PropsWithChildren<{
    selected: string;
    updater: () => Promise<void>;
    query: {[key in string]: string};
  }>
): ReactElement => {
  const dateRanges = [
    {date: 'now-1M', selected: false},
    {date: 'now-3M', selected: false},
    {date: 'now-1y', selected: false},
    {date: 'now-1d', selected: false},
  ].map(item => {
    return item.date == props.selected
      ? {...item, ...{selected: true}}
      : {...item, ...{selected: false}};
  });
  const [selectedDateRange, setselectedDateRange] = useState(dateRanges);
  const [search, setSearch] = useRecoilState(searchState);

  const onClick = async (date: string) => {
    const selected = dateRanges.map(dateRange => {
      return dateRange.date == date
        ? {...dateRange, selected: !dateRange.selected}
        : {...dateRange, selected: false};
    });
    setselectedDateRange(selected);
    const pick = selected.find(item => item.selected);
    setSearch({
      ...search,
      ...props.query,
      createdAtGte: pick?.date || 'now-1y',
    });
    await props.updater();
  };
  return (
    <>
      {selectedDateRange.map(item => {
        return (
          <Button
            key={item.date}
            mt={'2'}
            mr={'2'}
            isActive={item.selected}
            onClick={() => onClick(item.date)}
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
        console.log(item.count);
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

Page.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
