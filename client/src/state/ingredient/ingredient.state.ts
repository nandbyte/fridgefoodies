import { atom, selector } from "recoil";
import { Ingredient } from "../types/ingredient.type";

export const ingredientState = atom({
    key: "ingredients",
    default: [] as Ingredient[],
});

export const selectedIngredientsState = atom({
    key: "selected-ingredients",
    default: [] as Ingredient[],
});

export const findRecipeByIngredientTabValue = selector({
    key: "find-recipe-by-ingredient-tab",
    get: ({ get }) => ({
        ingredientList: get(ingredientState),
        ingredientDropdownList: get(ingredientState).map(
            (ingredient, index) => {
                return {
                    label: ingredient.ingredientName,
                    value: index.toString(),
                };
            }
        ),
        selectedIngredients: get(selectedIngredientsState),
        selectedIngredientsCount: get(selectedIngredientsState).length,
    }),
});
