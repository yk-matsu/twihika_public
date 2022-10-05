import type {NextApiRequest, NextApiResponse} from 'next';
import admin from 'firebase-admin';
import Cors from 'cors';
// const {prisma} = require('@twihika/prisma');
import {prisma} from '@twihika/prisma';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
  origin: ['*'],
  allowedHeaders: ['*'],
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
const extractToken = (bearerToken: string) => {
  const regex = /^(Bearer) (.*)$/g;
  const match = regex.exec(bearerToken);
  if (match && match[2]) {
    return match[2];
  }
  return null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  const authHeader = req!.headers.authorization;
  if (!authHeader) {
    res.json({'x-hasura-role': 'anonymous'});
    return;
  }
  const token = extractToken(req!.headers.authorization!);
  if (!token) {
    res.json({'x-hasura-role': 'anonymous'});
  }
  try {
    const decoded = await auth.verifySessionCookie(token!);
    const userRoles = await prisma.firebaseUser.findFirst({
      select: {
        firebaseUserRoles: {
          select: {
            userRole: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    const roles = userRoles?.firebaseUserRoles.map(role => {
      return role.userRole?.name;
    });
    console.log(roles);
    if (roles?.length == 0) {
      return res.json({'x-hasura-role': 'anonymous'});
    }
    res.json({
      'X-Hasura-Role': roles![0],
      'X-Hasura-User-Id': decoded.uid,
    });
    return;
  } catch (error) {
    console.log(error);
    res.json({'x-hasura-role': 'anonymous'});
    return;
  }
}
