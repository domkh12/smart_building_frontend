import { createSlice } from "@reduxjs/toolkit";

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
        objectPowerFromWs: {}
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
           if (action.payload && action.payload.messageType === "TEMPERATURE") {
               state.temperatureValue = action.payload.value;
               state.objectTemperatureFromWs = action.payload;
           }else if (action.payload && action.payload.messageType === "HUMIDITY") {
               state.humidityValue = action.payload.value;
               state.objectHumidityFromWs = action.payload;
           }else if (action.payload && action.payload.messageType === "POWER") {
               state.powerValue = action.payload.value;
               state.objectPowerFromWs = action.payload;
           }else if (action.payload && action.payload.messageType === "PM2_5"){
                state.pm2_5Value = action.payload.value;
               state.objectPM2_5FromWs = action.payload;
           }else {
               state.messagesFromWS = action.payload;
           }
       },
        clearMessageFromWS (state, action) {
           state.pm2_5Value = "";
           state.powerValue = "";
           state.humidityValue = "";
           state.temperatureValue = "";
        }
    },
});

export const { setMessageSendToWs,setMessagesFromWS, clearMessageFromWS, setTemperatureValue } = messageSlice.actions;

export default messageSlice.reducer;
