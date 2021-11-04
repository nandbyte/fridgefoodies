import { RecipeIngredient } from "./../state/types/recipe-ingredient.type";
import axios from "axios";
import { baseUrl } from "./config.api";

export const getRecipeIngredients = async (recipeId: number) => {
    return axios.get(baseUrl + "/recipeingredient/" + recipeId);
};

export const postRecipeIngredient = async (
    recipeIngredient: RecipeIngredient
) => {
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

export const putRecipeIngredient = async (
    recipeIngredientId: number,
    recipeIngredient: RecipeIngredient
) => {
    return axios.put(
        baseUrl + "/recipeIngredient/" + recipeIngredientId,
        recipeIngredient,
        {
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem("Token"),
            },
        }
    );
};

export const deleteRecipeIngredient = async (recipeIngredientId: number) => {
    return axios.delete(baseUrl + "/recipeIngredient/" + recipeIngredientId, {
        headers: {
            Authorization: "Bearer " + window.localStorage.getItem("Token"),
        },
    });
};
