import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';


export const testApi = createApi({
    reducerPath: "test",
    baseQuery: axiosBaseQuery(),
    refetchOnFocus: true,
    tagTypes: ["test"],
    endpoints: (builder) => ({
        getTest: builder.query({
            query: () => ({
                url: "/user",
            }),
            providesTags: (result) => {
                result ? [...result.map((item) => ({ type: "test", id: item._id })), { type: "test", id: "default" }] : [{ type: "test", id: "default" }]
            },
        }),
        addTest: builder.mutation({
            query: (body) => ({
                url: "/user",
                method: "POST",
                body,
            }),
            invalidatesTags: (result, err, body) => [{ type: "test", id: result.id }]
        })
    })
})

export const { useGetTestQuery, useAddTestMutation } = testApi