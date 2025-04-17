import {useDispatch, useSelector} from "react-redux";
import useTranslate from "../hook/useTranslate.jsx";
import {useGetAllNameBuildingQuery} from "../redux/feature/building/buildingApiSlice.js";
import {useUpdateRoomMutation} from "../redux/feature/room/roomApiSlice.js";
import * as Yup from "yup";
import React, {useEffect, useRef, useState} from "react";
import {setIsQuickEditRoomOpen} from "../redux/feature/room/roomSlice.js";
import {setCaptionSnackBar, setErrorSnackbar, setIsOpenSnackBar} from "../redux/feature/actions/actionSlice.js";
import {Autocomplete, Box, Button, Modal, TextField, Typography} from "@mui/material";
import {Form, Formik} from "formik";
import SelectSingleComponent from "./SelectSingleComponent.jsx";
import {buttonStyleContained, buttonStyleOutlined} from "../assets/style.js";
import {LoadingButton} from "@mui/lab";
import AddNewDeviceDialogComponent from "./AddNewDeviceDialogComponent.jsx";
import {useAddNewDeviceMutation} from "../redux/feature/device/deviceApiSlice.js";
import {
    appendDeviceLocalData,
    clearDeviceLocalData,
    setAddNewDeviceDialogOpen
} from "../redux/feature/device/deviceSlice.js";
import LoadingFetchingDataComponent from "./LoadingFetchingDataComponent.jsx";
import {FiPlus} from "react-icons/fi";

