import React, {useEffect, useRef, useState} from "react";
import useTranslate from "../../hook/useTranslate";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUploadImageMutation } from "../../redux/feature/uploadImage/uploadImageApiSlice";
import {
  useUpdateRoomMutation,
} from "../../redux/feature/room/roomApiSlice";
import { useGetAllNameBuildingQuery} from "../../redux/feature/building/buildingApiSlice";
import * as Yup from "yup";
import {
  Autocomplete,
  Button,
  Card,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent";
import SeoComponent from "../../components/SeoComponent";
import MainHeaderComponent from "../../components/MainHeaderComponent";
import { Form, Formik } from "formik";
import { cardStyle } from "../../assets/style";
import ImageUploadComponent from "../../components/ImageUploadComponent";
import SelectSingleComponent from "../../components/SelectSingleComponent";
import {
  appendDeviceLocalData,
  clearDeviceLocalData,
  setAddNewDeviceDialogOpen,
} from "../../redux/feature/device/deviceSlice";
import { FiPlus } from "react-icons/fi";
import ButtonComponent from "../../components/ButtonComponent";
import AddNewDeviceDialogComponent from "../../components/AddNewDeviceDialogComponent";
import { setCaptionSnackBar, setErrorSnackbar, setIsOpenSnackBar } from "../../redux/feature/actions/actionSlice";
import {useAddNewDeviceMutation} from "../../redux/feature/device/deviceApiSlice.js";

function EditRoomForm({ room }) {
  const [profileImageFile, setProfileImageFile] = useState(null);
  const { t } = useTranslate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadImage] = useUploadImageMutation();
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
    addNewDevice,{
      isSuccess: isSucessAddNewDevice,
      isLoading: isLoadingAddNewDevice,
      isError: isErrorAddNewDevice,
      error: errorAddNewDevice
    }
  ] = useAddNewDeviceMutation();

  useEffect(() => {
    if (room && !devicesLoadedRef.current) {
      dispatch(appendDeviceLocalData(room.devices));
      devicesLoadedRef.current = true;
    }
  }, [room, dispatch]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Building name is required")
      .min(2, "Building name must be at least 2 characters"),
    devices: Yup.array(),
    floorId: Yup.string().required("Floor is required"),
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

     const updatedResponse = await updateRoom({
        id: room.id,
        name: values.name,
        image: profileImageUri,
        floorId: values.floorId,
      });
      let roomId = updatedResponse.data.id;
      console.log("roomId", roomId)
      const updatedDeviceLocalData = deviceLocalData.map(device => {
        return { ...device, roomId: roomId };
      });
      await addNewDevice({
        devices : updatedDeviceLocalData,
      })
      dispatch(clearDeviceLocalData());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isSuccessUpdateRoom) {
      navigate("/dash/rooms");
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

  const breadcrumbs = [
    <button
      className="text-black hover:underline"
      onClick={() => navigate("/dash")}
      key={1}
    >
      {t("dashboard")}
    </button>,
    <Typography color="inherit" key={2}>
      {t("room")}
    </Typography>,
    <Typography color="inherit" key={3}>
      {room.name}
    </Typography>,
  ];

  let content;
  if (!building)
    content = <LoadingFetchingDataComponent />;

  if (building) {

    content = (
      <>
        <SeoComponent title={"Create a new room"} />
        <MainHeaderComponent
          breadcrumbs={breadcrumbs}
          title={t("edit")}
          handleBackClick={() => navigate("/dash/rooms")}
        />

        <div>
          <Formik
            enableReinitialize
            initialValues={{
              name: room.name,
              floorId: room.floor.id,
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
                            label={t("roomName")}
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
                        <div className="flex flex-col justify-end items-end">
                          <Button
                            onClick={() =>
                              dispatch(setAddNewDeviceDialogOpen(true))
                            }
                            startIcon={<FiPlus />}
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
                        <div className="col-span-2 flex justify-end mt-[20px]">
                          <ButtonComponent
                            btnTitle={t("saveChanges")}
                            type={"submit"}
                            isLoading={isLoadingUpdateRoom}
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
        {isAddNewDeviceDialogOpen && <AddNewDeviceDialogComponent />}
      </>
    );
  }

  return content;
}

export default EditRoomForm;
