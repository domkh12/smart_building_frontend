import {cardStyle} from "../assets/style.js";
import {Card, Grid2, IconButton, Typography} from "@mui/material";
import SwitchComponent from "./SwitchComponent.jsx";
import {IoIosArrowDown} from "react-icons/io";
import {useState, useRef, useEffect} from "react";

function SwitchControlCardUserComponent({icon, title, devices}) {
    const [expanded, setExpanded] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);
    const contentRef = useRef(null);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        const checkOverflow = () => {
            if (contentRef.current) {
                const isOverflowing = contentRef.current.scrollHeight > 120;
                setHasOverflow(isOverflowing);
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        
        return () => window.removeEventListener('resize', checkOverflow);
    }, [devices]);

    return (
        <Card sx={{
            ...cardStyle,
            padding: "16px 16px 42px 16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
        }}>
            <Typography variant="h6" component="h6" sx={{mb: 4}}>{title}</Typography>
            {devices?.deviceType?.image ? <img src={devices.deviceType.image} alt="imageDevice"/> : icon}
            
            {hasOverflow && (
                <IconButton
                    aria-label="collapse"
                    size="small"
                    sx={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                    }}
                    onClick={toggleExpand}
                >
                    <IoIosArrowDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                            expanded ? "rotate-180" : ""
                        }`}
                    />
                </IconButton>
            )}

            <div
                ref={contentRef}
                className={`flex justify-start w-full mt-5 flex-col ${
                    expanded ? "h-auto visible" : "h-[120px] overflow-hidden"
                }`}
            >
                <Grid2 container spacing={1}>
                    {devices?.length > 0
                        ? devices.map((device) => (
                            <Grid2 key={device.id} size={{xs: 6, sm:4, md: 6, xl: 4}}>
                                <SwitchComponent device={device}/>
                            </Grid2>
                        ))
                        : null}
                </Grid2>
            </div>
        </Card>
    )
}

export default SwitchControlCardUserComponent;