import { apiSlice } from "../api/apiSlice";

export const groupOrderingApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGroupOrdering: builder.query({
            query: () => ({
                url: `marketing/v1/group-ordering/`,
                method: "GET",
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            providesTags: ["GroupOrdering"]
        }),
        getGroupOrderingPromoOptions: builder.query({
            query: () => ({
                url: `marketing/v1/group-ordering/promo-option/`,
                method: "GET",
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            providesTags: ["GroupOrdering"]
        }),
        addGroupOrdering: builder.mutation({
            query: (data) => ({
                url: `marketing/v1/group-ordering/`,
                method: "POST",
                body: data,
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["GroupOrdering"],
        }),
        updateGroupOrdering: builder.mutation({
            query: ({id,groupOrderingItem }) => ({
                url: `marketing/v1/group-ordering/item/?id=${id}`,
                method: "PATCH",
                body: groupOrderingItem,
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["GroupOrdering"],
        }),
        deleteGroupOrdering: builder.mutation({
            query: (id) => ({
                url: `marketing/v1/group-ordering/item/?id=${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["GroupOrdering"],
        }),
    }),
});

export const {
    useGetGroupOrderingQuery,
    useGetGroupOrderingPromoOptionsQuery,
    useAddGroupOrderingMutation,
    useUpdateGroupOrderingMutation,
    useDeleteGroupOrderingMutation,
} = groupOrderingApi;