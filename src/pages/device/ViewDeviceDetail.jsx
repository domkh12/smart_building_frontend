import MainHeaderComponent from "../../components/MainHeaderComponent";
import {
  Badge,
  Card,
  styled,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../hook/useTranslate";
import { cardStyle } from "../../assets/style";
import EditButtonComponent from "../../components/EditButtonComponent";

function ViewDeviceDetail({ device }) {
  const { t } = useTranslate();
  const navigate = useNavigate();

  console.log("device: ", device);

  const StyledBadge = styled(Badge)(({ theme, isonline }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: isonline === "true" ? "#44b700" : "#9E9E9E",
      color: isonline === "true" ? "#44b700" : "#9E9E9E",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation:
          isonline === "true" ? "ripple 1.2s infinite ease-in-out" : "none",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const breadcrumbs = [
    <button
      className="text-black hover:underline"
      onClick={() => navigate("/dash")}
      key={1}
    >
      {t("dashboard")}
    </button>,
    <Typography color="inherit" key={2}>
      {t("device")}
    </Typography>,
    <Typography color="inherit" key={3}>
      {device.name}
    </Typography>,
  ];
  return (
    <>
      <MainHeaderComponent
        breadcrumbs={breadcrumbs}
        title={device.name}
        handleBackClick={() => navigate("/dash/devices")}
      />
      <Card sx={{ ...cardStyle, p: "16px" }}>
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
            <span className="text-gray-cus">Device ID </span>
            {`${"\u00a0"}:${"\u00a0"}${device?.id}`}
          </Typography>
          <Typography variant="body1">
            <span className="text-gray-cus">Device Name </span>
            {`${"\u00a0"}:${"\u00a0"}${device?.name}`}
          </Typography>
          <Typography variant="body1">
            <span className="text-gray-cus">Device Type </span>
            {`${"\u00a0"}:${"\u00a0"}${device?.deviceType.name}`}
          </Typography>
          <Typography variant="body1">
            <span className="text-gray-cus">Room name </span>
            {`${"\u00a0"}:${"\u00a0"}${device?.room.name}`}
          </Typography>
          <Typography variant="body1">
            <span className="text-gray-cus">Floor name </span>
            {`${"\u00a0"}:${"\u00a0"}${device?.room.floor.name}`}
          </Typography>
          <Typography variant="body1">
            <span className="text-gray-cus">Building name </span>
            {`${"\u00a0"}:${"\u00a0"}${device?.room.floor.building.name}`}
          </Typography>
        </div>
      </Card>
    </>
  );
}

export default ViewDeviceDetail;
