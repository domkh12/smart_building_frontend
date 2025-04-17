import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddNewDeviceDialogOpen,
  setDeviceLocalData,
} from "../redux/feature/device/deviceSlice";
import useTranslate from "../hook/useTranslate";
import { Form, Formik } from "formik";
import SelectSingleComponent from "./SelectSingleComponent";
import ImageUploadComponent from "./ImageUploadComponent";
import { useUploadImageMutation } from "../redux/feature/uploadImage/uploadImageApiSlice";
import * as Yup from "yup";
import {useGetAllDeviceTypesQuery} from "../redux/feature/device/deviceTypeApiSlice.js";
import {buttonStyleContained, buttonStyleOutlined} from "../assets/style.js";

function AddNewDeviceDialogComponent() {
  const [profileImageFile, setProfileImageFile] = useState(null);
  const open = useSelector((state) => state.device.isAddNewDeviceDialogOpen);
  const [scroll, setScroll] = useState("paper");
  const [uploadImage] = useUploadImageMutation();
  const dispatch = useDispatch();
  const { t } = useTranslate();

  const {data: deviceType} = useGetAllDeviceTypesQuery("deviceTypeList");

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Device name is required")
      .min(2, "Building name must be at least 2 characters"),
    deviceTypeId: Yup.string().required("Device type is required"),
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
      dispatch(
        setDeviceLocalData({
          name: values.name,
          deviceTypeId: values.deviceTypeId,
          image: profileImageUri,
        })
      );
      dispatch(setAddNewDeviceDialogOpen(false));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Dialog
        open={open}
        scroll={scroll}
        fullWidth={true}
        maxWidth="sm"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{t("device")}</DialogTitle>
        <Formik
          initialValues={{ name: "", deviceTypeId: "" }}
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
                <DialogContent dividers={scroll === "paper"} >
                  <div className="flex flex-col gap-5" >
                    <TextField
                      label={t("deviceName")}
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
                    />

                    <ImageUploadComponent
                      setProfileImageFile={setProfileImageFile}
                      profileImageFile={profileImageFile}
                    />
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button
                      sx={{
                        ...buttonStyleOutlined,
                      }}
                    onClick={() => dispatch(setAddNewDeviceDialogOpen(false))}
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{...buttonStyleContained, ml: 1}}
                  >
                    {t("addDevice")}
                  </Button>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </>
  );
}

export default AddNewDeviceDialogComponent;
