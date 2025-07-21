import { apiSlice } from "../api/apiSlice";
import { createdMenu } from "./menuCreationSlice";

export const menuCreationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoints wil be here
    getRestaurents: builder.query({
      query: () => ({
        url: "food/v1/restaurant/",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
          // Authorization: `token 0e036a5f7c5117ee56aa1f434e41bc3013339ed1`,
        },
      }),
    }),
    getLocations: builder.query({
      query: ({ restaurantId }) => ({
        url: `food/v1/location/${
          restaurantId ? `?restaurant=${restaurantId}` : ""
        }`,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
          // Authorization: `token 0e036a5f7c5117ee56aa1f434e41bc3013339ed1`,
        },
      }),
    }),
    createMenu: builder.mutation({
      query: (data) => {
        return {
          url: "food/v1/menu/",
          method: "POST",
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
          body: data,
        };
      },
      invalidatesTags: ["Menu"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            createdMenu({
              data: result.data,
            })
          );
        } catch (err) {
          // console.log(err)
        }
      },
    }),
    createMenuFromExcel: builder.mutation({
      query: (data) => ({
        url: "food/v1/menu/excel/",
        method: "POST",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
        body: data,
      }),
      invalidatesTags: ["Menu"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            createdMenu({
              data: result.data,
            })
          );
        } catch (err) {
          // console.log(err)
        }
      },
    }),
    getAllMenu: builder.query({
      query: ({ restaurantId, locationId, page, page_size }) => {
        // Build the query string conditionally
        let queryParams = [];
        if (restaurantId) queryParams.push(`restaurant=${restaurantId}`);
        if (locationId) queryParams.push(`location=${locationId}`);
        if (page_size) queryParams.push(`page_size=${page_size}`);
        if (page) queryParams.push(`page=${page}`);
        const queryString = queryParams.length
          ? `?${queryParams.join("&")}`
          : "";

        return {
          url: `food/v1/menu/${queryString}`,
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
        };
      },
      providesTags: ["Menu"],
    }),

    // getAllMenu: builder.query({
    //   query: (queryData) => {
    //     let queryParams = "";
    //     if (typeof queryData === "object") {
    //       for (const d in queryData) {
    //         queryParams += `${d}=${queryData[d]}&`;
    //       }
    //     } else if (typeof queryData === "number") {
    //       queryParams = `locations=${queryData}`;
    //     } else if (typeof queryData === "string") {
    //       queryParams = `restaurant=${queryData}`;
    //     } else {
    //       queryParams = "";
    //     }
    //     return {
    //       url: `food/v1/menu/?${queryParams}`,
    //       headers: {
    //         Authorization: `token ${
    //           JSON.parse(localStorage.getItem("auth")).token
    //         }`,
    //       },
    //     };
    //   },

    //   providesTags: ["Menu"],
    // }),

    updateMenu: builder.mutation({
      query: ({ id, editMenu }) => ({
        url: `food/v1/menu/item/?id=${id}`,
        method: "PATCH",
        body: editMenu,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["Menu"],
    }),

    deleteMenu: builder.mutation({
      query: (id) => ({
        url: `food/v1/menu/item/?id=${id}`,
        method: "DELETE",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["Menu"],
    }),

    getMenuDetails: builder.query({
      query: (menuId) => ({
        url: `food/v1/menu/item/?id=${menuId}`,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
          //   Authorization: `token 0e036a5f7c5117ee56aa1f434e41bc3013339ed1`,
        },
      }),
      providesTags: ["Item"],
    }),
    // menu scheduling
    menuOperatingHours: builder.mutation({
      query: ({ menuId, operatingHours }) => ({
        url: `food/v1/menu-opening-time-update/${menuId}/`,
        method: "PATCH",
        body: operatingHours,
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
export const {
  useGetRestaurentsQuery,
  useGetLocationsQuery,
  useCreateMenuMutation,
  useCreateMenuFromExcelMutation,
  useGetAllMenuQuery,
  useGetMenuDetailsQuery,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
  useMenuOperatingHoursMutation,
} = menuCreationApi;
