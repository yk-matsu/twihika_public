// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import admin from "firebase-admin";
// const app = admin.initializeApp({
//   //@ts-ignore
//   credential: admin.credential.cert(secret),
// });
// const auth = app.auth();

export async function middleware(request: NextRequest) {
  // TODO: emplement すべてのpostリクエストにcsrfの検証を行う
  // Setting cookies on the response
  request.cookies.get("__session");
  const parsed = new URL(request.url);
  const token = request.cookies.get("__session")
  // if (token) {
  //   // await auth.verifySessionCookie(token);
  //   const response = NextResponse.redirect("https://event-catalog.twi-hika.com")
  //   return response
  // }
  console.log(parsed.pathname);
  const response = NextResponse.next();
  response.cookies.set("vercel", "fast");
  response.cookies.set("vercel", "fast", { path: "/test" });

  // Getting cookies from the request
  const cookie = request.cookies.get("vercel");
  console.log(cookie); // => 'fast'
  const allCookies = request.cookies.entries();
  console.log(allCookies); // => [{ key: 'vercel', value: 'fast' }]
  const { value, options } = response.cookies.getWithOptions("vercel");
  console.log(value); // => 'fast'
  console.log(options); // => { Path: '/test' }

  // Deleting cookies
  response.cookies.delete("vercel");
  response.cookies.clear();

  return response;
}
export const config = {
  matcher: ["/register"],
};
