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
                    <Th>Ingredient</Th>
                    <Th>Variant</Th>
                    <Th>Guide</Th>
                    <Th>Quantity</Th>
                </Tr>
            </Thead>
            <Tbody>
                {props.recipeIngredients.map((recipeIngredient) => {
                    return (
                        <Tr>
                            <Td>{recipeIngredient.ingredientName}</Td>
                            <Td>{recipeIngredient.ingredientVariant}</Td>
                            <Td>{recipeIngredient.ingredientGuide}</Td>
                            <Td>{recipeIngredient.ingredientQuantity}</Td>
                        </Tr>
                    );
                })}
            </Tbody>
        </Table>
    );
};

export default RecipeIngredientTable;
