import React from "react";
import { Box, Text } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/react";
import {
    findRecipeByIngredientTabValue,
    ingredientState,
    selectedIngredientsState,
} from "../../state/ingredient/ingredient.state";
import { useRecoilState, useRecoilValue } from "recoil";

interface TagProps {
    ingredientName: string;
}
const IngredientTag: React.FC<TagProps> = (props: TagProps) => {
    return (
        <Tag
            key={props.ingredientName}
            fontSize="xl"
            variant="outline"
            colorScheme="orange"
            borderWidth={"md"}
            fontWeight={"bold"}
            px={3}
            py={2}
            m={1}
        >
            {props.ingredientName}
        </Tag>
    );
};

interface Props {}

const YourIngredients: React.FC<Props> = (props: Props) => {
    const [selectedIngredients] = useRecoilState(selectedIngredientsState);
    const [ingredients] = useRecoilState(ingredientState);
    const pageData = useRecoilValue(findRecipeByIngredientTabValue);

    return (
        <Box>
            {pageData.selectedIngredientsCount === 0 ? (
                <Text>No ingredient is selected.</Text>
            ) : (
                selectedIngredients.map((ingredientIndex: any) => {
                    console.log(
                        ingredients[ingredientIndex - 1].ingredientName
                    );
                    return (
                        <IngredientTag
                            key={ingredientIndex}
                            ingredientName={
                                ingredients[ingredientIndex - 1].ingredientName
                            }
                        />
                    );
                })
            )}
        </Box>
    );
};

export default YourIngredients;
