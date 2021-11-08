import { atom, selector } from "recoil";
import { RecipeCardData } from "../types/recipe.type";

export const ingredientFilterState = atom({
    key: "ingredient-filter-type",
    default: "best" as string, 
});

export const ingredientSortState = atom({
    key: "ingredient-sort-type",
    default: "rating" as string,
});

export const ingredientOrderState = atom({
    key: "ingredient-order-type",
    default: "desc" as string,
});

export const ingredientMatchingRecipeState = atom({
    key: "ingredient-matching-recipe",
    default: [] as RecipeCardData[],
});

export const ingredientMatchingRecipeLoadingState = atom({
    key: "ingredient-matching-loading-recipe",
    default: false as boolean,
});
