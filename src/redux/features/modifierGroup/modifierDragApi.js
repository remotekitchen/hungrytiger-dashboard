import { apiSlice } from "../api/apiSlice";

export const modifierDragApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateModifierListOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `food/v1/modifiers-groups-order/${id}/`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["ModifierGroup"],
    }),
  }),
});

export const { useUpdateModifierListOrderMutation } = modifierDragApi;
