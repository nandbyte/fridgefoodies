import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "./recipe.type";

// State type definition
interface FindRecipeByTextState {
    searchText: string;
    matchingRecipes: Recipe[];
}

// Initial state values
const initialState: FindRecipeByTextState = {
    searchText: "",
    matchingRecipes: [],
};

// Functions for state transitions
export const findRecipeByTextSlice = createSlice({
    name: "find-recipe-by-text",
    initialState,
    reducers: {
        // For search text
        setSearchText: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload;
        },

        // For matching recipes
        setMatchingRecipes: (state, action: PayloadAction<Recipe[]>) => {
            state.matchingRecipes = action.payload;
        },
    },
});

// Export state transition functions
export const { setSearchText, setMatchingRecipes } =
    findRecipeByTextSlice.actions;

// Export reducer
export default findRecipeByTextSlice.reducer;
