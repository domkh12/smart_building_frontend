import {Switch, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setMessageSendToWs} from "../redux/feature/message/messageSlice.js";

function SwitchComponent({ device, title}){
    const [isChecked, setIsChecked] = useState(false);
    const label = {inputProps: {"aria-label": "Switch demo"}};
    const user = useSelector((state) => state.auth.userProfile);
    const dispatch = useDispatch();
    const messagesFromWs = useSelector((state) => state.message.messagesFromWS);

    useEffect(() => {
        setIsChecked(device?.events[0]?.value === "1");
    }, []);

    useEffect(() => {
        if (messagesFromWs.deviceId == device.id && messagesFromWs.messageType === "SWITCH") {
            setIsChecked(messagesFromWs.value == "1");
        }
    }, [messagesFromWs])

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

    return (
        <div className="flex justify-evenly items-center w-full border shadow-md rounded-lg py-2">
            <Typography variant="body1">{device?.name || title}</Typography>
            <Switch {...label} checked={isChecked} onChange={handleChange}/>
        </div>
    )
}

export default SwitchComponent;