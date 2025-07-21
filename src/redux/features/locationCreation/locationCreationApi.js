import { apiSlice } from "../api/apiSlice";

export const locationCreationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLocation: builder.mutation({
      query: (data) => {
        return {
          url: "food/v1/location/",
          method: "POST",
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
          body: data,
        };
      },
      invalidatesTags: ["Location", "Restaurant"],
    }),
    updateLocationDirectOrder: builder.mutation({
      query: ({ id, restaurant, direct_order }) => {
        return {
          url: `food/v1/location/path/?id=${id}`,
          method: "PATCH",
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ direct_order: !direct_order }),
        };
      },
      invalidatesTags: (result, error, { restaurant }) => [
        { type: "Restaurant", restaurant }, // Invalidate the specific Location tag
      ],
    }),
    getLocation: builder.query({
      query: () => ({
        url: "food/v1/location/",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["Location"],
    }),
    updateLocation: builder.mutation({
      query: ({ locationId, data }) => ({
        url: `food/v1/location/path/?id=${locationId}`,
        method: "PATCH",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["Location", "Restaurant"],
    }),
  }),
});
export const {
  useCreateLocationMutation,
  useUpdateLocationDirectOrderMutation,
  useGetLocationQuery,
  useUpdateLocationMutation,
} = locationCreationApi;
