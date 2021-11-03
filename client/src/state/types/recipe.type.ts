import { Ingredient } from "./ingredient.type";

export interface Recipe {
    recipeId: number;
    foodieId: string;
    recipeTitle: string;
    recipeText: string;
    recipeImage: string;
    recipeRating: number;
}

export interface RecipeCardData {
    recipeId: number;
    foodieId: string;
    recipeTitle: string;
    recipeText: string;
    recipeImage: string;
    recipeIngredient: Ingredient[];
    recipeRating: number;
}
