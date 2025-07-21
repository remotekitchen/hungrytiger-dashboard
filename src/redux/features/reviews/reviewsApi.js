import { apiSlice } from "../api/apiSlice";


export const rewardsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (id) => ({
        url: `marketing/v1/ratings-review/?restaurant_id=${id}`,
        method: 'GET',
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem('auth')).token
            }`,
        },
      })
    }),
    addComment: builder.mutation({
      query: ({ reviewId, userId, text }) => ({
        url: `marketing/v1/ratings-review/${reviewId}/add_comment/`,
        method: 'POST',
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem('auth')).token}`,
          'Content-Type': 'application/json',
        },
        body: {
          review: reviewId,
          user: userId,
          text: text,
        },
      }),
    }),

  })
});


export const { useGetReviewsQuery, useAddCommentMutation } = rewardsApi;