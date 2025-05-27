import {Typography} from "@mui/material";
import {Gauge, gaugeClasses} from "@mui/x-charts";
import useTranslate from "../hook/useTranslate.jsx";
import {useSelector} from "react-redux";
import PowerLabelComponent from "./PowerLabelComponent.jsx";

function PowerForUserComponent({powerValue}) {
    const {t} = useTranslate();
    const powerDevices = useSelector((state) => state.device.powerDevices);
    const objectPowerFromWs = useSelector((state) => state.message.objectPowerFromWs);

    const settings = {
        width: 200,
        height: 200,
    };

    const powerThresholds = {
        min: 0,
        max: 500,
        low: 100,
        moderate: 200,
        high: 350,
        veryHigh: 450,
        extreme: 500
    };

    const getGaugePowerColor = (value, thresholds) => {
        if (value >= thresholds.extreme) return '#e53935'; // Red for Extreme
        if (value >= thresholds.veryHigh) return '#fb8c00'; // Orange for Very High
        if (value >= thresholds.high) return '#fbc02d'; // Yellow for High
        if (value >= thresholds.moderate) return '#ffeb3b'; // Light Yellow for Moderate
        if (value >= thresholds.low) return '#81c784'; // Green for Low
        return '#52b202'; // Default Green for normal (if value is 0 or very low)
    };

    return(
        <>
            <Typography variant="h6" component="h6" sx={{mb: 4}}>{t('power')}</Typography>
            {
                parseFloat(powerValue) ? (<Gauge
                    {...settings}
                    cornerRadius="50%"
                    value={parseFloat(powerValue) || 0}
                    valueMin={powerThresholds.min}
                    valueMax={powerThresholds.max}
                    sx={(theme) => ({
                        [`& .${gaugeClasses.valueText}`]: {
                            fontSize: 40,
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                            fill: getGaugePowerColor(parseFloat(powerValue), powerThresholds),

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

            {powerDevices.map((device) => (
                <PowerLabelComponent key={device.id} device={device} objectPowerFromWs={objectPowerFromWs}/>
            ))}</>
    )
}

export default PowerForUserComponent;