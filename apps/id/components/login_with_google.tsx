import {Flex, useToast} from '@chakra-ui/react';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {Session} from '../universal_lib/session';
import {
  redirectUntil,
  registerSessionToken,
} from './lib/register_session_token';

export const LoginWithGoogle = () => {
  const toast = useToast();
  const signInWithGoogle = async () => {
    const app = initializeApp({
      ...JSON.parse(process.env.TWI_HIKA_FIREBASE_CLIENT_JSON!),
    });
    const auth = getAuth(app);
    const authProvider = new GoogleAuthProvider();
    console.log(window.location.search)
    console.log(new URLSearchParams(window.location.search).get("ref"))
    await signInWithPopup(auth, authProvider)
      .then(async (result): Promise<Session> => {
        const idToken = await result.user?.getIdToken();
        const [providerData] = result.user.providerData.filter(
          item => item.providerId == 'google.com'
        );
        return {
          idToken,
          providerAccountId: providerData?.uid,
          providerId: providerData?.providerId,
          uid: result.user.uid,
          email: result.user.email!,
        };
      })
      .then((session) =>registerSessionToken(session, new URLSearchParams(window.location.search).get("ref") || "/settings"))
      .then((result) => {
        toast({
          title: 'ログインに成功しました。3秒後にリダイレクトします。',
          status: 'success',
          isClosable: true,
        });
        console.log(result.ref)
        redirectUntil(3000, result.ref);
      })
      .catch(error => {
        console.log(error);
        if (error.code == 'auth/email-already-in-use') {
          toast({
            title:
              'このメールアドレスは既に使用されています。ログインしてください。',
            status: 'error',
            isClosable: true,
          });
        }
      });
  };
  return (
    <Flex
      justify={'center'}
      _hover={{
        opacity: 0.8,
      }}
    >
      <img
        onClick={signInWithGoogle}
        width="250"
        height="120"
        alt="Googleでログイン"
        src="/sign_in_with_google.png"
      ></img>
    </Flex>
  );
};
