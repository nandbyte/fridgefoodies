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
            login: builder.mutation<
                Response,
                { email: string; password: string }
            >({
                query({ email, password }) {
                    return {
                        url: "/login",
                        method: "POST",
                        body: { email: email, password: password },
                    };
                },
            }),
            register: builder.mutation<
                Response,
                { email: string; name: string; password: string }
            >({
                query({ email, name, password }) {
                    return {
                        url: "/foodie/register",
                        method: "POST",
                        body: { email: email, name: name, password: password },
                    };
                },
            }),
        };
    },
});

export const { useLoginMutation, useRegisterMutation } = foodieApiSlice;
