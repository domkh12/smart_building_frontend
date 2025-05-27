import {
    setIdDeviceTypeToDelete,
    setIdDeviceTypeToEdit,
    setIsQuickEditDeviceTypeOpen
} from "../redux/feature/device/deviceSlice.js";
import {Backdrop, Box, Button, Modal, TextField, Typography} from "@mui/material";
import {Form, Formik} from "formik";
import SelectSingleComponent from "./SelectSingleComponent.jsx";
import {buttonStyleContained, buttonStyleOutlined} from "../assets/style.js";
import {LoadingButton} from "@mui/lab";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import useTranslate from "../hook/useTranslate.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import React, {useEffect} from "react";
import {
    useDeleteDeviceTypeByIdMutation,
    useGetDeviceTypeByIdMutation,
    useUpdateDeviceTypeMutation
} from "../redux/feature/device/deviceTypeApiSlice.js";
import {CONTROLLABLE} from "../config/controllable.js";
import {setIsOpenConfirmDelete} from "../redux/feature/actions/actionSlice.js";
import {Slide, toast} from "react-toastify";

function QuickEditDeviceTypeComponent() {
    const {t} = useTranslate();
    const id = useSelector((state) => state.device.idDeviceTypeToEdit);
    const dispatch = useDispatch();
    const isQuickEditDeviceTypeOpen = useSelector((state) => state.device.isQuickEditDeviceTypeOpen);
    const fetchedDeviceTypeById = useSelector((state) => state.device.deviceTypeDataById.data);
    const [getDeviceTypeById, {isSuccess, isLoading, isError, error}] = useGetDeviceTypeByIdMutation();
    const [updateDeviceType, {isSuccess: isSuccessUpdateDeviceType, isLoading: isLoadingUpdateDeviceType}] = useUpdateDeviceTypeMutation();

    useEffect(() => {
        const fetchDeviceType = async () => {
            try{
                Promise.all([
                    await getDeviceTypeById(id)
                ])
            }catch (error) {
                console.log(error);
            }
        }
        if (id){
            fetchDeviceType();
        }
    }, [id]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(setIdDeviceTypeToEdit(""));
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isSuccessUpdateDeviceType) {
            toast.success(t("updateSuccess"), {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                transition: Slide,
            });
            dispatch(setIsQuickEditDeviceTypeOpen(false));
            dispatch(setIdDeviceTypeToEdit(""));
        }
    }, [isSuccessUpdateDeviceType]);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Device name is required")
            .min(2, "Device name must be at least 2 characters!")
            .max(100, "Device name cannot be more than 100 characters!")
    });

    const handleSubmit = async (values) => {
        await updateDeviceType({
            id: fetchedDeviceTypeById.id,
            name: values.name,
            description: values.description,
            controllable: values.controllable === 2 ? true : false
        })
    }

    const handleDeleteDeviceType = () => {
        dispatch(setIsOpenConfirmDelete(true));
        dispatch(setIdDeviceTypeToDelete(fetchedDeviceTypeById.id));
    }

    let content;

    if (isLoading){
        content = (
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    if (isSuccess){
        content = (
            <Modal
                open={isQuickEditDeviceTypeOpen}
                onClose={() => dispatch(setIsQuickEditDeviceTypeOpen(false))}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
            >
                <Box>
                    <Box
                        sx={{
                            backgroundColor: "background.paper",
                            borderRadius: "16px",
                            width: "95%",
                            maxWidth: "720px",
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            overflow: "auto",
                            maxHeight: "90vh",
                            boxShadow: "0px 10px 15px -3px rgb(0 0 0 / 20%), 0px 4px 6px -2px rgb(0 0 0 / 15%)",
                            display: "flex",
                            flexDirection: "column",
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
                                initialValues={{ name: fetchedDeviceTypeById.name, description: fetchedDeviceTypeById?.description || "", controllable: fetchedDeviceTypeById.controllable ? 2 : 1 }}
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
                                    console.log("values", values.controllable);
                                    const handleControllableChange = (value) => {
                                        setFieldValue("controllable", value);
                                    };
                                    return (
                                        <Form>

                                            <div className="px-[24px] flex flex-col gap-5">
                                                <TextField
                                                    label={t("deviceTypeName")}
                                                    variant="outlined"
                                                    sx={{
                                                        "& .MuiInputBase-input": {
                                                            boxShadow: "none",
                                                        },
                                                        borderRadius: "6px",
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

                                                <TextField
                                                    label={t("description")}
                                                    variant="outlined"
                                                    sx={{
                                                        "& .MuiInputBase-input": {
                                                            boxShadow: "none",
                                                        },
                                                        borderRadius: "6px",
                                                    }}
                                                    type="text"
                                                    id="description"
                                                    name="description"
                                                    fullWidth
                                                    value={values.description}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    autoComplete="off"
                                                    size="medium"
                                                />

                                                <SelectSingleComponent
                                                    label={t("controllable")}
                                                    options={CONTROLLABLE}
                                                    onChange={handleControllableChange}
                                                    fullWidth={true}
                                                    // error={errors.genderId}
                                                    // touched={touched.genderId}
                                                    optionLabelKey="name"
                                                    selectFistValue={values.controllable}
                                                />

                                            </div>
                                            <div className="flex justify-between items-center p-[24px]">
                                            <LoadingButton
                                                onClick={handleDeleteDeviceType}
                                                loading={false}
                                                variant="contained"
                                                color="error"
                                            >
                                                {t('delete')}
                                            </LoadingButton>
                                            <Box
                                                sx={{

                                                    display: "flex",
                                                    justifyContent: "end",
                                                }}
                                            >
                                                <Button
                                                    onClick={() => dispatch(setIsQuickEditDeviceTypeOpen(false))}
                                                    sx={{
                                                        ...buttonStyleOutlined,
                                                    }}
                                                >
                                                    {t('cancel')}
                                                </Button>
                                                <LoadingButton
                                                    loading={isLoadingUpdateDeviceType}
                                                    variant="contained"
                                                    sx={{...buttonStyleContained, ml: 1}}
                                                    type="submit"
                                                >
                                                    {t('update')}
                                                </LoadingButton>
                                            </Box>
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        )
    }


    return content;

}

export default QuickEditDeviceTypeComponent;