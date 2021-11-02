import React, { useEffect, useState } from "react";
import {
    AspectRatio,
    Center,
    Flex,
    Image,
    Input,
    Text,
} from "@chakra-ui/react";
import { Heading, Stack, Box } from "@chakra-ui/layout";

import Credit from "../../components/Credit";
import SectionDivider from "../../components/SectionDivider";
import Navbar from "../../components/Navbar";
import SubsectionDivider from "../../components/SubsectionDivider";
import axios from "axios";
import { useParams } from "react-router-dom";

const CreateRecipePage = (props: any) => {
    const [recipe, setRecipe]: any = useState({});

    useEffect(() => {}, []);

    return (
        <Box justifyItems="center">
            <Navbar />
            <Flex width="100%" justifyContent="center">
                <Stack
                    px={{ base: 8, xl: 16 }}
                    justifyContent="space-between"
                    width={{ base: "100%", xl: "1200px" }}
                >
                    <Box py={{ base: 4, xl: 8 }}>
                        <Text
                            fontSize={{ base: 14, lg: 24 }}
                            textAlign={{ base: "center", lg: "left" }}
                            fontWeight="black"
                            textTransform="uppercase"
                        >
                            Recipe
                        </Text>
                        <SubsectionDivider />
                        <Input></Input>

                        <Heading
                            fontSize={{ base: 32, lg: 64 }}
                            textAlign={{ base: "center", lg: "left" }}
                            fontWeight="black"
                        >
                            {recipe.strMeal}
                        </Heading>
                    </Box>
                    <Box py={{ base: 4, xl: 8 }}>
                        <Center>
                            <Image
                                borderRadius="md"
                                w={{ base: "100%", lg: "50%" }}
                                src={recipe.strMealThumb}
                            />
                        </Center>
                    </Box>
                    <Box py={{ base: 4, xl: 8 }}>
                        <Heading
                            fontSize={{ base: 18, lg: 36 }}
                            textAlign={{ base: "center", lg: "left" }}
                            fontWeight="black"
                            textTransform="uppercase"
                        >
                            Ingredients
                        </Heading>
                        <SubsectionDivider />
                    </Box>
                    <Box py={{ base: 4, xl: 8 }}>
                        <Heading
                            fontSize={{ base: 18, lg: 36 }}
                            textAlign={{ base: "center", lg: "left" }}
                            fontWeight="black"
                            textTransform="uppercase"
                        >
                            Instructions
                        </Heading>
                        <SubsectionDivider />
                        <Text fontSize={{ base: 12, lg: 18 }}>
                            {recipe.strInstructions}
                        </Text>
                    </Box>

                    <Box pt={{ base: 64, lg: 96 }}>
                        <SectionDivider />
                        <Credit />
                    </Box>
                </Stack>
            </Flex>
        </Box>
    );
};

export default CreateRecipePage;
