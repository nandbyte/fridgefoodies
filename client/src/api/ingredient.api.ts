import axios from "axios";
import { baseUrl } from "./config.api";

export const getIngredients = async () => {
    return axios.get(baseUrl + "/ingredients");
};
