import {cardStyle} from "../assets/style.js";
import {Card, IconButton, Typography} from "@mui/material";
import SwitchComponent from "./SwitchComponent.jsx";
import {IoIosArrowDown} from "react-icons/io";
import {useState} from "react";

function SwitchControlCardUserComponent({icon, title, devices}) {
    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{
            ...cardStyle,
            padding: "24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
        }}>
            {/*<div className="absolute top-4 right-4">*/}
            {/*<SwitchComponent title={t('closeAll')}/>*/}
            {/*</div>*/}
            <Typography variant="h6" component="h6" sx={{mb: 4}}>{title}</Typography>
            {devices?.deviceType?.image ? < img src={devices.deviceType.image} alt="imageDevice"/> : icon}
            <div className="w-3 h-3 bg-green-400 absolute top-4 left-4 rounded-full"></div>
            <IconButton
                aria-label="collapse"
                size="small"
                sx={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    display: devices?.length > 3 ? "block" : "none"
                }}
                onClick={toggleExpand}
            >
                <IoIosArrowDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                        expanded ? "rotate-180" : ""
                    }`}
                /></IconButton>
            <div
                className={`flex justify-evenly w-full mt-5 flex-col ${expanded ? "h-auto visible" : "h-[120px] overflow-hidden"}`}>
                {devices?.length > 0
                    ? devices.map((device) => <SwitchComponent key={device.id} device={device}/>)
                    : null}
            </div>
        </Card>
    )
}

export default SwitchControlCardUserComponent;