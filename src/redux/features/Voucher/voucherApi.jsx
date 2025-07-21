import { apiSlice } from "../api/apiSlice";

export const voucherApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVoucher: builder.query({
            query: () => ({
                url: `marketing/v1/voucher/`,
                method: "GET",
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            providesTags: ["Voucher"]
        }),
        getVoucherPromoOptions: builder.query({
            query: () => ({
                url: `marketing/v1/voucher/promo-option/`,
                method: "GET",
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            providesTags: ["Voucher"]
        }),
        addVoucher: builder.mutation({
            query: (data) => ({
                url: `marketing/v1/voucher/`,
                method: "POST",
                body: data,
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["Voucher"],
        }),
        updateVoucher: builder.mutation({
            query: ({id, voucherItem}) => ({
                url: `marketing/v1/voucher/item/?id=${id}`,
                method: "PATCH",
                body: voucherItem,
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["Voucher"],
        }),
        deleteVoucher: builder.mutation({
            query: (id) => ({
                url: `marketing/v1/voucher/item/?id=${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["Voucher"],
        }),
    }),
    // overrideExisting: false,
})

export const { useGetVoucherQuery, useGetVoucherPromoOptionsQuery, useAddVoucherMutation, useUpdateVoucherMutation, useDeleteVoucherMutation } = voucherApi;
