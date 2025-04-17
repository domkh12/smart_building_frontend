import {Card, Grid2, Typography} from "@mui/material";
import {cardStyle} from "../assets/style.js";
import {Gauge, gaugeClasses} from "@mui/x-charts";
import useTranslate from "../hook/useTranslate.jsx";
import {useSelector} from "react-redux";

function TemperatureAndHumidityCardComponent({temperatureValue, humidityValue}) {
    const humidityDevices = useSelector((state) => state.device.humidityDevices);
    const temperatureDevices = useSelector((state) => state.device.temperatureDevices);
    const objectTemperatureFromWs = useSelector((state) => state.message.objectTemperatureFromWs);
    const objectHumidityFromWs = useSelector((state) => state.message.objectHumidityFromWs);

    const {t} = useTranslate();
    const settings = {
        width: 200,
        height: 200,
    };

    const humidityThresholds = {
        min: 0,
        max: 100,
        low: 30,
        normal: 60,
        high: 80,
        veryHigh: 100
    };

    const temperatureThresholds = {
        min: -10,
        max: 50,
        cold: 10,
        comfortable: 25,
        warm: 35,
        hot: 45,
        extremeHeat: 50
    };

    const getGaugeHumidityColor = (value, thresholds) => {
        if (value >= thresholds.veryHigh) return '#e53935'; // Red for Very High humidity (81-100%)
        if (value >= thresholds.high) return '#fb8c00'; // Orange for High humidity (61-80%)
        if (value >= thresholds.normal) return '#ffeb3b'; // Yellow for Normal humidity (31-60%)
        if (value >= thresholds.low) return '#81c784'; // Green for Low humidity (0-30%)
        return '#52b202'; // Default Green for normal (if value is 0 or very low)
    };

    const getGaugeTemperatureColor = (value, thresholds) => {
        if (value >= thresholds.extremeHeat) return '#e53935'; // Red for Extreme Heat (46-50°C)
        if (value >= thresholds.hot) return '#fb8c00'; // Orange for Hot temperature (36-45°C)
        if (value >= thresholds.warm) return '#fbc02d'; // Yellow for Warm temperature (26-35°C)
        if (value >= thresholds.comfortable) return '#81c784'; // Light Green for Comfortable temperature (11-25°C)
        if (value >= thresholds.cold) return '#42a5f5'; // Light Blue for Cold temperature (-10-10°C)
        return '#52b202'; // Default Green for normal (if value is very low or 0)
    };

    return (
        <> <Card sx={{...cardStyle, padding: "24px"}}>
            <Grid2 container spacing={2}>
                <Grid2 size={{xs: 12, sm: 6}} display="flex" flexDirection="column" justifyContent="center"
                       alignItems="center" sx={{position: "relative"}}>
                    <div className="w-3 h-3 bg-green-400 absolute top-1 left-0 rounded-full"></div>
                    <Typography variant="h6" component="h6" sx={{mb: 4}}>{t('temperature')}</Typography>
                    {
                        parseFloat(temperatureValue) ? (<Gauge
                            {...settings}
                            cornerRadius="50%"
                            value={parseFloat(temperatureValue) || temperatureThresholds.min}
                            valueMin={temperatureThresholds.min}
                            valueMax={temperatureThresholds.max}
                            sx={(theme) => ({
                                [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 40,
                                },
                                [`& .${gaugeClasses.valueArc}`]: {
                                    fill: getGaugeTemperatureColor(parseFloat(temperatureValue), temperatureThresholds),
                                },
                                [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: "transparent"
                                },
                            })}
                        />) : (
                            <div className="w-[200px] h-[200px] flex justify-center items-center">
                                <p className="text-[5rem] text-gray-500">__</p>
                            </div>
                        )
                    }

                    {temperatureDevices.map((device) => (
                        <div key={device.id} className="flex justify-evenly w-full mt-5 gap-5 flex-col">
                            <div className="flex justify-evenly w-full">
                                <Typography variant="h6">{device.name}</Typography>
                                <Typography variant="h6">{objectTemperatureFromWs.deviceId == device.id ? `${parseFloat(objectTemperatureFromWs.value)}°C`: "__"}</Typography>
                            </div>
                        </div>
                    ))}

                </Grid2>

                <Grid2 size={{xs: 12, sm: 6}} display="flex" flexDirection="column" justifyContent="center"
                       alignItems="center" sx={{position: "relative"}}>
                    <div className="w-3 h-3 bg-green-400 absolute top-1 left-0 rounded-full"></div>
                    <Typography variant="h6" component="h6" sx={{mb: 4}}>{t('humidity')}</Typography>

                    {
                        parseFloat(humidityValue) ? (<Gauge
                            {...settings}
                            value={parseFloat(humidityValue) || 0}
                            valueMin={humidityThresholds.min}
                            valueMax={humidityThresholds.max}
                            cornerRadius="50%"
                            sx={(theme) => ({
                                [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 40,
                                },
                                [`& .${gaugeClasses.valueArc}`]: {
                                    fill: getGaugeHumidityColor(parseFloat(humidityValue), humidityThresholds),
                                },
                                [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: "transparent"
                                },
                            })}
                        />) : (
                            <div className="w-[200px] h-[200px] flex justify-center items-center">
                                <p className="text-[5rem] text-gray-500">__</p>
                            </div>
                        )
                    }

                    {humidityDevices.map((device) => (
                        <div key={device.id} className="flex justify-evenly w-full mt-5 gap-5 flex-col">
                            <div className="flex justify-evenly w-full">
                                <Typography variant="h6">{device.name}</Typography>
                                <Typography variant="h6">{objectHumidityFromWs.deviceId == device.id ? `${objectHumidityFromWs.value}%` : "__"}</Typography>
                            </div>
                        </div>
                    ))}

                </Grid2>

            </Grid2>
        </Card></>
    )
}

export default TemperatureAndHumidityCardComponent;