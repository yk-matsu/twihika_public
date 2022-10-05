import {csrf} from '@twihika/share';
import {Layout} from '../components/layout';
import type {NextPageContext} from 'next';
import {
  decodeFromSessinoCokie,
  isAuthenticatedAsAdminOrRedirect,
  DecodedIdToken,
} from '@twihika/auth';
import {IncomingMessage} from 'http';
export async function getServerSideProps(context: NextPageContext) {
  const {req, res} = context;
  await csrf(req!, res!);
  const redirect = await isAuthenticatedAsAdminOrRedirect(req!);
  if (redirect) return redirect;
  const decoded = await decodeFromSessinoCokie(req!);
  return {
    props: {
      csrfToken: (
        req! as IncomingMessage & {csrfToken: () => void}
      ).csrfToken(),
      decoded,
      alreadyLoggedIn: !!decoded,
    },
  };
}

export default function Page(props: {
  alreadyLoggedIn: boolean;
  decoded: DecodedIdToken;
}) {
  return (
    <>
      <p>Settings page</p>
    </>
  );
}

Page.getLayout = function getLayout(page: any, pageProps: any) {
  return <Layout {...pageProps}>{page}</Layout>;
};
