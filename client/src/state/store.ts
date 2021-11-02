import { configureStore } from "@reduxjs/toolkit";
import { foodieSlice } from "./foodie/foodie.slice";
import { foodieApiSlice } from "./foodie/foodie.api.slice";
import { ingredientSlice } from "./ingredient/ingredient.slice";
import { ingredientApiSlice } from "./ingredient/ingredient.api.slice";
import { findRecipeByIngredientsSlice } from "./recipe/find-recipe-by-ingredients.slice";

export const store = configureStore({
    reducer: {
        foodie: foodieSlice.reducer,
        [foodieApiSlice.reducerPath]: foodieApiSlice.reducer,

        ingredient: ingredientSlice.reducer,
        [ingredientApiSlice.reducerPath]: ingredientApiSlice.reducer,

        findRecipeByIngredients: findRecipeByIngredientsSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
