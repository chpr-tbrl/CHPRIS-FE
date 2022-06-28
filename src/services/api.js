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
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
    newRecord: builder.mutation({
      query: (data) => ({
        url: `/regions/${data.region_id}/sites/${data.site_id}/records`,
        method: "POST",
        body: data,
      }),
    }),
    getRecords: builder.query({
      query: () => ({
        url: "/records",
        method: "GET",
      }),
    }),
    newSpecimen: builder.mutation({
      query: (data) => ({
        url: `/records/${data.record_id}/specimen_collections`,
        method: "POST",
        body: data,
      }),
    }),
    updateSpecimen: builder.mutation({
      query: (data) => ({
        url: `/specimen_collections/${data.specimen_collection_id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getSpecimens: builder.query({
      query: (id) => ({
        url: `/records/${id}/specimen_collections`,
        method: "GET",
      }),
    }),
    newLabResult: builder.mutation({
      query: (data) => ({
        url: `/records/${data.record_id}/labs`,
        method: "POST",
        body: data,
      }),
    }),
    updateLabResult: builder.mutation({
      query: (data) => ({
        url: `/labs/${data.lab_id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getLabResults: builder.query({
      query: (id) => ({
        url: `/records/${id}/labs`,
        method: "GET",
      }),
    }),
    newFollowUp: builder.mutation({
      query: (data) => ({
        url: `/records/${data.record_id}/follow_ups`,
        method: "POST",
        body: data,
      }),
    }),
    updateFollowUp: builder.mutation({
      query: (data) => ({
        url: `/follow_ups/${data.follow_up_id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getFollowUps: builder.query({
      query: (id) => ({
        url: `/records/${id}/follow_ups`,
        method: "GET",
      }),
    }),
    newOutcome: builder.mutation({
      query: (data) => ({
        url: `/records/${data.record_id}/outcome_recorded`,
        method: "POST",
        body: data,
      }),
    }),
    updateOutcome: builder.mutation({
      query: (data) => ({
        url: `/outcome_recorded/${data.outcome_recorded_id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getOutcomes: builder.query({
      query: (id) => ({
        url: `/records/${id}/outcome_recorded`,
        method: "GET",
      }),
    }),
    newTreatmentOutcome: builder.mutation({
      query: (data) => ({
        url: `/records/${data.record_id}/tb_treatment_outcomes`,
        method: "POST",
        body: data,
      }),
    }),
    getTreatmentOutcomes: builder.query({
      query: (id) => ({
        url: `/records/${id}/tb_treatment_outcomes`,
        method: "GET",
      }),
    }),
    getRegions: builder.query({
      query: () => ({
        url: "/regions",
        method: "GET",
      }),
    }),
    getSites: builder.query({
      query: (id) => ({
        url: `/regions/${id}/sites`,
        method: "GET",
      }),
    }),
    dataExport: builder.mutation({
      query: ({ region_id, site_id, format, start_date, end_date }) => ({
        url: `/regions/${region_id}/sites/${site_id}/exports/${format}?start_date=${start_date}&end_date=${end_date}`,
        method: "GET",
        responseHandler: (response) => {
          return response.status === 200 ? response.text() : response.json();
        },
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: data.method,
        body: data,
      }),
    }),
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSitesQuery,
  useLoginMutation,
  useSignupMutation,
  useGetRecordsQuery,
  useGetProfileQuery,
  useGetRegionsQuery,
  useNewRecordMutation,
  useGetSpecimensQuery,
  useNewSpecimenMutation,
  useUpdateSpecimenMutation,
  useGetLabResultsQuery,
  useNewLabResultMutation,
  useUpdateLabResultMutation,
  useGetFollowUpsQuery,
  useNewFollowUpMutation,
  useUpdateFollowUpMutation,
  useGetOutcomesQuery,
  useNewOutcomeMutation,
  useUpdateOutcomeMutation,
  useUpdateProfileMutation,
  useGetTreatmentOutcomesQuery,
  useNewTreatmentOutcomeMutation,
  useDataExportMutation,
} = API;
