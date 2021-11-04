import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Foodie } from "../types/foodie.type";

const { persistAtom } = recoilPersist();

export const foodieState = atom({
    key: "foodie",
    default: {
        foodieId: "",
        foodieName: "",
        foodieEmail: "",
        foodieIsAdmin: false,
    } as Foodie,
});

export const foodieJwtState = atom({
    key: "foodie-jwt",
    default: "" as string,
});
