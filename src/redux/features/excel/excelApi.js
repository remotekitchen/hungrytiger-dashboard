import { apiSlice } from "../api/apiSlice";

export const excelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    readExcel: builder.query({
      query: (data) => ({
        url: "image-generator/v1/read-google-sheet/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useReadExcelQuery } = excelApi;
