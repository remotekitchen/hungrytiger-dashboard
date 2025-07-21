import { apiSlice } from "../api/apiSlice";

export const deliveryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateMenuListOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `food/v1/menu/item/?id=${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["Menu"],
    }),
  }),
});

export const { useUpdateMenuListOrderMutation } = deliveryApi;
