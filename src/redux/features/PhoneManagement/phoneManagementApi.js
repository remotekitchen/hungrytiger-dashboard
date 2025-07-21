import { apiSlice } from "../api/apiSlice";

export const phoneManageMentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurantPhoneManagement: builder.query({
      query: () => ({
        url: `food/v1/List-Of-Restaurants-For-Order-Call`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["Restaurant"],
    }),
  }),
});

export const { useGetRestaurantPhoneManagementQuery } = phoneManageMentApi;
