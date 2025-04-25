import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Badge,
  Checkbox,
  Chip,
  List,
  ListItem,
  ListItemText,
  styled,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import EditButtonComponent from "./EditButtonComponent";
import MoreActionComponent from "./MoreActionComponent";
import {FaEye, FaPen, FaTrashCan} from "react-icons/fa6";
import {
  setIdUserToDelete,
  setIsOpenQuickEdit,
  setUserForQuickEdit,
} from "../redux/feature/users/userSlice";
import { setIsOpenConfirmDelete } from "../redux/feature/actions/actionSlice";
import useAuth from "../hook/useAuth";
import useTranslate from "../hook/useTranslate.jsx";

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

function UserRowComponent({ userId, user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {t} = useTranslate();
  const {isManager, isAdmin} = useAuth();

  const handleDelete = () => {
    dispatch(setIsOpenConfirmDelete(true));
    dispatch(setIdUserToDelete(user.id));
  };

  const handleQuickEdit = () => {
    dispatch(setIsOpenQuickEdit(true));
    dispatch(setUserForQuickEdit(user));
  };

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

  if (user) {
    var handleEdit = () => {
      if (isManager) {
        navigate(`/dash/users/${userId}`)
      } else if (isAdmin) {
        navigate(`/admin/users/${userId}`)
      }
    }
    var handleView = () => {
      if (isManager){
        navigate(`/dash/users/${userId}/view`);
      }else if (isAdmin){
        navigate(`/admin/users/${userId}/view`);
      }
    }

    var menuActions = [
      {
        label: t('edit'),
        icon: <FaPen className="w-5 h-5" />,
        onClick: handleEdit,
      },
      {
        label: t('view'),
        icon: <FaEye className="w-5 h-5" />,
        onClick: handleView,
      },
      {
        label: t('delete'),
        icon: <FaTrashCan className="w-5 h-5" />,
        onClick: handleDelete,
        textColor: "red",
        buttonColor: "red",
      },
    ];

    var roles = user.roles.map((role) => (
      <p key={role.id}>{role.name}</p>
    ));

    var room = user.rooms.map((room) => (
        <p key={room.id}>{room.name}</p>
    ))
    const getChipStyles = () => {
      let backgroundColor = "#D2E3D6";
      let color = "#207234";

      if (user.status === "Banned") {
        backgroundColor = "#FFD6D6";
        color = "#981212";
      } else if (user.status === "Pending") {
        backgroundColor = "#FFF5D6";
        color = "#B68D0F";
      } else if (user.status === "Active") {
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

    return (
      <>
        <TableRow hover>
          <TableCell padding="checkbox" sx={{ borderTopStyle: "dashed", borderBottomStyle: "dashed" }}>
            <Checkbox color="primary" />
          </TableCell>
          <TableCell  sx={{ borderTopStyle: "dashed", borderBottomStyle: "dashed" }}>
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
                <ListItemText
                  primary={
                    (
                      <Link className="hover:underline" to={isManager ? `/dash/users/${user.id}/view` : `/admin/users/${user.id}/view`}>
                        {user.fullName}
                      </Link>
                    ) || "N/A"
                  }
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "gray", display: "inline" }}
                    >
                      {user.email || "N/A"}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </TableCell>
          <TableCell  sx={{ borderTopStyle: "dashed", borderBottomStyle: "dashed" }}>
            {user.phoneNumber}
          </TableCell>
          <TableCell sx={{ borderTopStyle: "dashed", borderBottomStyle: "dashed" }}>
            <div className="flex gap-5 items-center">{roles}</div>
          </TableCell>
          <TableCell sx={{ borderTopStyle: "dashed", borderBottomStyle: "dashed" }}>
            <div className="flex gap-5 items-center">{room.length > 0 ? room : "N/A"}</div>
          </TableCell>
          <TableCell  sx={{ borderTopStyle: "dashed", borderBottomStyle: "dashed" }}>
            <Chip sx={getChipStyles()} size="small" label={user.status} />
          </TableCell>
          <TableCell  sx={{ borderTopStyle: "dashed", borderBottomStyle: "dashed" }}>
            <Typography variant="body1">{user.createdAt.slice(0, user.createdAt.indexOf(" "))}</Typography>
            <Typography variant="body2" color="gray">
              {user.createdAt.slice(user.createdAt.indexOf(" "), user.createdAt.length)}
            </Typography>
          </TableCell>
          <TableCell
            sx={{ borderTopStyle: "dashed", borderBottomStyle: "dashed", px: 0 }}
          >
            <div className="flex justify-center items-center">
              <EditButtonComponent
                handleQuickEdit={handleQuickEdit}
                user={user}
              />
              <MoreActionComponent menuItems={menuActions} />
            </div>
          </TableCell>
        </TableRow>
      </>
    );
  } else {
    return null;
  }
}
const memoizedUsersRow = memo(UserRowComponent);
export default memoizedUsersRow;
