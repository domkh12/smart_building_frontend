import {Button, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {FaArrowDownLong, FaArrowUpLong} from "react-icons/fa6";
import {red} from "@mui/material/colors";
import {useSelector} from "react-redux";
import {FaStop} from "react-icons/fa";

function DoorSwitchButtonComponent({ device, messages, sendMessage }) {
    const [isPressed, setIsPressed] = useState(false);
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
        const switchMessages = messages.some(message => message?.messageType === "SWITCH");
        const deviceSwitchIdMatch = messages.some(message => message?.deviceId == device?.id);
        const deviceSwitch = messages.find(message => message?.deviceId == device?.id);
        if (deviceSwitchIdMatch && switchMessages) {
            if (deviceSwitch) {
                setIsChecked(deviceSwitch?.value == "1");
            }
        }
    }, [messages]);

    useEffect(() => {
        if (!isPressed) {
            setTimeout(() => {
                if (!isOnline) return;
                const newCheckedState = !isChecked;
                setIsChecked(newCheckedState);
                const messageObject = {
                    deviceId: device.id,
                    value: 0,
                    username: user?.email,
                    messageType: "SWITCH",
                };
                sendMessage(messageObject);
            },1000)
        }
    }, [isPressed, isChecked]);

    const handleMouseDown = () => {
        setIsPressed(true);
        console.log('Button pressed');
        if (!isOnline) return;
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        const messageObject = {
            deviceId: device.id,
            value: 1,
            username: user?.email,
            messageType: "SWITCH",
        };
        sendMessage(messageObject);
    };

    const handleMouseUp = () => {
        setIsPressed(false);
        console.log('Button released');
    };


    // const handleButtonClick = () => {
    //     if (!isOnline) return;
    //     const newCheckedState = !isChecked;
    //     setIsChecked(newCheckedState);
    //     const messageObject = {
    //         deviceId: device.id,
    //         value: newCheckedState ? 1 : 0,
    //         username: user?.email,
    //         messageType: "SWITCH",
    //     };
    //     sendMessage(messageObject);
    //     setTimeout(() => {
    //         const newCheckedState = !isChecked;
    //         setIsChecked(newCheckedState);
    //         const messageObject = {
    //             deviceId: device.id,
    //             value: newCheckedState ? 1 : 0,
    //             username: user?.email,
    //             messageType: "SWITCH",
    //         };
    //         sendMessage(messageObject);
    //     },200)
    // };

    const renderIcons = (deviceName) => {
        const lowerCaseDeviceName = deviceName.toLowerCase();
        switch (lowerCaseDeviceName) {
            case "up": return (<FaArrowUpLong className="w-8 h-8 text-white"/>);
            case "stop": return (<FaStop className="w-8 h-8 text-white"/>);
            case "down": return (<FaArrowDownLong className="w-8 h-8 text-white"/>);
        }
    };

    return (
        <Button variant="contained"
                disableRipple
                disabled={!isOnline}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                // onClick={handleButtonClick}
                sx={{
                    p: 3,
                    backgroundColor: device?.name.toLowerCase() === "stop" ? red[600] : "",
                }}
                startIcon={renderIcons(device?.name)}
        >
            <Typography variant="body1" sx={{fontSize: "20px"}}>
                {device?.name}
            </Typography>
        </Button>
    );
}

export default DoorSwitchButtonComponent;