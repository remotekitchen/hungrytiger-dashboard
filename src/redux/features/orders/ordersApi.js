import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoints wil be here
    getOrders: builder.query({
      query: ({ orderStatus, search }) => ({
        url: `billing/v1/order/?status=${orderStatus}&search=${search}`,
        //! for signed in user
        // http://api.hungry-tiger.com/api/billing/v1/order/
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
            }`,
          // Authorization: `token 0e036a5f7c5117ee56aa1f434e41bc3013339ed1`,
        },
      }),
      providesTags: ["Orders"],
    }),
    getMerchantOrders: builder.query({
      query: ({ restaurantId, locationId, page, start_date, end_date }) => {
        // Construct the query parameters dynamically
        const queryParams = new URLSearchParams({
          restaurant: restaurantId,
          location: locationId,
          history: "true",
          page: page.toString(),
        });

        if (start_date) {
          queryParams.append("start_date", start_date);
        }

        if (end_date) {
          queryParams.append("end_date", end_date);
        }

        return {
          url: `billing/v1/order/merchant/?${queryParams.toString()}`,
          headers: {
            Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
              }`,
            // Authorization: `token 0e036a5f7c5117ee56aa1f434e41bc3013339ed1`,
          },
        };
      },
      providesTags: ["Orders"],
    }),

    getOrder: builder.query({
      query: ({ restaurantId, locationId }) => ({
        url: `billing/v1/order/?restaurant=${restaurantId}&location=${locationId}`,
        //! for signed in user
        // http://api.hungry-tiger.com/api/billing/v1/order/
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
            }`,
          // Authorization: `token 0e036a5f7c5117ee56aa1f434e41bc3013339ed1`,
        },
      }),
      providesTags: ["Orders"],
    }),
    manageOrder: builder.mutation({
      query: ({ order_id, orderStatus }) => {
        return {
          url: `billing/v1/order/item/?id=${order_id}`,
          headers: {
            Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
              }`,

            // Authorization: `token 0e036a5f7c5117ee56aa1f434e41bc3013339ed1`,
          },
          method: "PATCH",
          body: { status: orderStatus },
        };
      },
      invalidatesTags: ["Orders"],
    }),
    updateRefund: builder.mutation({
      query: ({ order_id, refundAmount, refundReason, status }) => {
        return {
          url: `billing/v1/order/item/?id=${order_id}`,
          headers: {
            Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
              }`,
            // Authorization: `token 0e036a5f7c5117ee56aa1f434e41bc3013339ed1`,
          },
          method: "PATCH",
          body: { status: status, refund_amount: refundAmount, refund_reason: refundReason },
        };
      },
      invalidatesTags: ["Orders"],
    }),
  }),
});


export const {
  useGetOrdersQuery,
  useManageOrderMutation,
  useGetOrderQuery,
  useGetMerchantOrdersQuery,
  useUpdateRefundMutation,
} = ordersApi;
