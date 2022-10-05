import { Box, chakra, HTMLChakraProps } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

export const Logo = (props: HTMLChakraProps<"svg">) => (
  <Box>
    <Image  mx={"auto"}src={"/penguine.png"} w={"100px"} h={"100px"}></Image>
  </Box>
);
