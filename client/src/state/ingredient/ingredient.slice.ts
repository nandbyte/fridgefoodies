import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "../types/ingredient.type";

// State type definition
interface IngredientState {
    ingredientList: Ingredient[];
}

// Initial state values
const initialState: IngredientState = {
    ingredientList: [],
};

// Slice (Reducer + Actions)
export const ingredientSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        // Set ingredients
        setIngredients: (state, action: PayloadAction<Ingredient[]>) => {
            state.ingredientList = action.payload;
        },
    },
});

// Export actions
export const { setIngredients } = ingredientSlice.actions;

// Export reducer
export default ingredientSlice.reducer;
