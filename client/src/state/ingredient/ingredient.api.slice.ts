import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../config/api";
import { Response } from "../types/response.type";
export const ingredientApiSlice = createApi({
    reducerPath: "ingredient-api",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders(headers) {
            headers.set(
                "Authorization",
                "Bearer " + window.localStorage.getItem("Token")
            );
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    endpoints(builder) {
        return {
            fetchIngredients: builder.mutation<Response, any>({
                query() {
                    return {
                        url: "/ingredients",
                        method: "GET",
                    };
                },
            }),
        };
    },
});

export const { useFetchIngredientsMutation } = ingredientApiSlice;
