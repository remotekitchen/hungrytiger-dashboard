import { apiSlice } from "../api/apiSlice";

export const deliveryFeeAssociationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDeliveryFee: builder.query({
      query: (id) => ({
        url: `billing/v1/DeliverySet/RUD?id=${id}`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
    }),
    getDeliveryFees: builder.query({
      query: ({ restaurantId }) => ({
        url: `billing/v1/DeliverySet/RUD?restaurant=${restaurantId}`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
    }),

    editDeliveryFee: builder.mutation({
      query: ({ id, item }) => ({
        url: `billing/v1/DeliverySet/RUD/?id=${id}`,
        method: "PATCH",
        body: item,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["Item"],
    }),

    deleteDeliveryFee: builder.query({
      query: (id) => ({
        url: `billing/v1/DeliverySet/RUD?id=${id}`,
        method: "delete",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
    }),
    createDeliveryFee: builder.mutation({
      query: (data) => ({
        url: "billing/v1/DeliverySet/",
        method: "post",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
          // Authorization: `token 0e036a5f7c5117ee56aa1f434e41bc3013339ed1`,
        },
        body: data,
      }),
    }),

    ListDeliveryFee: builder.query({
      query: (data) => ({
        url: "billing/v1/DeliverySet/",
        method: "get",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,

          // Authorization: `token 0e036a5f7c5117ee56aa1f434e41bc3013339ed1`,
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useListDeliveryFeeQuery,
  useGetDeliveryFeeQuery,
  useCreateDeliveryFeeMutation,
  useEditDeliveryFeeMutation,
  useDeleteDeliveryFeeQuery,
  useGetDeliveryFeesQuery,
} = deliveryFeeAssociationApi;
