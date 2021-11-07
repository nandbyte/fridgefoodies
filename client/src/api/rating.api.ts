import axios from "axios";
import { baseUrl } from "./config.api";

export const getRatingByRecipe = async (recipeId: number) => {
    return axios.get(baseUrl + "/rating/" + recipeId);
};

export const getRatingByUser = async (foodieId: string, recipeId: string) => {
    return axios.get(baseUrl + "/rating/user/" + foodieId);
};

export const postRatingByUser = async (foodieId: string) => {
    return axios.get(baseUrl + "/recipe/user/" + foodieId, {
        headers: {
            Authorization: "Bearer " + window.localStorage.getItem("Token"),
            FoodieId: window.localStorage.getItem("FoodieId"),
        },
    });
};

export const deleteRatingByUser = async (foodieId: string) => {
    return axios.delete(baseUrl + "/recipe/user/" + foodieId, {
        headers: {
            Authorization: "Bearer " + window.localStorage.getItem("Token"),
            FoodieId: window.localStorage.getItem("FoodieId"),
        },
    });
};
