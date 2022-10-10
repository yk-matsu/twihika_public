import {ScrollingSemiModal} from '@twihika/ui/Modal';
import {searchState} from '../store/searchState';
import {
  Button,
  Heading,
  Stack,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
} from 'react';
import {useRecoilState} from 'recoil';
import queryString from 'query-string';
import {ParsedUrlQuery} from 'querystring';
import {
  DefinedUseQueryResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { ApiTweetCountResponse } from 'pages/api/tweets/count';
import { fetcher } from 'pages';
import {  Master_Batch_Search_Query_Categories } from '@twihika/hasura';
type PickedMaster_Batch_Search_QueryCategories = Partial<
  Pick<Master_Batch_Search_Query_Categories, 'query_category_id' | 'name'> & {
    selected: boolean;
    count: number;
  }
>;


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

export function SemiModalWithProvider(props: ModalProps) {
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
