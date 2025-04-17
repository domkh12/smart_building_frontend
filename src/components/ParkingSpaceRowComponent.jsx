import React from "react";
import { useGetParkingSpacesQuery } from "../redux/feature/parking/parkingApiSlice";
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
import { Link } from "react-router-dom";
import EditButtonComponent from "./EditButtonComponent";
import MoreActionComponent from "./MoreActionComponent";
import CustomizedProgressBarsComponent from "./CustomizedProgressBarsComponent";
import { setIsOpenConfirmDelete } from "../redux/feature/actions/actionSlice";
import { useDispatch } from "react-redux";
import { setIdParkingToDelete } from "../redux/feature/parking/parkingSlice";
import useAuth from "../hook/useAuth";

function ParkingSpaceRowComponent({ parkingId }) {
  const dispatch = useDispatch();
  const { isAdmin } = useAuth();

  const { parkingSpace } = useGetParkingSpacesQuery("parkingSpacesList", {
    selectFromResult: ({ data }) => ({
      parkingSpace: data?.entities[parkingId],
    }),
  });

  const handleQuickEdit = () => {
    dispatch(setIsOpenQuickEditVehicle(true));
    dispatch(setVehicleForQuickEdit(vehicle));
  };

  if (parkingSpace) {
    var handleEdit = () => navigate(`/dash/vehicles/${vehicleId}`);
    var handleView = () => navigate(`/dash/vehicles/${vehicleId}/view`);
    const handleDelete = () => {
      dispatch(setIsOpenConfirmDelete(true));
      dispatch(setIdParkingToDelete(parkingSpace.uuid));
    };

    var menuActions = [
      isAdmin
        ? {
            label: "Edit",
            icon: <FaPen className="w-5 h-5" />,
            onClick: handleEdit,
          }
        : null,
      {
        label: "View",
        icon: <FaEye className="w-5 h-5" />,
        onClick: handleView,
      },
      isAdmin
        ? {
            label: "Delete",
            icon: <FaTrashCan className="w-5 h-5" />,
            onClick: handleDelete,
            textColor: "red",
            buttonColor: "red",
          }
        : null,
    ].filter(Boolean);

    const dateObj = new Date(parkingSpace.createdAt);
    var formattedDate = dateObj.toLocaleDateString("en-GB");
    var formattedTime = dateObj.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return (
      <TableRow hover>
        <TableCell padding="checkbox" sx={{ borderBottomStyle: "dashed" }}>
          <Checkbox color="primary" />
        </TableCell>

        <TableCell sx={{ borderBottomStyle: "dashed" }}>
          <List sx={{ padding: "0" }}>
            <ListItem sx={{ padding: "0", gap: "10px" }}>
              <div className="w-32 h-20 rounded-[12px] overflow-hidden">
                <img
                  src={parkingSpace?.image || "/images/imagePlaceholder.jpg"}
                  alt="car_image"
                  className="w-full h-full object-cover"
                />
              </div>
              <ListItemText
                primary={
                  (
                    <Link
                      className="hover:underline"
                      to={`/dash/vehicles/${parkingId}/view`}
                    >
                      {parkingSpace.label}
                    </Link>
                  ) || "N/A"
                }
              />
            </ListItem>
          </List>
        </TableCell>

        <TableCell sx={{ borderBottomStyle: "dashed" }}>
          <Typography variant="body1">{parkingSpace.lotQty}</Typography>
        </TableCell>

        <TableCell sx={{ borderBottomStyle: "dashed" }}>
          <div>
            <CustomizedProgressBarsComponent value={parkingSpace.filled} />
            <Typography variant="body1" className="text-center" color="gray">
              {`${parkingSpace.filled} lots`}
            </Typography>
          </div>
        </TableCell>

        <TableCell sx={{ borderBottomStyle: "dashed" }}>
          <Typography variant="body1">{formattedDate}</Typography>
          <Typography variant="body2" color="gray">
            {formattedTime}
          </Typography>
        </TableCell>

        <TableCell
          sx={{
            borderBottomStyle: "dashed",
            px: 0,
          }}
        >
          <div className="flex justify-center items-center">
            <EditButtonComponent handleQuickEdit={handleQuickEdit} />
            <MoreActionComponent menuItems={menuActions} />
          </div>
        </TableCell>
      </TableRow>
    );
  } else {
    return null;
  }
}

export default ParkingSpaceRowComponent;
