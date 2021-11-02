import React, { useEffect } from "react";
import { Heading, Stack, Box, Link, SimpleGrid } from "@chakra-ui/layout";
import { Center, Flex, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import Credit from "../../components/Credit";
import SectionDivider from "../../components/SectionDivider";
import axios from "axios";

interface Props {}

const HomePage: React.FC<Props> = (props: Props) => {
    useEffect(() => {
        axios.get(`http://localhost:1337/recipes`).then((response) => {
            console.log(response.data);
        });
    }, []);

    return (
        <Box justifyItems="center">
            <Flex width="100%" justifyContent="center">
                <Stack
                    px={{ base: 8, xl: 16 }}
                    justifyContent="space-between"
                    width={{ base: "100%", xl: "1200px" }}
                >
                    <Center>
                        <Box py={{ base: 12, xl: 24 }}>
                            <Center>
                                <Image
                                    py={{ base: 8, lg: 16 }}
                                    objectFit="cover"
                                    src="/images/fridgefoodies-logo.png"
                                    alt="Logo"
                                    w={{ base: "256px", lg: "512px" }}
                                />{" "}
                            </Center>
                            <Heading
                                textAlign="center"
                                fontSize={{ base: 36, lg: 84 }}
                            >
                                Prepare meals with ingredients
                            </Heading>
                            <Heading
                                textAlign="center"
                                fontSize={{ base: 36, lg: 84 }}
                            >
                                available in your fridge
                            </Heading>
                        </Box>
                    </Center>
                    <Center>
                        <SimpleGrid
                            columns={2}
                            gap={6}
                            width={{ base: "300px", lg: "400px", xl: "500px" }}
                        >
                            <Link
                                as={RouterLink}
                                textAlign="center"
                                textTransform="uppercase"
                                fontWeight="bold"
                                backgroundColor="orange.400"
                                _hover={{
                                    bg: "orange.500",
                                }}
                                to="/find-recipe"
                            >
                                Find Recipe
                            </Link>

                            <Link
                                as={RouterLink}
                                textAlign="center"
                                textTransform="uppercase"
                                fontWeight="bold"
                                backgroundColor="orange.400"
                                _hover={{
                                    bg: "orange.500",
                                }}
                                to="/create-recipe"
                            >
                                Create Recipe
                            </Link>
                        </SimpleGrid>
                    </Center>
                    <Box pt={{ base: 64, lg: 96 }}>
                        <SectionDivider />
                        <Credit />
                    </Box>
                </Stack>
            </Flex>
        </Box>
    );
};

export default HomePage;
