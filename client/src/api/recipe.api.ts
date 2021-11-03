import axios from "axios";
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

// export const getRecipeByIngredients = async (keyword: string) => {
//     return axios.get(baseUrl + "/recipe/find/" + keyword);
// };

export const postRecipe = async (recipe: Recipe) => {
    return axios.post(baseUrl + "/recipe", { ...recipe });
};

export const putRecipe = async (recipe: Recipe) => {
    return axios.put(baseUrl + "/recipe", { ...recipe });
};
