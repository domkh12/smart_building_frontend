import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { setSites } from "./siteSlice";

const sitesAdapter = createEntityAdapter({});

const initialState = sitesAdapter.getInitialState();

export const sitesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSites: builder.query({
      query: ({ pageNo = 1, pageSize = 20 }) => ({
        url: `/sites?pageNo=${pageNo}&pageSize=${pageSize}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedSites = responseData.content.map((site) => {
          site.id = site.uuid;
          return site;
        });
        return {
          ...sitesAdapter.setAll(initialState, loadedSites),
          totalPages: responseData.page.totalPages,
          totalElements: responseData.page.totalElements,
          pageNo: responseData.page.number,
          pageSize: responseData.page.size,
        };
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Site", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Site", id })),
          ];
        } else return [{ type: "Site", id: "LIST" }];
      },
    }),

    filterSites: builder.query({
      query: ({
        pageNo = 1,
        pageSize = 20,
        keywords = "",
        cityId = "",
        siteTypeId = "",
        companyId = "",
      }) => ({
        url: `/sites/filter?pageNo=${pageNo}&pageSize=${pageSize}&keywords=${keywords}&cityId=${cityId}&siteTypeId=${siteTypeId}&companyId=${companyId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedSites = responseData.content.map((site) => {
          site.id = site.uuid;
          return site;
        });
        return {
          ...sitesAdapter.setAll(initialState, loadedSites),
          totalPages: responseData.page.totalPages,
          totalElements: responseData.page.totalElements,
          pageNo: responseData.page.number,
          pageSize: responseData.page.size,
        };
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Site", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Site", id })),
          ];
        } else return [{ type: "Site", id: "LIST" }];
      },
    }),

    getSitesList: builder.mutation({
      query: () => ({
        url: "/sites/all",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSites(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    createNewSite: builder.mutation({
      query: (initialState) => ({
        url: "/sites",
        method: "POST",
        body: {
          ...initialState,
        },
      }),
      invalidatesTags: [{ type: "Site", id: "LIST" }],
    }),

    updateSite: builder.mutation({
      query: ({ uuid, ...initialState }) => ({
        url: `/sites/${uuid}`,
        method: "PATCH",
        body: {
          ...initialState,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Site", id: arg.uuid }],
    }),
  }),
});

export const {
  useGetSitesQuery,
  useGetSitesListMutation,
  useCreateNewSiteMutation,
  useUpdateSiteMutation,
  useFilterSitesQuery
} = sitesApiSlice;

// return the query result object
export const selectSiteResult = sitesApiSlice.endpoints.getSites.select();

// create momorized selector
const selectSiteData = createSelector(
  selectSiteResult,
  (siteResult) => siteResult.data // normalized state object with ids & entities
);

// getSelector creates these selectors and we rename them with aliase using destructuring
export const {
  selectAll: selectAllSite,
  selectById: selectSiteById,
  selectIds: selectSiteIds,
  // pass the selector that return the site slice of state
} = sitesAdapter.getSelectors((state) => selectSiteData(state) ?? initialState);
