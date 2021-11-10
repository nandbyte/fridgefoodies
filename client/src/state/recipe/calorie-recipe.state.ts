import { atom } from "recoil";

export const calorieSortState = atom({
    key: "calorie-sort-type",
    default: "calories" as string,
});

export const calorieOrderState = atom({
    key: "calorie-order-type",
    default: "asc" as string,
});
