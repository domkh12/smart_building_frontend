import MainHeaderComponent from "../../components/MainHeaderComponent";
import {
    Badge,
    Card, Paper,
    styled,
    Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import useTranslate from "../../hook/useTranslate";
import {cardStyle} from "../../assets/style";
import EditButtonComponent from "../../components/EditButtonComponent";
import useAuth from "../../hook/useAuth.jsx";

function ViewDeviceDetail({device}) {
    const {t} = useTranslate();
    const navigate = useNavigate();
    const {isAdmin, isManager} = useAuth();

    const handleBackClick1 = () => {
        if (isManager) {
            navigate("/dash");
        }else if (isAdmin) {
            navigate("/admin");
        }
    }

    const breadcrumbs = [
        <Paper
            elevation={0}
            component="button"
            className="text-black hover:underline"
            onClick={handleBackClick1}
            key={1}
        >
            {t("dashboard")}
        </Paper>,
        <Typography color="inherit" key={2}>
            {t("device")}
        </Typography>,
        <Typography color="inherit" key={3}>
            {device.name}
        </Typography>,
    ];

    const handleBackClick = () => {
        if (isManager){
            navigate("/dash/devices")
        }else if (isAdmin){
            navigate("/admin/devices")
        }
    }

    return (
        <>
            <MainHeaderComponent
                breadcrumbs={breadcrumbs}
                title={device.name}
                handleBackClick={handleBackClick}
            />
            <Card sx={{...cardStyle, p: "16px"}}>
                <div className="flex justify-between items-center mb-5">
                    <Typography variant="h6">Device info</Typography>

                    <EditButtonComponent
                        // handleQuickEdit={() => {
                        //   dispatch(setIsOpenQuickEditDevice(true));
                        //   dispatch(setDeviceForQuickEdit(device));
                        // }}
                    />
                </div>
                <div className="flex items-center gap-5">
                    <div className="p-1 border-dashed border rounded-[12px]">
                        <div className="w-48 h-28 rounded-[12px] overflow-hidden">
                            <img
                                src={device?.image || "/images/img_placeholder.jpg"}
                                alt="deviceImage"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 mt-5">
                    <Typography variant="body1">
                        <span >Device ID </span>
                        {`${"\u00a0"}:${"\u00a0"}${device?.id}`}
                    </Typography>
                    <Typography variant="body1">
                        <span >Device Name </span>
                        {`${"\u00a0"}:${"\u00a0"}${device?.name}`}
                    </Typography>
                    <Typography variant="body1">
                        <span >Device Type </span>
                        {`${"\u00a0"}:${"\u00a0"}${device?.deviceType.name}`}
                    </Typography>
                    <Typography variant="body1">
                        <span >Room name </span>
                        {`${"\u00a0"}:${"\u00a0"}${device?.room.name}`}
                    </Typography>
                    <Typography variant="body1">
                        <span >Floor name </span>
                        {`${"\u00a0"}:${"\u00a0"}${device?.room.floor.name}`}
                    </Typography>
                    <Typography variant="body1">
                        <span >Building name </span>
                        {`${"\u00a0"}:${"\u00a0"}${device?.room.floor.building.name}`}
                    </Typography>
                </div>
            </Card>
        </>
    );
}

export default ViewDeviceDetail;
