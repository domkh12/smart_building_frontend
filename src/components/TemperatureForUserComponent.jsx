import {Typography} from "@mui/material";
import {Gauge, gaugeClasses} from "@mui/x-charts";
import {useSelector} from "react-redux";
import useTranslate from "../hook/useTranslate.jsx";
import TemperatureLabelComponent from "./TemperatureLabelComponent.jsx";

function TemperatureForUserComponent({temperatureValue, device}) {
    const {t} = useTranslate();
    const temperatureDevices = useSelector((state) => state.device.temperatureDevices);
    const objectTemperatureFromWs = useSelector((state) => state.message.objectTemperatureFromWs);


    const settings = {
        width: 200,
        height: 200,
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

    const getGaugeTemperatureColor = (value, thresholds) => {
        if (value >= thresholds.extremeHeat) return '#e53935'; // Red for Extreme Heat (46-50°C)
        if (value >= thresholds.hot) return '#fb8c00'; // Orange for Hot temperature (36-45°C)
        if (value >= thresholds.warm) return '#fbc02d'; // Yellow for Warm temperature (26-35°C)
        if (value >= thresholds.comfortable) return '#81c784'; // Light Green for Comfortable temperature (11-25°C)
        if (value >= thresholds.cold) return '#42a5f5'; // Light Blue for Cold temperature (-10-10°C)
        return '#52b202'; // Default Green for normal (if value is very low or 0)
    };
    return (
        <>
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
                <TemperatureLabelComponent key={device?.id} objectTemperatureFromWs={objectTemperatureFromWs} device={device} />
            ))}
        </>
    )
}

export default TemperatureForUserComponent;