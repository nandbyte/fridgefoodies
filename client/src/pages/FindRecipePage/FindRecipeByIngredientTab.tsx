import React from "react";
import { Button, Tag, Text } from "@chakra-ui/react";
import { Heading, Stack, Box } from "@chakra-ui/layout";

import SectionDivider from "../../components/SectionDivider";
import PageSection from "../../components/PageSection";
import AutoComplete from "../../components/AutoComplete";
import Loading from "../../components/Loading";
import SearchCriteria from "../../components/SearchCriteria";
import { useRecoilState, useRecoilValue } from "recoil";
import { findRecipeByIngredientTabValue } from "../../state/ingredient/ingredient.state";
import YourIngredients from "../../components/YourIngredients";

interface Props {}

const FindRecipeByIngredientTab: React.FC<Props> = (props: Props) => {
    const pageData = useRecoilValue(findRecipeByIngredientTabValue);

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
                <Button disabled={pageData.selectedIngredientsCount === 0}>
                    Find Recipe
                </Button>
            </PageSection>

            <PageSection>
                <Heading variant="section">Matching Recipe</Heading>
                <SectionDivider />
                <Loading />
            </PageSection>
        </Stack>
    );
};

export default FindRecipeByIngredientTab;
