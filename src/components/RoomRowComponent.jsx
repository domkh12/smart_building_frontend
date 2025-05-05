import {
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TableCell,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import {FaEye, FaPen, FaTrashCan} from "react-icons/fa6";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import EditButtonComponent from "./EditButtonComponent";
import MoreActionComponent from "./MoreActionComponent";
import useTranslate from "../hook/useTranslate.jsx";
import {setIdRoomToDelete, setIsQuickEditRoomOpen, setRoomDataForQuickEdit} from "../redux/feature/room/roomSlice.js";
import {setIsOpenConfirmDelete} from "../redux/feature/actions/actionSlice.js";
import useAuth from "../hook/useAuth.jsx";
import React from "react";

function RoomRowComponent({room}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslate();
    const {isAdmin, isManager} = useAuth();
    let content;
    if (room) {

        const handleDelete = () => {
            dispatch(setIsOpenConfirmDelete(true));
            dispatch(setIdRoomToDelete(room.id));
        };

        var handleEdit = () => navigate(`/dash/rooms/${room.id}`);
        var handleView = () => {
            if (isManager) navigate(`/dash/rooms/${room.id}/view`);
            else if (isAdmin) navigate(`/admin/rooms/${room.id}/view`);
        }

        var menuActions = [
            {
                label: t('edit'),
                icon: <FaPen className="w-5 h-5"/>,
                onClick: handleEdit,
            },
            {
                label: t('view'),
                icon: <FaEye className="w-5 h-5"/>,
                onClick: handleView,
            },
            {
                label: t('delete'),
                icon: <FaTrashCan className="w-5 h-5"/>,
                onClick: handleDelete,
                textColor: "red",
                buttonColor: "red",
            },
        ];
        content = (
            <TableRow hover>
                <TableCell padding="checkbox" sx={{borderBottomStyle: "dashed"}}>
                    <Checkbox color="primary"/>
                </TableCell>

                <TableCell sx={{borderBottomStyle: "dashed"}}>
                    <List sx={{padding: "0"}}>
                        <ListItem sx={{padding: "0", gap: "10px"}}>
                            <div className="w-32 h-20 rounded-[12px] overflow-hidden">
                                <img
                                    src={room?.image || "/images/imagePlaceholder.jpg"}
                                    alt="car_image"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <ListItemText
                                primary={
                                    (
                                        <Link
                                            className="hover:underline"
                                            to={(isManager) ? `/dash/rooms/${room.id}/view` : (isAdmin) ? `/admin/rooms/${room.id}/view`:``}
                                        >
                                            {room?.name}
                                        </Link>
                                    ) || "N/A"
                                }
                            />
                        </ListItem>
                    </List>
                </TableCell>

                <TableCell sx={{borderBottomStyle: "dashed"}}>
                    {room?.devicesQty}
                </TableCell>

                <TableCell sx={{borderBottomStyle: "dashed"}}>
                    {room?.floor?.name}
                </TableCell>

                <TableCell sx={{borderBottomStyle: "dashed"}}>
                    <Typography variant="body1">{room.createdAt.slice(0, room.createdAt.indexOf(" "))}</Typography>
                    <Typography variant="body2" color="gray">
                        {room.createdAt.slice(room.createdAt.indexOf(" "), room.createdAt.length)}
                    </Typography>
                </TableCell>

                <TableCell
                    sx={{
                        borderBottomStyle: "dashed",
                        px: 0,
                    }}
                >
                    {
                        !isAdmin ? <div className="flex justify-center items-center">
                                <EditButtonComponent handleQuickEdit={() => {
                                    dispatch(setIsQuickEditRoomOpen(true))
                                    dispatch(setRoomDataForQuickEdit(room))
                                }}/>
                                <MoreActionComponent menuItems={menuActions}/>
                            </div> :
                            <Tooltip
                                sx={{
                                    color: "",
                                }}
                                title={t('view')}
                                placement="top"
                                arrow
                            >
                                <IconButton size="large" onClick={handleView} sx={{
                                    backgroundColor: "transparent",
                                    "&:hover": {backgroundColor: "transparent"}
                                }}>
                                    <FaEye className="w-6 h-6"/>
                                </IconButton>
                            </Tooltip>
                    }

                </TableCell>
            </TableRow>
        );
    } else null;
    return content;
}

export default RoomRowComponent;
