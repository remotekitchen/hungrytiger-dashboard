/* eslint-disable no-empty */
import { apiSlice } from "../api/apiSlice";
import { createdCategory } from "./categoryCreationSlice";

export const categoryCreationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoints wil be here
    // getCategory: builder.query({
    //   query: (id) => ({
    //     url: `food/v1/category/?menu=${id}&page=1`,
    //     headers: {
    //       Authorization: `token ${JSON.parse(localStorage.getItem("auth")).token
    //         }`,
    //     },
    //   }),
    //   providesTags: ["Category"],
    // }),
    getCategory: builder.query({
      query: ({ id, page, searchInput, restaurantId }) => ({
        url: `food/v1/category/?menu=${id}&page=${page}&restaurant=${restaurantId}&search=${searchInput}`,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: (result, error, { id }) => [{ type: "Category", id }],
    }),
    // V2 API for getting Category
    getCategoryWithoutPagination: builder.query({
      query: () => ({
        url: `food/v2/category`,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["Category"],
      // providesTags: (result, error, { id }) => [{ type: "Category", id }],
    }),
    // for infinity scrolling
    getMoreCategory: builder.query({
      query: ({ id, page, searchInput, restaurantId }) => ({
        url: `food/v1/category/?menu=${id}&page=${page}&restaurant=${restaurantId}&search=${searchInput}`,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      /* async onQueryStarted({ id, page }, { queryFulfilled, dispatch }) {
        try {
          const categories = await queryFulfilled;
          // checker
          // console.log(categories, "categories");
          if (categories?.data?.results?.length > 0) {
            dispatch(
              apiSlice.util.updateQueryData("getCategory", id, (draft) => {
                // console.log(current(draft.results), draft, "draft");
                return [...draft.results, ...categories.data.results];
              })
            );
          }
        } catch (error) {
          // console.log(error);
        }
      }, */
      providesTags: ["Category"],
    }),
    // ===============
    getAllCategory: builder.query({
      query: ({ selectedPage, searchInput }) => ({
        url: `food/v1/category/?page=${selectedPage}&search=${searchInput}&page_size=20`,
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["Category"],
    }),
    /*  getLocations: builder.query({
      query: () => ({
        url: "food/v1/location/",
        headers: {
          Authorization: `token 0e036a5f7c5117ee56aa1f434e41bc3013339ed1`,
        },
      }),
    }), */
    createCategory: builder.mutation({
      query: (data) => {
        return {
          url: "food/v1/category/",
          method: "POST",
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
          body: data,
        };
      },
      invalidatesTags: ["Category"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // // console.log(result);
          dispatch(
            createdCategory({
              data: result.data,
            })
          );
        } catch (err) {
          // console.log(err)
        }
      },
    }),

    updateCategory: builder.mutation({
      query: ({ id, categoryItem }) => {
        return {
          url: `food/v1/category/item/?id=${id}`,
          method: "PATCH",
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
          body: categoryItem,
        };
      },
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          url: `food/v1/category/item/?id=${id}`,
          method: "DELETE",
          headers: {
            Authorization: `token ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
        };
      },
      invalidatesTags: ["Category"],
    }),
    /*  getAllMenu: builder.query({
      query: () => ({
        url: "food/v1/menu/",
        headers: {
          Authorization: `token 0e036a5f7c5117ee56aa1f434e41bc3013339ed1`,
        },
      }),
    }), */
  }),
});
export const {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetMoreCategoryQuery,
  useGetCategoryWithoutPaginationQuery,
} = categoryCreationApi;
