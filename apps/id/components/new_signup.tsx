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
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { initializeApp } from "firebase/app";
import { isLocal } from "@twihika/env";

export function SignUp({ alreadyLoggedIn = false }) {
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
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: "http://localhost:3000/email_link_finish_sign_up?cartId=1234",
        // This must be true.
        handleCodeInApp: true,
      };
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(async (userCredential) => {
          const user = userCredential;
          await sendEmailVerification(user.user);
          toast({
            title: "メールアドレスに確認メールを送信しました。",
            status: "success",
            isClosable: true,
          });
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
          return;
        })
        .catch((error) => {
          console.log(error);
          if (error.code == "auth/email-already-in-use") {
            toast({
              title:
                "このメールアドレスは既に使用されています。ログインしてください。リダイレクトします。",
              status: "error",
              isClosable: true,
            });
            setTimeout(() => {
              window.location.href = "/login";
            }, 3000);
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
              <Text color="muted">既にアカウントをお持ちですか？</Text>
              <Link href={"/login"} variant="link" colorScheme="blue">
                ログイン
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
                <PasswordField
                  {...register("password", {
                    required: "必須項目です",
                  })}
                />
              </Stack>
              <Stack spacing="6" mt={12}>
                <Button
                  variant="primary"
                  backgroundColor={"gray.200"}
                  type="submit"
                >
                  アカウント新規作成
                </Button>
              </Stack>
            </form>
            <HStack>
              <Divider />
              <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                または、 こちらのアカウントで登録
              </Text>
              <Divider />
            </HStack>
            <OAuthButtonGroup />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
