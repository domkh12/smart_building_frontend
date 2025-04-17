import {createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import {apiSlice} from "../../app/api/apiSlice";
import {setRoomDataById, setRoomNamesDataFetched} from "./roomSlice";

const roomAdapter = createEntityAdapter({});

const initialState = roomAdapter.getInitialState();

export const roomApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRoom: builder.query({
            query: ({pageNo = 1, pageSize = 20}) => ({
                url: `/rooms?pageNo=${pageNo}&pageSize=${pageSize}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                const loadedRoom = responseData.content.map((room) => {
                    room.id = room.id;
                    return room;
                });
                return {
                    ...roomAdapter.setAll(initialState, loadedRoom),
                    totalPages: responseData.page.totalPages,
                    totalElements: responseData.page.totalElements,
                    pageNo: responseData.page.number,
                    pageSize: responseData.page.size,
                };
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: "Room", id: "LIST"},
                        ...result.ids.map((id) => ({type: "Room", id})),
                    ];
                } else return [{type: "Room", id: "LIST"}];
            },
        }),

        getRoomFilter: builder.query({
            query: ({pageNo = 1, pageSize = 20, keywords, buildingId}) => ({
                url: `/rooms/filters?pageNo=${pageNo}&pageSize=${pageSize}&keywords=${keywords}&buildingId=${buildingId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                const loadedRoom = responseData.content.map((room) => {
                    room.id = room.id;
                    return room;
                });
                return {
                    ...roomAdapter.setAll(initialState, loadedRoom),
                    totalPagesFilter: responseData.page.totalPages,
                    totalElementsFilter: responseData.page.totalElements,
                    pageNoFilter: responseData.page.number,
                    pageSizeFilter: responseData.page.size,
                };
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: "Room", id: "LIST"},
                        ...result.ids.map((id) => ({type: "Room", id})),
                    ];
                } else return [{type: "Room", id: "LIST"}];
            },
        }),

        addNewRoom: builder.mutation({
            query: (initialState) => ({
                url: "/rooms",
                method: "POST",
                body: {
                    ...initialState,
                },
            }),
            invalidatesTags: [
                {type: "Room", id: "LIST"},
                {type: "Floor", id: "LIST"},
                {type: "Device", id: "LIST"},
                {type: "FloorName", id: "LIST"}
            ],
        }),

        deleteRoom: builder.mutation({
            query: ({id}) => ({
                url: `/rooms/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [
                {type: "Room", id: "LIST"},
                {type: "Floor", id: "LIST"},
                {type: "Device", id: "LIST"},
                {type: "FloorName", id: "LIST"}
            ],
        }),

        getByRoomId: builder.mutation({
            query: ({id}) => ({
                url: `/rooms/${id}`,
                method: "GET",
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setRoomDataById({data}));
                } catch (error) {
                    console.log(error);
                }
            },
        }),

        getAllRoomNames: builder.query({
            query: () => `/rooms/names`, // Assuming your API endpoint for fetching a single building by ID is like this
            providesTags: (result, error, id) => [{type: 'RoomName', id}],
        }),

        updateRoom: builder.mutation({
            query: ({id, ...room}) => ({
                url: `/rooms/${id}`,
                method: "PUT",
                body: {...room},
            }),
            invalidatesTags: (result, error, arg) => [{type: "Room", id: arg.id}, {type: "FloorName", id: "LIST"}],
        }),

        getRoomById: builder.query({
            query: (id) => `rooms/${id}`,
            providesTags: (result, error, id) => [{type: 'RoomUpdate', id}],
        })

    }),
});

export const {
    useDeleteRoomMutation,
    useUpdateRoomMutation,
    useGetRoomQuery,
    useAddNewRoomMutation,
    useGetByRoomIdMutation,
    useGetAllRoomNamesQuery,
    useGetRoomFilterQuery,
    useGetRoomByIdQuery
} = roomApiSlice;

// return the query result object
export const selectRoomResult = roomApiSlice.endpoints.getRoom.select();

// create momorized selector
const selectRoomData = createSelector(
    selectRoomResult,
    (roomResult) => roomResult.data // normalized state object with ids & entities
);

// getSelector creates these selectors and we rename them with aliase using destructuring
export const {
    selectAll: selectAllRoom,
    selectById: selectRoomById,
    selectIds: selectRoomIds,
    // pass the selector that return the room slice of state
} = roomAdapter.getSelectors((state) => selectRoomData(state) ?? initialState);
