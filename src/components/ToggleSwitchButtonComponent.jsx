import {Box, Switch, Typography} from "@mui/material";
import  { useState, useEffect, useRef } from "react";
import { useUpdateDeviceValueMutation } from "../redux/feature/device/deviceApiSlice";
import { PiFanFill } from "react-icons/pi";
import useWebSocket from "../hook/useWebSocket";
import useWebsocketServer from "../hook/useWebsocketServer";
import { useSelector } from "react-redux";
import { BsFillLightbulbOffFill } from "react-icons/bs";
import { BsFillLightbulbFill } from "react-icons/bs";

const ToggleSwitchButtonComponent = ({ device, messages, sendMessage }) => {
  const [isChecked, setIsChecked] = useState(false);
  const user = useSelector((state) => state.auth.userProfile);
  const [updateDeviceValue] = useUpdateDeviceValueMutation();
  useEffect(() => {
      if (messages.messageType === "SWITCH" && messages.deviceId == device.id) {
        console.log("messages.value", messages.value)
        if (messages.value === "0") {

          console.log(messages)
          setIsChecked(false);
        }else if (messages.messageType === "SWITCH" && messages.value == "1") {
          setIsChecked(true);
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
      username: user?.email,
      messageType: "SWITCH",
    };
    sendMessage(messageObject)
  };

  const renderIcons = (typeName) => {
    const lowerCaseTypeName = typeName.toLowerCase();
    switch (lowerCaseTypeName) {
      case "light":
        return isChecked ? (
          <BsFillLightbulbFill className="w-10 h-10 text-orange-500" />
        ) : (
          <BsFillLightbulbOffFill className="w-10 h-10 text-orange-500" />
        );
      case "fan":
        return (
          <PiFanFill
            className={`w-10 h-10 text-orange-500 ${isChecked && "animate-spin"} `}
          />
        );
    }
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <Box className="flex flex-col justify-start items-start p-4 rounded-lg  shadow-xl gap-10 border">
      <Box className="flex justify-between items-center w-full ">
        {renderIcons(device?.deviceType?.name)}
        <Switch {...label} checked={isChecked} onChange={handleChange} />
      </Box>
      <Typography variant="body1" sx={{ fontSize: "20px" }}>
        {device?.name}
      </Typography>
    </Box>
  );
};

export default ToggleSwitchButtonComponent;
