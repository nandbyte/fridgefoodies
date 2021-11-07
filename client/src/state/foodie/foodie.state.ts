import { atom } from "recoil";
import { Foodie } from "../types/foodie.type";

export const foodieState = atom({
    key: "foodie",
    default: null as Foodie | null,
});

export const foodieJwtState = atom({
    key: "foodie-jwt",
    default: window.localStorage.getItem("Token") as string | null,
});
