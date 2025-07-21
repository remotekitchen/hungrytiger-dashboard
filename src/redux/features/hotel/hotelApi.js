import { apiSlice } from "../api/apiSlice";

export const hotelAdmin = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // hotel user management
    addHotelOwnerAccount: builder.mutation({
      query: (data) => ({
        url: `hotel/v1/admin/hotel-owners/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["HOTEL"],
    }),

    getHotelOwners: builder.query({
      query: () => ({
        url: `hotel/v1/admin/hotel-owners/`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["HOTEL"],
    }),
    deleteHotelOwner: builder.mutation({
      query: (id) => ({
        url: `hotel/v1/admin/hotel-owners/${id}/`,
        method: "DELETE",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["HOTEL"],
    }),
    updateHotelOwner: builder.mutation({
      query: ({ id, hotelOwnerDetails }) => ({
        url: `hotel/v1/admin/hotel-owners/${id}/`,
        method: "PATCH",
        body: hotelOwnerDetails,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["HOTEL"],
    }),

    // hotel management
    addHotel: builder.mutation({
      query: (data) => ({
        url: `hotel/v1/manage-hotels/`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["HOTEL"],
    }),

    getHotels: builder.query({
      query: () => ({
        url: `hotel/v1/manage-hotels/`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["HOTEL"],
    }),
    deleteHotel: builder.mutation({
      query: (id) => ({
        url: `hotel/v1/manage-hotels/${id}/`,
        method: "DELETE",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["HOTEL"],
    }),
    updateHotel: builder.mutation({
      query: ({ id, hotelOwnerDetails }) => ({
        url: `hotel/v1/manage-hotels/${id}/`,
        method: "PATCH",
        body: hotelOwnerDetails,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["HOTEL"],
    }),
  }),
});

export const {
  useAddHotelOwnerAccountMutation,
  useGetHotelOwnersQuery,
  useDeleteHotelOwnerMutation,
  useUpdateHotelOwnerMutation,
  useAddHotelMutation,
  useGetHotelsQuery,
  useDeleteHotelMutation,
  useUpdateHotelMutation,
} = hotelAdmin;
