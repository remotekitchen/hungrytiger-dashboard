import { apiSlice } from "../api/apiSlice";

export const salesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalesData: builder.query({
      query: () => ({
        url: `billing/v1/order/merchant/`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      //   providesTags: [""],
    }),
    getSalesDataUpdate: builder.query({
      query: ({ start_date, end_date, restaurantId, day, orderMethod }) => {
        // Construct the query parameters conditionally
        const queryParams = new URLSearchParams();

        if (start_date) queryParams.append("start", start_date);
        if (end_date) queryParams.append("end", end_date);
        if (restaurantId) queryParams.append("restaurant", restaurantId);

        // Check if 'day' is 7 or 30 and convert it to a number
        if (day == 7 || day == 30) {
          queryParams.append("date", Number(day));
        } else if (day) {
          queryParams.append("date", day);
        }

        if (orderMethod) queryParams.append("order_method", orderMethod);

        return {
          url: `dashboard/analytics/v1/order-data?${queryParams.toString()}`,
          method: "GET",
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
        };
      },
      // providesTags: [""],
    }),
  }),
});

export const { useGetSalesDataQuery, useGetSalesDataUpdateQuery } = salesApi;
