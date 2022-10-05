import {csrf} from '@twihika/share';
import {Layout} from '../components/layout';
import type {NextPageContext} from 'next';
import {WithSubnavigation} from '../components/navbar';
import {isAuthenticatedOrRedirect, decodeFromSessinoCokie} from '@twihika/auth';

import {DecodedIdToken} from '@twihika/auth';
import {WebSocketLink} from 'apollo-link-ws';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import {onAuthStateChanged} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {useEffect} from 'react';
const app = initializeApp({
  ...JSON.parse(process.env.TWI_HIKA_FIREBASE_CLIENT_JSON!),
});
const auth = getAuth(app);

const createWSLink = (idToken: string) => {
  return new WebSocketLink(
    new SubscriptionClient(
      `${process.env.DEVELOPMENT_MODE == 'production' ? 'wss' : 'ws'}://${
        process.env.EVENTBUS_HOST
      }/graphql`,
      {
        lazy: true,
        reconnect: true,
        connectionParams: async () => {
          return {
            authToken: idToken,
          };
        },
      }
    )
  );
};
const createApolloClient = (idToken: string) => {
  return new ApolloClient({
    ssrMode: false,
    link: createWSLink(idToken),
    cache: new InMemoryCache(),
  });
};
export async function getServerSideProps(context: NextPageContext) {
  const {req, res} = context;
  await csrf(req!, res!);

  const redirect = await isAuthenticatedOrRedirect(req!);
  if (redirect) return redirect;
  const {decoded} = await decodeFromSessinoCokie(req!);
  return {
    // @ts-ignore
    props: {csrfToken: req.csrfToken(), decoded, alreadyLoggedIn: !!decoded},
  };
}

export default function Page(props: {
  alreadyLoggedIn: boolean;
  decoded: DecodedIdToken;
}) {
  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      const client = createApolloClient(await auth.currentUser?.getIdToken()!);
      const data = client.subscribe({
        // @ts-ignore
        query: gql`
          # Write your query or mutation here
          subscription {
            userSignUp {
              email
            }
          }
        `,
      });
      data.subscribe;
      console.log(
        data.subscribe(valu => {
          console.log(valu.data);
        })
      );
    });
  }, []);
  const {alreadyLoggedIn, decoded} = props;
  return (
    <>
      <WithSubnavigation alredeLoggedIn={alreadyLoggedIn} decoded={decoded} />
      <p>Settings page</p>
    </>
  );
}

Page.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
