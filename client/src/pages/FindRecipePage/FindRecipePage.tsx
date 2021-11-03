import React from "react";

import { Heading } from "@chakra-ui/layout";

import SectionDivider from "../../components/SectionDivider";
import TabView from "../../components/TabView";
import { TabObject } from "../../components/TabView/TabView";
import PageContainer from "../../components/PageContainer";

import FindRecipeByTitleTab from "./FindRecipeByTitleTab";
import FindRecipeByIngredientTab from "./FindRecipeByIngredientTab";

const tabs: Array<TabObject> = [
    {
        tabName: "Search By Recipe",
        tabPanel: <FindRecipeByTitleTab />,
        tabLink: "/find-recipe/title",
    },
    {
        tabName: "Search By Ingredients",
        tabPanel: <FindRecipeByIngredientTab />,
        tabLink: "/find-recipe/ingredient",
    },
];

const FindRecipePage = (props: any) => {
    return (
        <PageContainer variant="navbar">
            <Heading variant="page">Find Recipe</Heading>
            <SectionDivider />
            <TabView tabList={tabs} />
        </PageContainer>
    );
};

export default FindRecipePage;

/* {loading === true ? (
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
                    )} */
