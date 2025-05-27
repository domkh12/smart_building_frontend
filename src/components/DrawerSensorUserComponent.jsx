import {setIsOpenDrawerSensor} from "../redux/feature/actions/actionSlice.js";
import {Box, Drawer, IconButton, Typography} from "@mui/material";
import {IoClose} from "react-icons/io5";
import GaugePowerComponent from "./GaugePowerComponent.jsx";
import GaugeTemperatureComponent from "./GaugeTemperatureComponent.jsx";
import GaugeHumidityComponent from "./GaugeHumidityComponent.jsx";
import GaugePM2_5Component from "./GaugePM2_5Component.jsx";
import {useDispatch, useSelector} from "react-redux";
import TemperatureAndHumidityCardComponent from "./TemperatureAndHumidityCardComponent.jsx";
import Pm2_5AndPowerCardComponent from "./Pm2_5AndPowerCardComponent.jsx";

function DrawerSensorUserComponent({ temperatureValue, humidityValue, pm2_5Value, powerValue, roomFetchedById}) {
    const dispatch = useDispatch();
    const isOpenDrawerSensor = useSelector((state) => state.action.isOpenDrawerSensor);
    return (
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
                    <TemperatureAndHumidityCardComponent temperatureValue={temperatureValue}
                                                         humidityValue={humidityValue}
                                                         devices={roomFetchedById?.data?.devices}/>
                    <Pm2_5AndPowerCardComponent pm2_5Value={pm2_5Value} powerValue={powerValue}/>
                </div>

            </Box>
        </Drawer>
    )
}

export default DrawerSensorUserComponent;