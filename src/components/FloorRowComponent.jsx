import {Checkbox, List, ListItem, ListItemText, TableCell, TableRow, Typography} from "@mui/material";
import {FaEye, FaPen, FaTrashCan} from "react-icons/fa6";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import EditButtonComponent from "./EditButtonComponent";
import MoreActionComponent from "./MoreActionComponent";
import {setIsOpenConfirmDelete} from "../redux/feature/actions/actionSlice.js";
import useTranslate from "../hook/useTranslate.jsx";
import {
    setFloorDataForQuickEdit,
    setIdFloorToDelete,
    setIsQuickEditFloorOpen
} from "../redux/feature/floor/floorSlice.js";
import useAuth from "../hook/useAuth.jsx";

function FloorRowComponent({floor}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslate();
    const {isAdmin} = useAuth();
    let content;

    if (floor) {

        const handleDelete = () => {
            dispatch(setIsOpenConfirmDelete(true))
            dispatch(setIdFloorToDelete(floor.id))
        };

        var handleEdit = () => navigate(`/dash/floors/${floor.id}`);
        var handleView = () => navigate(`/dash/floors/${floor.id}/view`);

        var menuActions = [
            {
                label: t('edit'), icon: <FaPen className="w-5 h-5"/>, onClick: handleEdit,
            },
            {
                label: t('view'), icon: <FaEye className="w-5 h-5"/>, onClick: handleView,
            }, {
                label: t('delete'),
                icon: <FaTrashCan className="w-5 h-5"/>,
                onClick: handleDelete,
                textColor: "red",
                buttonColor: "red",
            },];
        content = (<TableRow hover>
            <TableCell padding="checkbox" sx={{borderBottomStyle: "dashed"}}>
                <Checkbox color="primary"/>
            </TableCell>

            <TableCell sx={{borderBottomStyle: "dashed"}}>
                <List sx={{padding: "0"}}>
                    <ListItem sx={{padding: "0", gap: "10px"}}>
                        <div className="w-32 h-20 rounded-[12px] overflow-hidden">
                            <img
                                src={floor?.image || "/images/imagePlaceholder.jpg"}
                                alt="car_image"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <ListItemText
                            primary={(<Link
                                className="hover:underline"
                                to={`/dash/floors/${floor.id}/view`}
                            >
                                {floor?.name}
                            </Link>) || "N/A"}
                        />
                    </ListItem>
                </List>
            </TableCell>

            <TableCell sx={{borderBottomStyle: "dashed"}}>
                {floor?.roomQty}
            </TableCell>

            <TableCell sx={{borderBottomStyle: "dashed"}}>
                {floor?.building?.name}
            </TableCell>

            <TableCell sx={{borderBottomStyle: "dashed"}}>
                <Typography variant="body1">{floor.createdAt.slice(0, floor.createdAt.indexOf(" "))}</Typography>
                <Typography variant="body2" color="gray">
                    {floor.createdAt.slice(floor.createdAt.indexOf(" "), floor.createdAt.length)}
                </Typography>
            </TableCell>

            <TableCell
                sx={{
                    borderBottomStyle: "dashed", px: 0,
                }}
            >
                <div className="flex justify-center items-center">
                    {!isAdmin && <EditButtonComponent handleQuickEdit={() => {
                        dispatch(setIsQuickEditFloorOpen(true))
                        dispatch(setFloorDataForQuickEdit(floor))
                    }}/>}
                    <MoreActionComponent menuItems={menuActions}/>
                </div>
            </TableCell>
        </TableRow>);
    } else null;
    return content;
}

export default FloorRowComponent;
