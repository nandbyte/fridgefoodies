import { RecipeIngredient } from "./../state/types/recipe-ingredient.type";
import axios from "axios";
import { baseUrl } from "./config.api";

export const getRecipeIngredients = async (recipeId: number) => {
    return axios.get(baseUrl + "/recipeingredient/" + recipeId);
};

export const postRecipeIngredient = async (
    recipeIngredient: RecipeIngredient
) => {
    console.log(
        "POST RECIPE INGREDIENT - " +
            "Bearer " +
            window.localStorage.getItem("Token")
    );
    return axios.post(
        baseUrl + "/recipeingredient/",
        { ...recipeIngredient },
        {
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem("Token"),
            },
        }
    );
};

export const deleteRecipeIngredient = async (recipeIngredientId: number) => {
    console.log(
        "DELETE RECIPE INGREDIENT - " +
            "Bearer " +
            window.localStorage.getItem("Token")
    );
    return axios.delete(baseUrl + "/recipeingredient/" + recipeIngredientId, {
        headers: {
            Authorization: "Bearer " + window.localStorage.getItem("Token"),
        },
    });
};
