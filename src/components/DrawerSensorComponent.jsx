import {Box, Drawer} from "@mui/material";
import GaugePowerComponent from "./GaugePowerComponent.jsx";
import GaugeTemperatureComponent from "./GaugeTemperatureComponent.jsx";
import GaugeHumidityComponent from "./GaugeHumidityComponent.jsx";
import GaugePM2_5Component from "./GaugePM2_5Component.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setIsOpenDrawerSensor} from "../redux/feature/actions/actionSlice.js";

function DrawerSensorComponent({ powerValue, temperatureValue, humidityValue, pm2_5Value }) {
    const dispatch = useDispatch();
    const isOpenDrawerSensor = useSelector((state) => state.action.isOpenDrawerSensor);

    return(
      <>
        <Drawer open={isOpenDrawerSensor} onClose={() => dispatch(setIsOpenDrawerSensor(false))} anchor={"right"}>
            <Box
                sx={{width: 320}}
                role="presentation"
                onClick={() => dispatch(setIsOpenDrawerSensor(false))}
            >

                <div className="col-span-1 gap-3 lg:flex flex-col">
                    <GaugePowerComponent value={powerValue}/>
                    <GaugeTemperatureComponent value={temperatureValue}/>
                    <GaugeHumidityComponent value={humidityValue}/>
                    <GaugePM2_5Component value={pm2_5Value}/>
                </div>

            </Box>
        </Drawer>
      </>
    );
}

export default DrawerSensorComponent;