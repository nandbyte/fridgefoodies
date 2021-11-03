import { atom, selector } from "recoil";
import { Ingredient } from "./types/ingredient.type";

export const foodieState = atom({
    key: "foodie",
    default: null,
});

export const jwtState = atom({
    key: "jwt",
    default: "",
});

// export const matchingRecipeState = atom({
//     key: "matching-recipe",
//     default: [] as Recipe[],
// });

// export const recipeState = atom({
//     key: "recipe",
//     default: {} as Recipe,
// });
