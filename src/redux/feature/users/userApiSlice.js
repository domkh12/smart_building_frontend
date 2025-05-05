import {createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import {apiSlice} from "../../app/api/apiSlice";
import {setIsTwoFAEnabled, setTwoFASecretCode} from "../auth/authSlice";
import {
    setAllFullNameUsersFetched,
    setStatus,
} from "./userSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({pageNo = 1, pageSize = 5}) => ({
                url: `/users?pageNo=${pageNo}&pageSize=${pageSize}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                const loadedUsers = responseData.allUsers.content.map((user) => {
                    user.id = user.id;
                    return user;
                });
                return {
                    ...usersAdapter.setAll(initialState, loadedUsers),
                    totalPages: responseData.allUsers.page.totalPages,
                    totalElements: responseData.allUsers.page.totalElements,
                    pageNo: responseData.allUsers.page.number,
                    pageSize: responseData.allUsers.page.size,
                    activeCount: responseData.statusCount.Active,
                    pendingCount: responseData.statusCount.Pending,
                    bannedCount: responseData.statusCount.Banned,
                };
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: "User", id: "LIST"},
                        ...result.ids.map((id) => ({type: "User", id})),
                    ];
                } else return [{type: "User", id: "LIST"}];
            },
        }),

        searchUser: builder.query({
            query: ({
                        pageNo = 1,
                        pageSize = 5,
                        keywords = "",
                        roleId = [],
                        signupMethodId = [],
                        status = "",
                    }) => ({
                url: `/users/filters?pageNo=${pageNo}&pageSize=${pageSize}&keywords=${keywords}&roleId=${roleId}&signupMethodId=${signupMethodId}&status=${status}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                const loadedUsers = responseData.allUsers.content.map((user) => {
                    user.id = user.id;
                    return user;
                });
                return {
                    ...usersAdapter.setAll(initialState, loadedUsers),
                    totalPages: responseData.allUsers.page.totalPages,
                    totalElements: responseData.allUsers.page.totalElements,
                    pageNo: responseData.allUsers.page.number,
                    pageSize: responseData.allUsers.page.size,
                    activeCount: responseData.statusCount.Active,
                    pendingCount: responseData.statusCount.Pending,
                    bannedCount: responseData.statusCount.Banned,
                };
            },

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: "User", id: "LIST"},
                        ...result.ids.map((id) => ({type: "User", id})),
                    ];
                } else return [{type: "User", id: "LIST"}];
            },

        }),

        findUserByUuid: builder.query({
            query: (uuid) => ({
                url: `/users/${uuid}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                responseData.id = responseData.uuid;
                return usersAdapter.setOne(initialState, responseData);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: "User", id: "LIST"},
                        ...result.ids.map((id) => ({type: "User", id})),
                    ];
                } else return [{type: "User", id: "LIST"}];
            },
        }),

        addNewUser: builder.mutation({
            query: (initialState) => ({
                url: "/users",
                method: "POST",
                body: {
                    ...initialState,
                },
            }),
            invalidatesTags: [{type: "User", id: "LIST"}],
        }),

        updateUser: builder.mutation({
            query: ({id, ...initialUserData}) => ({
                url: `/users/${id}`,
                method: "PATCH",
                body: {
                    ...initialUserData,
                },
            }),
            invalidatesTags: [{type: "User", id: "LIST"}],
        }),

        deleteUser: builder.mutation({
            query: ({id}) => ({
                url: `/users/${id}`,
                method: "DELETE",
                body: {
                    id,
                },
            }),
            invalidatesTags: [{type: "User", id: "LIST"}],
        }),

        connectedUser: builder.mutation({
            query: ({id, isOnline}) => ({
                url: `/users/${id}/status`,
                method: "PATCH",
                body: {
                    isOnline,
                },
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setStatus(data.status));
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                }
            },
            invalidatesTags: (result, error, arg) => [{type: "User", id: arg.id}],
        }),

        getAllFullNameUsers: builder.mutation({
            query: () => ({
                url: `/users/full-names`,
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setAllFullNameUsersFetched({data}));
                } catch (error) {
                    console.log(error);
                }
            }
        }),

        get2faSecretCode: builder.mutation({
            query: () => ({
                url: "/users/2fa-secret-code",
                method: "GET",
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setTwoFASecretCode({data}));
                } catch (error) {
                    console.log(error);
                }
            },
        }),

        get2faStatus: builder.query({
            query: () => ({
                url: "/users/2fa-status",
            }),
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{type: "MultiStatus", id: "LIST"}, ...result.ids.map((id) => ({type: "MultiStatus", id})),];
                } else return [{type: "MultiStatus", id: "LIST"}];
            },
        }),

        findAllGender: builder.query({
            query: () => `/genders`, // Assuming your API endpoint for fetching a single building by ID is like this
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{type: "Gender", id: "LIST"}, ...result.ids.map((id) => ({type: "Gender", id})),];
                } else return [{type: "Gender", id: "LIST"}];
            },
        }),

        getAllRoles: builder.query({
            query: () => `/roles`, // Assuming your API endpoint for fetching a single building by ID is like this
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{type: "Role", id: "LIST"}, ...result.ids.map((id) => ({type: "Role", id})),];
                } else return [{type: "Role", id: "LIST"}];
            },
        }),

        getAllSignUpMethods: builder.query({
            query: () => `/sign-up-methods`,
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{type: "SignupMethod", id: "LIST"}, ...result.ids.map((id) => ({type: "SignupMethod", id})),];
                } else return [{type: "SignupMethod", id: "LIST"}];
            },
        }),

        getUserById: builder.query({
            query: (id) => `users/${id}`,
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{type: "UserUpdate", id: "LIST"}, ...result.ids.map((id) => ({type: "UserUpdate", id})),];
                } else return [{type: "UserUpdate", id: "LIST"}];
            },
        })
    }),
});

export const {
    useSearchUserQuery,
    useGetAllSignUpMethodsQuery,
    useGetAllRolesQuery,
    useGetUsersQuery,
    useAddNewUserMutation,
    useGetAllFullNameUsersMutation,
    useUpdateUserMutation,
    useConnectedUserMutation,
    useGet2faSecretCodeMutation,
    useGet2faStatusQuery,
    useDeleteUserMutation,
    useFindAllGenderQuery,
    useGetUserByIdQuery
} = userApiSlice;

// return the query result object
export const selectUserResult = userApiSlice.endpoints.getUsers.select();

// create momorized selector
const selectUserData = createSelector(
    selectUserResult,
    (usersResult) => usersResult.data // normalized state object with ids & entities
);

// getSelector creates these selectors and we rename them with aliase using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
    // pass the selector that return the users slice of state
} = usersAdapter.getSelectors((state) => selectUserData(state) ?? initialState);
