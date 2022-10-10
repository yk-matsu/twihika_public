import {isProduction} from '@twihika/env';
import type {NextApiRequest, NextApiResponse} from 'next';
import admin from 'firebase-admin';
import cookie from 'cookie';
import Cors from 'cors';
import {prisma} from '@twihika/prisma';
import * as z from 'zod';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
  origin: [
    'https://id.twi-hika.com',
    'chrome-extension://lklnkeeibihmommdagiblmjdpjjmdonk',
  ],
  allowedHeaders: ['Content-Type', 'Accept', 'Origin', 'Authorization'],
});

const app =
  admin.apps.length > 0
    ? admin.app()
    : admin.initializeApp({
        credential: admin.credential.cert(
          JSON.parse(process.env.TWI_HIKA_FIREBASE_ADMIN_JSON!)
        ),
      });
const auth = app.auth();

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (
    req: NextApiRequest,
    res: NextApiResponse,
    callback: (result: any) => any
  ) => any
) {
  return new Promise((resolve, reject) => {
    fn(req, res, result => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const hasValidRedirectUrl = async (ref: string) => {
  if (ref) {
    const patterns = await prisma.validLoginRedirectUrl.findMany({
      select: {
        pattern: true,
      },
    });
    return patterns.some(pattern => {
      const reg = new RegExp(pattern.pattern!);
      return reg.test(new URL(ref).origin);
    });
  }
};
const defaultRedirectUrl = () => {
  return isProduction()
    ? 'https://id.twi-hika.com/settings'
    : 'http://localhost:4002/settings';
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  const ref = (req.body.ref || '') as string;

  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  const session = req.body;
  try {
    // const firebaseRaw = userRecord.tenantId
    // ? await this.firebaseApp
    //     .getAuth()
    //     .tenantManager()
    //     .authForTenant(userRecord.tenantId)
    //     .getUser(userRecord.uid)
    // : await this.firebaseApp.getAuth().getUser(userRecord.uid);
    session.tenantId
      ? await auth
          .tenantManager()
          .authForTenant(session.tenantId)
          .verifyIdToken(session.idToken)
      : await auth.verifyIdToken(session.idToken);
    const sessionCookie = session.tenantId
      ? await await auth
          .tenantManager()
          .authForTenant(session.tenantId)
          .createSessionCookie(session.idToken, {expiresIn})
      : await auth.createSessionCookie(session.idToken, {
          expiresIn,
        });
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('__session', sessionCookie, {
        httpOnly: true,
        path: '/',
        secure: isProduction(),
        domain: isProduction() ? '.twi-hika.com' : 'localhost',
        sameSite: false,
        maxAge: expiresIn / 1000,
      })
    );
    if (session.tenantId) {
      return res.status(200).json({
        body: sessionCookie,
        ref: ref,
      });
    }

    try {
      if (await hasValidRedirectUrl(ref)) {
        res.status(200).json({
          body: sessionCookie,
          ref: ref,
        });
      }
    } catch (error) {
      res.status(200).json({
        body: sessionCookie,
        ref: decodeURIComponent(defaultRedirectUrl()),
      });
    }
  } catch (error) {
    console.log(error);
    res.redirect(302, '/');
  }
}
