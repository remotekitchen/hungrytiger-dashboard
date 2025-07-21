import { apiSlice } from "../api/apiSlice";

export const earningsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEarnings: builder.query({
      query: (id) => ({
        url: `billing/v1/get-invoices/${id}`,
        method: "GET",
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
            }`,
        },
      }),
      providesTags: ["Invoice"],
    }),
    updateEarnings: builder.mutation({
      query: ({ id, InvoiceData }) => ({
        url: `billing/v1/get-invoices/${id}/`,
        method: "PATCH",
        body: InvoiceData,
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
            }`,
        },
      }),
      invalidatesTags: ["Invoice"],
    }),
    deleteEarnings: builder.mutation({
      query: (id) => ({
        url: `billing/v1/delete-invoice/${id}/`,
        method: "DELETE",
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
            }`,
        },
      }),
      invalidatesTags: ["Invoice"],
    }),
    sendMail: builder.mutation({
      query: (id) => ({
        url: `billing/v1/send-invoice-email/${id}/`,
        method: "POST",
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
            }`,
        },
      }),
    }),
    generateStatements: builder.mutation({
      query: ({ startDate, endDate }) => ({
        url: `billing/v1/generate-invoice/?start_date=${startDate}&end_date=${endDate}&generate=yes`,
        method: "GET",
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token}`,
        },
      }),
      providesTags: ["Invoice"],
    }),
  }),
});

export const {
  useGetEarningsQuery, useUpdateEarningsMutation,
  useDeleteEarningsMutation,
  useSendMailMutation,
  useGenerateStatementsMutation,
} = earningsApi;
