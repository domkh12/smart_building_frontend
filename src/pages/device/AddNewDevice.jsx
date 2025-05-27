import React, { useEffect, useState } from "react";
import useTranslate from "../../hook/useTranslate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useUploadImageMutation } from "../../redux/feature/uploadImage/uploadImageApiSlice";
import {
  setCaptionSnackBar,
  setErrorSnackbar,
  setIsOpenSnackBar,
} from "../../redux/feature/actions/actionSlice";
import {Card, Grid2, Paper, TextField, Typography} from "@mui/material";
import * as Yup from "yup";
import SeoComponent from "../../components/SeoComponent";
import MainHeaderComponent from "../../components/MainHeaderComponent";
import { Form, Formik } from "formik";
import { cardStyle } from "../../assets/style";
import ImageUploadComponent from "../../components/ImageUploadComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { useAddNewDeviceTypeMutation } from "../../redux/feature/device/deviceTypeApiSlice";
import SelectSingleComponent from "../../components/SelectSingleComponent";
import { CONTROLLABLE } from "../../config/controllable";

function AddNewDevice() {
  const [profileImageFile, setProfileImageFile] = useState(null);
  const { t } = useTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadImage] = useUploadImageMutation();

  const [
    addNewDeviceType,
    {
      isSuccess,
      isLoading: isLoadingAddNewDeviceType,
      isError: isErrorAddNewDeviceType,
      error: errorAddNewDeviceType,
    },
  ] = useAddNewDeviceTypeMutation();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Building name is required")
      .min(2, "Building name must be at least 2 characters"),
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

      await addNewDeviceType({
        name: values.name,
        image: profileImageUri,
        description: values.description,
        controllable: values.controllable === 2 ? true : false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash/devices");
      dispatch(setIsOpenSnackBar(true));
      dispatch(setCaptionSnackBar(t("createSuccess")));
      setTimeout(() => {
        dispatch(setIsOpenSnackBar(false));
      }, 3000);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isErrorAddNewDeviceType) {
      dispatch(setIsOpenSnackBar(true));
      dispatch(setErrorSnackbar(true));
      dispatch(
        setCaptionSnackBar(`${errorAddNewDeviceType?.data?.error?.description}`)
      );
      setTimeout(() => {
        dispatch(setIsOpenSnackBar(false));
      }, 3000);

      setTimeout(() => {
        dispatch(setErrorSnackbar(false));
      }, 3500);
    }
  }, [isErrorAddNewDeviceType, dispatch]);

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
      {t("newDevice")}
    </Typography>,
  ];

  let content;
  content = (
    <>
      <SeoComponent title={"Create a new device"} />
      <MainHeaderComponent
        breadcrumbs={breadcrumbs}
        title={t("createANewDevice")}
        handleBackClick={() => navigate("/dash/devices")}
      />

      <div>
        <Formik
          initialValues={{ name: "", description: "", controllable: "" }}
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
             const handleControllableChange = (value) => {
               setFieldValue("controllable", value);
             };
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
                        profileImageFile={profileImageFile}
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
                          // selectFistValue={values.genderId}
                        />
                      </div>
                      <div className="col-span-2 flex justify-end mt-[20px]">
                        <ButtonComponent
                          btnTitle={t("createDevice")}
                          type={"submit"}
                          isLoading={isLoadingAddNewDeviceType}
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

  return content;
}

export default AddNewDevice;
