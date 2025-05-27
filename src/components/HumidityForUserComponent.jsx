import {Typography} from "@mui/material";
import {Gauge, gaugeClasses} from "@mui/x-charts";
import {useSelector} from "react-redux";
import useTranslate from "../hook/useTranslate.jsx";
import HumidityLabelComponent from "./HumidityLabelComponent.jsx";

function HumidityForUserComponent({humidityValue}) {
    const {t} = useTranslate();
    const humidityDevices = useSelector((state) => state.device.humidityDevices);
    const objectHumidityFromWs = useSelector((state) => state.message.objectHumidityFromWs);

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

    const getGaugeHumidityColor = (value, thresholds) => {
        if (value >= thresholds.veryHigh) return '#e53935'; // Red for Very High humidity (81-100%)
        if (value >= thresholds.high) return '#fb8c00'; // Orange for High humidity (61-80%)
        if (value >= thresholds.normal) return '#ffeb3b'; // Yellow for Normal humidity (31-60%)
        if (value >= thresholds.low) return '#81c784'; // Green for Low humidity (0-30%)
        return '#52b202'; // Default Green for normal (if value is 0 or very low)
    };

    return (
        <>
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
               <HumidityLabelComponent key={device.id} device={device} objectHumidityFromWs={objectHumidityFromWs}/>
            ))}
        </>
    )
}

export default HumidityForUserComponent;