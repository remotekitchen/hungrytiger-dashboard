import { apiSlice } from '../api/apiSlice';

export const rewardsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getRewards: builder.query({
			query: () => ({
				url: `marketing/v1/user-reward/`,
				method: 'GET',
				headers: {
					Authorization: `token ${
						JSON.parse(localStorage.getItem('auth')).token
					}`,
				},
			}),
			providesTags: ['Rewards'],
		}),
		getRewardsGroup: builder.query({
			query: (page) => ({
				url: `reward/v1/reward-group/?page=${page}&exclude_expired={true}`,
				method: 'GET',
				headers: {
					Authorization: `token ${
						JSON.parse(localStorage.getItem('auth')).token
					}`,
				},
			}),
			providesTags: ['Rewards'],
		}),
		// V2 Api for getting rewards without pagination
		getRewardsGroupWithoutPagination: builder.query({
			query: () => ({
				url: `reward/v2/reward-group/?exclude_expired={true}`,
				method: 'GET',
				headers: {
					Authorization: `token ${
						JSON.parse(localStorage.getItem('auth')).token
					}`,
				},
			}),
			providesTags: ['Rewards'],
		}),

		getRewardsList: builder.query({
			query: ({ page, restaurantId }) => ({
				url: `reward/v1/reward/?page=${page}&restaurant=${restaurantId}`,
				method: 'GET',
				headers: {
					Authorization: `token ${
						JSON.parse(localStorage.getItem('auth')).token
					}`,
				},
			}),
			providesTags: ['Rewards'],
		}),

		addRewardsGroup: builder.mutation({
			query: (data) => ({
				url: `reward/v1/reward-group/`,
				method: 'POST',
				body: data,
				headers: {
					Authorization: `token ${
						JSON.parse(localStorage.getItem('auth')).token
					}`,
				},
			}),
			invalidatesTags: ['Rewards'],
		}),
		addRewards: builder.mutation({
			query: (data) => ({
				url: `marketing/v1/user-reward/`,
				method: 'POST',
				body: data,
				headers: {
					Authorization: `token ${
						JSON.parse(localStorage.getItem('auth')).token
					}`,
				},
			}),
			invalidatesTags: ['Rewards'],
		}),
		updateRewards: builder.mutation({
			query: ({ id, rewardsItem }) => ({
				url: `marketing/v1/user-reward/item/?id=${id}`,
				method: 'PATCH',
				body: rewardsItem,
				headers: {
					Authorization: `token ${
						JSON.parse(localStorage.getItem('auth')).token
					}`,
				},
			}),
			invalidatesTags: ['Rewards'],
		}),
		updateRewardGroup: builder.mutation({
			query: ({ id, rewardsItem }) => ({
				url: `reward/v1/reward-group/item/?id=${id}`,
				method: 'PATCH',
				body: rewardsItem,
				headers: {
					Authorization: `token ${
						JSON.parse(localStorage.getItem('auth')).token
					}`,
				},
			}),
			invalidatesTags: ['Rewards'],
		}),
		// deleteRewards: builder.mutation({
		//   query: (id) => ({
		//     url: `marketing/v1/user-reward/item/?id=${id}`,
		//     method: "DELETE",
		//     headers: {
		//       Authorization: `token ${
		//         JSON.parse(localStorage.getItem("auth")).token
		//       }`,
		//     },
		//   }),
		//   invalidatesTags: ["Rewards"],
		// }),
		deleteRewards: builder.mutation({
			query: ({ rewardId, data }) => ({
				url: `reward/v1/reward-group/item/?id=${rewardId}`,
				method: 'PATCH',
				headers: {
					Authorization: `token ${
						JSON.parse(localStorage.getItem('auth')).token
					}`,
				},
				body: data,
			}),
			invalidatesTags: ['Rewards'],
		}),
	}),
});

export const {
	useGetRewardsQuery,
	useAddRewardsMutation,
	useUpdateRewardsMutation,
	useDeleteRewardsMutation,
	useGetRewardsGroupQuery,
	useGetRewardsGroupWithoutPaginationQuery,
	useAddRewardsGroupMutation,
	useGetRewardsListQuery,
	useUpdateRewardGroupMutation,
} = rewardsApi;
