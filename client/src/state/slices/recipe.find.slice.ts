import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// State type definition
interface RecipeFindState {
    selectedIngredients: string[];
    filterType: "full" | "bounded";
    sortCriteria: "Rating" | "Alphabetical";
    sortType: "Ascending" | "Descending";
    matchingRecipes: string[];
    recommendedRecipes: string[];
    pageLoading: boolean;
    recipesLoading: boolean;
    recommendationsLoading: boolean;
}

// Initial state values
const initialState: RecipeFindState = {
    selectedIngredients: [],
    filterType: "bounded",
    sortCriteria: "Rating",
    sortType: "Descending",
    matchingRecipes: [],
    recommendedRecipes: [],
    pageLoading: true,
    recipesLoading: false,
    recommendationsLoading: false,
};

// Functions for state transitions
export const recipeFindState = createSlice({
    name: "recipeSearch",
    initialState,
    reducers: {
        // For ingredients addition
        setSelectedIngredients: (state, action: PayloadAction<string[]>) => {
            state.selectedIngredients = action.payload;
        },

        // For search type transitions
        setFilterType: (state, action: PayloadAction<"full" | "bounded">) => {
            state.filterType = action.payload;
        },

        sortCriteria: (
            state,
            action: PayloadAction<"Rating" | "Alphabetical">
        ) => {
            state.sortCriteria = action.payload;
        },

        setSortType: (
            state,
            action: PayloadAction<"Ascending" | "Descending">
        ) => {
            state.sortType = action.payload;
        },

        // For content transitions
        setMatchingRecipes: (state, action: PayloadAction<string[]>) => {
            state.matchingRecipes = action.payload;
        },

        setRecommendedRecipes: (state, action: PayloadAction<string[]>) => {
            state.recommendedRecipes = action.payload;
        },

        // For loading transitions
        setPageLoading: (state, action: PayloadAction<boolean>) => {
            state.pageLoading = action.payload;
        },
        setRecipesLoading: (state, action: PayloadAction<boolean>) => {
            state.recipesLoading = action.payload;
        },
        setRecommendationsLoading: (state, action: PayloadAction<boolean>) => {
            state.recommendationsLoading = action.payload;
        },
    },
});

// Export state transition functions
export const {
    setSelectedIngredients,
    setFilterType,
    sortCriteria,
    setSortType,
    setMatchingRecipes,
    setRecommendedRecipes,
    setPageLoading,
    setRecipesLoading,
    setRecommendationsLoading,
} = recipeFindState.actions;

// Export state value selection functions
export const selectSelectedIngredients = (state: RootState) =>
    state.recipeFind.selectedIngredients;
export const selectFilterType = (state: RootState) =>
    state.recipeFind.filterType;
export const selectSortType = (state: RootState) => state.recipeFind.sortType;
export const selectMatchingRecipes = (state: RootState) =>
    state.recipeFind.matchingRecipes;
export const selectRecommendedRecipes = (state: RootState) =>
    state.recipeFind.recommendedRecipes;
export const selectPageLoading = (state: RootState) =>
    state.recipeFind.pageLoading;
export const selectRecipesLoading = (state: RootState) =>
    state.recipeFind.recipesLoading;
export const selectRecommendationsLoading = (state: RootState) =>
    state.recipeFind.recommendationsLoading;

// Export reducer
export default recipeFindState.reducer;
