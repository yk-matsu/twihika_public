import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
} from "@chakra-ui/react";
import { csrf } from "@twihika/share";
import type { NextPageContext } from "next";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, SAMLAuthProvider, signInWithPopup } from "firebase/auth";

export async function getServerSideProps(context: NextPageContext) {
  const { req, res } = context;
  await csrf(req!, res!);
  return {
    // @ts-ignore
    props: { csrfToken: req.csrfToken() },
  };
}
type Session = {
  idToken: string;
  providerAccountId: string;
  providerId: string;
  uid: string;
  email: string;
};

const registerSessionToken: (session: Session) => Promise<Session> = async (
  session
) => {
  await fetch(`/api/session`, {
    method: "POST",
    body: JSON.stringify(session),
    headers: { "content-type": "application/json" },
  });
  return session;
};

//@ts-ignore
const signInWithGoogle: () => Promise<{ uid: string }> = async () => {
  const app = initializeApp({
    apiKey: "AIzaSyCOZWkCohynIKxz8uXrI8CGT6ajIAzD-gk",
    authDomain: "noskill-front.firebaseapp.com",
    projectId: "noskill-front",
  });
  const auth = getAuth(app);

  const authProvider = new SAMLAuthProvider("saml.keycloak");
  const result = await signInWithPopup(auth, authProvider)
    .then(async (result): Promise<Session> => {
      const idToken = await result.user?.getIdToken();
      console.log(idToken)
      const [providerData] = result.user.providerData.filter(
        (item) => item.providerId == "saml.keycloak"
      );
      console.log(providerData);
      //@ts-ignore
      return {
        idToken,
        providerAccountId: providerData?.uid,
        providerId: providerData?.providerId,
        uid: result.user.uid,
        email: result.user.email!,
      };
    })
    .then(registerSessionToken)
    .catch((err) => {
      console.log(err);
    });
};

export default function SplitScreen(props: any) {
  const handleSubmit = () => {
    fetch("/api/csrf", {
      method: "POST",
      headers: {
        "CSRF-Token": props.csrfToken,
      },
    });
  };
  useEffect(() => {
    signInWithGoogle();
  }, []);

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <Heading fontSize={"2xl"}>{props.csrfToken}</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Link color={"blue.500"}>Forgot password?</Link>
            </Stack>
            <Button
              onClick={handleSubmit}
              colorScheme={"blue"}
              variant={"solid"}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
