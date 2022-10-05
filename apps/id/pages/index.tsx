import type { NextPageContext } from "next";
export async function getServerSideProps(context: NextPageContext) {
  const { req, res } = context;
  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
  };
}

export default function Page(props: any) {
  return (
    <>
    </>
  );
}
