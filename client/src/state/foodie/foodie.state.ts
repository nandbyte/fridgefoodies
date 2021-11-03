import { atom } from "recoil";
import { Foodie } from "../types/foodie.type";

export const foodieState = atom({
    key: "foodie",
    default: JSON.parse(window.localStorage.getItem("Foodie")),
});

export const foodieJwtState = atom({
    key: "foodie-jwt",
    default: window.localStorage.getItem("Token"),
});
