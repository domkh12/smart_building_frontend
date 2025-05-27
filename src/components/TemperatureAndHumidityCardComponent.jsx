import {Card, Grid2} from "@mui/material";
import {cardStyle} from "../assets/style.js";
import HumidityForUserComponent from "./HumidityForUserComponent.jsx";
import TemperatureForUserComponent from "./TemperatureForUserComponent.jsx";

function TemperatureAndHumidityCardComponent({temperatureValue, humidityValue, devices}) {

    return (
        <> <Card sx={{...cardStyle, padding: "24px"}}>
            <Grid2 container spacing={2}>
                <Grid2 size={{xs: 12, sm: 6}} display="flex" flexDirection="column" justifyContent="center"
                       alignItems="center" sx={{position: "relative"}}>
                    <TemperatureForUserComponent temperatureValue={temperatureValue} device={devices.find(device => device.deviceType?.name.toUpperCase() === "TEMPERATURE")}/>
                </Grid2>

                <Grid2 size={{xs: 12, sm: 6}} display="flex" flexDirection="column" justifyContent="center"
                       alignItems="center" sx={{position: "relative"}}>
                    <HumidityForUserComponent humidityValue={humidityValue} />
                </Grid2>

            </Grid2>
        </Card></>
    )
}

export default TemperatureAndHumidityCardComponent;