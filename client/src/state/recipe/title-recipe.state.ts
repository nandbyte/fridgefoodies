import { atom } from "recoil";
import { RecipeCardData } from "../types/recipe.type";

export const titleSortState = atom({
    key: "title-sort-type",
    default: "rating" as string,
});

export const titleOrderState = atom({
    key: "title-order-type",
    default: "desc" as string,
});

export const titleMatchingRecipeState = atom({
    key: "title-matching-recipe",
    default: [] as RecipeCardData[],
});

export const titleMatchingRecipeLoadingState = atom({
    key: "title-matching-loading-recipe",
    default: false as boolean,
});
