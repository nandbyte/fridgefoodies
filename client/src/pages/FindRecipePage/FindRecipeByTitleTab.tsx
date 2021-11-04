import React, { useState } from "react";
import { Stack, Heading, SimpleGrid } from "@chakra-ui/layout";
import { Button, Input } from "@chakra-ui/react";
import PageSection from "../../components/PageSection";
import SectionDivider from "../../components/SectionDivider";
import Loading from "../../components/Loading";
import TitleSearchCriteria from "../../components/TitleSearchCriteria";
import RecipeCard from "../../components/RecipeCard";
import { useRecoilState } from "recoil";
import {
    titleMatchingRecipeState,
    titleOrderState,
    titleSortState,
} from "../../state/recipe/title-recipe.state";
import { getRecipeByTitle } from "../../api/recipe.api";
import { RecipeCardData } from "../../state/types/recipe.type";

interface Props {}

const FindRecipeByTitleTab: React.FC<Props> = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>("");

    const [titleMatchingRecipe, setTitleMatchingRecipe] = useRecoilState(
        titleMatchingRecipeState
    );
    const [sort] = useRecoilState(titleSortState);
    const [order] = useRecoilState(titleOrderState);

    const findRecipe: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        setLoading(true);
        console.log("Clicked");
        getRecipeByTitle(keyword, sort, order)
            .then((response) => {
                console.log(response.data.data.recipes);
                setTitleMatchingRecipe(response.data.data.recipes);
            })
            .catch((error) => console.log(error));
        setLoading(false);
    };

    return (
        <Stack px={0} mx={0} justifyContent="space-between" spacing={12}>
            <PageSection>
                <Heading variant="section">Title</Heading>
                <SectionDivider />
                <Input
                    placeholder="Vegetable soup"
                    size="lg"
                    value={keyword}
                    onChange={(event) => {
                        setKeyword(event.target.value);
                    }}
                    _hover={{
                        borderColor: "orange.300",
                    }}
                    borderColor="orange.600"
                    focusBorderColor="orange.400"
                />
            </PageSection>

            <PageSection>
                <Heading variant="section">Find Recipe By Title</Heading>
                <SectionDivider />
                <TitleSearchCriteria />
                <Button disabled={keyword === ""} onClick={findRecipe}>
                    Find Recipe
                </Button>
            </PageSection>

            {loading === true ? <Loading /> : <></>}
            {titleMatchingRecipe.length !== 0 ? (
                <PageSection>
                    <Heading variant="section">Matching Recipe</Heading>
                    <SectionDivider />

                    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={4}>
                        {titleMatchingRecipe.map((recipe: RecipeCardData) => {
                            return (
                                <RecipeCard
                                    key={recipe.recipeId}
                                    variant="showcase"
                                    id={recipe.recipeId}
                                    image={recipe.recipeImage}
                                    title={recipe.recipeTitle}
                                />
                            );
                        })}
                    </SimpleGrid>
                </PageSection>
            ) : (
                <></>
            )}
        </Stack>
    );
};

export default FindRecipeByTitleTab;
