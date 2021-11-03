import { atom, selector } from "recoil";

export const filterState = atom({
    key: "filter-type",
    default: 0 as number,
});

export const sortState = atom({
    key: "sort-type",
    default: 0 as number,
});

export const orderState = atom({
    key: "order-type",
    default: 0 as number,
});

// export const findRecipeByIngredientTabSelector = selector({
//     key: "find-recipe-by-ingredient-tab",
//     get: ({ get }) => ({
//         ingredientList: get(ingredientState),
//         selectedIngredients: get(selectedIngredientsState),
//     }),
// });
