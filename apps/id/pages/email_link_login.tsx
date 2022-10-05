import { csrf } from "@twihika/share";
import { Layout } from "../components/layout";
import { Register } from "../components/email_link_register";
import type { NextPageContext } from "next";
export async function getServerSideProps(context: NextPageContext) {
  const { req, res } = context;
  await csrf(req!, res!);
  return {
    // @ts-ignore
    props: { csrfToken: req.csrfToken() },
  };
}

export default function Page(props: any) {
  return <><Register/></>;
}

Page.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
