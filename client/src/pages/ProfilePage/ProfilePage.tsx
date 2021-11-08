import React, { useEffect, useState } from "react";
import { Text, useToast } from "@chakra-ui/react";
import { Heading, Stack, SimpleGrid } from "@chakra-ui/layout";

import { useHistory } from "react-router-dom";
import { getRecipeByUser } from "../../api/recipe.api";
import PageSection from "../../components/PageSection";
import PageContainer from "../../components/PageContainer";
import SectionDivider from "../../components/SectionDivider";
import { RecipeCardData } from "../../state/types/recipe.type";
import { useRecoilState } from "recoil";
import { foodieState } from "../../state/foodie/foodie.state";
import RecipeCard from "../../components/RecipeCard";

const ProfilePage = (props: any) => {
    const toast = useToast();
    const history = useHistory();

    const [foodie] = useRecoilState(foodieState);

    const [recipes, setRecipes] = useState([]);

    const [triggerUpdate, setTriggerUpdate] = useState<boolean>(false);

    useEffect(() => {
        if (foodie === null) {
            toast({
                position: "top",
                title: "Error",
                description: "Please log in first.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            setTimeout(() => history.push("/login"), 1500);
        } else {
            console.log(foodie.foodieId);
            getRecipeByUser(foodie.foodieId)
                .then((response) => {
                    setRecipes(response.data.data.recipes);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    useEffect(() => {
        if (foodie !== null) {
            getRecipeByUser(foodie.foodieId)
                .then((response) => {
                    setRecipes(response.data.data.recipes);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [triggerUpdate]);

    useEffect(() => {
        if (foodie === null) {
            history.push("/login");
        }
    }, [foodie]);

    return (
        <PageContainer variant="navbar">
            <Heading variant="page">Profile</Heading>
            <SectionDivider />

            <Stack px={0} mx={0} justifyContent="space-between" spacing={12}>
                <PageSection>
                    <Heading variant="section">My Recipes</Heading>
                    <SectionDivider />
                    {recipes.length !== 0 ? (
                        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={4}>
                            {recipes.map((recipe: RecipeCardData) => {
                                return (
                                    <RecipeCard
                                        key={recipe.recipeId}
                                        triggerFunction={setTriggerUpdate}
                                        trigger={triggerUpdate}
                                        variant="edit"
                                        id={recipe.recipeId}
                                        image={recipe.recipeImage}
                                        title={recipe.recipeTitle}
                                    />
                                );
                            })}
                        </SimpleGrid>
                    ) : (
                        <Text>You have no recipes yet.</Text>
                    )}
                </PageSection>
            </Stack>
        </PageContainer>
    );
};

export default ProfilePage;
