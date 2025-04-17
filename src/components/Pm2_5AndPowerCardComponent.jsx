import {cardStyle} from "../assets/style.js";
import {Card, Grid2, Typography} from "@mui/material";
import {Gauge, gaugeClasses} from "@mui/x-charts";
import useTranslate from "../hook/useTranslate.jsx";
import {useSelector} from "react-redux";

function Pm2_5AndPowerCardComponent({pm2_5Value, powerValue}) {
    const pm2_5Devices = useSelector((state) => state.device.pm2_5Devices);
    const powerDevices = useSelector((state) => state.device.powerDevices);
    const objectPM2_5FromWs = useSelector((state) => state.message.objectPM2_5FromWs);
    const objectPowerFromWs = useSelector((state) => state.message.objectPowerFromWs);

    const {t} = useTranslate();
    const settings = {
        width: 200,
        height: 200,
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

    const powerThresholds = {
        min: 0,
        max: 500,
        low: 100,
        moderate: 200,
        high: 350,
        veryHigh: 450,
        extreme: 500
    };


    const getGaugeColor = (value, thresholds) => {
        if (value >= thresholds.hazardous) return '#FF0000';
        if (value >= thresholds.severe) return '#A020F0';
        if (value >= thresholds.unhealthy) return '#FFC0CB';
        if (value >= thresholds.poor) return '#FFA500';
        if (value >= thresholds.moderate) return '#ffeb3b';
        return '#52b202'; // Green for normal (if less than 0, which shouldn't happen in this case)
    };

    const getGaugePowerColor = (value, thresholds) => {
        if (value >= thresholds.extreme) return '#e53935'; // Red for Extreme
        if (value >= thresholds.veryHigh) return '#fb8c00'; // Orange for Very High
        if (value >= thresholds.high) return '#fbc02d'; // Yellow for High
        if (value >= thresholds.moderate) return '#ffeb3b'; // Light Yellow for Moderate
        if (value >= thresholds.low) return '#81c784'; // Green for Low
        return '#52b202'; // Default Green for normal (if value is 0 or very low)
    };

    return (<>
        <Card sx={{...cardStyle, padding: "24px"}}>
            <Grid2 container spacing={2}>
                <Grid2 size={{xs: 12, sm: 6}} display="flex" flexDirection="column" justifyContent="center"
                       alignItems="center" sx={{position: "relative"}}>
                    <div className="w-3 h-3 bg-green-400 absolute top-1 left-0 rounded-full"></div>
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
                        <div key={device.id} className="flex justify-evenly w-full mt-5 gap-5 flex-col">
                            <div className="flex justify-evenly w-full">
                                <Typography variant="h6">{device.name}</Typography>
                                <Typography
                                    variant="h6">{objectPM2_5FromWs.deviceId == device.id ? `${objectPM2_5FromWs.value}µg/m³` : "__"}</Typography>
                            </div>
                        </div>
                    ))}


                </Grid2>

                <Grid2 size={{xs: 12, sm: 6}} display="flex" flexDirection="column" justifyContent="center"
                       alignItems="center" sx={{position: "relative"}}>
                    <div className="w-3 h-3 bg-green-400 absolute top-1 left-0 rounded-full"></div>
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
                        <div key={device.id} className="flex justify-evenly w-full mt-5 gap-5 flex-col">
                            <div className="flex justify-evenly w-full">
                                <Typography variant="h6">{device.name}</Typography>

                                <Typography
                                    variant="h6">{objectPowerFromWs.deviceId == device.id ? `${objectPowerFromWs.value}W` : "__"}</Typography>

                            </div>
                        </div>
                    ))}

                </Grid2>


            </Grid2>
        </Card>
    </>)
}

export default Pm2_5AndPowerCardComponent;