import {Card, Paper, Typography} from "@mui/material";
import ImageDetailComponent from "../../components/ImageDetailComponent";
import {cardStyle} from "../../assets/style.js";
import MainHeaderComponent from "../../components/MainHeaderComponent.jsx";
import {useNavigate} from "react-router-dom";
import useTranslate from "../../hook/useTranslate.jsx";

function ViewBuildingDetail({ building }) {
    console.log(building)
    const navigate = useNavigate();
    const { t } = useTranslate();
    const breadcrumbs = [
        <Paper
            elevation={0}
            component="button"
            className="text-black hover:underline"
            onClick={() => navigate("/dash")}
            key={1}
        >
            {t("dashboard")}
        </Paper>,
        <Typography color="inherit" key={2}>
            {t("device")}
        </Typography>,
        <Typography color="inherit" key={3}>
            {building.name}
        </Typography>,
    ];
  return (
    <>
        <MainHeaderComponent
            breadcrumbs={breadcrumbs}
            title={building.name}
            handleBackClick={() => navigate("/dash/buildings")}
        />
        <Card sx={{...cardStyle, p: "16px"}}>
            <Typography variant="h6" sx={{pb: 1}}>Building Info</Typography>
            <ImageDetailComponent image={building?.image}/>
            <div className="flex flex-col gap-3 mt-5">
                <Typography variant="body1">
                    <span >Building id </span>
                    {`${"\u00a0"}:${"\u00a0"}${building?.id}`}
                </Typography>
                <Typography variant="body1">
                    <span >Building name </span>
                    {`${"\u00a0"}:${"\u00a0"}${building?.name}`}
                </Typography>
                <Typography variant="body1">
                    <span >Floor quantity </span>
                    {`${"\u00a0"}:${"\u00a0"}${building?.floorQty}`}
                </Typography>
                <Typography variant="body1">
                    <span >Created at </span>
                    {`${"\u00a0"}:${"\u00a0"}${building?.createdAt}`}
                </Typography>
            </div>
        </Card>
    </>
);
}

export default ViewBuildingDetail;
