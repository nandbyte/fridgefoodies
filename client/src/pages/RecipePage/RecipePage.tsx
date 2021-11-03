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

const RecipePage = (props: any) => {
    const [recipe, setRecipe]: any = useState<Recipe>(null);

    let { id }: any = useParams();

    useEffect(() => {
        getRecipeById(id).then((response) => {
            setRecipe(response.data.data.recipe[0]);
            console.log(response.data.data.recipe[0]);
        });
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
                    <Heading variant="page">{recipe.recipeTitle}</Heading>

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
                        </PageSection>

                        <PageSection>
                            <Heading variant="section">Instructions</Heading>
                            <SectionDivider />
                            <Text>{recipe.recipeText}</Text>
                        </PageSection>

                        <PageSection>
                            <Heading variant="section">Ingredients</Heading>
                            <SectionDivider />
                        </PageSection>
                    </Stack>
                </>
            )}
        </PageContainer>
    );
};

export default RecipePage;
