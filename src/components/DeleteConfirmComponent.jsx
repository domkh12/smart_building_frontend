import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {buttonStyleContained, buttonStyleOutlined} from "../assets/style";
import {useEffect, useMemo, useState} from "react";
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
import {setDeviceIdToDelete, setIsQuickEditDeviceTypeOpen} from "../redux/feature/device/deviceSlice.js";
import {useDeleteRoomMutation} from "../redux/feature/room/roomApiSlice.js";
import {setIdRoomToDelete} from "../redux/feature/room/roomSlice.js";
import useAuth from "../hook/useAuth.jsx";
import {IoWarningOutline} from "react-icons/io5";
import useTranslate from "../hook/useTranslate.jsx";
import {useDeleteDeviceTypeByIdMutation} from "../redux/feature/device/deviceTypeApiSlice.js";

function DeleteConfirmComponent() {
    const {t} = useTranslate();
    const open = useSelector((state) => state.action.isOpenConfirmDelete);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.users.idUserToDelete);
    const buildingId = useSelector((state) => state.building.idBuildingToDelete);
    const deviceId = useSelector((state) => state.device.deviceIdToDelete);
    const floorId = useSelector((state) => state.floor.idFloorToDelete);
    const roomId = useSelector((state) => state.room.idRoomToDelete);
    const deviceTypeId = useSelector((state) => state.device.idDeviceTypeToDelete);
    const {isManager, isAdmin} = useAuth();
    const [confirmText, setConfirmText] = useState('');

    const [deleteRoom, {
        isSuccess: isSuccessDeleteRoom,
        isLoading: isLoadingDeleteRoom,
        reset: resetDeleteRoom
    }] = useDeleteRoomMutation();

    const [deleteBuilding, {
        isSuccess: isSuccessDeleteBuilding,
        isLoading: isLoadingDeleteBuilding,
        reset: resetDeleteBuilding
    }] = useDeleteBuildingMutation();

    const [deleteFloor, {
        isSuccess: isSuccessDeleteFloor,
        isLoading: isLoadingDeleteFloor,
        reset: resetDeleteFloor
    }] = useDeleteFloorMutation();

    const [deleteDevice, {
        isSuccess: isSuccessDeleteDevice,
        isLoading: isLoadingDeleteDevice,
        reset: resetDeleteDevice
    }] = useDeleteDeviceMutation();

    const [deleteUser, {
        isSuccess: isUserDeleteSuccess,
        isLoading: isUserDeleteLoading,
        reset: resetDeleteUser
    }] = useDeleteUserMutation();

    const [deleteDeviceType,
        {isSuccess: isSuccessDeleteDeviceType,
            isLoading: isLoadingDeleteDeviceType,
            reset: resetDeleteDeviceType,
        }] = useDeleteDeviceTypeByIdMutation();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        backgroundColor: "background.paper",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "520px",
        outline: 'none'
    };

    const getDeleteItemType = () => {
        if (buildingId) return t('building');
        if (floorId) return t('floor');
        if (roomId) return t('room');
        if (deviceId) return t('device');
        if (userId) return t('user');
        if (deviceTypeId) return t('deviceType');
        return "";
    };

    const clearAllDeleteStates = () => {
        dispatch(setIdUserToDelete(""));
        dispatch(setIdBuildingToDelete(""));
        dispatch(setDeviceIdToDelete(""));
        dispatch(setIdFloorToDelete(""));
        dispatch(setIdRoomToDelete(""));
        dispatch(setDeviceIdToDelete(""));
    };

    const handleClose = () => {
        setConfirmText('');
        dispatch(setIsOpenConfirmDelete(false));
        clearAllDeleteStates();
        resetDeleteUser();
        resetDeleteBuilding();
        resetDeleteFloor();
        resetDeleteDevice();
        resetDeleteRoom();
        resetDeleteDeviceType();
    };

    const handleDelete = async () => {
        const requiresConfirmation = buildingId || floorId || roomId;
        if (requiresConfirmation && confirmText !== 'CONFIRM') {
            return;
        }

        if (userId) {
            await deleteUser({id: userId});
        } else if (buildingId) {
            await deleteBuilding({id: buildingId});
            localStorage.removeItem("selectFirstRoomById");
        } else if (deviceId) {
            await deleteDevice({id: deviceId});
        } else if (floorId) {
            await deleteFloor({id: floorId});
            localStorage.removeItem("selectFirstRoomById");
        } else if (roomId) {
            await deleteRoom({id: roomId});
            localStorage.removeItem("selectFirstRoomById");
        } else if (deviceTypeId) {
            await deleteDeviceType({id: deviceTypeId});
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
    }, [isUserDeleteSuccess, dispatch, navigate, isManager, isAdmin]);

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

    useEffect(() => {
        if (isSuccessDeleteDeviceType) {
            dispatch(setIsQuickEditDeviceTypeOpen(false));
            dispatch(setDeviceIdToDelete(""));
            handleClose();
        }
    }, [isSuccessDeleteDeviceType, dispatch]);

    const loading = useMemo(() => {
        return (isUserDeleteLoading || isLoadingDeleteBuilding || isLoadingDeleteDevice || isLoadingDeleteFloor || isLoadingDeleteRoom || isLoadingDeleteDeviceType);
    }, [isUserDeleteLoading, isLoadingDeleteBuilding, isLoadingDeleteDevice, isLoadingDeleteFloor, isLoadingDeleteRoom, isLoadingDeleteDeviceType]);

    const requiresConfirmation = buildingId || floorId || roomId;
    const isConfirmValid = confirmText === 'CONFIRM';

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="delete-confirmation-modal"
            aria-describedby="delete-confirmation-description"
        >
            <Box sx={style}>
                {/* Warning Icon */}
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 mt-5 bg-red-100 text-red-600 rounded-full">
                    <IoWarningOutline className="w-6 h-6"/>
                </div>

                {/* Title */}
                <Typography
                    variant="h6"
                    align="center"
                    sx={{mb: 2, px: 3, fontWeight: 600}}
                >
                    {t('delete')} {getDeleteItemType()}
                </Typography>

                {/* Warning Message */}
                <Typography
                    variant="body1"
                    sx={{px: 3, mb: 3}}
                    align="center"
                    color="text.secondary"
                >
                    {t('deleteWarningDescription')}
                </Typography>

                {/* Confirmation Input */}
                {requiresConfirmation && (
                    <Box sx={{px: 3, mb: 3}}>
                        <Typography variant="body2" sx={{mb: 1}} color="text.secondary">
                            Please type <span className="font-mono font-bold">CONFIRM</span> to proceed
                        </Typography>
                        <TextField
                            fullWidth
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            placeholder="CONFIRM"
                            size="small"
                            error={confirmText !== '' && !isConfirmValid}
                            helperText={confirmText !== '' && !isConfirmValid ? 'Please type CONFIRM exactly as shown' : ''}
                            autoFocus
                        />
                    </Box>
                )}

                {/* Action Buttons */}
                <Box
                    sx={{
                        p: 3,
                        display: "flex",
                        justifyContent: "end",
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        gap: 2
                    }}
                >
                    <Button
                        onClick={handleClose}
                        sx={{
                            ...buttonStyleOutlined,
                        }}
                    >
                        Cancel
                    </Button>
                    <LoadingButton
                        variant="contained"
                        sx={{
                            ...buttonStyleContained,
                            backgroundColor: "error.main",
                        }}
                        color="error"
                        loading={loading}
                        onClick={handleDelete}
                        disabled={Boolean(requiresConfirmation && !isConfirmValid)}
                    >
                        Delete
                    </LoadingButton>
                </Box>
            </Box>
        </Modal>
    );
}

export default DeleteConfirmComponent;