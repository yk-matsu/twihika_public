import {isProduction} from '@twihika/env';
import {AuthenticatedButNotAdmin, EmailIsNotVerified} from './error';
import admin from 'firebase-admin';
import cookie from 'cookie';
import {IncomingMessage} from 'http';

export const app =
  admin.apps.length > 0
    ? admin.app()
    : admin.initializeApp({
        credential: admin.credential.cert(
          JSON.parse(process.env.TWI_HIKA_FIREBASE_ADMIN_JSON!)
        ),
      });

export const decodeFromSessinoCokie = async (req: IncomingMessage) => {
  const rawCookie = req.headers.cookie;
  if (rawCookie) {
    const cookies = cookie.parse(rawCookie);
    if (cookies['__session']) {
      const decoded = await app
        .auth()
        .verifySessionCookie(cookies['__session']);
      return {
        decoded,
      };
    }
  }
  return {
    decoded: null,
  };
};

const KEYCLOADK_PROVIDER_NAME = 'oidc.twi-hika-admin';
const GOOGLE_WORKSPACE_PROVIDER_NAME = 'sample.twi-hika-admin';

const ADMIN_PROVIDER_NAMES = [
  KEYCLOADK_PROVIDER_NAME,
  GOOGLE_WORKSPACE_PROVIDER_NAME,
];

export const isAuthenticatedAsAdminOrRedirect = async (
  req: IncomingMessage
): Promise<Redirect|undefined> => {
  const {decoded} = await decodeFromSessinoCokie(req);
  if (!decoded) {
    return {
      redirect: {
        permanent: false,
        destination: createRedirectURL(req),
      },
    };
  }
  if (!decoded.email_verified) {
    throw new EmailIsNotVerified('email is not verified. check your email');
  }
  if (
    !ADMIN_PROVIDER_NAMES.some(provider => {
      return decoded.firebase.identities[provider];
    })
  ) {
    throw new AuthenticatedButNotAdmin('ExpectProvider is not exist');
  }
};

export const createRedirectURL = (req: IncomingMessage) => {
  const scheme = isProduction() ? 'https' : 'http';
  const host = process.env.TWI_HIKA_REDIRECT_TO_LOGIN
  const ref = new URL(req!.url!, `${scheme}://${req!.headers.host}`).toString();
  return `${scheme}://${host}/login?ref=${encodeURIComponent(ref)}`;
};

export type Redirect = {
  redirect: {
    permanent: boolean;
    destination: string;
  };
};

export const isAuthenticatedOrRedirect = async (
  req: IncomingMessage
): Promise<Redirect | undefined> => {
  const {decoded} = await decodeFromSessinoCokie(req);
  if (!decoded) {
    return {
      redirect: {
        permanent: false,
        destination: createRedirectURL(req),
      },
    };
  }
  if (!decoded.email_verified) {
    throw new EmailIsNotVerified('email is not verified. check your email');
  }
};

export type {UserInfo, UserRecord} from 'firebase-admin/lib/auth/user-record';
export type {DecodedIdToken} from 'firebase-admin/lib/auth/token-verifier';
