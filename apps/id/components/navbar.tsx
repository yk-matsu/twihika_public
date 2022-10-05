import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DragHandleIcon,
} from "@chakra-ui/icons";
import { AiOutlineUser } from "react-icons/ai";
import { DecodedIdToken } from "@twihika/auth";

// https://chakra-templates.dev/navigation/navbar
export const WithSubnavigation = (props: {
  alredeLoggedIn: Boolean;
  decoded: DecodedIdToken;
}) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={"blue.900"}
        color={"white"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        textColor={"white"}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Image
            src="/penguine_id_logo.png"
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
          ></Image>
        </Flex>
        <Flex display={{ base: "none", md: "flex" }}>
          <DesktopNav />
        </Flex>

        {props.alredeLoggedIn && (
          <Flex mr={10} h={"full"}>
            <Box>
              <Popover trigger={"hover"} placement={"bottom"}>
                <PopoverTrigger>
                  <Link
                    href={"#"}
                    fontSize={"sm"}
                    fontWeight={500}
                    _hover={{
                      textDecoration: "none",
                    }}
                  >
                    <AiOutlineUser size={30} />
                  </Link>
                </PopoverTrigger>
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={"white"}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}
                  color={"black"}
                  opacity={1.0}
                >
                  <Stack>
                    <Box>userId：{props.decoded.uid}</Box>
                    <Box>Email：{props.decoded.email}</Box>
                    <Box>
                      Email確認状態：
                      {props.decoded.email_verified ? "確認済み" : "未確認"}
                    </Box>
                    <Box>
                      ログインwith：{props.decoded.firebase.sign_in_provider}
                    </Box>
                  </Stack>
                </PopoverContent>
              </Popover>
            </Box>
          </Flex>
        )}
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {props.alredeLoggedIn ? (
            <Button
              as={"a"}
              display={{ base: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"gray.400"}
              href={"/logout"}
              _hover={{
                opacity: 0.8,
              }}
            >
              ログアウト
            </Button>
          ) : (
            <Button
              as={"a"}
              display={{ base: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"gray.400"}
              href={"/login"}
              _hover={{
                opacity: 0.8,
              }}
            >
              ログイン
            </Button>
          )}
          {!props.alredeLoggedIn && (
            <Button
              as={"a"}
              display={{ base: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"gray.400"}
              href={"/signup"}
              _hover={{
                opacity: 0.8,
              }}
            >
              新規登録
            </Button>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = "white";
  const linkHoverColor = "gray.800";
  const popoverContentBgColor = "white";

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom"}>
            <PopoverTrigger>
              <Link
                p={2}
                px={8}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  opacity: 0.7,
                }}
              >
                <DragHandleIcon />
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      color={"gray.900"}
      _hover={{ opacity: 0.8 }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box
          _groupHover={{ opacity: 0.8 }}
          transition={"all .3s ease"}
          fontWeight={500}
        >
          <Text>{label}</Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"white"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Find Work",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
  },
];
