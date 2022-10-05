import {Layout} from '../components/layout';
import type {NextPageContext} from 'next';
import {DecodedIdToken} from '@twihika/auth';
import cookie from 'cookie';

export async function getServerSideProps(context: NextPageContext) {
  const {req, res} = context;
  res?.setHeader(
    'Set-Cookie',
    cookie.serialize('__session', '', {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV == 'production' ? true : false,
      domain:
        process.env.NODE_ENV == 'production' ? '.twi-hika.com' : 'localhost',
      sameSite: false,
      expires: new Date(+0),
    })
  );
  return {
    redirect: {
      permanent: false,
      destination: `/login?ref=${encodeURIComponent(
        new URL(
          req!.url!,
          `${process.env.NODE_ENV == 'production' ? 'https' : 'http'}://${
            req!.headers.host
          }`
        ).searchParams.get('ref')!
      )}`,
    },
  };
}

export default function Page(props: {
  alreadyLoggedIn: boolean;
  decoded: DecodedIdToken;
}) {
  return <></>;
}

Page.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
