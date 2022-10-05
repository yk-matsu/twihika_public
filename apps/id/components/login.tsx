import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { initializeApp } from "firebase/app";
import { redirectUntil, registerSessionToken } from "./lib/register_session_token";
import { Session } from "../universal_lib/session";
import { LoginWithGoogle } from "./login_with_google";


export function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();


  function onSubmit(values: any) {
    return new Promise((resolve) => {
      const app = initializeApp({
        ...JSON.parse(process.env.TWI_HIKA_FIREBASE_CLIENT_JSON!)
      });
      const auth = getAuth(app);
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
        .then((result) => {
          toast({
            title: "ログインに成功しました。3秒後にリダイレクトします。",
            status: "success",
            isClosable: true,
          });
          redirectUntil(3000, result.ref);
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
    <Flex justify={"center"}>
      <Stack minH={"60vh"} py={100}>
        <Flex
          direction={{ base: "column", sm: "row" }}
          pl={{ base: 2, md: 8 }}
          flex={1}
          align={"center"}
          justify={"center"}
          borderColor="gray.300"
          border="2px"
          rounded={"md"}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              spacing={4}
              w={"full"}
              maxW={"md"}
              px={{ base: 2, md: 8 }}
              py={12}
            >
              <Heading textAlign={"center"} fontSize={"xl"}>
                ログイン
              </Heading>
              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">メールアドレス</FormLabel>
                <Input
                  type="email"
                  {...register("email", {
                    required: "必須項目です",
                  })}
                />

                <FormErrorMessage>
                  {/* @ts-ignore */}
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="password">
                <FormLabel htmlFor="password">パスワード</FormLabel>
                <Input
                  type="password"
                  {...register("password", {
                    required: "必須項目です",
                  })}
                />
                <FormErrorMessage>
                  {/* @ts-ignore */}
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={6}>
                {/* <Stack
                  direction={{ base: "column" }}
                  align={"start"}
                  justify={"space-between"}
                  w={"full"}
                >
                  <Checkbox w={"full"}>ログイン情報を保存</Checkbox>
                </Stack> */}
                <Stack mt={"2"}></Stack>
                <Button  disabled={isSubmitting} colorScheme={"blue"} variant={"solid"} type="submit">
                  ログイン
                </Button>
                <Link
                  color={"blue.500"}
                  textAlign={"right"}
                  w={"full"}
                  fontSize={12}
                  href="/password_reset"
                >
                  ログイン情報をお忘れの場合はこちら
                </Link>

                <Link
                  color={"blue.500"}
                  textAlign={"right"}
                  w={"full"}
                  fontSize={12}
                  m={0}
                  whiteSpace={"nowrap"}
                  href="/signup"
                >
                  新規登録はこちら・メールアドレスのみで
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    30秒登録！
                  </span>
                </Link>
              </Stack>
            </Stack>
          </form>
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            h="full"
            px={{ base: 2, md: 8 }}
            py={12}
            borderLeft={{ base: "0px", md: "2px" }}
            borderTop={{ base: "2px", md: "0px" }}
            borderColor={"gray.400"}
          >
            <Flex direction={"column"} h="full" justifyContent={"center"}>
              <LoginWithGoogle/>
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Flex>
  );
}
