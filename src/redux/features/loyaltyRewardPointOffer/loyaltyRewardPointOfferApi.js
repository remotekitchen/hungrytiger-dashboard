import { apiSlice } from "../api/apiSlice";

export const loyaltyRewardPointOfferApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRewardPointOffer: builder.mutation({
      query: (data) => {
        return {
          url: "reward/v1/reward-point/offers/",
          method: "POST",
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
          body: data,
        };
      },
      invalidatesTags: ["Redeem"],
    }),
    getRewardPointOffer: builder.query({
      query: ({ page, restaurantId }) => {
        let url = `reward/v1/reward-point/offers/?direct_order=true&filter=available&page=${page}`;
        if (restaurantId) {
          url += `&restaurant=${restaurantId}`;
        }
        return {
          url: url,
          method: "GET",
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
        };
      },
      providesTags: ["Redeem"],
    }),
  }),
});
export const {
  useCreateRewardPointOfferMutation,
  useGetRewardPointOfferQuery,
} = loyaltyRewardPointOfferApi;