function QuickEditRoomComponent() {
    const isQuickEditRoomOpen = useSelector((state) => state.room.isQuickEditRoomOpen);
    const room = useSelector((state) => state.room.roomDataForQuickEdit);
    const {t} = useTranslate();
    const dispatch = useDispatch();
    const devicesLoadedRef = useRef(false);
    const isAddNewDeviceDialogOpen = useSelector(
        (state) => state.device.isAddNewDeviceDialogOpen
    );
    const deviceLocalData = useSelector((state) => state.device.deviceLocalData);
    const deviceUpdateLocalData = useSelector((state) => state.device.deviceUpdateLocalData);


    const [
        updateRoom,
        {
            isSuccess: isSuccessUpdateRoom,
            isLoading: isLoadingUpdateRoom,
            isError: isErrorUpdateRoom,
            error: errorUpdateRoom,
        },
    ] = useUpdateRoomMutation();

    const {data: building} = useGetAllNameBuildingQuery("buildingNameList")

    const [
        addNewDevice, {
            isSuccess: isSucessAddNewDevice,
            isLoading: isLoadingAddNewDevice,
            isError: isErrorAddNewDevice,
            error: errorAddNewDevice
        }
    ] = useAddNewDeviceMutation();

    useEffect(() => {
        if (isQuickEditRoomOpen) {
            dispatch(appendDeviceLocalData(room?.devices));
            devicesLoadedRef.current = true;
        }
    }, [isQuickEditRoomOpen]);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Building name is required")
            .min(2, "Building name must be at least 2 characters"),
        devices: Yup.array(),
        floorId: Yup.string().required("Floor is required"),
    });

    const handleSubmit = async (values) => {
        try {
            const updatedResponse = await updateRoom({
                id: room.id,
                name: values.name,
                image: room.image,
                floorId: values.floorId,
            });
            let roomId = updatedResponse.data.id;
            const updatedDeviceLocalData = deviceLocalData.map(device => {
                return {...device, roomId: roomId};
            });
            await addNewDevice({
                devices: updatedDeviceLocalData,
            })
            dispatch(clearDeviceLocalData());
        } catch (err) {
            console.log(err);
        }
    };

    const style = {
        display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh",
    };

    useEffect(() => {
        if (isSuccessUpdateRoom) {
            dispatch(setIsQuickEditRoomOpen(false))
            dispatch(setIsOpenSnackBar(true));
            dispatch(setCaptionSnackBar(t("createSuccess")));
            setTimeout(() => {
                dispatch(setIsOpenSnackBar(false));
            }, 3000);
        }
    }, [isSuccessUpdateRoom]);

    useEffect(() => {
        if (isErrorUpdateRoom) {
            dispatch(setIsOpenSnackBar(true));
            dispatch(setErrorSnackbar(true));
            dispatch(
                setCaptionSnackBar(`${errorUpdateRoom?.data?.error?.description}`)
            );
            setTimeout(() => {
                dispatch(setIsOpenSnackBar(false));
            }, 3000);

            setTimeout(() => {
                dispatch(setErrorSnackbar(false));
            }, 3500);
        }
    }, [isErrorUpdateRoom]);

    let content;
    if (!building && !room)
        content = <LoadingFetchingDataComponent/>;

    if (building && room) {
        content = (<Modal
            open={isQuickEditRoomOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
        >
            <Box sx={style}>
                <Box
                    sx={{
                        backgroundColor: "background.paper",
                        borderRadius: "16px",
                        width: "100%",
                        mx: 5,
                        maxWidth: "720px",
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{padding: "24px"}}
                    >
                        {t('quickUpdate')}
                    </Typography>
                    <Box>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                name: room.name,
                                floorId: room.floor?.id,
                                devices: deviceUpdateLocalData,
                                image: room.image,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({
                                  values,
                                  touched,
                                  errors,
                                  handleChange,
                                  handleBlur,
                                  setFieldValue,
                              }) => {
                                return (
                                    <Form>
                                        <div className="px-[24px]">
                                            <TextField
                                                label={t("roomName")}
                                                variant="outlined"
                                                sx={{
                                                    "& .MuiInputBase-input": {
                                                        boxShadow: "none",
                                                    },
                                                    borderRadius: "6px",
                                                    mb:3
                                                }}
                                                type="text"
                                                id="name"
                                                name="name"
                                                fullWidth
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                autoComplete="off"
                                                error={errors.name && touched.name}
                                                helperText={
                                                    errors.name && touched.name ? errors.name : null
                                                }
                                                size="medium"
                                            />

                                            <SelectSingleComponent
                                                label={t("floor")}
                                                options={building}
                                                onChange={(value) =>
                                                    setFieldValue("floorId", value)
                                                }
                                                fullWidth={true}
                                                error={errors.floorId}
                                                touched={touched.floorId}
                                                optionLabelKey="name"
                                                itemsLabelKey="floors"
                                                groupLabelKey="name"
                                                selectFistValue={room.floor.id}
                                            />
                                        </div>
                                        <div className="flex flex-col justify-end items-end px-[24px]">
                                            <Button
                                                onClick={() =>
                                                    dispatch(setAddNewDeviceDialogOpen(true))
                                                }
                                                startIcon={<FiPlus/>}
                                                disableRipple
                                                sx={{
                                                    "&:hover": {
                                                        backgroundColor: "transparent",
                                                        textDecoration: "underline",
                                                    },
                                                }}
                                            >
                                                {t("addDevice")}
                                            </Button>
                                            <Autocomplete
                                                multiple
                                                id="device_tage"
                                                options={values.devices}
                                                disableClearable
                                                readOnly
                                                fullWidth={true}
                                                getOptionLabel={(option) => option.name}
                                                value={values.devices}
                                                renderInput={(params) => (
                                                    <TextField
                                                        sx={{
                                                            "& .MuiInputBase-input": {
                                                                boxShadow: "none",
                                                            },
                                                            borderRadius: "6px",
                                                        }}
                                                        {...params}
                                                        label={t("device")}
                                                        placeholder="Add"
                                                    />
                                                )}
                                            />
                                        </div>
                                        <Box
                                            sx={{
                                                padding: "24px", display: "flex", justifyContent: "end",
                                            }}
                                        >
                                            <Button
                                                onClick={() => dispatch(setIsQuickEditRoomOpen(false))}
                                                sx={{
                                                    ...buttonStyleOutlined,
                                                }}
                                            >
                                                {t('cancel')}
                                            </Button>
                                            <LoadingButton
                                                loading={isLoadingUpdateRoom}
                                                variant="contained"
                                                sx={{...buttonStyleContained, ml: 1}}
                                                type="submit"
                                            >
                                                {t('update')}
                                            </LoadingButton>
                                        </Box>
                                    </Form>
                                );
                            }}
                        </Formik>
                        {isAddNewDeviceDialogOpen && <AddNewDeviceDialogComponent/>}
                    </Box>
                </Box>
            </Box>

        </Modal>)
    }

    return content;
}

export default QuickEditRoomComponent;