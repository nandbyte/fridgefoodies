import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Foodie } from "../types/foodie.type";

const { persistAtom } = recoilPersist();

export const foodieState = atom({
    key: "foodie",
    default:
        window.localStorage.getItem("Foodie") !== undefined
            ? window.localStorage.getItem("Foodie")
            : ({
                  foodieId: "",
                  foodieName: "",
                  foodieEmail: "",
                  isAdmin: false,
              } as Foodie),
});

export const foodieJwtState = atom({
    key: "foodie-jwt",
    default:
        window.localStorage.getItem("Token") !== undefined
            ? window.localStorage.getItem("Token")
            : ("" as string),
});
