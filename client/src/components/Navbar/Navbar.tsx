import React, { useEffect } from "react";
import { Box, Center, Flex, HStack, Stack, Heading } from "@chakra-ui/layout";
import { IconButton, Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useDisclosure } from "@chakra-ui/hooks";
import { FaBars, FaTimes } from "react-icons/fa";
import LogoContainer from "../LogoContainer";
import NavLink from "../NavLink";
import { useHistory } from "react-router-dom";
import { logout } from "../../api/foodie.api.ts";
import { foodieState } from "../../state/foodie/foodie.state";
import { useRecoilState } from "recoil";

interface LinkObject {
    name: string;
    href: string;
}

const Links: Array<LinkObject> = [
    { name: "Home", href: "/" },
    { name: "Find ", href: "/find-recipe" },
    { name: "Create ", href: "/create-recipe" },
    { name: "Profile", href: "/profile" },
];

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [foodie, setFoodie] = useRecoilState(foodieState);

    const history = useHistory();

    const logUserOut = () => {
        setFoodie({
            foodieId: "",
            foodieName: "",
            foodieEmail: "",
            foodieIsAdmin: false,
        });
        logout();
    };

    const NavButton = () => {
        if (foodie.foodieId === "") {
            return (
                <Button
                    onClick={() => {
                        history.push("/login");
                    }}
                >
                    Log In
                </Button>
            );
        } else {
            return <Button onClick={logUserOut}>Log Out</Button>;
        }
    };

    const CrossIcon = (
        <Center h="100%" w="100%">
            <FaTimes />
        </Center>
    );

    const BarIcon = (
        <Center h="100%" w="100%">
            <FaBars />
        </Center>
    );

    return (
        <Box bg={useColorModeValue("orange.50", "orange.50")} px={4}>
            <Flex h={24} alignItems={"center"} justifyContent={"space-between"}>
                <Box display={{ base: "flex", lg: "none" }} w={16} />
                <LogoContainer />
                <HStack
                    as={"nav"}
                    spacing={2}
                    display={{ base: "none", lg: "flex" }}
                >
                    {Links.map((link) => (
                        <NavLink
                            key={link.href}
                            href={link.href}
                            hoverTextColor={"primary.800"}
                            hoverBgColor={"primary.200"}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    <NavButton />
                    <IconButton
                        w={4}
                        size="md"
                        fontSize="lg"
                        variant="ghost"
                        _hover={{
                            color: "primary.800",
                            bgColor: "primary.200",
                        }}
                        icon={isOpen ? CrossIcon : BarIcon}
                        aria-label={"Open Navigation Menu"}
                        display={{ lg: "none" }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <Box />
                </HStack>{" "}
                <IconButton
                    w={16}
                    h={16}
                    p={2}
                    size="md"
                    fontSize="2xl"
                    variant="ghost"
                    _hover={{
                        color: "primary.800",
                        bgColor: "primary.200",
                    }}
                    icon={isOpen ? CrossIcon : BarIcon}
                    aria-label={"Open Navigation Menu"}
                    display={{ lg: "none" }}
                    onClick={isOpen ? onClose : onOpen}
                />
            </Flex>
            {isOpen ? (
                <Box pb={4} display={{ lg: "none" }}>
                    <Stack as={"nav"} spacing={4}>
                        {Links.map((link) => (
                            <NavLink
                                key={link.href}
                                href={link.href}
                                hoverTextColor={"primary.800"}
                                hoverBgColor={"primary.200"}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <NavButton />
                    </Stack>
                </Box>
            ) : null}
        </Box>
    );
};

export default Navbar;
