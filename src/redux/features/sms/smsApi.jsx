import { apiSlice } from "../api/apiSlice";

export const smsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addSms: builder.mutation({
            query: (data) => ({
                url: `wappmsg/v1/wapp/send/`,
                method: "POST",
                body: data,
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["SMS"],
        }),
    }),
});

export const {
    useAddSmsMutation,
} = smsApi;