import { apiSlice } from "../api/apiSlice";

export const modifierGroupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getModifierGroup: builder.query({
      query: ({ page, restaurantId, menuIds, locationId }) => ({
        url: `food/v1/modifier-group/?page=${page}&restaurant=${restaurantId}&menu=${menuIds}&location=${locationId}`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["ModifierGroup"],
    }),
    // v2 API for GET Modifier Group
    getModifierGroupWithoutPagination: builder.query({
      query: ({ restaurantId, menuIds, locationId }) => ({
        url: `food/v2/modifier-group/?restaurant=${restaurantId}&menu=${menuIds}&location=${locationId}`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["ModifierGroup"],
    }),

    updateModifierItem: builder.mutation({
      query: ({ id, item }) => {
        return {
          url: `food/v1/menu-item/item/?id=${id}`,
          method: "PATCH",
          body: item,
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
        };
      },
      invalidatesTags: ["ModifierGroup"],
    }),
    getModifierGroupById: builder.query({
      query: (id) => ({
        url: `food/v1/modifier-group/item/?id=${id}`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["ModifierGroup"],
    }),
    addModifierGroup: builder.mutation({
      query: (data) => ({
        url: `food/v1/modifier-group/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["ModifierGroup"],
    }),
    updateModifierGroup: builder.mutation({
      query: ({ id, modifierGroupItem }) => ({
        url: `food/v1/modifier-group/item/?id=${id}`,
        method: "PATCH",
        body: modifierGroupItem,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["ModifierGroup"],
    }),
    deleteModifierGroup: builder.mutation({
      query: (id) => ({
        url: `food/v1/modifier-group/item/?id=${id}`,
        method: "DELETE",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["ModifierGroup"],
    }),
    createModifierGroupFromExcel: builder.mutation({
      query: (data) => ({
        url: "food/v1/modifier/excel/",
        method: "POST",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
        body: data,
      }),
      invalidatesTags: ["ModifierGroup"],
    }),
    addModifierItems: builder.mutation({
      query: (data) => ({
        url: "food/v1/modifiers-items-order/",
        method: "POST",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
        body: data,
      }),
      invalidatesTags: ["ModifierGroup"],
    }),

    addModifierUsedByItems: builder.mutation({
      query: (data) => ({
        url: "food/v1/modifiers-groups-order/",
        method: "POST",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
        body: data,
      }),
      invalidatesTags: ["ModifierGroup"],
    }),
    deleteModifierItems: builder.mutation({
      query: (id) => ({
        url: `food/v1/modifiers-items-order/${id}/`,
        method: "DELETE",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["ModifierGroup"],
    }),
    deleteModifierUsedByItems: builder.mutation({
      query: (id) => ({
        url: `food/v1/modifiers-groups-order/${id}/`,
        method: "DELETE",
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

export const {
  useGetModifierGroupQuery,
  useGetModifierGroupWithoutPaginationQuery,
  useUpdateModifierItemMutation,
  useGetModifierGroupByIdQuery,
  useAddModifierGroupMutation,
  useUpdateModifierGroupMutation,
  useDeleteModifierGroupMutation,
  useCreateModifierGroupFromExcelMutation,
  useAddModifierItemsMutation,
  useAddModifierUsedByItemsMutation,
  useDeleteModifierItemsMutation,
  useDeleteModifierUsedByItemsMutation,
} = modifierGroupApi;
