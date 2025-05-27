import {Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {clearMessageFromWS} from "../redux/feature/message/messageSlice.js";
import StatusDeviceComponent from "./StatusDeviceComponent.jsx";

function PowerLabelComponent({device, objectPowerFromWs}) {
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
    return (
        <>
            <div key={device.id} className="flex justify-evenly w-full mt-5 gap-5 flex-col">
                <div className="flex justify-evenly w-full relative">
                    <StatusDeviceComponent isOnline={isOnline} top={0} left={2}/>
                    <Typography variant="h6">{device.name}</Typography>
                    <Typography
                        variant="h6">{(objectPowerFromWs.deviceId == device.id && isOnline) ? `${objectPowerFromWs.value}W` : "__"}</Typography>

                </div>
            </div>
        </>
    )
}

export default PowerLabelComponent;