import { apiSlice } from "../api/apiSlice";

export const storeOpenClose = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStoreStatus: builder.query({
      query: ({ id }) => ({
        url: `food/v1/location/item/?id=${id}`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["STORE"],
    }),
    updateStoreStatus: builder.mutation({
      query: ({ locationId, storeStatus }) => ({
        url: `food/v1/location/item/?id=${locationId}`,
        method: "PATCH",
        body: storeStatus,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["STORE"],
    }),
  }),
});

export const { useGetStoreStatusQuery, useUpdateStoreStatusMutation } =
  storeOpenClose;
