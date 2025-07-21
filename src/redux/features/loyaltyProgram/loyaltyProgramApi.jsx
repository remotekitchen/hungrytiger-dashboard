import { apiSlice } from "../api/apiSlice";

export const loyaltyProgramApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLoyaltyProgram: builder.query({
            query: () => ({
                url: `marketing/v1/loyalty-program/`,
                method: "GET",
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            providesTags: ["LoyaltyProgram"]
        }),
        addLoyaltyProgram: builder.mutation({
            query: (data) => ({
                url: `marketing/v1/loyalty-program/`,
                method: "POST",
                body: data,
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["LoyaltyProgram"],
        }),
        updateLoyaltyProgram: builder.mutation({
            query: ({id, loyaltyProgramItem}) => ({
                url: `marketing/v1/loyalty-program/item/?id=${id}`,
                method: "PATCH",
                body: loyaltyProgramItem,
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["LoyaltyProgram"],
        }),
        deleteLoyaltyProgram: builder.mutation({
            query: (id) => ({
                url: `marketing/v1/loyalty-program/item/?id=${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["LoyaltyProgram"],
        }),
    }),
});

export const {
    useGetLoyaltyProgramQuery,
    useAddLoyaltyProgramMutation,
    useUpdateLoyaltyProgramMutation,
    useDeleteLoyaltyProgramMutation,
} = loyaltyProgramApi;

