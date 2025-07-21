import { apiSlice } from "../api/apiSlice";

export const itemsSortingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateItemsListOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `food/v1/menu-item/item/?id=${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["Items"],
    }),
  }),
});

export const { useUpdateItemsListOrderMutation } = itemsSortingApi;
