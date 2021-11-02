import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../config/api";
import { Response } from "../types/response.type";
import { store } from "..";

export const ingredientApiSlice = createApi({
    reducerPath: "ingredient-api",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders(headers, { getState }) {
            headers.set("jwt", "Bearer " + store.getState().foodie.jwt);
            return headers;
        },
    }),
    endpoints(builder) {
        return {
            fetchIngredients: builder.query<Response, null>({
                query() {
                    return {
                        url: "/ingredient/",
                        method: "GET",
                    };
                },
            }),
        };
    },
});

export const { useFetchIngredientsQuery } = ingredientApiSlice;
