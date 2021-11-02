import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// State type definition
interface FindRecipeByIngredientsState {
    selectedIngredients: string[];
    filterType: number;
    sortType: number;
    orderType: number;
    matchingRecipes: string[];
}

// Initial state values
const initialState: FindRecipeByIngredientsState = {
    selectedIngredients: [],
    filterType: 0,
    sortType: 0,
    orderType: 0,
    matchingRecipes: [],
};

// Functions for state transitions
export const findRecipeByIngredientsSlice = createSlice({
    name: "find-recipe-by-ingredients",
    initialState,
    reducers: {
        // For ingredients addition
        setSelectedIngredients: (state, action: PayloadAction<string[]>) => {
            state.selectedIngredients = action.payload;
        },

        // For search type transitions
        setFilterType: (state, action: PayloadAction<number>) => {
            state.filterType = action.payload;
        },

        setSortType: (state, action: PayloadAction<number>) => {
            state.sortType = action.payload;
        },

        setOrderType: (state, action: PayloadAction<number>) => {
            state.orderType = action.payload;
        },

        // For content transitions
        setMatchingRecipes: (state, action: PayloadAction<string[]>) => {
            state.matchingRecipes = action.payload;
        },
    },
});

// Export state transition functions
export const {
    setSelectedIngredients,
    setFilterType,
    setSortType,
    setOrderType,
    setMatchingRecipes,
} = findRecipeByIngredientsSlice.actions;

// Export reducer
export default findRecipeByIngredientsSlice.reducer;
