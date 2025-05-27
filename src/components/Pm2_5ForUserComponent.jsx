import {Typography} from "@mui/material";
import {Gauge, gaugeClasses} from "@mui/x-charts";
import {useSelector} from "react-redux";
import useTranslate from "../hook/useTranslate.jsx";
import Pm2_5LabelComponent from "./Pm2_5LabelComponent.jsx";

function Pm2_5ForUserComponent({pm2_5Value}) {
    const {t} = useTranslate();
    const objectPM2_5FromWs = useSelector((state) => state.message.objectPM2_5FromWs);
    const pm2_5Devices = useSelector((state) => state.device.pm2_5Devices);

    const settings = {
        width: 200,
        height: 200,
    };

    const getGaugeColor = (value, thresholds) => {
        if (value >= thresholds.hazardous) return '#FF0000';
        if (value >= thresholds.severe) return '#A020F0';
        if (value >= thresholds.unhealthy) return '#FFC0CB';
        if (value >= thresholds.poor) return '#FFA500';
        if (value >= thresholds.moderate) return '#ffeb3b';
        return '#52b202'; // Green for normal (if less than 0, which shouldn't happen in this case)
    };

    const pm2_5Thresholds = {
        min: 0,
        max: 300,
        moderate: 50,
        poor: 100,
        unhealthy: 150,
        severe: 200,
        hazardous: 300
    };
    return(
        <>
            <Typography variant="h6" component="h6" sx={{mb: 4}}>{t('pm2_5')}</Typography>

            {
                parseFloat(pm2_5Value) ? (<Gauge
                    {...settings}
                    cornerRadius="50%"
                    value={parseFloat(pm2_5Value) || 0}
                    valueMin={pm2_5Thresholds.min}
                    valueMax={pm2_5Thresholds.max}
                    sx={(theme) => ({
                        [`& .${gaugeClasses.valueText}`]: {
                            fontSize: 40,
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                            fill: getGaugeColor(parseFloat(pm2_5Value), pm2_5Thresholds),

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

            {pm2_5Devices.map((device) => (
              <Pm2_5LabelComponent key={device.id} device={device} objectPM2_5FromWs={objectPM2_5FromWs}/>
            ))}
        </>
    )
}

export default Pm2_5ForUserComponent;