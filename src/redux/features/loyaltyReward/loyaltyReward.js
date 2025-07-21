import { apiSlice } from "../api/apiSlice";

export const loyaltyRewardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoyaltyReward: builder.query({
      query: ({ page, restaurantId }) => ({
        url: `reward/v1/reward-level/?page=${page}&&restaurant=${restaurantId}`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["Redeem"],
    }),
    addLoyaltyReward: builder.mutation({
      query: (data) => ({
        url: `reward/v1/reward-level/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["Redeem"],
    }),
    updateLoyaltyReward: builder.mutation({
      query: ({ id, data }) => ({
        url: `reward/v1/reward-level/item/?id=${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["Redeem"],
    }),

    deleteLoyaltyReward: builder.mutation({
      query: (id) => ({
        url: `reward/v1/reward-level/item/?id=${id}`,
        method: "DELETE",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["Redeem"],
    }),
  }),
});

export const {
  useAddLoyaltyRewardMutation,
  useGetLoyaltyRewardQuery,
  useUpdateLoyaltyRewardMutation,
  useDeleteLoyaltyRewardMutation,
} = loyaltyRewardApi;
