import React, { useState } from "react";
import { Stack, Heading, SimpleGrid } from "@chakra-ui/layout";
import {
    Button,
    Input,
    Text,
    Box,
    RangeSlider,
    RangeSliderThumb,
    RangeSliderTrack,
    useToast,
    RangeSliderFilledTrack,
} from "@chakra-ui/react";
import PageSection from "../../components/PageSection";
import SectionDivider from "../../components/SectionDivider";
import Loading from "../../components/Loading";
import TitleSearchCriteria from "../../components/TitleSearchCriteria";
import RecipeCard from "../../components/RecipeCard";
import { useRecoilState } from "recoil";
import {
    calorieOrderState,
    calorieSortState,
} from "../../state/recipe/calorie-recipe.state";
import { getRecipeByCalories } from "../../api/recipe.api";
import { Recipe, RecipeCardData } from "../../state/types/recipe.type";
import CalorieSearchCriteria from "../../components/CalorieSearchCriteria";

interface Props {}

const FindRecipeByCaloriesTab: React.FC<Props> = (props: Props) => {
    const toast = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    const [minimumCalories, setMinimumCalories] = useState<number>(1000);
    const [maximumCalories, setMaximumCalories] = useState<number>(5000);

    const [calorieMatchingRecipe, setCalorieMatchingRecipe] = useState<
        Recipe[]
    >([]);

    const [sort] = useRecoilState(calorieSortState);
    const [order] = useRecoilState(calorieOrderState);

    const findRecipe: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        setLoading(true);
        setCalorieMatchingRecipe([]);
        getRecipeByCalories(minimumCalories, maximumCalories, sort, order)
            .then((response) => {
                if (response.data.data.length === 0) {
                    toast({
                        position: "top",
                        title: "Info",
                        description: "No recipe could be found.",
                        status: "info",
                        duration: 2000,
                        isClosable: true,
                    });
                }
                setCalorieMatchingRecipe(response.data.data);
            })
            .catch((error) => console.log(error));
        setLoading(false);
    };

    return (
        <Stack px={0} mx={0} justifyContent="space-between" spacing={12}>
            <PageSection>
                <Heading variant="section">Calories</Heading>
                <SectionDivider />
                <RangeSlider
                    defaultValue={[1000, 5000]}
                    min={0}
                    max={12000}
                    step={500}
                    onChange={(values) => {
                        setMinimumCalories(values[0]);
                        setMaximumCalories(values[1]);
                    }}
                >
                    <RangeSliderTrack bg="orange.100">
                        <RangeSliderFilledTrack bg="orange.400" />
                    </RangeSliderTrack>
                    <RangeSliderThumb
                        boxSize={6}
                        index={0}
                        bgColor={"tomato"}
                    />
                    <RangeSliderThumb
                        boxSize={6}
                        index={1}
                        bgColor={"tomato"}
                    />
                </RangeSlider>
                <Box fontSize={"lg"} fontWeight="bold" py={4}>
                    <Text>Minimum Calories</Text>
                    <Heading variant="section" fontSize="6xl">
                        {minimumCalories}
                    </Heading>
                </Box>
                <Box fontSize={"lg"} fontWeight="bold" py={4}>
                    <Text>Maximum Calories</Text>
                    <Heading variant="section" fontSize="6xl">
                        {maximumCalories}
                    </Heading>
                </Box>
            </PageSection>

            <PageSection>
                <Heading variant="section">Find Recipe By Calories</Heading>
                <SectionDivider />
                <CalorieSearchCriteria />
                <Button loading={loading} onClick={findRecipe}>
                    Find Recipe
                </Button>
            </PageSection>

            {loading === true ? <Loading /> : <></>}
            {calorieMatchingRecipe.length !== 0 ? (
                <PageSection>
                    <Heading variant="section">Matching Recipe</Heading>
                    <SectionDivider />

                    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={4}>
                        {calorieMatchingRecipe.map((recipe: any) => {
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

export default FindRecipeByCaloriesTab;
