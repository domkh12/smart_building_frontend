import { useEffect, useState } from "react";
import useTranslate from "../../hook/useTranslate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useUploadImageMutation } from "../../redux/feature/uploadImage/uploadImageApiSlice";
import { useUpdateBuildingMutation } from "../../redux/feature/building/buildingApiSlice";
import * as Yup from "yup";
import {
  setCaptionSnackBar,
  setErrorSnackbar,
  setIsOpenSnackBar,
} from "../../redux/feature/actions/actionSlice";
import {Card, Grid2, Paper, TextField, Typography} from "@mui/material";
import SeoComponent from "../../components/SeoComponent";
import MainHeaderComponent from "../../components/MainHeaderComponent";
import { Form, Formik } from "formik";
import { cardStyle } from "../../assets/style";
import ImageUploadComponent from "../../components/ImageUploadComponent";
import ButtonComponent from "../../components/ButtonComponent";
import {Slide, toast} from "react-toastify";

function EditBuildingForm({ building }) {
  const [profileImageFile, setProfileImageFile] = useState(null);
  const { t } = useTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadImage] = useUploadImageMutation();

  const [
    updateBuilding,
    {
      isSuccess: isSuccessUpdateBuilding,
      isLoading: isLoadingUpdateBuilding,
      isError: isErrorUpdateBuilding,
      error: errorUpdateBuilding,
    },
  ] = useUpdateBuildingMutation();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Building name is required")
      .min(2, "Building name must be at least 2 characters"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      let profileImageUri = null;
      if (profileImageFile) {
        formData.append("file", profileImageFile);
        const uploadResponse = await uploadImage(formData).unwrap();
        profileImageUri = uploadResponse.uri;
      }

      await updateBuilding({
        id: building.id,
        name: values.name,
        image: profileImageUri ? profileImageUri : building.image,
      });
    } catch (err) {
      console.log(err);
    }finally {
      setSubmitting(false)
    }
  };

  useEffect(() => {
    if (isSuccessUpdateBuilding) {
      navigate("/dash/buildings");
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
  }, [isSuccessUpdateBuilding]);

  useEffect(() => {
    if (isErrorUpdateBuilding) {
      toast.error(`${errorUpdateBuilding?.data?.error?.description}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        transition: Slide,
      });
    }
  }, [isErrorUpdateBuilding]);

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
      {t("building")}
    </Typography>,
    <Typography color="inherit" key={3}>
      {building.name}
    </Typography>,
  ];

  let content;

  content = (
    <>
      <SeoComponent title={"Create a new building"} />
      <MainHeaderComponent
        breadcrumbs={breadcrumbs}
        title={t("edit")}
        handleBackClick={() => navigate("/dash/buildings")}
      />

      <div>
        <Formik
          initialValues={{ name: building.name, image: building.image }}
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
                      <TextField
                        label={t("nameBuilding")}
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

                      <div className="col-span-2 flex justify-end mt-[20px]">
                        <ButtonComponent
                          btnTitle={t("saveChanges")}
                          type={"submit"}
                          isLoading={isLoadingUpdateBuilding}
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

export default EditBuildingForm;
