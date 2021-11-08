import React from "react";
import { Heading, Stack, Box, Link, SimpleGrid } from "@chakra-ui/layout";
import { Button, Center, Flex, Image } from "@chakra-ui/react";
import { Link as RouterLink, useHistory } from "react-router-dom";

import Credit from "../../components/Credit";
import SectionDivider from "../../components/SectionDivider";
import PageContainer from "../../components/PageContainer";

interface Props {}

const HomePage: React.FC<Props> = (props: Props) => {
    const history = useHistory();

    return (
        <PageContainer>
            <Stack px={0} mx={0} justifyContent="space-between" spacing={12}>
                <Center>
                    <Box py={{ base: 6, xl: 12 }}>
                        <Center>
                            <Image
                                py={{ base: 8, lg: 8 }}
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
                <Center w="100%">
                    <Button mx={2} onClick={() => history.push("/find-recipe")}>
                        Find Recipe
                    </Button>
                    <Button
                        mx={2}
                        onClick={() => history.push("/create-recipe")}
                    >
                        Create Recipe
                    </Button>
                </Center>
            </Stack>
        </PageContainer>
    );
};

export default HomePage;
