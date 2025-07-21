import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateCategoryListOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `food/v1/category/item/?id=${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const { useUpdateCategoryListOrderMutation } = categoryApi;
