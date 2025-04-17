import { lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainHeaderComponent from "./../../components/MainHeaderComponent";
import useTranslate from "./../../hook/useTranslate";
import {
  Avatar,
  Badge,
  Card,
  Chip,
  Grid2,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import { cardStyle } from "../../assets/style";
import EditButtonComponent from "../../components/EditButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsOpenQuickEdit,
  setUserForQuickEdit,
} from "../../redux/feature/users/userSlice";
import {
  setIsOpenQuickEditVehicle,
  setVehicleForQuickEdit,
} from "../../redux/feature/vehicles/vehicleSlice";
import QuickEditVehicleComponent from "../../components/QuickEditVehicleComponent";
import QuickEditUserComponent from "./../../components/QuickEditUserComponent";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  if (!name || typeof name !== "string" || name.trim() === "") {
    return {
      sx: {
        bgcolor: "#9E9E9E",
      },
      children: "?",
    };
  }
  const parts = name.trim().split(" ");
  let initials = "";

  if (parts.length >= 2) {
    initials = `${parts[0][0]}${parts[1][0]}`;
  } else if (parts.length === 1) {
    initials = parts[0].slice(0, 2);
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}

function ViewVehicleDetail({ vehicle }) {
  const userActive = useSelector((state) => state.users.isOnlineUser);
  const isOpenQuickEdit = useSelector(
    (state) => state.vehicles.isOpenQuickEditVehicle
  );
  const isOpenQuickEditUser = useSelector(
    (state) => state.users.isOpenQuickEdit
  );
  const navigate = useNavigate();
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const [loadedUser, setLoadedUser] = useState(vehicle.user || {});

  useEffect(() => {
    if (userActive?.uuid === vehicle?.user?.uuid) {
      setLoadedUser({ ...vehicle?.user, isOnline: userActive.isOnline });
    }
  }, [userActive]);

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
      {t("vehicle")}
    </Typography>,
    <Typography color="inherit" key={3}>
      {vehicle.numberPlate}
    </Typography>,
  ];
  const getChipStyles = () => {
    let backgroundColor = "#D2E3D6";
    let color = "#207234";

    if (loadedUser.status === "Banned") {
      backgroundColor = "#FFD6D6";
      color = "#981212";
    } else if (loadedUser.status === "Pending") {
      backgroundColor = "#FFF5D6";
      color = "#B68D0F";
    } else if (loadedUser.status === "Active") {
      backgroundColor = "#D2E3D6";
      color = "#207234";
    }

    return {
      backgroundColor,
      color,
      borderRadius: "6px",
      fontWeight: "500",
    };
  };
  console.log("vehicle", vehicle);
  return (
    <div>
      <MainHeaderComponent
        breadcrumbs={breadcrumbs}
        title={vehicle.numberPlate}
        handleBackClick={() => navigate("/dash/vehicles")}
      />
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 5 }}>
          <Card sx={{ ...cardStyle, mb: 2 }}>
            <div className="w-auto rounded-[12px] m-[16px] border-blue-600 border-[3px] px-[24px] py-2 flex items-center justify-between">
              <div className="flex flex-col">
                <Typography variant="h6" className="text-blue-600">
                  {vehicle.licensePlateProvince.provinceNameEn}
                </Typography>
                <Typography variant="h6" className="text-red-600">
                  {vehicle.licensePlateProvince.provinceNameKh}
                </Typography>
              </div>
              <Typography
                variant="h4"
                className="underline text-blue-600 uppercase"
              >
                {vehicle.numberPlate}
              </Typography>
            </div>
          </Card>

          <Card sx={{ ...cardStyle, p: "16px" }}>
            <div className="flex justify-between items-center mb-5">
              <Typography variant="h6">User info</Typography>

              <EditButtonComponent
                handleQuickEdit={() => {
                  dispatch(setIsOpenQuickEdit(true));
                  dispatch(setUserForQuickEdit(vehicle.user));
                }}
              />
            </div>
            <div className="flex justify-between">
              <List sx={{ padding: "0" }}>
                <ListItem sx={{ padding: "0", gap: "10px" }}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    isonline={String(loadedUser?.isOnline)}
                  >
                    <Avatar
                      alt={loadedUser.fullName}
                      src={loadedUser.profileImage}
                      {...stringAvatar(loadedUser.fullName)}
                    />
                  </StyledBadge>
                  <ListItemText
                    primary={<>{loadedUser.fullName}</> || "N/A"}
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "gray", display: "inline" }}
                      >
                        {loadedUser?.email || "N/A"}
                      </Typography>
                    }
                  />
                </ListItem>
              </List>

              <Chip
                sx={getChipStyles()}
                size="small"
                label={loadedUser.status}
              />
            </div>

            <div className="flex flex-col gap-3 mt-5">
              <Typography variant="body1">
                <span className="text-gray-cus">Gender</span>
                {`${"\u00a0"}:${"\u00a0"}${vehicle.user.gender.gender}`}
              </Typography>
              <Typography variant="body1">
                <span className="text-gray-cus">{`Date${"\u00a0"}of${"\u00a0"}birth`}</span>
                {`${"\u00a0"}:${"\u00a0"}${vehicle.user.dateOfBirth}`}
              </Typography>
              <Typography variant="body1">
                <span className="text-gray-cus">{`Phone`}</span>
                {`${"\u00a0"}:${"\u00a0"}${vehicle.user.phoneNumber}`}
              </Typography>
              <Typography variant="body1">
                <span className="text-gray-cus">{`Role`}</span>
                {`${"\u00a0"}:${"\u00a0"}${vehicle.user.roles.map((role) => role.name)}`}
              </Typography>
              <Typography variant="body1">
                <span className="text-gray-cus">{`Branch`}</span>
                {`${"\u00a0"}:${"\u00a0"}${vehicle.user.sites.map((site) => site.siteName)}`}
              </Typography>
            </div>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 7 }}>
          <Card sx={{ ...cardStyle, p: "16px" }}>
            <div className="flex justify-between items-center mb-5">
              <Typography variant="h6">User info</Typography>

              <EditButtonComponent
                handleQuickEdit={() => {
                  dispatch(setIsOpenQuickEditVehicle(true));
                  dispatch(setVehicleForQuickEdit(vehicle));
                }}
              />
            </div>
            <div className="flex items-center gap-5">
              <div className="p-1 border-dashed border rounded-[12px]">
                <div className="w-48 h-28 rounded-[12px] overflow-hidden">
                  <img
                    src={vehicle.image || "/images/car-img-placeholder.jpg"}
                    alt="vehicleImage"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Typography variant="body1">{vehicle?.vehicleMake}</Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "gray", display: "inline" }}
                >
                  {vehicle?.vehicleModel}
                </Typography>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <Typography variant="body1">
                <span className="text-gray-cus">{t("vehicleType")}</span>
                {`${"\u00a0"}:${"\u00a0"}${vehicle.vehicleType.name}`}
              </Typography>
              <div className="flex gap-2">
                <Typography variant="body1">{`${t("color")}${"\u00a0"}:`}</Typography>
                <div
                  className="w-5 h-5 rounded-full border-[2px]"
                  style={{ backgroundColor: vehicle.color }}
                ></div>
                <Typography variant="body1">{vehicle.color}</Typography>
              </div>
              <Typography variant="body1">
                <span className="text-gray-cus">{t("licensePlateType")}</span>
                {`${"\u00a0"}:${"\u00a0"}${vehicle.licensePlateType.name}`}
              </Typography>
              <Typography variant="body1">
                <span className="text-gray-cus">Total parking hours</span>
                {`${"\u00a0"}:${"\u00a0"}${vehicle?.totalParkingHours || "N/A"}`}
              </Typography>
              <Typography variant="body1">
                <span className="text-gray-cus">Total parking fee</span>
                {`${"\u00a0"}:${"\u00a0"}${vehicle?.totalParkingFees || "N/A"}`}
              </Typography>
              <Typography variant="body1">
                <span className="text-gray-cus">Last parking lot</span>
                {`${"\u00a0"}:${"\u00a0"}${vehicle.lastParkingLot || "N/A"}`}
              </Typography>
              <Typography variant="body1">
                <span className="text-gray-cus">Last parking-time</span>
                {`${"\u00a0"}:${"\u00a0"}${vehicle.lastParkingTime || "N/A"}`}
              </Typography>
            </div>
          </Card>
        </Grid2>
      </Grid2>
      {isOpenQuickEditUser && <QuickEditUserComponent />}
      {isOpenQuickEdit && <QuickEditVehicleComponent />}
    </div>
  );
}

export default ViewVehicleDetail;
