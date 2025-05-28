import React, {useEffect, useState} from "react";
import useTranslate from "../../hook/useTranslate.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useUploadImageMutation} from "../../redux/feature/uploadImage/uploadImageApiSlice.js";
import * as Yup from "yup";
import {setCaptionSnackBar, setErrorSnackbar, setIsOpenSnackBar} from "../../redux/feature/actions/actionSlice.js";
import {Card, Grid2, Paper, TextField, Typography} from "@mui/material";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent.jsx";
import SeoComponent from "../../components/SeoComponent.jsx";
import MainHeaderComponent from "../../components/MainHeaderComponent.jsx";
import {Form, Formik} from "formik";
import {cardStyle} from "../../assets/style.js";
import ImageUploadComponent from "../../components/ImageUploadComponent.jsx";
import SelectSingleComponent from "../../components/SelectSingleComponent.jsx";
import ButtonComponent from "../../components/ButtonComponent.jsx";
import {useUpdateFloorMutation} from "../../redux/feature/floor/floorApiSlice.js";
import {useGetAllNameBuildingQuery} from "../../redux/feature/building/buildingApiSlice.js";
import {Slide, toast} from "react-toastify";

function EditFloorForm({ floor }) {
    console.log(floor)
    const [profileImageFile, setProfileImageFile] = useState(null);
    const { t } = useTranslate();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [uploadImage] = useUploadImageMutation();

    const {data: building} = useGetAllNameBuildingQuery("buildingNameList")

    const [
        updateFloor,
        {
            isSuccess: isSuccessUpdateFloor,
            isLoading: isLoadingUpdateFloor,
            isError: isErrorUpdateFloor,
            error: errorUpdateFloor,
        },
    ] = useUpdateFloorMutation();

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Building name is required")
            .min(2, "Building name must be at least 2 characters"),
        buildingId: Yup.string().required("Building is required"),
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
            console.log(values)

            await updateFloor({
                id: floor.id,
                name: values.name,
                image: profileImageUri ? profileImageUri : floor.image,
                buildingId: values.buildingId,
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (isSuccessUpdateFloor) {
            navigate("/dash/floors");
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
    }, [isSuccessUpdateFloor]);

    useEffect(() => {
        if (isErrorUpdateFloor) {
            toast.error(`${errorUpdateFloor?.data?.error?.description}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                transition: Slide,
            });
        }
    }, [isErrorUpdateFloor]);

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
            {t("floor")}
        </Typography>,
        <Typography color="inherit" key={3}>
            {floor.name}
        </Typography>,
    ];

    console.log(floor)
    let content;
    if (!building)
        content = <LoadingFetchingDataComponent />;

    if (building) {
        content = (
            <>
                <SeoComponent title={"Create a new floor"} />
                <MainHeaderComponent
                    breadcrumbs={breadcrumbs}
                    title={t("edit")}
                    handleBackClick={() => navigate("/dash/floors")}
                />

                <div>
                    <Formik
                        initialValues={{ name: floor.name, buildingId: floor.building.id, image: floor.image }}
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
                                                        label={t("florName")}
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
                                                        label={t("building")}
                                                        options={building}
                                                        onChange={(value) =>
                                                            setFieldValue("buildingId", value)
                                                        }
                                                        fullWidth={true}
                                                        error={errors.buildingId}
                                                        touched={touched.buildingId}
                                                        optionLabelKey="name"
                                                        selectFistValue={values.buildingId}
                                                    />
                                                </div>
                                                <div className="col-span-2 flex justify-end mt-[20px]">
                                                    <ButtonComponent
                                                        btnTitle={t("saveChanges")}
                                                        type={"submit"}
                                                        isLoading={isLoadingUpdateFloor}
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
            </>
        );
    }

    return content;

}

export default EditFloorForm;