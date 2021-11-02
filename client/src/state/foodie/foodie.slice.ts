import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Foodie } from "./foodie.type";

// State type definition
interface FoodieState {
    foodie: Foodie | null;
    jwt: string | null;
}

// Initial state values
const initialState: FoodieState = {
    foodie: null,
    jwt: null,
};

// Slice (Reducer + Actions)
export const foodieSlice = createSlice({
    name: "foodie",
    initialState,
    reducers: {
        // User
        setFoodie: (state, action: PayloadAction<Foodie>) => {
            state.foodie = action.payload;
        },

        //JWT
        setJwt: (state, action: PayloadAction<string>) => {
            window.localStorage.setItem("Token", action.payload);
            state.jwt = action.payload;
        },
    },
});

// Export actions
export const { setFoodie, setJwt } = foodieSlice.actions;

// Export reducer
export default foodieSlice.reducer;
