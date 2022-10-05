import {
  Button,
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
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import {useForm} from 'react-hook-form';
import {initializeApp} from 'firebase/app';
import {useState} from 'react';
import {LoginWithGoogle} from './login_with_google';
import {isLocal, isProduction} from '@twihika/env';

export function Register({alreadyLoggedIn = false}) {
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
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'http://localhost:3000/email_link_finish_sign_up?cartId=1234',
        // This must be true.
        handleCodeInApp: true,
      };
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(async userCredential => {
          const user = userCredential;
          await sendEmailVerification(user.user);
          toast({
            title: 'メールアドレスに確認メールを送信しました。',
            status: 'success',
            isClosable: true,
          });
          setTimeout(() => {
            window.location.href = '/login';
          }, 3000);
          return;
        })
        .catch(error => {
          console.log(error);
          if (error.code == 'auth/email-already-in-use') {
            toast({
              title:
                'このメールアドレスは既に使用されています。ログインしてください。リダイレクトします。',
              status: 'error',
              isClosable: true,
            });
            setTimeout(() => {
              window.location.href = '/login';
            }, 3000);
          }
        });
    });
  }
  return (
    <Flex justify={'center'}>
      <Stack minH={'60vh'} py={100}>
        <Flex
          direction={{base: 'column', sm: 'row'}}
          pl={{base: 2, md: 8}}
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
              minWidth={'330px'}
            >
              <Heading textAlign={'center'} fontSize={'xl'}>
                ユーザー登録
              </Heading>
              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel htmlFor="email" whiteSpace={'nowrap'}>
                  メールアドレス
                </FormLabel>
                <Input
                  type="email"
                  disabled={alreadyLoggedIn}
                  {...register('email', {
                    required: '必須項目です',
                  })}
                />

                <FormErrorMessage>
                  {/* @ts-ignore */}
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={!!errors.password}>
                <FormLabel htmlFor="password">パスワード</FormLabel>
                <Input
                  type="password"
                  disabled={alreadyLoggedIn}
                  {...register('password', {
                    required: '必須項目です',
                  })}
                />

                <FormErrorMessage>
                  {/* @ts-ignore */}
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                colorScheme={'blue'}
                variant={'solid'}
                type="submit"
                disabled={alreadyLoggedIn}
              >
                登録
              </Button>

              <Link
                color={'blue.500'}
                textAlign={'right'}
                w={'full'}
                fontSize={12}
                href="/password_reset"
                whiteSpace={'nowrap'}
              >
                ログイン情報をお忘れの場合はこちら
              </Link>
            </Stack>
          </form>
          <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            h="full"
            px={{base: 2, md: 8}}
            py={12}
            borderLeft={{base: '0px', md: '2px'}}
            borderTop={{base: '2px', md: '0px'}}
            borderColor={'gray.400'}
          >
            <Flex direction={'column'} h="full" justifyContent={'center'}>
              <LoginWithGoogle />
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Flex>
  );
}
