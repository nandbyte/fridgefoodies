import React from "react";
import { RecipeIngredient } from "../../state/types/recipe-ingredient.type";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

interface Props {
    recipeIngredients: RecipeIngredient[];
}

const RecipeIngredientTable: React.FC<Props> = (props: Props) => {
    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th fontSize="lg">Ingredient</Th>
                    <Th fontSize="lg">Variant</Th>
                    <Th fontSize="lg">Quantity</Th>
                    <Th fontSize="lg">Calories</Th>
                </Tr>
            </Thead>
            <Tbody>
                {props.recipeIngredients.map((recipeIngredient) => {
                    return (
                        <Tr>
                            <Td fontSize="xl">
                                {recipeIngredient.ingredientName}
                            </Td>
                            <Td fontSize="xl">
                                {recipeIngredient.ingredientVariant}
                            </Td>
                            <Td fontSize="xl">
                                {recipeIngredient.ingredientQuantity}
                            </Td>{" "}
                            <Td fontSize="xl">
                                {recipeIngredient.ingredientCalories}
                            </Td>
                        </Tr>
                    );
                })}
            </Tbody>
        </Table>
    );
};

export default RecipeIngredientTable;
