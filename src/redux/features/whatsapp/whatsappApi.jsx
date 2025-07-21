import { apiSlice } from "../api/apiSlice";

export const whatsappApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addWhatsApp: builder.mutation({
      query: (data) => ({
        url: `wappmsg/v1/whasApp-template/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["WhatsApp"],
    }),
    sendWhatsApp: builder.mutation({
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
      invalidatesTags: ["WhatsApp"],
    }),
  }),
});

export const { useAddWhatsAppMutation, useSendWhatsAppMutation } = whatsappApi;
