import axios from "axios";
import { Ingredient } from "../state/types/ingredient.type";
import { Recipe } from "../state/types/recipe.type";
import { baseUrl } from "./config.api";

export const getRecipes = async () => {
    return axios.get(baseUrl + "/recipe");
};

export const getRecipeByUser = async (foodieId: string) => {
    return axios.get(baseUrl + "/recipe/user/" + foodieId);
};

export const getRecipeById = async (recipeId: number) => {
    return axios.get(baseUrl + "/recipe/" + recipeId);
};

export const getRecipeByTitle = async (
    keyword: string,
    sort: string,
    order: string
) => {
    return axios.get(
        baseUrl +
            "/recipe/find/" +
            keyword +
            "?sort=" +
            sort +
            "&order=" +
            order
    );
};

export const getRecipeByIngredients = async (
    filter: string,
    sort: string,
    order: string,
    id: Ingredient[]
) => {
    return axios.post(
        baseUrl +
            "/search?filter=" +
            filter +
            "&sort=" +
            sort +
            "&order=" +
            order,
        { id: id },
        {
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem("Token"),
            },
        }
    );
};

export const postRecipe = async (recipe: Recipe) => {
    return axios.post(
        baseUrl + "/recipe",
        { ...recipe },
        {
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem("Token"),
            },
        }
    );
};

export const putRecipe = async (recipe: any) => {
    return axios.put(
        baseUrl + "/recipe",
        { ...recipe },
        {
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem("Token"),
            },
        }
    );
};
