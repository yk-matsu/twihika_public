import {Button, ButtonGroup, VisuallyHidden} from '@chakra-ui/react';
import {GitHubIcon, GoogleIcon, TwitterIcon} from './ProviderIcons';
import {Flex, useToast} from '@chakra-ui/react';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {Session} from '../universal_lib/session';
import {
  redirectUntil,
  registerSessionToken,
} from './lib/register_session_token';
import {isLocal, isProduction} from '@twihika/env';

const providers = [
  {name: 'Google', icon: <GoogleIcon boxSize="5" />},
  {name: 'Twitter', icon: <TwitterIcon boxSize="5" />},
  {name: 'GitHub', icon: <GitHubIcon boxSize="5" />},
];

export const OAuthButtonGroup = () => {
  const toast = useToast();
  const signInWithGoogle = async () => {
    const app = initializeApp({
      ...JSON.parse(process.env.TWI_HIKA_FIREBASE_CLIENT_JSON!),
    });
    const auth = getAuth(app);
    if (isLocal()) {
      auth.tenantId = 'local-twi-hika-u3z9k';
    }
    const authProvider = new GoogleAuthProvider();
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
      .then(session =>
        registerSessionToken(
          session,
          new URLSearchParams(window.location.search).get('ref') || '/settings'
        )
      )
      .then(res => {
        toast({
          title: 'ログインに成功しました。3秒後にリダイレクトします。',
          status: 'success',
          isClosable: true,
        });
        redirectUntil(3000, res.ref);
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
    <ButtonGroup variant="outline" spacing="4" width="full">
      {providers.map(({name, icon}) => {
        if (name == 'Google') {
          return (
            <Button key={name} width="full" onClick={signInWithGoogle}>
              <VisuallyHidden>Sign in with {name}</VisuallyHidden>
              {icon}
            </Button>
          );
        } else {
          return (
            <Button key={name} width="full" disabled={true}>
              <VisuallyHidden>Sign in with {name}</VisuallyHidden>
              {icon}
            </Button>
          );
        }
      })}
    </ButtonGroup>
  );
};
