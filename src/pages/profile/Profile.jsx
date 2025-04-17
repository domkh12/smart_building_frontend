import {
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SeoComponent from "../../components/SeoComponent";
import useTranslate from "../../hook/useTranslate";
import MainHeaderComponent from "../../components/MainHeaderComponent";
import ProfileUploadComponent from "../../components/ProfileUploadComponent";
import { cardStyle } from "../../assets/style";
import * as Yup from "yup";
import SelectSingleComponent from "../../components/SelectSingleComponent";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent";
import ButtonComponent from "../../components/ButtonComponent";
import {
    useFindAllGenderQuery,
    useUpdateUserMutation
} from "../../redux/feature/users/userApiSlice.js";
import {useUploadImageMutation} from "../../redux/feature/uploadImage/uploadImageApiSlice.js";

export default function Profile() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const [profileImageFile, setProfileImageFile] = useState(null);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const [uploadImage] = useUploadImageMutation();
  const {data: gender} = useFindAllGenderQuery("genderList");
    console.log(gender)
  const [updateUser] = useUpdateUserMutation();
  const breadcrumbs = [
    <button
      className="text-black hover:underline"
      onClick={() => navigate("/dash")}
      key={1}
    >
      {t("dashboard")}
    </button>,
    <Typography color="inherit" key={3}>
      {t("account")}
    </Typography>,
  ];

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .matches(
        /^[\u1780-\u17FF\sA-Za-z]+$/,
        "Full name must contain only Khmer and English letters and spaces"
      )
      .required("Full name is required"),
    dateOfBirth: Yup.date()
      .required("Date of birth is required")
      .test(
        "is-valid-age",
        "Must be between 10 and 120 years old",
        function (value) {
          if (!value) {
            return false;
          }
          const today = dayjs();
          const birthDate = dayjs(value);
          const age = today.diff(birthDate, "year");
          return age >= 10 && age <= 120;
        }
      ),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\+?\d+$/, "Phone number must be numbers with an optional '+'")
      .test("len", "Must be between 7 and 15 digits", (val) => {
        if (val) {
          const digitsOnly = val.replace(/\D/g, "");
          return digitsOnly.length >= 7 && digitsOnly.length <= 15;
        }
        return true;
      })
      .required("Phone number is required"),
    genderId: Yup.string().required("Gender is required"),
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

      await updateUser({
        id: userProfile.id,
        dateOfBirth: values.dateOfBirth,
        fullName: values.fullName,
        genderId: values.genderId,
        address: values.address,
        email: values.email,
        phoneNumber: values.phoneNumber,
        roleId: values.roleId,
        profileImage: profileImageUri,
        isVerified: values.isVerified,
        isDeleted: values.isDeleted,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  let content;
  if (!gender) content = <LoadingFetchingDataComponent />;

  if (gender)
    content = (
      <>
        <SeoComponent title={"Account"} />
        <MainHeaderComponent breadcrumbs={breadcrumbs} title={t("account")} handleBackClick={() => navigate("/dash")}/>

        <Formik
          initialValues={{
            fullName: userProfile?.fullName,
            genderId: userProfile?.gender?.id,
            email: userProfile?.email,
            address: userProfile?.address || "",
            phoneNumber: userProfile?.phoneNumber,
            profileImage: userProfile?.profileImage,
            dateOfBirth: dayjs(userProfile?.dateOfBirth),
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
            const errorDateOfBirth = errors.dateOfBirth && touched.dateOfBirth;

            const handleGenderChange = (value) => {
              setFieldValue("genderId", value);
            };

            const handleIsVerifiedChange = (event) => {
              setFieldValue("isVerified", event.target.checked);
            };

            return (
              <Form className="pb-8">
                <Grid2 container spacing={3}>
                  <Grid2 size={{ xs: 12, md: 4 }}>
                    <Card
                      sx={{
                        ...cardStyle,
                      }}
                      className=" gap-5 pt-[80px] px-[24px] pb-[40px] "
                    >
                      <div className="flex justify-center items-center flex-col gap-5">
                        <ProfileUploadComponent
                          setProfileImageFile={setProfileImageFile}
                          profileImageFile={profileImageFile}
                        />
                      </div>
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
                          label={t("fullName")}
                          variant="outlined"
                          sx={{
                            "& .MuiInputBase-input": {
                              boxShadow: "none",
                            },
                            borderRadius: "6px",
                          }}
                          type="text"
                          id="fullName"
                          name="fullName"
                          fullWidth
                          value={values.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                          error={errors.fullName && touched.fullName}
                          helperText={
                            errors.fullName && touched.fullName
                              ? errors.fullName
                              : null
                          }
                          size="medium"
                        />

                        <SelectSingleComponent
                          label={t("gender")}
                          options={gender}
                          onChange={handleGenderChange}
                          fullWidth={true}
                          error={errors.genderId}
                          touched={touched.genderId}
                          optionLabelKey="gender"
                          selectFistValue={values.genderId}
                        />

                        <TextField
                          label={`${t("address")} (${t("optional")})`}
                          variant="outlined"
                          sx={{
                            "& .MuiInputBase-input": {
                              boxShadow: "none",
                            },
                            borderRadius: "6px",
                          }}
                          type="text"
                          id="address"
                          name="address"
                          fullWidth
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                          error={errors.address && touched.address}
                          helperText={
                            errors.address && touched.address
                              ? errors.address
                              : null
                          }
                          size="medium"
                        />

                        <TextField
                          label={t("phoneNumber")}
                          variant="outlined"
                          sx={{
                            "& .MuiInputBase-input": {
                              boxShadow: "none",
                            },
                            borderRadius: "6px",
                          }}
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          fullWidth
                          value={values.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                          error={errors.phoneNumber && touched.phoneNumber}
                          helperText={
                            errors.phoneNumber && touched.phoneNumber
                              ? errors.phoneNumber
                              : null
                          }
                          size="medium"
                        />

                        <FormControl
                          sx={{ width: "100%" }}
                          variant="outlined"
                          size="medium"
                          error={errors.dateOfBirth && touched.dateOfBirth}
                        >
                          <DatePicker
                            sx={{
                              "& .MuiInputBase-input": {
                                boxShadow: "none",
                              },
                              ...(errorDateOfBirth && {
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#f44336",
                                  color: "white",
                                },
                              }),
                              "& .MuiInputLabel-root ": {
                                ...(errorDateOfBirth && { color: "#f44336" }),
                              },
                            }}
                            label={t("dateOfBirth")}
                            value={values.dateOfBirth}
                            id="dateOfBirth"
                            name="dateOfBirth"
                            onChange={(value) => {
                              setFieldValue("dateOfBirth", value);
                            }}
                            format="DD-MM-YYYY"
                          />
                          <FormHelperText>
                            {errors.dateOfBirth && touched.dateOfBirth
                              ? errors.dateOfBirth
                              : null}
                          </FormHelperText>
                        </FormControl>
                      </div>
                      <div className="col-span-2 flex justify-end mt-[20px]">
                        <ButtonComponent
                          btnTitle={t("saveChanges")}
                          type="submit"
                          // isLoading={isLoadingUpdateUser}
                        />
                      </div>
                    </Card>
                  </Grid2>
                </Grid2>
              </Form>
            );
          }}
        </Formik>
      </>
    );

  return content;
  // const navigator = useNavigate();
  // const bannerInputRef = useRef(null);
  // const profileInputRef = useRef(null);
  // const user = useSelector((state) => state.users.user);
  // const isLoading = useSelector((state) => state.users.isLoadingUser);
  // const [activeTab, setActiveTab] = useState("details");
  // const [value, setValue] = useState(0);

  // const [uploadImage, { isLoading: isLoadingUploadImage }] =
  //   useUploadImageMutation();

  // const [
  //   updateUser,
  //   { isSuccess: isUpdateSuccess, isLoading: isUpdateLoading },
  // ] = useUpdateUserMutation();

  // const handleBtnBannerClick = () => {
  //   bannerInputRef.current.click();
  // };

  // const handleBtnProfileClick = () => {
  //   profileInputRef.current.click();
  // };

  // const validateImage = (file) => {
  //   const validExtensions = ['image/jpeg', 'image/png', 'image/gif'];
  //   const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB

  //   if (!validExtensions.includes(file.type)) {
  //     toast.error('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
  //     return false;
  //   }

  //   if (file.size > maxSizeInBytes) {
  //     toast.error('File size exceeds 2 MB.');
  //     return false;
  //   }

  //   return true;
  // };

  // const handleProfileImageChange = async (event) => {
  //   const file = event.target.files[0];
  //   if (file && validateImage(file)) {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     const response = await uploadImage(formData);
  //     await updateUser({
  //       id: user.uuid,
  //       profileImage: response.data.uri,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   navigator(activeTab);
  // }, [activeTab]);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  //   const tabMapping = ["details"];
  //   setActiveTab(tabMapping[newValue]);
  // };

  // const handleBannerImageChange = async (event) => {
  //   const file = event.target.files[0];
  //   if (file && validateImage(file)) {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     const response = await uploadImage(formData);
  //     await updateUser({
  //       id: user.uuid,
  //       bannerImage: response.data.uri,
  //     });
  //   }
  // };

  // let content;

  // if (isLoading || !user) {
  //   content = <p>Loading...</p>;
  // }

  // content = (
  //   <Box>
  //     <div className="relative">
  //       <div className="relative w-full group bg-black h-56 rounded-b-3xl flex justify-center items-center overflow-hidden">
  //         <img
  //           src={user.bannerImage || "/images/bannerPlaceHolder.svg"}
  //           alt="banner"
  //           className="w-auto h-auto object-cover"
  //         />
  //         <Button
  //           variant="contained"
  //           disableRipple
  //           onClick={handleBtnBannerClick}
  //           sx={{
  //             px: "1.5rem",
  //             display: "none",
  //             textTransform: "none",
  //             position: "absolute",
  //             bottom: "1rem",
  //             right: "1rem",
  //             zIndex: 1,
  //             borderRadius: "24px",
  //             backgroundColor: "gray",
  //             boxShadow: "none",
  //             "&:hover": {
  //               boxShadow: "none",
  //             },
  //           }}
  //           className="group-hover:flex"
  //           startIcon={<PiCameraThin className="w-7 h-7" />}
  //         >
  //           Edit
  //         </Button>
  //         <input
  //           type="file"
  //           ref={bannerInputRef}
  //           style={{ display: "none" }}
  //           onChange={handleBannerImageChange}
  //         />
  //       </div>
  //       <div className="absolute group overflow-hidden flex justify-center items-center -bottom-14 left-10 h-40 w-40 rounded-full bg-black outline outline-gray-50">
  //         <img
  //           src={user.profileImage || "/images/profile_placeholder.svg"}
  //           alt="profile"
  //           className="object-cover"
  //         />

  //         <IconButton
  //           variant="contained"
  //           disableRipple
  //           onClick={handleBtnProfileClick}
  //           sx={{
  //             width: "100%",
  //             height: "100%",
  //             display: "none",
  //             textTransform: "none",
  //             position: "absolute",
  //             top: "0",
  //             left: "0",
  //             zIndex: 1,
  //             borderRadius: "24px",
  //             backgroundColor: "rgba(128, 128, 128, 0.5)",
  //             boxShadow: "none",
  //             "&:hover": {
  //               boxShadow: "none",
  //             },
  //           }}
  //           className="group-hover:flex"
  //         >
  //           <PiCameraThin className="w-7 h-7 text-gray-50" />
  //         </IconButton>
  //         <input
  //           type="file"
  //           ref={profileInputRef}
  //           style={{ display: "none" }}
  //           onChange={handleProfileImageChange}
  //         />
  //       </div>
  //     </div>

  //     <Box sx={{ mt: 10, ml: 5 }}>
  //       <Typography
  //         variant="h4"
  //         gutterBottom
  //         sx={{
  //           display: "flex",
  //           justifyContent: "space-start",
  //           alignItems: "center",
  //           gap: "1rem",
  //         }}
  //       >
  //         {user.fullName || "Unknown"}
  //         <Chip
  //           color="success"
  //           sx={{
  //             px: 1,
  //           }}
  //           label={
  //             user.roleNames &&
  //             user.roleNames.some((role) => role.toLowerCase() === "admin")
  //               ? "ADMIN"
  //               : "Unknown"
  //           }
  //           variant="outlined"
  //         />
  //       </Typography>
  //       <Typography
  //         variant="body1"
  //         gutterBottom
  //         sx={{
  //           display: "flex",
  //           alignItems: "center",
  //           gap: "0.5rem",
  //           color: "#6b7280",
  //         }}
  //       >
  //         <PiEnvelopeSimpleThin className="h-7 w-7" />
  //         {user.email || "Unknown"}
  //       </Typography>
  //     </Box>

  //     <Box sx={{ width: "100%" }}>
  //       <Box
  //         sx={{ borderBottom: 1, borderColor: "divider", paddingX: "2.5rem" }}
  //       >
  //         <Tabs
  //           value={value}
  //           onChange={handleChange}
  //           aria-label="tabs"
  //           TabIndicatorProps={{
  //             sx: {
  //               display: "flex",
  //               justifyContent: "center",
  //               width: "100%",
  //               backgroundColor: "#111827",
  //               padding: "0px",
  //             },
  //           }}
  //         >
  //           <Tab
  //             label="Details"
  //             sx={{
  //               textTransform: "none",
  //               color: "#4b5563",
  //               "&.Mui-selected": {
  //                 color: "#111827",
  //               },
  //               padding: "0px",
  //               minWidth: 0,
  //               marginRight: "2rem",
  //             }}
  //             disableRipple
  //           />
  //         </Tabs>
  //       </Box>
  //     </Box>

  //     <Box sx={{ mt: 8, ml: 5 }}>
  //       <Outlet />
  //     </Box>
  //   </Box>
}
