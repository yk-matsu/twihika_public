import admin from "firebase-admin";
import type { NextPageContext } from "next";
import cookie from "cookie";
const app =
  admin.apps.length > 0
    ? admin.app()
    : admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.TWI_HIKA_FIREBASE_ADMIN_JSON!)),
      });
export const auth = app.auth();

export const decodeFromSessinoCokie = async (req: NextPageContext["req"]) => {
  const rawCookie = req?.headers.cookie;
  if (rawCookie) {
    const cookies = cookie.parse(rawCookie);
    if (cookies["__session"]) {
      const decoded = await auth.verifySessionCookie(cookies["__session"]);
      return {
        decoded,
      };
    }
  }
  return {
    decoded: null,
  };
};
