import { baseUrl } from "./index";
import axios from "axios";

const ingredientRoute = "/ingredients";

const demo = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

export const getAllIngredients: any = () => {
    // return axios.get(baseUrl + ingredientRoute);
    return axios.get(demo);
};
