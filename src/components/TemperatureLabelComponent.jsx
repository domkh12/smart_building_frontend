import {Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearMessageFromWS} from "../redux/feature/message/messageSlice.js";
import StatusDeviceComponent from "./StatusDeviceComponent.jsx";

function TemperatureLabelComponent({objectTemperatureFromWs, device}) {
    const dispatch = useDispatch();
    const [isOnline, setIsOnline] = useState(device?.status === "Active");
    const deviceStatus = useSelector((state) => state?.message?.deviceStatus);

    useEffect(() => {
        if (deviceStatus?.length > 0) {
            const deviceStatusObject = deviceStatus.find(
                (deviceStatus) => deviceStatus?.deviceId == device?.id
            );
            if (deviceStatusObject) {
                setIsOnline(deviceStatusObject?.status === "Active" ? true : false);
                if (deviceStatusObject?.status === "Inactive") {
                    dispatch(clearMessageFromWS());
                }
            }
        }
    }, [deviceStatus]);
    return <>
        <div className="flex justify-evenly w-full mt-5 gap-5 flex-col">
            <div className="flex justify-evenly w-full relative">
                <StatusDeviceComponent isOnline={isOnline} top={0} left={2}/>
                <Typography variant="h6">{device.name}</Typography>
                <Typography
                    variant="h6">{(objectTemperatureFromWs.deviceId == device.id && isOnline) ? `${parseFloat(objectTemperatureFromWs.value)}°C` : "__"}</Typography>
            </div>
        </div>
    </>
}

export default TemperatureLabelComponent;