import {Button, Switch, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearMessageFromWS, setMessageSendToWs} from "../redux/feature/message/messageSlice.js";
import StatusDeviceComponent from "./StatusDeviceComponent.jsx";

function SwitchComponent({device, title}) {
    const [isChecked, setIsChecked] = useState(false);
    const [isOnline, setIsOnline] = useState(device?.status === "Active");
    const label = {inputProps: {"aria-label": "Switch demo"}};
    const user = useSelector((state) => state.auth.userProfile);
    const dispatch = useDispatch();
    const messagesFromWs = useSelector((state) => state?.message?.messagesFromWS);
    const deviceStatus = useSelector((state) => state?.message?.deviceStatus);

    useEffect(() => {
        if (deviceStatus?.length > 0) {
            const deviceStatusObject = deviceStatus.find(
                (deviceStatus) => deviceStatus.deviceId == device.id
            );
            if (deviceStatusObject) {
                setIsOnline(deviceStatusObject.status === "Active" ? true : false);
            }
        }
    }, [deviceStatus]);

    useEffect(() => {
        const switchMessages = messagesFromWs.some(message => message?.messageType === "SWITCH");
        const deviceSwitchIdMatch = messagesFromWs.some(message => message?.deviceId == device?.id);
        const deviceSwitch = messagesFromWs.find(message => message?.deviceId == device?.id);
        if (deviceSwitchIdMatch && switchMessages) {
            if (deviceSwitch) {
                setIsChecked(deviceSwitch?.value == "1");
            }
        }
    }, [messagesFromWs]);

    useEffect(() => {
        setIsChecked(device?.events[0]?.value === "1");
    }, []);

    const handleChange = async (event) => {
        setIsChecked(event.target.checked);
        const messageObject = {
            deviceId: device.id,
            value: event.target.checked ? 1 : 0,
            username: user?.email,
            messageType: "SWITCH",
        };
        dispatch(setMessageSendToWs(messageObject))

    };

    const handleButtonClick = () => {
        setIsChecked(!isChecked);
        const newCheckedState = !isChecked;
        const messageObject = {
            deviceId: device.id,
            value: newCheckedState ? 1 : 0,
            username: user?.email,
            messageType: "SWITCH",
        };
        dispatch(setMessageSendToWs(messageObject))
    }

    return (
        <Button disabled={!isOnline} onClick={handleButtonClick} variant="outlined"
                sx={{width: "100%", position: "relative"}}>
            <StatusDeviceComponent isOnline={isOnline} top={2} left={2}/>
            <div className="flex w-full justify-evenly items-center">
                <Typography variant="body1">{device?.name || title}</Typography>
                <Switch {...label} checked={isChecked} onChange={handleChange} disabled={!isOnline}/>
            </div>
        </Button>
    )
}

export default SwitchComponent;