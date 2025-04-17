import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllFullNameUsersMutation,
} from "../../redux/feature/users/userApiSlice";
import { useEffect, useState } from "react";
import {
  useAddNewVehicleMutation,
  useGetAllLicensePlateProvincesMutation,
  useGetAllLicensePlateTypesMutation,
  useGetAllVehicleTypesMutation,
} from "../../redux/feature/vehicles/vehicleApiSlice";
import { useUploadImageMutation } from "../../redux/feature/uploadImage/uploadImageApiSlice";
import SeoComponent from "../../components/SeoComponent";
import { Card, Grid2, TextField, Typography } from "@mui/material";
import useTranslate from "../../hook/useTranslate";
import { cardStyle } from "../../assets/style";
import SelectSingleComponent from "../../components/SelectSingleComponent";
import useAuth from "../../hook/useAuth";
import MainHeaderComponent from "./../../components/MainHeaderComponent";
import ColorPickerComponent from "../../components/ColorPickerComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { setCaptionSnackBar, setIsOpenSnackBar } from "../../redux/feature/actions/actionSlice";
import ImageUploadComponent from "../../components/ImageUploadComponent";

function AddNewVehicle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslate();
  const [isLoading, setIsLoading] = useState(true);
  const [profileImageFile, setProfileImageFile] = useState(null);  
  const { isManager, isAdmin } = useAuth();
  const licensePlateProvincesFetched = useSelector(
    (state) => state.vehicles.licensePlateProvincesFetched
  );
  const vehicleTypeFetched = useSelector(
    (state) => state.vehicles.vehicleTypeFetched
  );
  const licensePlateTypesFetched = useSelector(
    (state) => state.vehicles.licensePlateTypesFetched
  );
  const allFullNameUsersFetched = useSelector(
    (state) => state.users.allFullNameUsersFetched
  );

  const [addNewVehicle, { isSuccess: isSuccessAddNewVehicle, isLoading:isLoadingAddNewVehicle, isError, error }] =
    useAddNewVehicleMutation();

  const [
    getAllVehicleTypes,
    {
      isSuccess: isSuccessGetAllVehicleType,
      isLoading: isLoadingGetAllVehicleType,
      isError: isErrorGetAllVehicleType,
      error: errorGetAllVehicleType,
    },
  ] = useGetAllVehicleTypesMutation();

  const [
    getAllFullNameUsers,
    {
      isSuccess: isSuccessGetAllFullNameUsers,
      isLoading: isLoadingGetAllFullNameUsers,
      isError: isErrorGetAllFullNameUsers,
      error: errorGetAllFullNameUsers,
    },
  ] = useGetAllFullNameUsersMutation();

  const [
    getAllLicensePlateProvinces,
    {
      isSuccess: isSuccessGetAllLicensePlateProvinces,
      isLoading: isLoadingGetAllLicensePlateProvinces,
      isError: isErrorGetAllLicensePlateProvinces,
      error: errorGetAllLicensePlateProvinces,
    },
  ] = useGetAllLicensePlateProvincesMutation();

  const [
    getAllLicensePlateTypes,
    {
      isSuccess: isSuccessGetAllLicensePlateTypes,
      isLoading: isLoadingGetAllLicensePlateTypes,
      isError: isErrorGetAllLicensePlateTypes,
      error: errorGetAllLicensePlateTypes,
    },
  ] = useGetAllLicensePlateTypesMutation();


  const [uploadImage] = useUploadImageMutation();

  const validationSchema = Yup.object().shape({
    // plateNameKh: Yup.string()
    //   .matches(/^[\u1780-\u17FF\s]+$/, "Only Khmer characters are allowed")
    //   .required("License Plate Kh Name is required"),
    // plateNameEng: Yup.string()
    //   .matches(/^[A-Za-z\s]+$/, "Only English characters are allowed")
    //   .required("License Plate Eng Name is required"),
    // plateNumber: Yup.string()
    //   .matches(
    //     /^[A-Za-z0-9-]+$/,
    //     "Only letters, numbers, and hyphens are allowed"
    //   )
    //   .min(2, "Plate Number must be at least 2 characters")
    //   .max(20, "Plate Number cannot exceed 20 characters")
    //   .required("License Plate Number is required"),
    // type: Yup.string().required("Vehicle Type is required"),
    // userId: Yup.string().required("Owner is required"),
  });

  useEffect(()=>{
   
       if (isSuccessAddNewVehicle) {
         navigate("/dash/vehicles");
         dispatch(setIsOpenSnackBar(true));
         dispatch(setCaptionSnackBar(t("createSuccess")));
         setTimeout(() => {
           dispatch(setIsOpenSnackBar(false));
         }, 3000);
       }
    
  }, [isSuccessAddNewVehicle])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const promises = [];
        if (isAdmin || isManager) {
          promises.push(getAllLicensePlateProvinces());
          promises.push(getAllVehicleTypes());
          promises.push(getAllLicensePlateTypes());
          promises.push(getAllFullNameUsers());
        }

        await Promise.all(promises);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      let profileImageUri = null;
      if (profileImageFile) {
        formData.append("file", profileImageFile);
        const uploadResponse = await uploadImage(formData).unwrap();
        profileImageUri = uploadResponse.uri;
      }

      await addNewVehicle({
        numberPlate: values.plateNumber,
        vehicleMake: values.make,
        vehicleModel: values.model,
        color: values.color,
        userId: values.userId,
        vehicleTypeId: values.vehicleTypeId,
        image: profileImageUri,
        licensePlateTypeId: values.licensePlateTypeId,
        licensePlateProvinceId: values.lppId
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
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
      {t("vehicle")}
    </Typography>,
    <Typography color="inherit" key={3}>
      {t("newVehicle")}
    </Typography>,
  ];

  let content;

  content = (
    <div>
      <SeoComponent title={"Create a new user"} />
      <MainHeaderComponent
        breadcrumbs={breadcrumbs}
        title={t("createNewVehicle")}
      />
      <div>
        <Formik
          initialValues={{
            plateNumber: "",
            color: "",
            make: "",
            model: "",
            vehicleTypeId: "",
            userId: "",
            lppId: "",
            licensePlateTypeId: "",
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

            const handleDriverChange = (value) => {
              setFieldValue("userId", value);
            }

            const handlelicensePlateProvincesChange = (value) => {
              setFieldValue("lppId", value);
            };

            const handleVehicleTypeChange = (value) => {
              setFieldValue("vehicleTypeId", value);
            };

            const handleLicesePlateTypesChange = (value) => {
              setFieldValue("licensePlateTypeId", value);
            };

            const selectedProvince = licensePlateProvincesFetched?.data?.find(
              (lpp) => lpp?.uuid === values?.lppId
            );

            const plateNumberShow = values.plateNumber
              ? values.plateNumber
              : "XXXXXX";

            const provinceNameEn = selectedProvince
              ? selectedProvince?.provinceNameEn
              : "Not Selected";

            const provinceNameKh = selectedProvince
              ? selectedProvince?.provinceNameKh
              : "Not Selected";

            return (
              <Form className="pb-8">
                <Grid2 container spacing={3}>
                  <Grid2 size={{ xs: 12, md: 4 }}>
                    <Card
                      sx={{
                        ...cardStyle,
                      }}
                      className=" gap-5 pt-[40px] px-[24px] pb-[40px] "
                    >
                      <div className="w-auto rounded-[12px] mb-[16px] border-blue-600 border-[3px] px-[24px] py-2 flex items-center justify-between">
                        <div className="flex flex-col">
                          <Typography variant="h6" className="text-blue-600">
                            {provinceNameEn}
                          </Typography>
                          <Typography variant="h6" className="text-red-600">
                            {provinceNameKh}
                          </Typography>
                        </div>
                        <Typography
                          variant="h4"
                          className="underline text-blue-600 uppercase"
                        >
                          {plateNumberShow}
                        </Typography>
                      </div>

                      <ImageUploadComponent
                        setProfileImageFile={setProfileImageFile}
                        profileImageFile={profileImageFile}
                      />

                    </Card>
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 8 }}>
                    <Card
                      sx={{
                        ...cardStyle,
                        padding: "24px",
                      }}
                      className="flex-auto w-full"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <TextField
                          label={t("plateNumber")}
                          variant="outlined"
                          sx={{
                            "& .MuiInputBase-input": {
                              boxShadow: "none",
                            },
                            borderRadius: "6px",
                          }}
                          type="text"
                          id="plateNumber"
                          name="plateNumber"
                          fullWidth
                          value={values.plateNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                          error={errors.plateNumber && touched.plateNumber}
                          helperText={
                            errors.plateNumber && touched.plateNumber
                              ? errors.plateNumber
                              : null
                          }
                          size="medium"
                        />

                        <SelectSingleComponent
                          label={`${t("province")}`}
                          options={licensePlateProvincesFetched.data}
                          onChange={handlelicensePlateProvincesChange}
                          fullWidth={true}
                          optionLabelKey="provinceNameEn"
                        />

                        <SelectSingleComponent
                          label={t("licensePlateType")}
                          options={licensePlateTypesFetched.data}
                          onChange={handleLicesePlateTypesChange}
                          fullWidth={true}
                          optionLabelKey="name"
                        />

                        <SelectSingleComponent
                          label={t("vehicleType")}
                          options={vehicleTypeFetched.data}
                          onChange={handleVehicleTypeChange}
                          fullWidth={true}
                          optionLabelKey="name"
                        />

                        <SelectSingleComponent
                          label={t("driver")}
                          options={allFullNameUsersFetched.data}
                          onChange={handleDriverChange}
                          fullWidth={true}
                          optionLabelKey="fullName"
                        />

                        <TextField
                          label={t("vehicleMake")}
                          variant="outlined"
                          sx={{
                            "& .MuiInputBase-input": {
                              boxShadow: "none",
                            },
                            borderRadius: "6px",
                          }}
                          type="text"
                          id="make"
                          name="make"
                          fullWidth
                          value={values.make}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                          error={errors.make && touched.make}
                          helperText={
                            errors.make && touched.make ? errors.make : null
                          }
                          size="medium"
                        />

                        <TextField
                          label={t("vehicleModel")}
                          variant="outlined"
                          sx={{
                            "& .MuiInputBase-input": {
                              boxShadow: "none",
                            },
                            borderRadius: "6px",
                          }}
                          type="text"
                          id="model"
                          name="model"
                          fullWidth
                          value={values.model}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                          error={errors.model && touched.model}
                          helperText={
                            errors.model && touched.model ? errors.model : null
                          }
                          size="medium"
                        />

                        <ColorPickerComponent
                          label="Color"
                          value={values.color}
                          onChange={(color) => setFieldValue("color", color)}
                        />
                      </div>

                      <div className="col-span-2 flex justify-end mt-[20px]">
                        <ButtonComponent
                          btnTitle={t("createVehicle")}
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
    </div>
  );

  return content;
}

export default AddNewVehicle;
