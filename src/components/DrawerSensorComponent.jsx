import {Box, Drawer, IconButton, Typography} from "@mui/material";
import GaugePowerComponent from "./GaugePowerComponent.jsx";
import GaugeTemperatureComponent from "./GaugeTemperatureComponent.jsx";
import GaugeHumidityComponent from "./GaugeHumidityComponent.jsx";
import GaugePM2_5Component from "./GaugePM2_5Component.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setIsOpenDrawerSensor} from "../redux/feature/actions/actionSlice.js";
import {IoClose} from "react-icons/io5";

function DrawerSensorComponent({ powerValue, temperatureValue, humidityValue, pm2_5Value, roomFetchedById }) {
    const dispatch = useDispatch();
    const isOpenDrawerSensor = useSelector((state) => state.action.isOpenDrawerSensor);

    return(
      <>
        <Drawer open={isOpenDrawerSensor} onClose={() => dispatch(setIsOpenDrawerSensor(false))} anchor={"right"}>
            <Box
                sx={{width: "100vw"}}
                role="presentation"
                onClick={() => dispatch(setIsOpenDrawerSensor(false))}
            >
                <div className="flex justify-between items-center px-10 py-8">
                    <Typography variant="h5">Sensor</Typography>
                    <IconButton onClick={() => dispatch(setIsOpenDrawerSensor(false))}>
                        <IoClose/>
                    </IconButton>
                </div>

                <div className="col-span-1 gap-5 flex flex-col">
                    <GaugePowerComponent value={powerValue} device={roomFetchedById?.data?.devices.find(device => device.deviceType?.name.toUpperCase() === "POWER")}/>
                    <GaugeTemperatureComponent value={temperatureValue} device={roomFetchedById?.data?.devices.find(device => device.deviceType?.name.toUpperCase() === "TEMPERATURE")}/>
                    <GaugeHumidityComponent value={humidityValue} device={roomFetchedById?.data?.devices.find(device => device.deviceType?.name.toUpperCase() === "HUMIDITY")}/>
                    <GaugePM2_5Component value={pm2_5Value} device={roomFetchedById?.data?.devices.find(device => device.deviceType?.name.toUpperCase() === "PM2_5")}/>
                </div>

            </Box>
        </Drawer>
      </>
    );
}

export default DrawerSensorComponent;