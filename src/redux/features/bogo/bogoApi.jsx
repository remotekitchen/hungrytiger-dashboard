import { apiSlice } from "../api/apiSlice";

export const bogoApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBogo: builder.query({
            query: () => ({
                url: `marketing/v1/bogo/`,
                method: "GET",
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            providesTags: ["Bogo"]
        }),
        getBogoPromoOptions: builder.query({
            query: () => ({
                url: `marketing/v1/bogo/promo-option/`,
                method: "GET",
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            providesTags: ["Bogo"]
        }),
        addBogo: builder.mutation({
            query: (data) => ({
                url: `marketing/v1/bogo/`,
                method: "POST",
                body: data,
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["Bogo"],
        }),
        updateBogo: builder.mutation({
            query: ({id, bogoItem}) => ({
                url: `marketing/v1/bogo/item/?id=${id}`,
                method: "PATCH",
                body: bogoItem,
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["Bogo"],
        }),
        deleteBogo: builder.mutation({
            query: (id) => ({
                url: `marketing/v1/bogo/item/?id=${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["Bogo"],
        }),
    }),
});

export const {
    useGetBogoQuery,
    useGetBogoPromoOptionsQuery,
    useAddBogoMutation,
    useUpdateBogoMutation,
    useDeleteBogoMutation
} = bogoApi;