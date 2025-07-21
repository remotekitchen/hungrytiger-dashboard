import { apiSlice } from "../api/apiSlice";

export const customerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerProfile: builder.query({
      query: (id) => ({
        url: `billing/v1/customer-dont-ordered/${id}`,
        method: "get",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
    }),
  }),
});

export const { useGetCustomerProfileQuery } = customerApi;
