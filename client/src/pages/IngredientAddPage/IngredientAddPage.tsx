import React, { useEffect, useState } from "react";

import { Heading, Stack, Text } from "@chakra-ui/layout";
import { Input, FormControl, useToast, Textarea } from "@chakra-ui/react";

import SectionDivider from "../../components/SectionDivider";
import PageContainer from "../../components/PageContainer";
import PageSection from "../../components/PageSection";
import { Button } from "@chakra-ui/react";

import { foodieState } from "../../state/foodie/foodie.state";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { getIngredients, postIngredient } from "../../api/ingredient.api";
import { Ingredient } from "../../state/types/ingredient.type";

const IngredientAddPage = (props: any) => {
    const toast = useToast();
    const history = useHistory();

    const [ingredientName, setIngredientName] = useState("");
    const [ingredientDescription, setIngredientDescription] = useState("");
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const [foodie, setFoodie] = useRecoilState(foodieState);

    // useEffect(() => {
    //     if (foodie !== null) {
    //         if (foodie.isAdmin === false)
    //             toast({
    //                 position: "top",
    //                 title: "Error",
    //                 description: "Please log in as admin.",
    //                 status: "error",
    //                 duration: 2000,
    //                 isClosable: true,
    //             });
    //         setTimeout(() => history.push("/admin"), 1500);
    //     }
    // }, []);

    // useEffect(() => {
    //     if (foodie !== null) {
    //         if (foodie.foodieId === "") {
    //             history.push("/admin-login");
    //         }
    //     }
    // }, [foodie]);
    useEffect(() => {
        getIngredients()
            .then((response) => setIngredients(response.data.data.ingredient))
            .catch((error) => {
                console.log(error);
            });
    }, []); // eslint-disable-line

    const createIngredient = () => {
        postIngredient({
            ingredientId: 0,
            ingredientName,
            ingredientDescription,
        })
            .then((response) => {
                console.log(response.data.data.ingredient);
                toast({
                    position: "top",
                    title: "Success",
                    description: "Ingredient created successfully.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                history.push("/admin/add-ingredient");
            })
            .catch((error) => {
                toast({
                    position: "top",
                    title: "Error",
                    description: "Duplicate Ingredient Title",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            });
    };

    return (
        <PageContainer variant="navbar">
            <Heading variant="page">Create a New Ingredient</Heading>
            <SectionDivider />

            <Stack px={0} mx={0} justifyContent="space-between" spacing={12}>
                <PageSection>
                    <Heading variant="section">Ingredient Name</Heading>
                    <SectionDivider />
                    <FormControl id="ingredient-name">
                        <Input
                            p={2}
                            placeholder="Chicken Fry"
                            size="lg"
                            value={ingredientName}
                            onChange={(event) => {
                                setIngredientName(event.target.value);
                            }}
                            _hover={{
                                borderColor: "orange.300",
                            }}
                            borderColor="orange.600"
                            focusBorderColor="orange.400"
                        />
                    </FormControl>
                    <Heading pt={2} variant="section">
                        Ingredient Description
                    </Heading>{" "}
                    <SectionDivider />
                    <FormControl id="ingredient-description">
                        <Textarea
                            p={2}
                            placeholder="Chicken Fry"
                            size="lg"
                            value={ingredientName}
                            onChange={(event) => {
                                setIngredientDescription(event.target.value);
                            }}
                            _hover={{
                                borderColor: "orange.300",
                            }}
                            borderColor="orange.600"
                            focusBorderColor="orange.400"
                        />
                    </FormControl>
                    <Button
                        onClick={createIngredient}
                        disabled={
                            ingredientName === "" ||
                            ingredientDescription === ""
                        }
                    >
                        Create Ingredient
                    </Button>
                </PageSection>

                <PageSection>
                    <Heading variant="section">Ingredients</Heading>
                    <SectionDivider />

                    {ingredients.map((ingredientObject) => {
                        return (
                            <>
                                <Heading> {ingredientObject.name}</Heading>{" "}
                                <Text>
                                    {ingredientObject.ingredientDescription}
                                </Text>
                            </>
                        );
                    })}
                </PageSection>
            </Stack>
        </PageContainer>
    );
};

export default IngredientAddPage;
