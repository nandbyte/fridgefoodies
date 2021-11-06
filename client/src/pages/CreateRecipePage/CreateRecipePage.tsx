import React, { useEffect, useState } from "react";

import { Heading, Stack } from "@chakra-ui/layout";
import { Input, FormControl, useToast } from "@chakra-ui/react";

import SectionDivider from "../../components/SectionDivider";
import PageContainer from "../../components/PageContainer";
import PageSection from "../../components/PageSection";
import { Button } from "@chakra-ui/react";

import { postRecipe } from "../../api/recipe.api";
import { foodieState } from "../../state/foodie/foodie.state";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";

const CreateRecipePage = (props: any) => {
    const toast = useToast();
    const history = useHistory();

    const [recipeTitle, setRecipeTitle] = useState("");
    const [foodie, setFoodie] = useRecoilState(foodieState);

    useEffect(() => {
        if (foodie.foodieId === "") {
            toast({
                position: "top",
                title: "Error",
                description: "Please log in first.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            setTimeout(() => history.push("/login"), 1500);
        }
        console.log("create recipe " + foodie.foodieId);
    }, []);

    useEffect(() => {
        if (foodie.foodieId === "") {
            history.push("/login");
        }
    }, [foodie]);

    const createRecipeEntry = () => {
        postRecipe({
            recipeId: 0,
            foodieId: foodie.foodieId,
            recipeTitle,
            recipeText: "",
            recipeImage: "",
            recipeRating: 0,
        })
            .then((response) => {
                console.log(response.data.data.recipe.recipeId);
                toast({
                    position: "top",
                    title: "Success",
                    description: "Recipe created successfully.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                history.push(
                    "/edit-recipe/" + response.data.data.recipe.recipeId
                );
            })
            .catch((error) => {
                toast({
                    position: "top",
                    title: "Error",
                    description: "Duplicate Recipe Title",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            });
    };

    return (
        <PageContainer variant="navbar">
            <Heading variant="page">Create a New Recipe</Heading>
            <SectionDivider />

            <Stack px={0} mx={0} justifyContent="space-between" spacing={12}>
                <PageSection>
                    <Heading variant="section">Recipe Title</Heading>
                    <SectionDivider />

                    <FormControl id="recipe-title">
                        <Input
                            variant="flushed"
                            p={2}
                            placeholder="Chicken Fry"
                            size="lg"
                            value={recipeTitle}
                            onChange={(event) => {
                                setRecipeTitle(event.target.value);
                            }}
                            _hover={{
                                borderColor: "orange.300",
                            }}
                            borderColor="orange.600"
                            focusBorderColor="orange.400"
                        />
                    </FormControl>
                    <Button
                        onClick={createRecipeEntry}
                        disabled={recipeTitle === ""}
                    >
                        Create Recipe Entry
                    </Button>
                </PageSection>
            </Stack>
        </PageContainer>
    );
};

export default CreateRecipePage;
