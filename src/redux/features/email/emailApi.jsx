import { apiSlice } from "../api/apiSlice";

export const emailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmail: builder.query({
      query: (id) => ({
        url: `marketing/v1/email-configurations/restaurant/?restaurant=${id}`,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["EMAIL"],
    }),
    sendEmail: builder.mutation({
      query: (data) => ({
        url: `marketing/v1/email/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["EMAIL"],
    }),
    saveEmail: builder.mutation({
      query: (data) => ({
        url: `marketing/v1/email-configurations/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["EMAIL"],
    }),
    updateEmail: builder.mutation({
      query: ({ id, data }) => ({
        url: `marketing/v1/email-configurations/restaurant/?restaurant=${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["EMAIL"],
    }),
    deleteEmail: builder.mutation({
      query: ({ id }) => ({
        url: `marketing/v1/email-configurations/restaurant/?id=${id}`,
        method: "DELETE",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["EMAIL"],
    }),
  }),
});

export const {
  useGetEmailQuery,
  useSendEmailMutation,
  useSaveEmailMutation,
  useUpdateEmailMutation,
  useDeleteEmailMutation,
} = emailApi;
