// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Define a service using a base URL and expected endpoints
export const API = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}`,
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetDocsQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useGetMetricsQuery,
  useTriggerOTPQuery,
  useGetPlatformsQuery,
  useStoreTokenMutation,
  useNewPasswordMutation,
  useSynchronizeMutation,
  useTokenRevokeMutation,
  useVerifySignupMutation,
  useDeleteAccountMutation,
  useChangePasswordMutation,
  useRecoverPasswordMutation,
  useValidateOTPCodeMutation,
  useVerifyTokenStorageMutation,
  useCreateExternalAccountMutation,
} = API;
