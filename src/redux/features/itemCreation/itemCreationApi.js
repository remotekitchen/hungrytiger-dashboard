import { apiSlice } from "../api/apiSlice";
import { createditem } from "./itemCreationSlice";

export const itemCreationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoints wil be here
    getItems: builder.query({
      query: ({ menuId, categoryId }) => ({
        //
        url: `food/v1/menu-item/?menu=${menuId}&category=${categoryId}`,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["Items"],
    }),
    getItemsWithoutPagination: builder.query({
      query: ({ restaurantId, menuId }) => {
        const url = `food/v2/menu-item/?restaurant=${restaurantId}${
          menuId ? `&menu=${menuId}` : ""
        }`;

        return {
          url,
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
        };
      },
      providesTags: ["Items"],
    }),

    getItemDetails: builder.query({
      query: ({ itemId }) => ({
        url: `food/v1/menu-item/item/?id=${itemId}`,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["Items"],
    }),
    // getAllItems: builder.query({
    //   query: ({ page, restaurantId, searchInputValue }) => ({
    //     url: `food/v1/menu-item/?search=${searchInputValue}&restaurant=${restaurantId}&page=${page}`,
    //     headers: {
    //       Authorization: `token ${
    //         JSON.parse(localStorage.getItem("auth")).token
    //       }`,
    //     },
    //   }),
    //   providesTags: ["Items"],
    // }),

    getAllItems: builder.query({
      query: ({ page, restaurantId, searchInputValue, locationId }) => {
        // Construct the URL based on the provided parameters or set them to empty if undefined
        const searchParam = searchInputValue
          ? `search=${searchInputValue}`
          : `search=`;
        const restaurantParam = restaurantId
          ? `&restaurant=${restaurantId}`
          : "";
        const locationParam = locationId ? `&location=${locationId}` : "";
        const pageParam = page ? `&page=${page}` : "";
        // // console.log(pageParam, "page param");

        return {
          url: `food/v1/menu-item/?${searchParam}${restaurantParam}${pageParam}${locationParam}&page_size=10`,
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
        };
      },
      providesTags: ["Items"],
    }),

    getSingleItem: builder.query({
      query: ({ id }) => ({
        url: `food/v1/menu/item/?id=${id}`,
        method: "GET",

        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),

      providesTags: ["Items"],
    }),
    createItem: builder.mutation({
      query: (data) => {
        return {
          url: "food/v1/menu-item/",
          method: "POST",
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
          body: data,
        };
      },
      invalidatesTags: ["Items"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // // console.log(result);
          dispatch(
            createditem({
              data: result.data,
            })
          );
          // eslint-disable-next-line no-empty
        } catch (err) {
          // console.log(err);
        }
      },
    }),
    // edit / update
    updateItem: builder.mutation({
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
      invalidatesTags: ["Items"],
    }),

    deleteItem: builder.mutation({
      query: (id) => {
        return {
          url: `food/v1/menu-item/item/?id=${id}`,
          method: "DELETE",
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
        };
      },
      invalidatesTags: ["Items"],
    }),
    deleteModifierItem: builder.mutation({
      query: (id) => {
        return {
          url: `food/v1/modifiers-groups-order/${id}/`,
          method: "DELETE",
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
        };
      },
      invalidatesTags: ["Items"],
    }),

    // edit / update
    changeAvailabilityOfItem: builder.mutation({
      query: ({ itemId, today, indefinite }) => {
        return {
          url: `food/v1/menu-item/availability/`,
          method: "PATCH",
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
          body: { itemId, today, indefinite },
        };
      },
      invalidatesTags: ["Items"],
    }),
    availabilityDuration: builder.mutation({
      query: ({ itemId, startTime, endTime }) => {
        return {
          url: `food/v1/${itemId}/availability/`,
          method: "PATCH",
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
          body: {
            available_start_time: startTime,
            available_end_time: endTime,
          },
        };
      },
      invalidatesTags: ["Items"],
    }),
  }),
});
export const {
  useCreateItemMutation,
  useGetItemsQuery,
  useGetItemDetailsQuery,
  useGetSingleItemQuery,
  useUpdateItemMutation,
  useChangeAvailabilityOfItemMutation,
  useGetAllItemsQuery,
  useDeleteItemMutation,
  useDeleteModifierItemMutation,
  useGetItemsWithoutPaginationQuery,
  useAvailabilityDurationMutation,
} = itemCreationApi;
