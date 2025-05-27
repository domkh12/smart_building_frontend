import {Tooltip} from "@mui/material";
import useTranslate from "../hook/useTranslate.jsx";

function StatusDeviceComponent({isOnline, top = 4, left = 4}) {
    const {t} = useTranslate();
    return (
        <Tooltip title={isOnline ? t("active") : t("inActive")}>
            <div className= {`w-2 h-2 ${isOnline ? "bg-green-500" : "bg-red-500"} bg-black rounded-full absolute top-${top} left-${left}`}></div>
        </Tooltip>
    )
}

export default StatusDeviceComponent;