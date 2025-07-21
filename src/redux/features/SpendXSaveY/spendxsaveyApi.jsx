import { apiSlice } from "../api/apiSlice";

export const spendxsaveyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Old API
    // getSpendXSaveY: builder.query({
    //   query: () => ({
    //     url: `marketing/v1/spendx-savey/`,
    //     method: "GET",
    //     headers: {
    //       Authorization: `token ${
    //         JSON.parse(localStorage.getItem("auth")).token
    //       }`,
    //     },
    //   }),
    //   providesTags: ["SpendXSaveY"],
    // }),
    getSpendXSaveY: builder.query({
      query: () => ({
        url: `marketing/v1/spendx-savey/manager/`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["SpendXSaveY"],
    }),
    getSpendXSaveYPromoOptions: builder.query({
      query: () => ({
        url: `marketing/v1/spendx-savey/promo-option/`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["SpendXSaveY"],
    }),
    // old API  - !DO NOT REMOVE
    // addSpendXSaveY: builder.mutation({
    //     query: (data) => ({
    //         url: `marketing/v1/spendx-savey/`,
    //         method: "POST",
    //         body: data,
    //         headers: {
    //             Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
    //                 }`,
    //         },
    //     }),
    //     invalidatesTags: ["SpendXSaveY"],
    // }),
    addSpendXSaveY: builder.mutation({
      query: (data) => ({
        url: `marketing/v1/spendx-savey/manager/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["SpendXSaveY"],
    }),
    // old API !DO Not Remove
    // updateSpendXSaveY: builder.mutation({
    //   query: ({ id, spendxsaveyItem }) => ({
    //     url: `marketing/v1/spendx-savey/item/?id=${id}`,
    //     method: "PATCH",
    //     body: spendxsaveyItem,
    //     headers: {
    //       Authorization: `token ${
    //         JSON.parse(localStorage.getItem("auth")).token
    //       }`,
    //     },
    //   }),
    //   invalidatesTags: ["SpendXSaveY"],
    // }),
    updateSpendXSaveY: builder.mutation({
      query: ({ id, spendxsaveyItem }) => ({
        url: `marketing/v1/spendx-savey/manager/item/?id=${id}`,
        method: "PATCH",
        body: spendxsaveyItem,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["SpendXSaveY"],
    }),
    deleteSpendXSaveY: builder.mutation({
      query: (id) => ({
        url: `marketing/v1/spendx-savey/manager/item/?id=${id}`,
        method: "DELETE",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["SpendXSaveY"],
    }),
  }),
  // overrideExisting: false,
});

export const {
  useGetSpendXSaveYQuery,
  useAddSpendXSaveYMutation,
  useUpdateSpendXSaveYMutation,
  useGetSpendXSaveYPromoOptionsQuery,
  useDeleteSpendXSaveYMutation,
} = spendxsaveyApi;
