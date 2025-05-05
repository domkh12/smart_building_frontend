
import {Link, useNavigate} from "react-router-dom";
import useTranslate from "../../hook/useTranslate.jsx";
import {Avatar, Badge, Card, List, ListItem, ListItemText, Paper, styled, Typography} from "@mui/material";
import MainHeaderComponent from "../../components/MainHeaderComponent.jsx";
import {cardStyle} from "../../assets/style.js";
import EditButtonComponent from "../../components/EditButtonComponent.jsx";
import useAuth from "../../hook/useAuth.jsx";

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

function ViewDetailUser({ user }) {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const { isManager, isAdmin } = useAuth();

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
      {t("user")}
    </Typography>,
    <Typography color="inherit" key={3}>
      {user.fullName}
    </Typography>,
  ];

  const handleBackClick = () => {
    if (isManager) {
      navigate("/dash/users");
    }else if (isAdmin){
      navigate("/admin/users")
    }
  }

  return (
      <>
        <MainHeaderComponent
            breadcrumbs={breadcrumbs}
            title={user.fullName}
            handleBackClick={handleBackClick}
        />
        <Card sx={{ ...cardStyle, p: "16px" }}>
          <div className="flex justify-between items-center mb-5">
            <Typography variant="h6">{t('userInfo')}</Typography>

            <EditButtonComponent
                // handleQuickEdit={() => {
                //   dispatch(setIsOpenQuickEditUser(true));
                //   dispatch(setUserForQuickEdit(user));
                // }}
            />
          </div>
          <div className="flex items-center gap-5">
            <List sx={{ padding: "0" }}>
              <ListItem sx={{ padding: "0", gap: "10px" }}>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                    isonline={String(user?.isOnline)}
                >
                  <Avatar
                      alt={user.fullName}
                      src={user.profileImage}
                      {...stringAvatar(user.fullName)}
                  />
                </StyledBadge>

              </ListItem>
            </List>

          </div>
          <div className="flex flex-col gap-3 mt-5">
            <Typography variant="body1">
              <span >User id </span>
              {`${"\u00a0"}:${"\u00a0"}${user?.id}`}
            </Typography>
            <Typography variant="body1">
              <span >{t('fullName')} </span>
              {`${"\u00a0"}:${"\u00a0"}${user?.fullName || "N/A"}`}
            </Typography>
            <Typography variant="body1">
              <span >{t('email')} </span>
              {`${"\u00a0"}:${"\u00a0"}${user?.email || "N/A"}`}
            </Typography>
            <Typography variant="body1">
              <span >{t('gender')} </span>
              {`${"\u00a0"}:${"\u00a0"}${user?.gender?.gender || "N/A"}`}
            </Typography>
            <Typography variant="body1">
              <span >{t('phoneNumber')} </span>
              {`${"\u00a0"}:${"\u00a0"}${user?.phoneNumber || "N/A"}`}
            </Typography>
            <Typography variant="body1">
              <span >{t('dateOfBirth')} </span>
              {`${"\u00a0"}:${"\u00a0"}${user?.dateOfBirth || "N/A"}`}
            </Typography>
            <Typography variant="body1">
              <span >{t('role')} </span>
              {`${"\u00a0"}:${"\u00a0"}${user?.roles.map(role => role.name).join(", ") || "N/A"}`}
            </Typography>
            <Typography variant="body1">
              <span >{t('room')} </span>
              {`${"\u00a0"}:${"\u00a0"}${user?.rooms.map(room => room.name).join(", ") || "N/A"}`}
            </Typography>
            <Typography variant="body1">
              <span >{t('createdAt')} </span>
              {`${"\u00a0"}:${"\u00a0"}${user?.createdAt}`}
            </Typography>
          </div>
        </Card>
      </>
  );
}

export default ViewDetailUser;
