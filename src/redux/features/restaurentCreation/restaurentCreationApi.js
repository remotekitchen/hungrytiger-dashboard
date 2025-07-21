import { apiSlice } from "../api/apiSlice";

export const restaurantCreationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRestaurant: builder.mutation({
      query: (data) => {
        return {
          url: "food/v1/restaurant/",
          method: "POST",
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
          body: data,
        };
      },
      invalidatesTags: ["Restaurant"],
    }),
    getAllRestaurant: builder.query({
      query: () => ({
        url: "food/v1/restaurant",
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
          // Authorization: `token 0e036a5f7c5117ee56aa1f434e41bc3013339ed1`,
        },
      }),
      providesTags: ["Restaurant"],
    }),
    getRestaurantDetails: builder.query({
      query: (restaurantId) => ({
        url: `food/v1/restaurant/item/?id=${restaurantId}`,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
          // Authorization: `token 0e036a5f7c5117ee56aa1f434e41bc3013339ed1`,
        },
      }),
      providesTags: (result, error, restaurantId) => [
        { type: "Restaurant", id: restaurantId }, // Provide the specific Restaurant tag
      ],
    }),
    deleteRestaurant: builder.mutation({
      query: (id) => ({
        url: `food/v1/restaurant/item/?id=${id}`,
        method: "DELETE",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
          // Authorization: `token 0e036a5f7c5117ee56aa1f434e41bc3013339ed1`,
        },
      }),
      invalidatesTags: ["Restaurant"],
    }),
    updateRestaurant: builder.mutation({
      query: ({ id, editRestaurant }) => {
        return {
          url: `food/v1/restaurant/item/?id=${id}`,
          method: "PATCH",
          body: editRestaurant,
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
        };
      },
      invalidatesTags: ["Restaurant"],
    }),
    getQRLinks: builder.query({
      query: (locationId) => ({
        url: `qr_code/v1/generate_qr/${locationId}`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
          // Authorization: `token 0e036a5f7c5117ee56aa1f434e41bc3013339ed1`,
        },
      }),
    }),
  }),
});
export const {
  useGetAllRestaurantQuery,
  useCreateRestaurantMutation,
  useDeleteRestaurantMutation,
  useGetRestaurantDetailsQuery,
  useUpdateRestaurantMutation,
  useGetQRLinksQuery,
} = restaurantCreationApi;
