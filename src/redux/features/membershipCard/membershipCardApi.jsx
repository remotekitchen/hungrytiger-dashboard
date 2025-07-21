import { apiSlice } from "../api/apiSlice";

export const membershipCardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMembershipCard: builder.query({
            query: () => ({
                url: `marketing/v1/membership-card/`,
                method: "GET",
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            providesTags: ["MembershipCard"]
        }),
        addMembershipCard: builder.mutation({
            query: (data) => ({
                url: `marketing/v1/membership-card/`,
                method: "POST",
                body: data,
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["MembershipCard"],
        }),
        updateMembershipCard: builder.mutation({
            query: ({id, membershipCardItem}) => ({
                url: `marketing/v1/membership-card/item/?id=${id}`,
                method: "PATCH",
                body: membershipCardItem,
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["MembershipCard"],
        }),
        deleteMembershipCard: builder.mutation({
            query: (id) => ({
                url: `marketing/v1/membership-card/item/?id=${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
                        }`,
                },
            }),
            invalidatesTags: ["MembershipCard"],
        }),
    }),
});

export const {
    useGetMembershipCardQuery,
    useAddMembershipCardMutation,
    useUpdateMembershipCardMutation,
    useDeleteMembershipCardMutation,
} = membershipCardApi;

