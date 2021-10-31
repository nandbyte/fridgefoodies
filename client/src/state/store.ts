import { recipeFindState } from "./slices/recipe.find.slice";
// import { applyMiddleware, createStore } from "redux";
// import thunk from "redux-thunk";
// import reducers from "./reducers";

// export const store = createStore(reducers, {}, applyMiddleware(thunk));

import { configureStore } from "@reduxjs/toolkit";
// ...

export const store = configureStore({
    reducer: {
        // recipeCreation: recipeCreationReducer,
        recipeFind: recipeFindState.reducer,
        // recipeSearchAdvanced: recipeSearchAdvancedReducer,
        // user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
