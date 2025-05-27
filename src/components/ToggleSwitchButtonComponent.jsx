import {Box, Button, Switch, Typography} from "@mui/material";
import {useState, useEffect} from "react";
import {PiFanFill} from "react-icons/pi";
import {useSelector} from "react-redux";
import {BsFillLightbulbOffFill} from "react-icons/bs";
import {BsFillLightbulbFill} from "react-icons/bs";
import {TbAirConditioning, TbAirConditioningDisabled} from "react-icons/tb";

const ToggleSwitchButtonComponent = ({device, messages, sendMessage}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isOnline, setIsOnline] = useState(device?.status === "Active");
    const deviceStatus = useSelector((state) => state.message.deviceStatus);

    const user = useSelector((state) => state.auth.userProfile);

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
        const switchMessages = messages.filter(message => message.messageType === "SWITCH");
        const deviceSwitch = messages.filter(message => message.deviceId == device.id);
        if (deviceSwitch && switchMessages) {
            const deviceValue = deviceSwitch.find(message => message.value);
            if (deviceValue) {
                setIsChecked(deviceValue.value == "1");
            }
        }
    }, [messages]);

    useEffect(() => {
        setIsChecked(device?.events[0]?.value === "1");
    }, []);

    const handleChange = async (event) => {
        setIsChecked(event.target.checked);
        const messageObject = {
            deviceId: device.id,
            value: event.target.checked ? 1 : 0,
            messageType: "SWITCH",
            status: "Active"
        };
        sendMessage(messageObject)
    };

    const handleButtonClick = () => {
        if (!isOnline) return; // Don't do anything if device is offline
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        const messageObject = {
            deviceId: device.id,
            value: newCheckedState ? 1 : 0,
            username: user?.email,
            messageType: "SWITCH",
        };
        sendMessage(messageObject);
    };


    const renderIcons = (typeName) => {
        const lowerCaseTypeName = typeName.toLowerCase();
        switch (lowerCaseTypeName) {
            case "light":
                return isChecked ? (
                    <BsFillLightbulbFill className="w-10 h-10 text-orange-500"/>
                ) : (
                    <BsFillLightbulbOffFill className="w-10 h-10 text-orange-500"/>
                );
            case "fan":
                return (
                    <PiFanFill
                        className={`w-10 h-10 text-orange-500 ${isChecked && "animate-spin"} `}
                    />
                );
            case "ac":
                return (
                    isChecked ? (
                        <TbAirConditioning
                            className={`w-10 h-10 text-orange-500`}
                        />
                    ) : (
                        <TbAirConditioningDisabled
                            className={`w-10 h-10 text-orange-500`}
                        />
                    )

                )
        }
    };

    const label = {inputProps: {"aria-label": "Switch demo"}};
    return (
        <Button variant="outlined"
                disableRipple
                disabled={!isOnline}
                onClick={handleButtonClick}
                sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    gap: 4
                }}
        >
            <Box className="flex justify-between items-center w-full relative">
                {renderIcons(device?.deviceType?.name)}
                <div
                    className={`w-2 h-2 ${isOnline ? "bg-green-500" : "bg-red-500"} rounded-full absolute -top-2 -left-2`}></div>
                <Switch {...label} checked={isChecked} onChange={handleChange} disabled={!isOnline}/>
            </Box>
            <Typography variant="body1" sx={{fontSize: "20px"}}>
                {device?.name}
            </Typography>
        </Button>
    );
};

export default ToggleSwitchButtonComponent;
