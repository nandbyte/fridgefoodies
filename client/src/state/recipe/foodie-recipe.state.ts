import { atom } from "recoil";
import { RecipeCardData } from "../types/recipe.type";

export const foodieRecipeState = atom({
    key: "foodie-recipe",
    default: [] as RecipeCardData[],
});
