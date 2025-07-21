import { apiSlice } from "../api/apiSlice";

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentDetails: builder.query({
      query: () => ({
        url: `billing/v1/payment-details/`,
        method: "GET",
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
            }`,
          // Authorization: `token 0e036a5f7c5117ee56aa1f434e41bc3013339ed1`,
        },
      }),
      providesTags: ["Payment"],
    }),
    createPaymentDetails: builder.mutation({
      query: (data) => ({
        url: `billing/v1/payment-details/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
            }`,
        },
      }),
      invalidatesTags: ["Payment"],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          paymentApi.util.updateQueryData(
            "getPaymentDetails",
            undefined,
            (draft) => {
              draft.results.push(data);
            }
          )
        );
      },
    }),
    updatePaymentDetails: builder.mutation({
      query: ({ id, editedData }) => ({
        url: `billing/v1/payment-details/item/?id=${id}`,
        method: "PATCH",
        body: editedData,
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
            }`,
        },
      }),
      invalidatesTags: ["Payment"],
    }),
    deletePaymentDetails: builder.mutation({
      query: (id) => ({
        url: `billing/v1/payment-details/item/?id=${id}`,
        method: "DELETE",
        headers: {
          Authorization: `${JSON.parse(localStorage.getItem("auth")).token}`,
        },
      }),
      invalidatesTags: ["Payment"],
    }),
    connectToStripe: builder.query({
      query: () => ({
        url: "billing/v1/connect-stripe/",
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
            }`,
        },
      }),
    }),

    connectedStripeAccounts: builder.query({
      query: () => ({
        url: "billing/v1/stripe-connect-account",
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
            }`,
        },
      }),
    }),
    setDefaultAccount: builder.mutation({
      query: (updatedData) => ({
        url: "billing/v1/billing-profile/",
        method: "PATCH",
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
            }`,
        },
        body: updatedData,
      }),
      invalidatesTags: ["Payment"],
    }),

    getDefaultAccount: builder.query({
      query: () => ({
        url: "billing/v1/billing-profile",
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
            }`,
        },
      }),
      providesTags: ["Payment"],
    }),
  }),
});
// overrideExisting: false,

export const {
  useGetPaymentDetailsQuery,
  useGetDefaultAccountQuery,
  useCreatePaymentDetailsMutation,
  useUpdatePaymentDetailsMutation,
  useDeletePaymentDetailsMutation,
  useConnectToStripeQuery,
  useConnectedStripeAccountsQuery,
  useSetDefaultAccountMutation,
} = paymentApi;
