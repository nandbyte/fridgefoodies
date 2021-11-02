import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// State type definition
interface FindRecipeState {
    selectedIngredients: string[];
    filterType: "full" | "bounded";
    sortCriteria: "Rating" | "Alphabetical";
    sortType: "Ascending" | "Descending";
    matchingRecipes: string[];
    recommendedRecipes: string[];
}

// Initial state values
const initialState: FindRecipeState = {
    selectedIngredients: [],
    filterType: "bounded",
    sortCriteria: "Rating",
    sortType: "Descending",
    matchingRecipes: [],
    recommendedRecipes: [],
};

// Functions for state transitions
export const findRecipeByStringSlice = createSlice({
    name: "find-recipe-by-string",
    initialState,
    reducers: {
        // For ingredients addition
    },
});

// Export state transition functions
export const {} = findRecipeByStringSlice.actions;

// Export reducer
export default findRecipeByStringSlice.reducer;
