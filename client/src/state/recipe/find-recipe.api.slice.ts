import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../config/api";
import { Response } from "../types/response.type";

export const foodieApiSlice = createApi({
    reducerPath: "foodie-api",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders(headers) {
            return headers;
        },
    }),
    endpoints(builder) {
        return {
            getRecipeById: builder.mutation<Response, { id: number }>({
                query(id) {
                    return {
                        url: "/recipe/" + id,
                        method: "GET",
                    };
                },
            }),

            register: builder.mutation<
                Response,
                { email: string; name: string; password: string }
            >({
                query({ email, name, password }) {
                    return {
                        url: "/register",
                        method: "POST",
                        body: { email: email, name: name, password: password },
                    };
                },
            }),
        };
    },
});

export const { useGetRecipeByIdMutation } = foodieApiSlice;
