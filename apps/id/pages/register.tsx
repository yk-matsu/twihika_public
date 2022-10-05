import { csrf } from "@twihika/share";
import { Layout } from "../components/layout";
import { Register } from "../components/register";
import type { NextPageContext } from "next";
import { WithSubnavigation } from "../components/navbar";
import { decodeFromSessinoCokie } from "../serverside/firebase-admin";
import { DecodedIdToken } from "@twihika/auth";

export async function getServerSideProps(context: NextPageContext) {
  const { req, res } = context;
  await csrf(req!, res!);
  const { decoded } = await decodeFromSessinoCokie(req);
  if (decoded) {
    return {
      redirect: {
        permanent: false,
        destination: "/settings",
      },
    };
  }
  return {
    // @ts-ignore
    props: { csrfToken: req.csrfToken(), decoded, alreadyLoggedIn: !!decoded },
  };
}

export default function Page(props: { alreadyLoggedIn: boolean, decoded: DecodedIdToken }) {
  const { alreadyLoggedIn, decoded } = props;
  return (
    <>
      <WithSubnavigation alredeLoggedIn={alreadyLoggedIn} decoded={decoded} />
      <Register {...props} />
    </>
  );
}

Page.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
