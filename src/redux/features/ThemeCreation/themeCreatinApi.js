import { apiSlice } from "../api/apiSlice";

const themeCreationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getThemes: builder.query({
      query: ({ restaurant, location }) => ({
        url: `design/v1/themes-list/?restaurant=${restaurant}&location=${location}`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["Themes"],
    }),
    getAllThemes: builder.query({
      query: () => ({
        url: `design/v1/themes-list/`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["Themes"],
    }),

    createTheme: builder.mutation({
      query: (data) => ({
        url: `design/v1/themes-list/`,
        method: "POST",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
        body: data,
      }),
      invalidatesTags: ["Themes"],
    }),

    updateTheme: builder.mutation({
      query: ({ data, id }) => ({
        url: `design/v1/theme-detail/?id=${id}`,
        method: "PATCH",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
        body: data,
      }),
      invalidatesTags: ["Themes"],
    }),

    detailsOfTheme: builder.query({
      query: (id) => ({
        url: `design/v1/theme-detail/?id=${id}`,
        method: "GET",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      providesTags: ["Themes"],
    }),

    deleteTheme: builder.mutation({
      query: (id) => ({
        url: `design/v1/theme-detail/?id=${id}`,
        method: "DELETE",
        headers: {
          Authorization: `token ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      }),
      invalidatesTags: ["Themes"],
    }),
  }),
});
export const {
  useGetThemesQuery,
  useCreateThemeMutation,
  useUpdateThemeMutation,
  useDetailsOfThemeQuery,
  useDeleteThemeMutation,
  useGetAllThemesQuery,
} = themeCreationApi;
