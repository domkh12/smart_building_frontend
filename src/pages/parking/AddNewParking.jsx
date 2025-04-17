import {
  Autocomplete,
  Card,
  Chip,
  Grid2,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useAddNewParkingMutation } from "../../redux/feature/parking/parkingApiSlice";
import SeoComponent from "./../../components/SeoComponent";
import MainHeaderComponent from "../../components/MainHeaderComponent";
import useTranslate from "../../hook/useTranslate";
import { useNavigate } from "react-router-dom";
import { cardStyle } from "../../assets/style";
import ImageUploadComponent from "../../components/ImageUploadComponent";
import ButtonComponent from "../../components/ButtonComponent";
import {
  setCaptionSnackBar,
  setErrorSnackbar,
  setIsOpenSnackBar,
} from "../../redux/feature/actions/actionSlice";
import { useDispatch } from "react-redux";
import { useUploadImageMutation } from "../../redux/feature/uploadImage/uploadImageApiSlice";
import { useAddNewParkingLotsMutation } from "../../redux/feature/parking/parkingLotApiSlice";

export default function AddNewParking() {
  const [profileImageFile, setProfileImageFile] = useState(null);
  const { t } = useTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [
    addNewParking,
    {
      isSuccess: isAddNewParkingSuccess,
      isError: isErrorAddNewParking,
      error: errorAddNewParking,
    },
  ] = useAddNewParkingMutation();

  const [
    addNewParkingLots,
    {
      isSuccess: isAddNewParkingLotsSuccess,
      isLoading: isLoadingAddNewParkingLots,
      isError: isErrorAddNewParkingLots,
      error: errorAddNewParkingLots,
    },
  ] = useAddNewParkingLotsMutation();

  const [uploadImage] = useUploadImageMutation();

  const validationSchema = Yup.object().shape({
    // parkingName: Yup.string()
    //   .required("Parking name is required")
    //   .min(3, "Parking name must be at least 3 characters long"),
    // parkingSlotsName: Yup.array().of(
    //   Yup.object().shape({
    //     label: Yup.string().required("Slot label is required"),
    //   })
    // ),
  });

  useEffect(() => {
    if (isAddNewParkingSuccess) {
      navigate("/dash/parkings");
      dispatch(setIsOpenSnackBar(true));
      dispatch(setCaptionSnackBar(t("createSuccess")));
      setTimeout(() => {
        dispatch(setIsOpenSnackBar(false));
      }, 3000);
    }
  }, [isAddNewParkingSuccess]);

  useEffect(() => {
    if (isErrorAddNewParking) {
      dispatch(setIsOpenSnackBar(true));
      dispatch(setErrorSnackbar(true));
      dispatch(
        setCaptionSnackBar(`${errorAddNewParking?.data?.error?.description}`)
      );
      setTimeout(() => {
        dispatch(setIsOpenSnackBar(false));
      }, 3000);

      setTimeout(() => {
        dispatch(setErrorSnackbar(false));
      }, 3500);
    }
  }, [isErrorAddNewParking]);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      let profileImageUri = null;
      let parkingSpaceUuid = "";
      if (profileImageFile) {
        formData.append("file", profileImageFile);
        const uploadResponse = await uploadImage(formData).unwrap();
        profileImageUri = uploadResponse.uri;
      }
      const addNewParkingSpaceResponse = await addNewParking({
        label: values.location,
        image: profileImageUri,
      }).unwrap();

      parkingSpaceUuid = addNewParkingSpaceResponse.uuid;
      console.log("values lotname", values.lotName)
      await addNewParkingLots({
        parkingSpaceUuid: parkingSpaceUuid,
        lotName: values.lotName,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const breadcrumbs = [
    <button
      className="text-black hover:underline"
      onClick={() => navigate("/dash")}
      key={1}
    >
      {t("dashboard")}
    </button>,
    <Typography color="inherit" key={2}>
      {t("parkingSpace")}
    </Typography>,
    <Typography color="inherit" key={3}>
      {t("newParkingSpace")}
    </Typography>,
  ];

  let content;

  content = (
    <>
      <SeoComponent title={"Create a new parking space"} />
      <MainHeaderComponent
        breadcrumbs={breadcrumbs}
        title={t("createAParkingSpace")}
      />
      <div>
        <Formik
          initialValues={{ location: "", lotName: [] }}
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
                        profileImageFile={profileImageFile}
                      />
                    </Card>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 8 }}>
                    <Card sx={{ ...cardStyle, padding: "24px" }}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <TextField
                          label={t("location")}
                          variant="outlined"
                          sx={{
                            "& .MuiInputBase-input": {
                              boxShadow: "none",
                            },
                            borderRadius: "6px",
                          }}
                          type="text"
                          id="location"
                          name="location"
                          fullWidth
                          value={values.location}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                          error={errors.location && touched.location}
                          helperText={
                            errors.location && touched.location
                              ? errors.location
                              : null
                          }
                          size="medium"
                        />

                        <Autocomplete
                          sx={{
                            "& .MuiInputBase-input": {
                              boxShadow: "none",
                            },
                          }}
                          clearIcon={false}
                          options={values.lotName}
                          freeSolo
                          multiple
                          getOptionLabel={(option) => option}
                          onChange={(event, newValue) => {
                            setFieldValue("lotName", newValue);
                          }}
                          renderTags={(value, props) =>
                            value.map((option, index) => (
                              <Chip label={option} {...props({ index })} />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField label={t("addLots")} {...params} />
                          )}
                        />
                      </div>
                      <div className="col-span-2 flex justify-end mt-[20px]">
                        <ButtonComponent
                          btnTitle={t("createParkingSpace")}
                          type={"submit"}
                          loadingCaption={t("creating")}
                          // isLoading={isLoading}
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
