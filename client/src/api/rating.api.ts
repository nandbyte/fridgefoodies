import axios from "axios";
import { baseUrl } from "./config.api";

export const getRatingByRecipe = async (recipeId: number) => {
    return axios.get(
        baseUrl + "/ratings/" + recipeId,

        {
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem("Token"),
                FoodieId: window.localStorage.getItem("FoodieId"),
            },
        }
    );
};

export const postRating = async (foodieId: string, recipeId: number) => {
    return axios.post(
        baseUrl + "/ratings/",
        {
            foodieId,
            recipeId,
        },
        {
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem("Token"),
                FoodieId: window.localStorage.getItem("FoodieId"),
            },
        }
    );
};

export const getRatingByUser = async (foodieId: string, recipeId: string) => {
    return axios.post(
        baseUrl + "/checkrating/",
        {
            foodieId,
            recipeId,
        },
        {
            headers: {
                Authorization: "Bearer " + window.localStorage.getItem("Token"),
                FoodieId: window.localStorage.getItem("FoodieId"),
            },
        }
    );
};
