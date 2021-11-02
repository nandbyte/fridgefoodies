import React from "react";
import { Box, Heading, Center, Link } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface Props {}

const TitleBanner: React.FC<Props> = (props: Props) => {
    return (
        <Box>
            <Center>
                <Link
                    as={RouterLink}
                    to="/"
                    _hover={{
                        textDecoration: "none",
                    }}
                    color="black"
                >
                    <Center>
                        <Image
                            objectFit="cover"
                            src="/images/fridgefoodies-logo.png"
                            alt="Logo"
                            w={{ base: "256px", xl: "384px" }}
                        />{" "}
                    </Center>
                </Link>
            </Center>
        </Box>
    );
};

export default TitleBanner;
