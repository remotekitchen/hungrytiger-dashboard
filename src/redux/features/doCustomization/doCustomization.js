import { apiSlice } from "../api/apiSlice";

export const deliveryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUpdatedDeliveryFees: builder.query({
      query: () => ({
        url: `billing/v1/restaurant-fee/`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["DELIVERY_FEES"],
    }),
    saveDeliveryFees: builder.mutation({
      query: (data) => ({
        url: `billing/v1/restaurant-fee/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["DELIVERY_FEES"],
    }),
    updateDeliveryFee: builder.mutation({
      query: ({ id, data }) => ({
        url: `billing/v1/restaurant-fee/item/?id=${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["DELIVERY_FEES"],
    }),
  }),
});

export const {
  useGetUpdatedDeliveryFeesQuery,
  useSaveDeliveryFeesMutation,
  useUpdateDeliveryFeeMutation,
} = deliveryApi;
