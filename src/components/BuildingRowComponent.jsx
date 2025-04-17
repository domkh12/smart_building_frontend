import {FaEye, FaPen, FaTrashCan} from "react-icons/fa6";
import {useGetBuildingQuery} from "../redux/feature/building/buildingApiSlice";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import MoreActionComponent from "./MoreActionComponent";
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
import {setIsOpenConfirmDelete} from "../redux/feature/actions/actionSlice";
import {
    setBuildingDataForQuickEdit,
    setIdBuildingToDelete,
    setIsQuickEditBuildingOpen
} from "../redux/feature/building/buildingSlice";
import useTranslate from "../hook/useTranslate.jsx";

function BuildingRowComponent({building}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslate();

    let content;

    if (building) {

        const handleDelete = () => {
            dispatch(setIsOpenConfirmDelete(true));
            dispatch(setIdBuildingToDelete(building.id));
        };

        var handleEdit = () => navigate(`/dash/buildings/${building.id}`);
        var handleView = () => navigate(`/dash/buildings/${building.id}/view`);

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
                                    src={building?.image || "/images/imagePlaceholder.jpg"}
                                    alt="car_image"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <ListItemText
                                primary={
                                    (
                                        <Link
                                            className="hover:underline"
                                            to={`/dash/buildings/${building.id}/view`}
                                        >
                                            {building?.name}
                                        </Link>
                                    ) || "N/A"
                                }
                            />
                        </ListItem>
                    </List>
                </TableCell>

                <TableCell sx={{borderBottomStyle: "dashed"}}>
                    {building?.floorQty}
                </TableCell>

                <TableCell sx={{borderBottomStyle: "dashed"}}>
                    <Typography variant="body1">
                        {building.createdAt.substring(
                            0,
                            building.createdAt.lastIndexOf(" ")
                        )}
                    </Typography>
                    <Typography variant="body2" color="gray">
                        {building.createdAt.substring(
                            building.createdAt.lastIndexOf(" "),
                            building.createdAt.length
                        )}
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
                            dispatch(setIsQuickEditBuildingOpen(true))
                            dispatch(setBuildingDataForQuickEdit(building))
                        }}/>
                        <MoreActionComponent menuItems={menuActions}/>
                    </div>
                </TableCell>
            </TableRow>
        );
    } else null;
    return content;
}

export default BuildingRowComponent;
