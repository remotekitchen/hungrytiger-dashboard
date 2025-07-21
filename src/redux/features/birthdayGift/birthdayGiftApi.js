import { apiSlice } from "../api/apiSlice";

export const birthdayGiftApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBirthdayGift: builder.query({
            query: () => ({
                url: `marketing/v1/birthday-gift/`,
                method: "GET",
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            providesTags: ["BirthdayGift"]
        }),
        getActivationCampaign: builder.query({
            query: () => ({
                url: `marketing/v1/activation-campaign/`,
                method: "GET",
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            providesTags: ["BirthdayGift"]
        }),
        addBirthdayGift: builder.mutation({
            query: (data) => ({
                url: `marketing/v1/birthday-gift/`,
                method: "POST",
                body: data,
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["BirthdayGift"],
        }),
        updateBirthdayGift: builder.mutation({
            query: ({id, birthdayGiftItem}) => ({
                url: `marketing/v1/birthday-gift/item/?id=${id}`,
                method: "PATCH",
                body: birthdayGiftItem,
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["BirthdayGift"],
        }),
        deleteBirthdayGift: builder.mutation({
            query: (id) => ({
                url: `marketing/v1/birthday-gift/item/?id=${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["BirthdayGift"],
        }),
    }),
});

export const {
    useGetBirthdayGiftQuery,
    useAddBirthdayGiftMutation,
    useUpdateBirthdayGiftMutation,
    useDeleteBirthdayGiftMutation,
    useGetActivationCampaignQuery
} = birthdayGiftApi;

