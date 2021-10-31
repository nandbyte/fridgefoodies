import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button,
    Flex,
    Select,
    Tag,
    CircularProgress,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";
import { Heading, Stack, Box } from "@chakra-ui/layout";

import { Radio, RadioGroup } from "@chakra-ui/react";

import Credit from "../../components/Credit";
import SectionDivider from "../../components/SectionDivider";
import Navbar from "../../components/Navbar";
import SubsectionDivider from "../../components/SubsectionDivider";

import MatchingRecipe from "../../components/MatchingRecipe";

import {
    selectSelectedIngredients,
    setSelectedIngredients,
} from "../../state/slices/recipe.find.slice";
import { useDispatch, useSelector } from "react-redux";
import { getAllIngredients } from "../../api";
import PageSection from "../../components/PageSection";
import AutoComplete from "../../components/AutoComplete";
import Loading from "../../components/Loading";

const FindRecipePage = (props: any) => {
    const dispatch = useDispatch();

    const selectedIngredients = useSelector(selectSelectedIngredients);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [currentIngredient, setCurrentIngredient] = useState<string>();

    useEffect(() => {
        (async function () {
            try {
                const response = await getAllIngredients();
                console.log(response);
                let ingredientList: string[] = [];

                response.data.meals.forEach((ingredient: any) => {
                    ingredientList.push(ingredient.strIngredient);
                });

                setIngredients(ingredientList);
                console.log(ingredients);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []); // eslint-disable-line

    const handleSelectionChange: any = (ingredient: any) => {
        setCurrentIngredient(ingredient);
    };

    return (
        <Box justifyItems="center">
            <Navbar />
            <Flex width="100%" justifyContent="center">
                <Stack
                    px={{ base: 8, xl: 16 }}
                    justifyContent="space-between"
                    width={{ base: "100%", xl: "1200px" }}
                >
                    <PageSection>
                        <Heading variant="section">Add Ingredients</Heading>
                        <SectionDivider />
                        <AutoComplete />

                        <Heading variant={"section"}>Your Ingredients</Heading>
                        <SectionDivider />
                        <Box>
                            {selectedIngredients.map((ingredient: any) => {
                                return (
                                    <Tag
                                        key={ingredient}
                                        fontSize="lg"
                                        colorScheme="orange"
                                        variant="outline"
                                        px={3}
                                        py={2}
                                        m={1}
                                    >
                                        {ingredient}
                                    </Tag>
                                );
                            })}
                        </Box>
                    </PageSection>

                    <PageSection>
                        <Heading variant={"section"}>Search Recipe</Heading>
                        <SectionDivider />

                        <RadioGroup
                            // onChange={setIngredientFluidity}
                            // value={ingredientFluidity}
                            colorScheme={"orange"}
                        >
                            <Heading variant="subsection">
                                1. Filter By -
                            </Heading>
                            <Stack direction="column">
                                <Radio value="1" size={"lg"}>
                                    <Text fontSize={"lg"}>
                                        Your ingredients and additional
                                        ingredients.
                                    </Text>
                                </Radio>
                                <Radio value="2" size={"lg"}>
                                    <Text fontSize={"lg"}>
                                        Only your ingredients.
                                    </Text>
                                </Radio>
                            </Stack>
                        </RadioGroup>

                        <Heading variant="subsection">2. Sort by -</Heading>
                        <Select
                            colorScheme="orange"
                            borderColor="orange.800"
                            focusBorderColor="orange.500"
                            onChange={(event) =>
                                handleSelectionChange(event.target.value)
                            }
                        >
                            <option value="Rating Des">
                                Rating (Descending) ↓
                            </option>
                            <option value="Rating Asc">
                                Rating (Ascending) ↑
                            </option>
                            <option value="Alphabet Des">
                                Alphabet (Descending) ↓
                            </option>
                            <option value="Alphabet Asc">
                                Alphabet (Ascending) ↑
                            </option>
                            <option value="Calores Des">
                                Calories (Descending) ↓
                            </option>
                            <option value="Calores Asc">
                                Calories (Ascending) ↑
                            </option>
                        </Select>

                        <Button

                        // onClick={updateRecipes}
                        >
                            Find Recipe
                        </Button>
                    </PageSection>
                    <PageSection>
                        <Heading
                            fontSize={{ base: 18, lg: 36 }}
                            textAlign={{ base: "center", lg: "left" }}
                            fontWeight="black"
                            textTransform="uppercase"
                        >
                            Matching Recipe
                        </Heading>
                        <SectionDivider />
                        <Loading />
                    </PageSection>
                    {/* {loading === true ? (
                            <CircularProgress />
                        ) : (
                            <Box>
                                <SimpleGrid
                                    columns={{ base: 1, md: 2, xl: 3 }}
                                    gap={4}
                                >
                                    {recipes.map((recipe: any) => {
                                        return (
                                            <MatchingRecipe
                                                key={recipe.idMeal}
                                                id={recipe.idMeal}
                                                image={recipe.strMealThumb}
                                                title={recipe.strMeal}
                                            />
                                        );
                                    })}
                                </SimpleGrid>
                            </Box>
                        )} */}

                    <Box pt={{ base: 64, lg: 96 }}>
                        <SectionDivider />
                        <Credit />
                    </Box>
                </Stack>
            </Flex>
        </Box>
    );
};

export default FindRecipePage;
