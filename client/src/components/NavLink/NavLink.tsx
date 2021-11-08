import { useColorModeValue } from "@chakra-ui/color-mode";
import { Heading, Link } from "@chakra-ui/layout";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

const NavLink = (props: any) => {
    return (
        <Link
            as={RouterLink}
            px={3}
            py={2}
            rounded={"md"}
            fontWeight="bold"
            color="orange.800"
            _hover={{
                textDecoration: "none",
                color: useColorModeValue(
                    props.hoverTextColor,
                    props.hoverBgColor
                ),
                bg: useColorModeValue(props.hoverBgColor, props.hoverTextColor),
            }}
            to={props.href}
        >
            <Heading fontSize="2xl"> {props.children}</Heading>
        </Link>
    );
};

export default NavLink;
