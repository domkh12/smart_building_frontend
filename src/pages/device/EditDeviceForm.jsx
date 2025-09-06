import {useEffect, useState} from "react";
import useTranslate from "../../hook/useTranslate.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useUploadImageMutation} from "../../redux/feature/uploadImage/uploadImageApiSlice.js";
import * as Yup from "yup";
import {setCaptionSnackBar, setErrorSnackbar, setIsOpenSnackBar} from "../../redux/feature/actions/actionSlice.js";
import {Card, Grid2, Paper, TextField, Typography} from "@mui/material";
import SeoComponent from "../../components/SeoComponent.jsx";
import MainHeaderComponent from "../../components/MainHeaderComponent.jsx";
import {Form, Formik} from "formik";
import {cardStyle} from "../../assets/style.js";
import ImageUploadComponent from "../../components/ImageUploadComponent.jsx";
import SelectSingleComponent from "../../components/SelectSingleComponent.jsx";
import ButtonComponent from "../../components/ButtonComponent.jsx";
import {useUpdateSingleDeviceMutation} from "../../redux/feature/device/deviceApiSlice.js";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent.jsx";
import {useGetAllDeviceTypesQuery} from "../../redux/feature/device/deviceTypeApiSlice.js";
import QuickEditDeviceTypeComponent from "../../components/QuickEditDeviceTypeComponent.jsx";
import {setIdDeviceTypeToEdit, setIsQuickEditDeviceTypeOpen} from "../../redux/feature/device/deviceSlice.js";
import {Slide, toast} from "react-toastify";


function EditDeviceForm({ device }) {
    const [profileImageFile, setProfileImageFile] = useState(null);
    const { t } = useTranslate();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const deviceTypeFetched = useSelector((state) => state.device.deviceType);
    const [uploadImage] = useUploadImageMutation();
    const [isLoading, setIsLoading] = useState(true);
    const {data: deviceType} = useGetAllDeviceTypesQuery("deviceTypeList");

    const [
        updateSingleDevice,
        {
            isSuccess: isSuccessUpdateSingleDevice,
            isLoading: isLoadingUpdateSingleDevice,
            isError: isErrorUpdateSingleDevice,
            error: errorUpdateSingleDevice,
        },
    ] = useUpdateSingleDeviceMutation();

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Building name is required")
            .min(2, "Building name must be at least 2 characters"),
        deviceTypeId: Yup.string().required("Device Type is required!")
    });

    const handleSubmit = async (values) => {
        try {
            const formData = new FormData();
            let profileImageUri = null;
            if (profileImageFile) {
                formData.append("file", profileImageFile);
                const uploadResponse = await uploadImage(formData).unwrap();
                profileImageUri = uploadResponse.uri;
            }

            await updateSingleDevice({
                id: device.id,
                name: values.name,
                image: profileImageUri ? profileImageUri : device.image,
                deviceTypeId: values.deviceTypeId,
                roomId: device.room.id,
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (isSuccessUpdateSingleDevice) {
            navigate("/dash/devices");
            toast.success(t("updateSuccess"), {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                transition: Slide,
            });
        }
    }, [isSuccessUpdateSingleDevice]);

    useEffect(() => {
        if (isErrorUpdateSingleDevice) {
            toast.error(`${errorUpdateSingleDevice?.data?.error?.description}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                transition: Slide,
            });
        }
    }, [isErrorUpdateSingleDevice]);

    const breadcrumbs = [
        <Paper
            elevation={0}
            component="button"
            className="text-black hover:underline"
            onClick={() => navigate("/dash")}
            key={1}
        >
            {t("dashboard")}
        </Paper>,
        <Typography color="inherit" key={2}>
            {t("device")}
        </Typography>,
        <Typography color="inherit" key={3}>
            {device.name}
        </Typography>,
    ];

    let content;

    if (!deviceType) content = <LoadingFetchingDataComponent />;

    if ( deviceType ) {
        content = (
            <>
                <SeoComponent title={"Create a new device"} />
                <MainHeaderComponent
                    breadcrumbs={breadcrumbs}
                    title={t("edit")}
                    handleBackClick={() => navigate("/dash/devices")}
                />

                <div>
                    <Formik
                        initialValues={{ name: device.name, deviceTypeId: device.deviceType.id, image: device.image }}
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
                                    <Grid2 container spacing={3}>
                                        <Grid2 size={{ xs: 12, md: 4 }}>
                                            <Card
                                                sx={{ ...cardStyle }}
                                                className=" gap-5 pt-[40px] px-[24px] pb-[40px]"
                                            >
                                                <ImageUploadComponent
                                                    setProfileImageFile={setProfileImageFile}
                                                    profileImageFile={profileImageFile || ""}
                                                    profileUrl={values?.image || ""}
                                                />
                                            </Card>
                                        </Grid2>
                                        <Grid2 size={{ xs: 12, md: 8 }}>
                                            <Card sx={{ ...cardStyle, padding: "24px" }}>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

                                                    <SelectSingleComponent
                                                        label={t("deviceType")}
                                                        options={deviceType}
                                                        onChange={(value) => setFieldValue("deviceTypeId", value)}
                                                        fullWidth={true}
                                                        error={errors.deviceTypeId}
                                                        touched={touched.deviceTypeId}
                                                        optionLabelKey="name"
                                                        selectFistValue={values.deviceTypeId}
                                                        isEditable={true}
                                                        onClickQuickEdit={(value) => {
                                                            dispatch(setIdDeviceTypeToEdit(value));
                                                            dispatch(setIsQuickEditDeviceTypeOpen(true));
                                                        }}
                                                    />

                                                </div>
                                                <div className="col-span-2 flex justify-end mt-[20px]">
                                                    <ButtonComponent
                                                        btnTitle={t("saveChanges")}
                                                        type={"submit"}
                                                        isLoading={isLoadingUpdateSingleDevice}
                                                    />
                                                </div>
                                            </Card>
                                        </Grid2>
                                    </Grid2>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
                <QuickEditDeviceTypeComponent/>
            </>
        );
    }


    return content;
}

export default EditDeviceForm