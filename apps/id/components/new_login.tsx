import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import { Logo } from "./LogoImage";
import { OAuthButtonGroup } from "./OAuthButtonGroup";
import { PasswordField } from "./PasswordField";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { initializeApp } from "firebase/app";
import {
  redirectUntil,
  registerSessionToken,
} from "./lib/register_session_token";
import { Session } from "../universal_lib/session";
import { isLocal } from "@twihika/env";

export const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();

  function onSubmit(values: any) {
    return new Promise((resolve) => {
      const app = initializeApp({
        ...JSON.parse(process.env.TWI_HIKA_FIREBASE_CLIENT_JSON!),
      });
      const auth = getAuth(app);
      if (isLocal()) {
        auth.tenantId = 'local-twi-hika-u3z9k';
      }
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then(async (result): Promise<Session> => {
          const idToken = await result.user?.getIdToken();
          const [providerData] = result.user.providerData.filter(
            (item) => item.providerId == "password"
          );
          //@ts-ignore
          return {
            idToken,
            providerAccountId: providerData?.uid,
            providerId: providerData?.providerId,
            uid: result.user.uid,
            email: result.user.email!,
          };
        })
      .then((session) =>registerSessionToken(session, new URLSearchParams(window.location.search).get("ref") || "/settings"))
        .then((res) => {
          toast({
            title: "ログインに成功しました。3秒後にリダイレクトします。",
            status: "success",
            isClosable: true,
          });
        redirectUntil(3000, res.ref);
        })
        .catch((error) => {
          console.log(error);
          if (error.code == "auth/email-already-in-use") {
            toast({
              title:
                "このメールアドレスは既に使用されています。ログインしてください。",
              status: "error",
              isClosable: true,
            });
          }
        });
    });
  }
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
              あなたのアカウントにログイン
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">まだアカウントをお持ちではないですか？</Text>
              <Link href="signup" variant="link" colorScheme="blue">
                新規登録
              </Link>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
          boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="5">
                <FormControl id="email" isInvalid={!!errors.email}>
                  <FormLabel htmlFor="email">メール</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "必須項目です",
                    })}
                  />
                </FormControl>
                <PasswordField                   {...register("password", {
                    required: "必須項目です",
                  })} />
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultChecked>Remember me</Checkbox>
                <Link href={"/password_reset"} variant="link" colorScheme="blue" size="sm">
                  パスワードをお忘れですか？
                </Link>
              </HStack>
              <Stack spacing="6" mt={12}>
                <Button variant="primary" backgroundColor={"gray.200"} type="submit">
                  ログイン
                </Button>
              </Stack>
            </form>
            <HStack>
              <Divider />
              <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                または、 こちらのアカウントでログイン
              </Text>
              <Divider />
            </HStack>
            <OAuthButtonGroup />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
