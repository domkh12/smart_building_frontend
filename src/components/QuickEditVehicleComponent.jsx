import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import LoadingFetchingDataComponent from "./LoadingFetchingDataComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllLicensePlateProvincesMutation,
  useGetAllLicensePlateTypesMutation,
  useGetAllVehicleTypesMutation,
  useUpdateVehicleMutation,
} from "../redux/feature/vehicles/vehicleApiSlice";
import { useGetAllFullNameUsersMutation } from "../redux/feature/users/userApiSlice";
import * as Yup from "yup";
import useAuth from "../hook/useAuth";
import useTranslate from "../hook/useTranslate";
import SelectSingleComponent from "./SelectSingleComponent";
import ColorPickerComponent from "./ColorPickerComponent";
import { buttonStyleContained, buttonStyleOutlined } from "../assets/style";
import { setIsOpenQuickEditVehicle } from "../redux/feature/vehicles/vehicleSlice";

function QuickEditVehicleComponent() {
  const open = useSelector((state) => state.vehicles.isOpenQuickEditVehicle);
  const handleClose = () => dispatch(setIsOpenQuickEditVehicle(false));
  const vehicle = useSelector((state) => state.vehicles.vehicleForQuickEdit);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAdmin, isManager } = useAuth();
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
  const { t } = useTranslate();

  const validationSchema = Yup.object().shape({
    // plateNumber: Yup.string()
    //   .min(2, "Plate Number must be at least 2 characters")
    //   .max(20, "Plate Number cannot exceed 20 characters")
    //   .required("License Plate Number is required"),
    // type: Yup.string().required("Vehicle Type is required"),
    // owner: Yup.string().required("Owner is required"),
  });

  const [
    updateVehicle,
    {
      isSuccess: isSuccessUpdateVehicle,
      isLoading: isLoadingUpdateVehicle,
      isError: isErrorUpdateVehicle,
      error: errorUpdateVehicle,
    },
  ] = useUpdateVehicleMutation();

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

  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  };

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

  useEffect(() => {
    if (isSuccessUpdateVehicle) {
      handleClose();
    }
  }, [isSuccessUpdateVehicle]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateVehicle({
        uuid: vehicle.uuid,
        numberPlate: values.plateNumber,
        vehicleMake: values.make,
        vehicleModel: values.model,
        color: values.color,
        userId: values.userId,
        vehicleTypeId: values.vehicleTypeId,
        licensePlateTypeId: values.licensePlateTypeId,
        licensePlateProvinceId: values.lppId,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  let content;

  if (isLoading) content = <LoadingFetchingDataComponent />;

  if (error) {
    content = "Error";
  }
  if (
    !isLoading &&
    !error
    // (isManager
    //   ? isFindAllGenderSuccess &&
    //     isGetAllRolesSuccess &&
    //     isGetAllCompaniesSuccess
    //   : isFindAllGenderSuccess)
  )
    content = (
      <Box>
        <Formik
          initialValues={{
            plateNumber: vehicle.numberPlate,
            color: vehicle.color,
            make: vehicle.vehicleMake,
            model: vehicle.vehicleModel,
            vehicleTypeId: vehicle?.vehicleType?.uuid,
            userId: vehicle?.user?.uuid,
            lppId: vehicle?.licensePlateProvince?.uuid,
            licensePlateTypeId: vehicle?.licensePlateType?.uuid,
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
            const handleColorChange = (value) => {
              setFieldValue("color", value);
            };

            const handleDriverChange = (value) => {
              setFieldValue("userId", value);
            };

            const handlelicensePlateProvincesChange = (value) => {
              setFieldValue("lppId", value);
            };

            const handleVehicleTypeChange = (value) => {
              setFieldValue("vehicleTypeId", value);
            };

            const handleLicesePlateTypesChange = (value) => {
              setFieldValue("licensePlateTypeId", value);
            };

            const errorDateOfBirth = errors.dateOfBirth && touched.dateOfBirth;
            return (
              <Form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-[24px]">
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
                    fullWidth={true}
                    optionLabelKey="provinceNameEn"
                    selectFistValue={values.lppId}
                  />

                  <SelectSingleComponent
                    label={t("licensePlateType")}
                    options={licensePlateTypesFetched.data}
                    onChange={handleLicesePlateTypesChange}
                    fullWidth={true}
                    optionLabelKey="name"
                    selectFistValue={values.licensePlateTypeId}
                  />

                  <SelectSingleComponent
                    label={t("vehicleType")}
                    options={vehicleTypeFetched.data}
                    onChange={handleVehicleTypeChange}
                    fullWidth={true}
                    optionLabelKey="name"
                    selectFistValue={values.vehicleTypeId}
                  />

                  <SelectSingleComponent
                    label={t("driver")}
                    options={allFullNameUsersFetched.data}
                    onChange={handleDriverChange}
                    fullWidth={true}
                    optionLabelKey="fullName"
                    selectFistValue={values.userId}
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

                <Box
                  sx={{
                    padding: "24px",
                    display: "flex",
                    justifyContent: "end",
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
                  <Button
                    variant="contained"
                    sx={{ ...buttonStyleContained, ml: 1 }}
                    type="submit"
                  >
                    Update
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
    );

  return (
    <Modal
      open={open}
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
            sx={{ padding: "24px" }}
          >
            Quick update
          </Typography>
          {/* {isErrorUpdateUser && (
            <Box sx={{ px: "24px" }}>
              <AlertMessageComponent />
            </Box>
          )} */}

          {content}
        </Box>
      </Box>
    </Modal>
  );
}

export default QuickEditVehicleComponent;
