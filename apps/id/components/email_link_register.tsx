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
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import {
  getAuth,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { initializeApp } from "firebase/app";
import { useState } from "react";

const LoginWithGoogle = () => {
  return (
    <Flex justify={"center"}>
      <img
        width="250"
        height="120"
        alt="Googleでログイン"
        src="/sign_in_with_google.png"
      ></img>
    </Flex>
  );
};

export function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false);
  const toast = useToast();

  function onSubmit(values: any) {
    return new Promise((resolve) => {
      const app = initializeApp({
        ...JSON.parse(process.env.TWI_HIKA_FIREBASE_CLIENT_JSON!)
      });
      const auth = getAuth(app);
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'http://localhost:3000/email_link_finish_sign_up?cartId=1234',
        // This must be true.
        handleCodeInApp: true,
      };
      sendSignInLinkToEmail(auth, values.email, actionCodeSettings)
        .then(() => {
          console.log(values)
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          window.localStorage.setItem("emailForSignIn", values.email);
          // ...
        })
        .catch((error) => {
          console.log(error)
          const errorCode = error.code;
          const errorMessage = error.message;
          // ...
        });
      // createUserWithEmailAndPassword(auth, values.email, values.password)
      //   .then((userCredential) => {
      //     const user = userCredential;
      //     alert(JSON.stringify(user));
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     if (error.code == "auth/email-already-in-use") {
      //       toast({
      //         title:
      //           "このメールアドレスは既に使用されています。ログインしてください。",
      //         status: "error",
      //         isClosable: true,
      //       });
      //     }
      //   });
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
                <Button colorScheme={"blue"} variant={"solid"} type="submit">
                  ログイン
                </Button>

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
              <LoginWithGoogle />
              <LoginWithGoogle />
              <LoginWithGoogle />
              <LoginWithGoogle />
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Flex>
  );
}
