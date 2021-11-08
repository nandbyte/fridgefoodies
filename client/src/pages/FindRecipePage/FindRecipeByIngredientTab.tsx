import React, { useState } from "react";
import { Button, Tag, Text } from "@chakra-ui/react";
import { Heading, Stack, Box, SimpleGrid } from "@chakra-ui/layout";

import SectionDivider from "../../components/SectionDivider";
import PageSection from "../../components/PageSection";
import AutoComplete from "../../components/AutoComplete";
import Loading from "../../components/Loading";
import SearchCriteria from "../../components/SearchCriteria";
import { useRecoilState, useRecoilValue } from "recoil";
import { findRecipeByIngredientTabValue } from "../../state/ingredient/ingredient.state";
import YourIngredients from "../../components/YourIngredients";
import RecipeCard from "../../components/RecipeCard";
import {
    ingredientFilterState,
    ingredientMatchingRecipeState,
    ingredientOrderState,
    ingredientSortState,
} from "../../state/recipe/ingredient-recipe.state";
import { getRecipeByIngredients } from "../../api/recipe.api";
import { RecipeCardData } from "../../state/types/recipe.type";

interface Props {}

const FindRecipeByIngredientTab: React.FC<Props> = (props: Props) => {
    const pageData = useRecoilValue(findRecipeByIngredientTabValue);

    const [loading, setLoading] = useState<boolean>(false);

    const [ingredientMatchingRecipe, setIngredientMatchingRecipe] =
        useRecoilState(ingredientMatchingRecipeState);

    const [filter] = useRecoilState(ingredientFilterState);
    const [sort] = useRecoilState(ingredientSortState);
    const [order] = useRecoilState(ingredientOrderState);

    const findRecipe: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        setLoading(true);
        console.log(pageData.selectedIngredients);
        getRecipeByIngredients(
            filter,
            sort,
            order,
            pageData.selectedIngredients
        )
            .then((response) => {
                console.log(response.data.data.recipes);
                setIngredientMatchingRecipe(response.data.data.recipes);
            })
            .catch((error) => console.log(error));
        setLoading(false);
    };

    return (
        <Stack px={0} mx={0} justifyContent="space-between" spacing={12}>
            <PageSection>
                <Heading variant="section">Add Ingredients</Heading>
                <SectionDivider />
                <AutoComplete />

                <Heading variant={"section"}>Your Ingredients</Heading>
                <SectionDivider />
                <YourIngredients />
            </PageSection>

            <PageSection>
                <Heading variant="section">Find Recipe By Ingredients</Heading>
                <SectionDivider />
                <SearchCriteria />
                <Button
                    disabled={pageData.selectedIngredientsCount === 0}
                    onClick={findRecipe}
                >
                    Find Recipe
                </Button>
            </PageSection>

            {loading === true ? <Loading /> : <></>}
            {ingredientMatchingRecipe.length !== 0 ? (
                <PageSection>
                    <Heading variant="section">Matching Recipe</Heading>
                    <SectionDivider />
                    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={4}>
                        {ingredientMatchingRecipe.map(
                            (recipe: RecipeCardData) => {
                                return (
                                    <RecipeCard
                                        key={recipe.recipeId}
                                        variant="showcase"
                                        id={recipe.recipeId}
                                        image={recipe.recipeImage}
                                        title={recipe.recipeTitle}
                                    />
                                );
                            }
                        )}
                    </SimpleGrid>
                </PageSection>
            ) : (
                <></>
            )}
        </Stack>
    );
};

export default FindRecipeByIngredientTab;
