import axios from "axios";
import { baseUrl } from "./config.api";

export const login = async (email: string, password: string) => {
    return axios.post(baseUrl + "/login", { email, password });
};

export const register = async (
    email: string,
    name: string,
    password: string
) => {
    return axios.post(baseUrl + "/register", { email, name, password });
};

export const logout = () => {
    window.localStorage.removeItem("Token");
    window.localStorage.removeItem("Foodie");
};
