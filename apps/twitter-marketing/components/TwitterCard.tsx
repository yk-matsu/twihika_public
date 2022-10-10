import {Tweet} from '../components/Tweet';
import {
  Box,
  Button,
  Image,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import {
  createContext,
  useContext,
} from 'react';
import {dataV1ToV2} from '../components/lib/TweetV1ToV1';
import Link from 'next/link';
import { Conversations, ElasticTweet, MutationResult, useApiAuthTweetDeleteMutation, useApiAuthTweetDrilledDownPostMutation, useApiAuthTweetUserDeleteMutation, useIndexPageContext } from 'pages';
import { isProduction } from '@twihika/env';

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

export function TwitterCardWithProvider(props: {
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
