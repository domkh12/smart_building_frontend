import {createSlice} from "@reduxjs/toolkit";

const deviceSlice = createSlice({
    name: "device",
    initialState: {
        deviceType: [],
        isAddNewDeviceDialogOpen: false,
        deviceLocalData: [],
        deviceUpdateLocalData: [],
        searchFilter: "",
        buildingFilterForDevice: [],
        deviceTypeNames: [],
        deviceTypeFilters: [],
        pageNo: "1",
        pageSize: "5",
        deviceIdToDelete: "",
        devicesDataByRoom: [],
        temperatureDevices: [],
        humidityDevices: [],
        pm2_5Devices: [],
        powerDevices: [],
        lightDevices: [],
        airConditionerDevices: [],
        brakerOrSwitchDevices: [],
        fanDevices: [],
        isOpenQuickEditDevice: false,
        deviceDataForQuickEdit: {},
        isQuickEditDeviceTypeOpen: false,
        idDeviceTypeToEdit: "",
        deviceTypeDataById: {},
        idDeviceTypeToDelete: "",
    },
    reducers: {
        setIdDeviceTypeToDelete(state, action) {
            state.idDeviceTypeToDelete = action.payload;
        },
        setDeviceTypeDataById(state, action) {
            state.deviceTypeDataById = action.payload;
        },
        setIdDeviceTypeToEdit(state, action) {
            state.idDeviceTypeToEdit = action.payload;
        },
        setIsQuickEditDeviceTypeOpen(state, action) {
            state.isQuickEditDeviceTypeOpen = action.payload;
        },
        setDeviceDataForQuickEdit(state, action){
          state.deviceDataForQuickEdit = action.payload;
        },
        setIsOpenQuickEditDevice(state, action)  {
            state.isOpenQuickEditDevice = action.payload;
        },
        setDeviceDataByRoom: (state, action) => {
            state.devicesDataByRoom = action.payload;
            state.temperatureDevices = action.payload?.filter(
                (device) => device.deviceType?.name?.toLowerCase() === "temperature"
            );
            state.humidityDevices = action.payload?.filter(
                (device) => device.deviceType?.name?.toLowerCase() === "humidity"
            );
            state.pm2_5Devices = action.payload?.filter(
                (device) => device.deviceType?.name?.toLowerCase() === "pm2_5"
            );
            state.powerDevices = action.payload?.filter(
                (device) => device.deviceType?.name?.toLowerCase() === "power"
            );
            state.lightDevices = action.payload?.filter(
                (device) => device.deviceType?.name?.toLowerCase() === "light"
            );
            state.airConditionerDevices = action.payload?.filter(
                (device) => device.deviceType?.name?.toLowerCase() === "ac"
            );
            state.brakerOrSwitchDevices = action.payload?.filter(
                (device) => device.deviceType?.name?.toLowerCase() === "braker/switch"
            );
            state.fanDevices = action.payload?.filter(
                (device) => device.deviceType?.name?.toLowerCase() === "fan"
            );
        },
        setDeviceIdToDelete(state, action) {
            state.deviceIdToDelete = action.payload;
        },
        setPageNoDevice(state, action) {
            state.pageNo = action.payload;
        },
        setPageSizeDevice(state, action) {
            state.pageSize = action.payload;
        },
        setDeviceTypeFilterForDevice(state, action) {
            state.deviceTypeFilters = action.payload;
        },
        setDeviceTypeNames(state, action) {
            state.deviceTypeNames = action.payload;
        },
        setBuildingFilterForDevice(state, action) {
            state.buildingFilterForDevice = action.payload;
        },
        setKeywordsSearchDevice(state, action) {
            state.searchFilter = action.payload;
        },
        setDeviceType(state, action) {
            state.deviceType = action.payload;
        },
        setAddNewDeviceDialogOpen(state, action) {
            state.isAddNewDeviceDialogOpen = action.payload;
        },
        setDeviceLocalData(state, action) {
            state.deviceLocalData = [...state.deviceLocalData, action.payload];
            state.deviceUpdateLocalData = [...state.deviceUpdateLocalData, action.payload];
        },
        clearDeviceLocalData(state, action) {
            state.deviceLocalData = [];
            state.deviceUpdateLocalData = [];
        },
        setNewDevicecalData(state, action) {
            state.deviceLocalData = action.payload;
        },
        appendDeviceLocalData(state, action) {
            state.deviceUpdateLocalData = action.payload
        }

    },
});

export const {
    setIdDeviceTypeToDelete,
    setDeviceTypeDataById,
    setIdDeviceTypeToEdit,
    setIsQuickEditDeviceTypeOpen,
    setDeviceDataForQuickEdit,
    setIsOpenQuickEditDevice,
    setDeviceDataByRoom,
    setDeviceIdToDelete,
    setPageNoDevice,
    setPageSizeDevice,
    setDeviceTypeFilterForDevice,
    setDeviceTypeNames,
    setBuildingFilterForDevice,
    setKeywordsSearchDevice,
    appendDeviceLocalData,
    setNewDevicecalData,
    setDeviceType,
    setAddNewDeviceDialogOpen,
    setDeviceLocalData,
    clearDeviceLocalData,
} = deviceSlice.actions;

export default deviceSlice.reducer;
