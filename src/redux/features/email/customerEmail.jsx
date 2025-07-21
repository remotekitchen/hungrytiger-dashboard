import { apiSlice } from "../api/apiSlice";

export const customerEmailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    customerSendEmail: builder.mutation({
      query: ({ restaurantId, rewardId, amount, locationId }) => ({
        url: `billing/v1/customer-dont-ordered/${restaurantId}/?reward=${rewardId}&amount=${amount}&location=${locationId}`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
    }),
  }),
});

export const { useCustomerSendEmailMutation } = customerEmailApi;
