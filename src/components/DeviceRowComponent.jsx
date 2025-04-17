import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetDeviceQuery } from "../redux/feature/device/deviceApiSlice";
import { FaEye, FaPen, FaTrashCan } from "react-icons/fa6";
import {
  Checkbox,
  List,
  ListItem,
  ListItemText,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import EditButtonComponent from "./EditButtonComponent";
import MoreActionComponent from "./MoreActionComponent";
import {setIsOpenConfirmDelete} from "../redux/feature/actions/actionSlice.js";
import {
    setDeviceDataForQuickEdit,
    setDeviceIdToDelete,
    setIsOpenQuickEditDevice
} from "../redux/feature/device/deviceSlice.js";
import useTranslate from "../hook/useTranslate.jsx";
import {setBuildingDataForQuickEdit, setIsQuickEditBuildingOpen} from "../redux/feature/building/buildingSlice.js";

function DeviceRowComponent({ device }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {t} = useTranslate();

  let content;

  if (device) {
    const handleDelete = () => {
      dispatch(setIsOpenConfirmDelete(true));
      dispatch(setDeviceIdToDelete(device.id));
    };
    var handleEdit = () => navigate(`/dash/devices/${device.id}`);
    var handleView = () => navigate(`/dash/devices/${device.id}/view`);

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
    content = (
      <TableRow hover>
        <TableCell padding="checkbox" sx={{ borderBottomStyle: "dashed" }}>
          <Checkbox color="primary" />
        </TableCell>

        <TableCell sx={{ borderBottomStyle: "dashed" }}>
          <List sx={{ padding: "0" }}>
            <ListItem sx={{ padding: "0", gap: "10px" }}>
              <div className="w-32 h-20 rounded-[12px] overflow-hidden">
                <img
                  src={device?.image || "/images/imagePlaceholder.jpg"}
                  alt="car_image"
                  className="w-full h-full object-cover"
                />
              </div>
              <ListItemText
                primary={
                  (
                    <Link
                      className="hover:underline"
                      to={`/dash/devices/${device.id}/view`}
                    >
                      {device?.name}
                    </Link>
                  ) || "N/A"
                }
              />
            </ListItem>
          </List>
        </TableCell>

        <TableCell sx={{ borderBottomStyle: "dashed" }}>
          {device?.deviceType?.name}
        </TableCell>

        <TableCell sx={{ borderBottomStyle: "dashed" }}>
          {device?.room?.name}
        </TableCell>

        <TableCell sx={{ borderBottomStyle: "dashed" }}>
          {device?.room?.floor?.name}
        </TableCell>

        <TableCell sx={{ borderBottomStyle: "dashed" }}>
          {device?.room?.floor?.building?.name}
        </TableCell>

        <TableCell sx={{ borderBottomStyle: "dashed" }}>
          <Typography variant="body1">{device.createdAt.slice(0, device.createdAt.indexOf(" "))}</Typography>
          <Typography variant="body2" color="gray">
            {device.createdAt.slice(device.createdAt.indexOf(" "), device.createdAt.length)}
          </Typography>
        </TableCell>

        <TableCell
          sx={{
            borderBottomStyle: "dashed",
            px: 0,
          }}
        >
          <div className="flex justify-center items-center">
            <EditButtonComponent handleQuickEdit={() => {
                dispatch(setIsOpenQuickEditDevice(true))
                dispatch(setDeviceDataForQuickEdit(device))
            }}/>
            <MoreActionComponent menuItems={menuActions} />
          </div>
        </TableCell>
      </TableRow>
    );
  } else null;
  return content;
}

export default DeviceRowComponent;
