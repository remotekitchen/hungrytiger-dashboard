import { apiSlice } from '../api/apiSlice';

export const autoReplyReviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSettings: builder.mutation({
      query: (newSettings) => ({
        url: 'marketing/v1/auto-reply/',
        method: 'POST',
        body: newSettings,
      }),
      invalidatesTags: ['AutoReplyReview'],
    }),
    getAutoReplyReview: builder.query({
      query: ({ restaurantId, locationId }) => ({
        url: `marketing/v1/auto-reply/${restaurantId}/${locationId}/`,
        method: 'GET',
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem('auth')).token}`,
        },
      }),
      providesTags: ['AutoReplyReview'],
    }),
    updateAutoReplyReview: builder.mutation({
      query: ({ restaurantId, locationId, ...patchData }) => ({
        url: `marketing/v1/auto-reply/${restaurantId}/${locationId}/`,
        method: 'PATCH',
        body: patchData,
        headers: {
          Authorization: `token ${JSON.parse(localStorage.getItem('auth')).token}`,
        },
      }),
      invalidatesTags: ['AutoReplyReview'],
    })
  })
});

export const {
  useCreateSettingsMutation,
  useGetAutoReplyReviewQuery,
  useUpdateAutoReplyReviewMutation,
} = autoReplyReviewApi;