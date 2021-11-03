import React from "react";
import { Button, Tag, Text } from "@chakra-ui/react";
import { Heading, Stack, Box } from "@chakra-ui/layout";

import SectionDivider from "../../components/SectionDivider";
import PageSection from "../../components/PageSection";
import AutoComplete from "../../components/AutoComplete";
import Loading from "../../components/Loading";
import SearchCriteria from "../../components/SearchCriteria";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    findRecipeByIngredientTabValue,
    ingredientState,
    selectedIngredientsState,
} from "../../state/ingredient/ingredient.state";

interface Props {}

interface TagProps {
    ingredientName: string;
}
const IngredientTag: React.FC<TagProps> = (props: TagProps) => {
    return (
        <Tag
            key={props.ingredientName}
            fontSize="lg"
            colorScheme="orange"
            variant="outline"
            px={3}
            py={2}
            m={1}
        >
            {props.ingredientName}
        </Tag>
    );
};

const FindRecipeByIngredientTab: React.FC<Props> = (props: Props) => {
    const [selectedIngredients] = useRecoilState(selectedIngredientsState);
    const [ingredients] = useRecoilState(ingredientState);
    const pageData = useRecoilValue(findRecipeByIngredientTabValue);

    return (
        <Stack px={0} mx={0} justifyContent="space-between" spacing={12}>
            <PageSection>
                <Heading variant="section">Add Ingredients</Heading>
                <SectionDivider />
                <AutoComplete />

                <Heading variant={"section"}>Your Ingredients</Heading>
                <SectionDivider />
                <Box>
                    {pageData.selectedIngredientsCount === 0 ? (
                        <Text>No ingredient is selected.</Text>
                    ) : (
                        selectedIngredients.map((ingredientIndex: any) => {
                            console.log(
                                ingredients[ingredientIndex].ingredientName
                            );
                            return (
                                <IngredientTag
                                    ingredientName={
                                        ingredients[ingredientIndex]
                                            .ingredientName
                                    }
                                />
                            );
                        })
                    )}
                </Box>
            </PageSection>

            <PageSection>
                <Heading variant="section">Find Recipe By Ingredients</Heading>
                <SectionDivider />
                <SearchCriteria />
                <Button disabled={selectedIngredients.length === 0}>
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
