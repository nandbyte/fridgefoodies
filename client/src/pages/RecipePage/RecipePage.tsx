import React, { useEffect, useState } from "react";
import { Center, Image, Text } from "@chakra-ui/react";
import { Heading, Stack } from "@chakra-ui/layout";

import { useParams } from "react-router-dom";
import { getRecipeById } from "../../api/recipe.api";
import PageSection from "../../components/PageSection";
import PageContainer from "../../components/PageContainer";
import SectionDivider from "../../components/SectionDivider";
import Loading from "../../components/Loading";
import { Recipe } from "../../state/types/recipe.type";
import RecipeIngredientTable from "../../components/RecipeIngredientTable";
import { getRecipeIngredients } from "../../api/recipe-ingredient.api";
import { RecipeIngredient } from "../../state/types/recipe-ingredient.type";
import { FaThumbsUp, FaVoteYea } from "react-icons/fa";

const RecipePage = (props: any) => {
    const [recipe, setRecipe]: any = useState<Recipe>(null);
    const [recipeIngredients, setRecipeIngredients] =
        useState<RecipeIngredient>([]);

    let { id }: any = useParams();

    useEffect(() => {
        getRecipeById(id)
            .then((response) => {
                setRecipe({
                    ...response.data.data.recipe[0],
                    recipeRating: response.data.data.totalRating,
                });
            })
            .catch((error) => console.log(error));

        getRecipeIngredients(id)
            .then((response) => {
                setRecipeIngredients(response.data.data.recipeIngredient);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <PageContainer variant="navbar">
            {recipe === null ? (
                <Loading />
            ) : (
                <>
                    <Text
                        fontSize={{ base: 16, lg: 24 }}
                        textAlign={{ base: "center", lg: "left" }}
                        fontWeight="black"
                        textTransform="uppercase"
                    >
                        Recipe
                    </Text>
                    <SectionDivider />
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Stack>
                            <Heading variant="page">
                                {recipe.recipeTitle}
                            </Heading>
                            <Text>Author:</Text>
                        </Stack>
                        <Stack>
                            <Center>
                                <FaThumbsUp size={36} />
                            </Center>
                            <Center>
                                <Heading>{recipe.recipeRating}</Heading>
                            </Center>
                        </Stack>
                    </Stack>
                    <Center py={24}>
                        <Image
                            borderRadius="md"
                            w={{ base: "100%", lg: "50%" }}
                            src={recipe.recipeImage}
                        />
                    </Center>

                    <Stack
                        px={0}
                        mx={0}
                        justifyContent="space-between"
                        spacing={12}
                    >
                        <PageSection>
                            <Heading variant="section">Ingredients</Heading>
                            <SectionDivider />
                            <RecipeIngredientTable
                                recipeIngredients={recipeIngredients}
                            />
                        </PageSection>

                        <PageSection>
                            <Heading variant="section">Instructions</Heading>
                            <SectionDivider />
                            <Text>{recipe.recipeText}</Text>
                        </PageSection>
                    </Stack>
                </>
            )}
        </PageContainer>
    );
};

export default RecipePage;
