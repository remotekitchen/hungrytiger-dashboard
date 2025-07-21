import { apiSlice } from "../api/apiSlice";

export const groupInvitationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // post
    createGroupInvitation: builder.mutation({
      query: (data) => ({
        url: `wappmsg/v1/group-invitation/restaurant-access/`,
        method: "POST",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
        body: data,
      }),
      invalidatesTags: ["GroupInvitation"],
    }),
    getGroupInvitation: builder.query({
      query: (data) => ({
        url: `wappmsg/v1/group-invitation/restaurant-access/`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
        body: data,
      }),
      providesTags: ["GroupInvitation"],
    }),

    getSingleGroupInvitation: builder.query({
      query: (id) => ({
        url: `wappmsg/v1/group-invitation/restaurant-access/${id}/`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["GroupInvitation"],
    }),
    updateGroupInvitation: builder.mutation({
      query: ({ id, data }) => ({
        url: `wappmsg/v1/group-invitation/restaurant-access/${id}/`,

        method: "PATCH",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
        body: data,
      }),
      invalidatesTags: ["GroupInvitation"],
    }),

    deleteGroupInvitation: builder.mutation({
      query: (id) => ({
        url: `wappmsg/v1/group-invitation/restaurant-access/${id}/`,
        method: "DELETE",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["GroupInvitation"],
    }),
  }),
});

export const {
  useGetGroupInvitationQuery,
  useUpdateGroupInvitationMutation,
  useCreateGroupInvitationMutation,
  useDeleteGroupInvitationMutation,
  useGetSingleGroupInvitationQuery,
} = groupInvitationApi;
