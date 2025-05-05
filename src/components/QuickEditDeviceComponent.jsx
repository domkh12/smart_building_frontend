import {useDispatch, useSelector} from "react-redux";
import useTranslate from "../hook/useTranslate.jsx";
import * as Yup from "yup";
import {useEffect} from "react";
import {setCaptionSnackBar, setIsOpenSnackBar} from "../redux/feature/actions/actionSlice.js";
import {Box, Button, Card, Modal, TextField, Typography} from "@mui/material";
import {Form, Formik} from "formik";
import {buttonStyleContained, buttonStyleOutlined, cardStyle} from "../assets/style.js";
import {useUpdateSingleDeviceMutation} from "../redux/feature/device/deviceApiSlice.js";
import {setIsOpenQuickEditDevice} from "../redux/feature/device/deviceSlice.js";
import SelectSingleComponent from "./SelectSingleComponent.jsx";
import ButtonComponent from "./ButtonComponent.jsx";
import {useGetAllDeviceTypesQuery} from "../redux/feature/device/deviceTypeApiSlice.js";
import {setIsQuickEditBuildingOpen} from "../redux/feature/building/buildingSlice.js";
import {LoadingButton} from "@mui/lab";

function QuickEditDeviceComponent() {
    const isQuickEditDeviceOpen = useSelector((state) => state.device.isOpenQuickEditDevice);
    const device = useSelector((state) => state.device.deviceDataForQuickEdit);
    const {t} = useTranslate();
    const dispatch = useDispatch();

    const {data: deviceType} = useGetAllDeviceTypesQuery("deviceTypeList");
    const [
        updateDevice,
        {
            isSuccess: isSuccessUpdateDevice,
            isLoading: isLoadingUpdateDevice,
            isError: isErrorUpdateDevice,
            error: errorUpdateDevice,
        },
    ] = useUpdateSingleDeviceMutation();

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Device name is required")
            .min(2, "Device name must be at least 2 characters!")
            .max(100, "Device name cannot be more than 100 characters!")
    });

    useEffect(() => {
        if (isSuccessUpdateDevice) {
            dispatch(setIsOpenQuickEditDevice(false))
            dispatch(setIsOpenSnackBar(true));
            dispatch(setCaptionSnackBar(t("createSuccess")));
            setTimeout(() => {
                dispatch(setIsOpenSnackBar(false));
            }, 3000);
        }
    }, [isSuccessUpdateDevice]);

    const handleSubmit = async (values, {setSubmitting}) => {
        try {
            await updateDevice({
                id: device.id,
                name: values.name,
                image: device.image,
                deviceTypeId: values.deviceTypeId,
                roomId: device.room.id,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    let content;

    content = (
        <Modal
            open={isQuickEditDeviceOpen}
            onClose={() => dispatch(setIsOpenQuickEditDevice(false))}
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
                            initialValues={{name: device.name, deviceTypeId: device.deviceType.id, image: device.image}}
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
                                                label={t("deviceTypeName")}
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
                                                label={t("deviceType")}
                                                options={deviceType}
                                                onChange={(value) => setFieldValue("deviceTypeId", value)}
                                                fullWidth={true}
                                                error={errors.deviceTypeId}
                                                touched={touched.deviceTypeId}
                                                optionLabelKey="name"
                                                selectFistValue={values.deviceTypeId}
                                            />

                                        </div>
                                        <Box
                                            sx={{
                                                padding: "24px",
                                                display: "flex",
                                                justifyContent: "end",
                                            }}
                                        >
                                            <Button
                                                onClick={() => dispatch(setIsOpenQuickEditDevice(false))}
                                                sx={{
                                                    ...buttonStyleOutlined,
                                                }}
                                            >
                                                {t('cancel')}
                                            </Button>
                                            <LoadingButton
                                                loading={isLoadingUpdateDevice}
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
                    </Box>
                </Box>
            </Box>
        </Modal>
    )

    return content;
}

export default QuickEditDeviceComponent;