import axios from "axios";
import { Ingredient } from "../state/types/ingredient.type";
import { baseUrl } from "./config.api";

export const getIngredients = async () => {
    return axios.get(baseUrl + "/ingredients");
};

export const postIngredient = async (ingredient: Ingredient) => {
    return axios.post(baseUrl + "/ingredient", ingredient);
};
