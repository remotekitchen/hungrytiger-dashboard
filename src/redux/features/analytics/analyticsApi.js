import { apiSlice } from '../api/apiSlice';

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    analytics: builder.query({
      query: ({ start, end, restaurant, location }) => ({
        url: `dashboard/analytics/v1/traffic-monitor-dashboard?start=${start}&end=${end}&restaurant=${restaurant}&location=${location}`, // Use location directly
        method: 'GET',
      }),
    }),
  }),
});

export const { useAnalyticsQuery } = analyticsApi;
