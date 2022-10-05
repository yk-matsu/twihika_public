import {csrf} from '@twihika/share';
import {Layout} from '../components/layout';
import {Login} from '../components/login';
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';

import {getAuth, sendPasswordResetEmail} from 'firebase/auth';
import {useForm} from 'react-hook-form';
import {initializeApp} from 'firebase/app';
import {useState} from 'react';
import type {NextPageContext} from 'next';
import {decodeFromSessinoCokie} from '../serverside/firebase-admin';
import {DecodedIdToken} from '@twihika/auth';
import {WithSubnavigation} from '../components/navbar';
import { isLocal } from '@twihika/env';
export async function getServerSideProps(context: NextPageContext) {
  const {req, res} = context;
  await csrf(req!, res!);
  const {decoded} = await decodeFromSessinoCokie(req);
  if (decoded) {
    return {
      redirect: {
        permanent: false,
        destination: '/settings',
      },
    };
  }
  return {
    // @ts-ignore
    props: {csrfToken: req.csrfToken(), decoded, alreadyLoggedIn: !!decoded},
  };
}

export default function Page(props: {
  alreadyLoggedIn: boolean;
  decoded: DecodedIdToken;
}) {
  const {alreadyLoggedIn, decoded} = props;
  const {
    handleSubmit,
    register,
    formState: {errors, isSubmitting},
  } = useForm();
  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false);
  const toast = useToast();

  function onSubmit(values: any) {
    return new Promise(resolve => {
      const app = initializeApp({
        ...JSON.parse(process.env.TWI_HIKA_FIREBASE_CLIENT_JSON!),
      });
      const auth = getAuth(app);
      if (isLocal()) {
        auth.tenantId = 'local-twi-hika-u3z9k';
      }
      sendPasswordResetEmail(auth, values.email)
        .then(() => {
          toast({
            title: 'メールアドレスにパスワードリセットメールを送信しました。',
            status: 'success',
            isClosable: true,
          });
          setTimeout(() => {
            window.location.href = '/login';
          }, 3000);
        })
        .catch(error => {
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    });
  }
  return (
    <>
      <WithSubnavigation alredeLoggedIn={alreadyLoggedIn} decoded={decoded} />
      <Flex justify={'center'}>
        <Stack minH={'60vh'} py={100} direction={{base: 'column', md: 'row'}}>
          <Flex
            px={{base: 2, md: 8}}
            flex={1}
            align={'center'}
            justify={'center'}
            borderColor="gray.300"
            border="2px"
            rounded={'md'}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                px={{base: 2, md: 8}}
                py={12}
              >
                <Heading textAlign={'center'} fontSize={'xl'}>
                  パスワード再設定
                </Heading>
                <FormControl id="email" isInvalid={!!errors.email}>
                  <FormLabel htmlFor="email">
                    パスワード再設定用のメールアドレス
                  </FormLabel>
                  <Input
                    type="email"
                    {...register('email', {
                      required: '必須項目です',
                    })}
                  />

                  <FormErrorMessage>
                    {/* @ts-ignore */}
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <Stack spacing={6}>
                  <Button
                    disabled={isSubmitting}
                    colorScheme={'blue'}
                    variant={'solid'}
                    type="submit"
                  >
                    再設定用のメールを送信
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Flex>
        </Stack>
      </Flex>
    </>
  );
}

Page.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
