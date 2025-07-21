import { apiSlice } from "../api/apiSlice";

export const menuInflation = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getMenuInflation: builder.query({
    //   query: () => ({
    //     url: "food/v1/restaurant",
    //     method: "GET",
    //     headers: {
    //       Authorization: `token ${
    //         JSON.parse(localStorage.getItem("auth")).token
    //       }`,
    //       // Authorization: `token 0e036a5f7c5117ee56aa1f434e41bc3013339ed1`,
    //     },
    //   }),
    //   providesTags: ["MenuInflation"],
    // }),
    UpdateMenuInflation: builder.mutation({
      query: ({ restaurantId, inflationData }) => {
        return {
          url: `food/v1/menu-inflation/${restaurantId}/`,
          method: "PATCH",
          body: inflationData,
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
        };
      },
      invalidatesTags: ["MenuInflation"],
    }),
  }),
});
export const { useUpdateMenuInflationMutation } = menuInflation;
