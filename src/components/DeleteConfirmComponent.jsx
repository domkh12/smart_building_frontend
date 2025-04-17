import {Box, Button, Modal, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {buttonStyleContained, buttonStyleOutlined} from "../assets/style";
import {useEffect, useMemo} from "react";
import {LoadingButton} from "@mui/lab";
import {useNavigate} from "react-router-dom";
import {setIsOpenConfirmDelete} from "../redux/feature/actions/actionSlice";
import {useDeleteUserMutation} from "../redux/feature/users/userApiSlice";
import {useDeleteBuildingMutation} from "../redux/feature/building/buildingApiSlice";
import {useDeleteFloorMutation} from "../redux/feature/floor/floorApiSlice.js";
import {useDeleteDeviceMutation} from "../redux/feature/device/deviceApiSlice.js";
import {setIdFloorToDelete} from "../redux/feature/floor/floorSlice.js";
import {setIdUserToDelete} from "../redux/feature/users/userSlice.js";
import {setIdBuildingToDelete} from "../redux/feature/building/buildingSlice.js";
import {setDeviceIdToDelete} from "../redux/feature/device/deviceSlice.js";
import {useDeleteRoomMutation} from "../redux/feature/room/roomApiSlice.js";
import {setIdRoomToDelete} from "../redux/feature/room/roomSlice.js";
import useAuth from "../hook/useAuth.jsx";

function DeleteConfirmComponent() {
    const open = useSelector((state) => state.action.isOpenConfirmDelete);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.users.idUserToDelete);
    const buildingId = useSelector((state) => state.building.idBuildingToDelete);
    const deviceId = useSelector((state) => state.device.deviceIdToDelete);
    const floorId = useSelector((state) => state.floor.idFloorToDelete);
    const roomId = useSelector((state) => state.room.idRoomToDelete);
    const {isManager, isAdmin} = useAuth();

    const [deleteRoom, {
        isSuccess: isSuccessDeleteRoom, isLoading: isLoadingDeleteRoom, reset: resetDeleteRoom
    }] = useDeleteRoomMutation()

    const [deleteBuilding, {
        isSuccess: isSuccessDeleteBuilding, isLoading: isLoadingDeleteBuilding, reset: resetDeleteBuilding
    },] = useDeleteBuildingMutation();

    const [deleteFloor, {
        isSuccess: isSuccessDeleteFloor, isLoading: isLoadingDeleteFloor, reset: resetDeleteFloor
    }] = useDeleteFloorMutation();

    const [deleteDevice, {
        isSuccess: isSuccessDeleteDevice, isLoading: isLoadingDeleteDevice, reset: resetDeleteDevice
    }] = useDeleteDeviceMutation();

    const [deleteUser, {
        isSuccess: isUserDeleteSuccess, isLoading: isUserDeleteLoading, reset: resetDeleteUser
    },] = useDeleteUserMutation();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        backgroundColor: "background.paper",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "520px"
    };

    const handleClose = () => {
        dispatch(setIsOpenConfirmDelete(false));
        resetDeleteUser(); // Reset success state for user deletion
        resetDeleteBuilding(); // Reset success state for building deletion
        resetDeleteFloor();   // Reset success state for floor deletion
        resetDeleteDevice();  // Reset success state for device deletion
        resetDeleteRoom();
    };

    const handleDelete = async () => {
        if (userId) {
            await deleteUser({id: userId});
        } else if (buildingId) {
            await deleteBuilding({id: buildingId});
        } else if (deviceId) {
            await deleteDevice({id: deviceId});
        } else if (floorId) {
            await deleteFloor({id: floorId});
        } else if (roomId) {
            await deleteRoom({id: roomId});
        }
    };

    useEffect(() => {
        if (isSuccessDeleteRoom) {
            navigate("/dash/rooms");
            dispatch(setIdRoomToDelete(""));
            handleClose();
        }
    }, [isSuccessDeleteRoom, dispatch, navigate]);

    useEffect(() => {
        if (isUserDeleteSuccess) {
            if (isManager) {
                navigate("/dash/users");
            } else if (isAdmin) {
                navigate("/admin/users");
            }

            dispatch(setIdUserToDelete(""));
            handleClose();
        }
    }, [isUserDeleteSuccess, dispatch, navigate]);

    useEffect(() => {
        if (isSuccessDeleteBuilding) {
            navigate("/dash/buildings");
            dispatch(setIdBuildingToDelete(""));
            handleClose();
        }
    }, [isSuccessDeleteBuilding, dispatch, navigate]);

    useEffect(() => {
        if (isSuccessDeleteDevice) {
            navigate("/dash/devices");
            dispatch(setDeviceIdToDelete(""));
            handleClose();
        }
    }, [isSuccessDeleteDevice, dispatch, navigate]);

    useEffect(() => {
        if (isSuccessDeleteFloor) {
            navigate("/dash/floors");
            dispatch(setIdFloorToDelete(""));
            handleClose();
        }
    }, [isSuccessDeleteFloor, dispatch, navigate]);

    const loading = useMemo(() => {
        return (isUserDeleteLoading || isLoadingDeleteBuilding || isLoadingDeleteDevice || isLoadingDeleteFloor || isLoadingDeleteRoom);
    }, [isUserDeleteLoading, isLoadingDeleteBuilding, isLoadingDeleteDevice, isLoadingDeleteFloor, isLoadingDeleteRoom]);

    return (<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
    >
        <Box sx={style}>
            <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{padding: "24px"}}
            >
                Delete
            </Typography>

            <Typography
                id="modal-modal-title"
                variant="body1"
                sx={{paddingX: "24px"}}
            >
                Are you sure want to delete?
            </Typography>

            <Box
                sx={{
                    padding: "24px", display: "flex", justifyContent: "end",
                }}
            >
                <LoadingButton
                    variant="contained"
                    sx={{
                        ...buttonStyleContained, mr: 1, backgroundColor: "red", ":hover": {
                            backgroundColor: "#d32f2f", boxShadow: "none",
                        },
                    }}
                    loading={loading}
                    onClick={handleDelete}
                >
                    Delete
                </LoadingButton>
                <Button
                    onClick={handleClose}
                    sx={{
                        ...buttonStyleOutlined,
                    }}
                >
                    Cancel
                </Button>

            </Box>
        </Box>
    </Modal>);
}

export default DeleteConfirmComponent;
