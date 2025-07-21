import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authenticationSlice";

export const authenticationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //endpoints wil be here
    register: builder.mutation({
      query: (data) => ({
        url: "accounts/v1/user/register/",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "accounts/v1/login/email/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Menu", "Account"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              token: result.data.token,
              user: result.data.user_info,
            })
          );
          dispatch(
            userLoggedIn({
              token: result.data.token,
              user: result.data.user_info,
            })
          );
        } catch (err) {
          // console.log(err);
        }
      },
    }),
  }),
});
export const { useLoginMutation, useRegisterMutation } = authenticationApi;
