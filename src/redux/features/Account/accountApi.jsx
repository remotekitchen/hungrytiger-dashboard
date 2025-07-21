import { apiSlice } from "../api/apiSlice"

export const accountApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAccountDetails: builder.query({
            query: () => ({
                url: `accounts/v1/user/item/`,
                method: "GET",
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            providesTags: ["Account"]
        }),
        updateAccountDetails: builder.mutation({
            query: (userData) => ({
                url: `accounts/v1/user/item/`,
                method: "PATCH",
                body: userData,
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["Account"],
        }),
        changePassword: builder.mutation({
            query: ({old_password, password}) => ({
                url: `accounts/v1/change-password/`,
                method: "PATCH",
                body: {
                    old_password,
                    password
                },
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["Account"],
        }),
    }),
    // overrideExisting: false,
})

export const { useGetAccountDetailsQuery, useUpdateAccountDetailsMutation, useChangePasswordMutation } = accountApi;
