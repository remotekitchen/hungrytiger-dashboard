import { apiSlice } from "../api/apiSlice";

export const giftCardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGiftCard: builder.query({
            query: () => ({
                url: `marketing/v1/gift-card/`,
                method: "GET",
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            providesTags: ["GiftCard"]
        }),
        addGiftCard: builder.mutation({
            query: (data) => ({
                url: `marketing/v1/gift-card/`,
                method: "POST",
                body: data,
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["GiftCard"],
        }),
        updateGiftCard: builder.mutation({
            query: ({id, giftCardItem}) => ({
                url: `marketing/v1/gift-card/item/?id=${id}`,
                method: "PATCH",
                body: giftCardItem,
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["GiftCard"],
        }),
        deleteGiftCard: builder.mutation({
            query: (id) => ({
                url: `marketing/v1/gift-card/item/?id=${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["GiftCard"],
        }),
    }),
});

export const {
    useGetGiftCardQuery,
    useAddGiftCardMutation,
    useUpdateGiftCardMutation,
    useDeleteGiftCardMutation,
} = giftCardApi;

