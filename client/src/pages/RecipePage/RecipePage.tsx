import React, { useEffect, useState } from "react";
import { AspectRatio, Center, Flex, Image, Text } from "@chakra-ui/react";
import { Heading, Stack, Box } from "@chakra-ui/layout";

import Credit from "../../components/Credit";
import SectionDivider from "../../components/SectionDivider";
import Navbar from "../../components/Navbar";
import SubsectionDivider from "../../components/SubsectionDivider";
import axios from "axios";
import { useParams } from "react-router-dom";

const RecipePage = (props: any) => {
    const [recipe, setRecipe]: any = useState({});

    let { id }: any = useParams();

    useEffect(() => {
        axios
            .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then((response) => {
                setRecipe(response.data.meals[0]);
                console.log(response.data.meals[0]);
            });
    }, []);

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
                        <Text fontSize={{ base: 12, lg: 18 }}>
                            {recipe.strIngredient1 !== ""
                                ? `${recipe.strIngredient1} (${recipe.strMeasure1})`
                                : null}
                        </Text>{" "}
                        <Text fontSize={{ base: 12, lg: 18 }}>
                            {recipe.strIngredient2 !== ""
                                ? `${recipe.strIngredient2} (${recipe.strMeasure2})`
                                : null}
                        </Text>{" "}
                        <Text fontSize={{ base: 12, lg: 18 }}>
                            {recipe.strIngredient3 !== ""
                                ? `${recipe.strIngredient3} (${recipe.strMeasure3})`
                                : null}
                        </Text>{" "}
                        <Text fontSize={{ base: 12, lg: 18 }}>
                            {recipe.strIngredient4 !== ""
                                ? `${recipe.strIngredient4} (${recipe.strMeasure4})`
                                : null}
                        </Text>{" "}
                        <Text fontSize={{ base: 12, lg: 18 }}>
                            {recipe.strIngredient5 !== ""
                                ? `${recipe.strIngredient5} (${recipe.strMeasure5})`
                                : null}
                        </Text>{" "}
                        <Text fontSize={{ base: 12, lg: 18 }}>
                            {recipe.strIngredient6 !== ""
                                ? `${recipe.strIngredient6} (${recipe.strMeasure6})`
                                : null}
                        </Text>{" "}
                        <Text fontSize={{ base: 12, lg: 18 }}>
                            {recipe.strIngredient7 !== ""
                                ? `${recipe.strIngredient7} (${recipe.strMeasure7})`
                                : null}
                        </Text>{" "}
                        <Text fontSize={{ base: 12, lg: 18 }}>
                            {recipe.strIngredient8 !== ""
                                ? `${recipe.strIngredient8} (${recipe.strMeasure8})`
                                : null}
                        </Text>{" "}
                        <Text fontSize={{ base: 12, lg: 18 }}>
                            {recipe.strIngredient9 !== ""
                                ? `${recipe.strIngredient9} (${recipe.strMeasure9})`
                                : null}
                        </Text>{" "}
                        <Text fontSize={{ base: 12, lg: 18 }}>
                            {recipe.strIngredient10 !== ""
                                ? `${recipe.strIngredient10} (${recipe.strMeasure10})`
                                : null}
                        </Text>
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

export default RecipePage;
