import React, { useEffect, useState } from "react";
import {
    Button,
    Flex,
    Select,
    Tag,
    CircularProgress,
    SimpleGrid,
    Text,
    Icon,
} from "@chakra-ui/react";
import { Heading, Stack, Box } from "@chakra-ui/layout";

import { Radio, RadioGroup } from "@chakra-ui/react";

import Credit from "../../components/Credit";
import SectionDivider from "../../components/SectionDivider";
import Navbar from "../../components/Navbar";
import SubsectionDivider from "../../components/SubsectionDivider";
import axios from "axios";
import MatchingRecipe from "../../components/MatchingRecipe";
import { FaSortAmountUp } from "react-icons/fa";

const FindRecipePage = (props: any) => {
    const [ingredients, setIngredients]: any = useState([]);
    const [ingredientOptions, setIngredientOptions]: any = useState([]);
    const [currentIngredient, setCurrentIngredient]: any = useState(null);
    const [selectedIngredients, setSelectedIngredients]: any = useState([]);
    const [ingredientFluidity, setIngredientFluidity] = useState("1");

    const [recipes, setRecipes]: any = useState([]);
    const [loading, setLoading]: any = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:1337/ingredients`).then((response) => {
            console.log(response.data);
            setIngredients(response.data);
        });
    }, []);

    const updateRecipes = () => {
        setLoading(true);
        axios
            .get(
                `https://www.themealdb.com/api/json/v1/1/filter.php?i=${
                    selectedIngredients[selectedIngredients.length - 1]
                }`
            )
            .then((response) => {
                setRecipes(response.data.meals);
            });
        setLoading(false);
    };

    const addIngredient = () => {
        let ingredientList = selectedIngredients;
        if (
            !ingredientList.includes(currentIngredient) &&
            (currentIngredient !== null || currentIngredient !== "")
        ) {
            ingredientList.push(currentIngredient);
        }
        console.log(ingredientList);
        setSelectedIngredients(ingredientList);
    };

    const handleSelectionChange: any = (ingredient: string) => {
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
                    <Box
                        p={8}
                        py={{ base: 4, xl: 8 }}
                        borderWidth={2}
                        borderStyle={"dashed"}
                        borderColor={"orange.600"}
                        borderRadius={8}
                    >
                        <Heading
                            fontSize={{ base: 18, lg: 36 }}
                            textAlign={{ base: "center", lg: "left" }}
                            fontWeight="black"
                            textTransform="uppercase"
                        >
                            Add Ingredients
                        </Heading>
                        <SubsectionDivider />
                        <Select
                            size="lg"
                            colorScheme="orange"
                            borderColor="orange.800"
                            focusBorderColor="orange.500"
                            onChange={(event) =>
                                handleSelectionChange(event.target.value)
                            }
                        >
                            {ingredients.map((ingredient: any) => {
                                return (
                                    <option value={ingredient.name}>
                                        {ingredient.name}
                                    </option>
                                );
                            })}
                        </Select>

                        <Button
                            my={4}
                            textAlign="center"
                            textTransform="uppercase"
                            fontWeight="bold"
                            backgroundColor="orange.400"
                            _hover={{
                                bg: "orange.500",
                            }}
                            onClick={addIngredient}
                        >
                            Add Ingredient
                        </Button>
                    </Box>
                    <Box py={{ base: 4, xl: 8 }}>
                        <Heading
                            fontSize={{ base: 18, lg: 36 }}
                            textAlign={{ base: "center", lg: "left" }}
                            fontWeight="black"
                            textTransform="uppercase"
                        >
                            Ingredient List
                        </Heading>
                        <SubsectionDivider />
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
                    </Box>
                    <Box
                        p={8}
                        py={{ base: 4, xl: 8 }}
                        borderWidth={2}
                        borderStyle={"dashed"}
                        borderColor={"orange.600"}
                        borderRadius={8}
                    >
                        <Heading
                            fontSize={{ base: 18, lg: 36 }}
                            textAlign={{ base: "center", lg: "left" }}
                            fontWeight="black"
                            textTransform="uppercase"
                        >
                            Search Recipe
                        </Heading>
                        <SectionDivider />

                        <RadioGroup
                            onChange={setIngredientFluidity}
                            value={ingredientFluidity}
                            colorScheme={"orange"}
                        >
                            <Heading
                                fontSize={{ base: 14, lg: 28 }}
                                textAlign={"left"}
                                fontWeight="black"
                                py={4}
                            >
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

                        <Heading
                            fontSize={{ base: 14, lg: 28 }}
                            textAlign={"left"}
                            fontWeight="black"
                            py={4}
                        >
                            2. Sort by -
                        </Heading>
                        <Select
                            size="lg"
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
                            textAlign="center"
                            textTransform="uppercase"
                            fontWeight="bold"
                            backgroundColor="orange.400"
                            _hover={{
                                bg: "orange.500",
                            }}
                            onClick={updateRecipes}
                        >
                            Find Recipe
                        </Button>
                    </Box>
                    <Box py={{ base: 4, xl: 8 }}>
                        <Heading
                            fontSize={{ base: 18, lg: 36 }}
                            textAlign={{ base: "center", lg: "left" }}
                            fontWeight="black"
                            textTransform="uppercase"
                        >
                            Matching Recipe
                        </Heading>
                        <SubsectionDivider />
                        {loading === true ? (
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
                        )}
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

export default FindRecipePage;
