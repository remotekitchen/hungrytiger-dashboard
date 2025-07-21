import { apiSlice } from "../api/apiSlice";

const fissionCampaignApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFissionCampaigns: builder.query({
      query: (restaurantId) => ({
        url: `marketing/v1/lucky-flip?restaurant=${restaurantId}`,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["FissionCampaign"],
    }),
    getFissionCampaignsRestaurantLogo: builder.query({
      query: (restaurantId) => ({
        url: `food/v1/restaurant/item/?id=${restaurantId}`,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["FissionCampaign"],
    }),
    addFissionCampaign: builder.mutation({
      query: (data) => ({
        url: `marketing/v1/lucky-flip/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["FissionCampaign"],
    }),
    updateFissionCampaign: builder.mutation({
      query: ({ data, campaignId }) => ({
        url: `marketing/v1/lucky-flip/item/?id=${campaignId}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["FissionCampaign"],
    }),
    updateFissionCampaignRestaurantLogo: builder.mutation({
      query: ({ data, restaurantId }) => ({
        url: `food/v1/restaurant/item/?id=${restaurantId}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["FissionCampaign"],
    }),
    deleteFissionCampaign: builder.mutation({
      query: ({ campaignId }) => ({
        url: `marketing/v1/lucky-flip/item/?id=${campaignId}`,
        method: "DELETE",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["FissionCampaign"],
    }),
  }),
});
export const {
  useAddFissionCampaignMutation,
  useGetFissionCampaignsQuery,
  useUpdateFissionCampaignMutation,
  useGetFissionCampaignsRestaurantLogoQuery,
  useUpdateFissionCampaignRestaurantLogoMutation,
  useDeleteFissionCampaignMutation,
} = fissionCampaignApi;
export default fissionCampaignApi.reducer;
