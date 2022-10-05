import { csrf } from "@twihika/share";
import { Layout } from "../components/layout";
import { Login } from "../components/login";
import type { NextPageContext } from "next";
import { useEffect, useState } from "react";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

export async function getServerSideProps(context: NextPageContext) {
  const { req, res } = context;
  await csrf(req!, res!);
  return {
    // @ts-ignore
    props: { csrfToken: req.csrfToken() },
  };
}

export default function Page(props: any) {
  const [isProcessEmaillink, setIsProcessEmaillink] = useState(true);
  useEffect(() => {
    const app = initializeApp({
        ...JSON.parse(process.env.TWI_HIKA_FIREBASE_CLIENT_JSON!),
    });
    const auth = getAuth(app);
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem("emailForSignIn")!;
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation")!;
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
          setIsProcessEmaillink(false);
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  }, []);
  const message = isProcessEmaillink ? (
    <p>Login処理の手続き中です。{`${isProcessEmaillink}`}</p>
  ) : (
    <p>ログイン処理が完了しました。</p>
  );
  return message;
}

Page.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
