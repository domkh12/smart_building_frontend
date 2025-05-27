import {createSlice} from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",

    // initial data
    initialState: {
        pm2_5Value: "",
        powerValue: "",
        humidityValue: "",
        temperatureValue: "",
        messagesFromWS: {},
        messageSentToWs: {},
        objectTemperatureFromWs: {},
        objectHumidityFromWs: {},
        objectPM2_5FromWs: {},
        objectPowerFromWs: {},
        deviceStatus: []
    },

    // function
    reducers: {
        setMessageSendToWs(state, action) {
            state.messageSentToWs = action.payload;
        },
        setTemperatureValue(state, action) {
            state.temperatureValue = action.payload;
        },
        setMessagesFromWS(state, action) {
            state.messagesFromWS = action.payload;
            state.deviceStatus = [];
            for (let i = 0; i < action.payload?.length; i++) {
                if (action.payload[i].status === "Active" && action.payload[i].value === "ONLINE") {
                    state.deviceStatus.push(action.payload[i]);
                } else if (action.payload[i].status === "Inactive" && action.payload[i].value === "OFFLINE") {
                    state.deviceStatus.push(action.payload[i]);
                }else if (action.payload[i].messageType === "HUMIDITY") {
                    state.objectHumidityFromWs = action.payload[i];
                    state.humidityValue = action.payload[i].value;
                }else if (action.payload[i].messageType === "PM2_5") {
                    state.objectPM2_5FromWs = action.payload[i];
                    state.pm2_5Value = action.payload[i].value;
                }else if (action.payload[i].messageType === "POWER") {
                    state.objectPowerFromWs = action.payload[i];
                    state.powerValue = action.payload[i].value;
                }else if (action.payload[i].messageType === "TEMPERATURE") {
                    state.objectTemperatureFromWs = action.payload[i];
                    state.temperatureValue = action.payload[i].value;
                }
            }

        },
        clearMessageFromWS(state, action) {
            state.pm2_5Value = "";
            state.powerValue = "";
            state.humidityValue = "";
            state.temperatureValue = "";
        }
    },
});

export const {setMessageSendToWs, setMessagesFromWS, clearMessageFromWS, setTemperatureValue} = messageSlice.actions;

export default messageSlice.reducer;
