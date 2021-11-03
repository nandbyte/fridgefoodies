import { atom, selector } from "recoil";
import { RecipeCardData } from "../types/recipe.type";

export const ingredientFilterState = atom({
    key: "ingredient-filter-type",
    default: 0 as number,
});

export const ingredientSortState = atom({
    key: "ingredient-sort-type",
    default: 0 as number,
});

export const ingredientOrderState = atom({
    key: "ingredient-order-type",
    default: 0 as number,
});

export const ingredientMatchingRecipeState = atom({
    key: "ingredient-matching-recipe",
    default: [] as RecipeCardData[],
});

export const ingredientMatchingRecipeLoadingState = atom({
    key: "ingredient-matching-loading-recipe",
    default: false as boolean,
});

export const ingredientMatchingRecipeSelector = selector({
    key: "ingredient-matching-selector",
    get: ({ get }) => {
        const sort = get(ingredientSortState);
        const order = get(ingredientOrderState);
        const recipe = get(ingredientMatchingRecipeState);

        // Alphabetical ascending
        if (sort === 0) {
            if (order === 0) {
                return recipe.sort((a, b) =>
                    a.recipeTitle.localeCompare(b.recipeTitle)
                );
            } else {
                return recipe.sort((a, b) =>
                    b.recipeTitle.localeCompare(a.recipeTitle)
                );
            }
        } else {
            if (order === 0) {
                return recipe.sort((a, b) => a.recipeRating - b.recipeRating);
            } else {
                return recipe.sort((a, b) => b.recipeRating - a.recipeRating);
            }
        }
    },
});
