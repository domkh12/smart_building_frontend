import {useUploadImageMutation} from "../redux/feature/uploadImage/uploadImageApiSlice.js";
import {useFindAllGenderQuery} from "../redux/feature/users/userApiSlice.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import dayjs from "dayjs";
import {Card, FormControl, FormHelperText, Grid2, TextField} from "@mui/material";
import SelectSingleComponent from "./SelectSingleComponent.jsx";
import {cardStyle} from "../assets/style.js";
import ProfileUploadComponent from "./ProfileUploadComponent.jsx";
import {Form, Formik} from "formik";
import useTranslate from "../hook/useTranslate.jsx";
import LoadingFetchingDataComponent from "./LoadingFetchingDataComponent.jsx";
import {DatePicker} from "@mui/x-date-pickers";
import ButtonComponent from "./ButtonComponent.jsx";
import {useGetUserProfileQuery, useUpdateUserProfileMutation} from "../redux/feature/auth/authApiSlice.js";
import {useDispatch} from "react-redux";
import {Slide, toast} from "react-toastify";

function GeneralProfileComponent() {
    const [profileImageFile, setProfileImageFile] = useState(null);
    const {t} = useTranslate();
    const [uploadImage, {isLoading : isLoadingUpdateProfile}] = useUploadImageMutation();
    const {data: gender, isLoading : isLoadingGender, isSuccess : isSuccessGender} = useFindAllGenderQuery("genderList");
    const [updateUser, {isSuccess}] = useUpdateUserProfileMutation();
    const {data: user, isSuccess : isSuccessProfile, isLoading : isLoadingProfile} = useGetUserProfileQuery("profileList");

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

    const handleSubmit = async (values, {setSubmitting}) => {
        try {
            const formData = new FormData();
            let profileImageUri = null;
            if (profileImageFile) {
                formData.append("file", profileImageFile);
                const uploadResponse = await uploadImage(formData).unwrap();
                profileImageUri = uploadResponse.uri;
            }

            const formattedDateOfBirth = dayjs(values.dateOfBirth).format(
                "YYYY-MM-DD"
            );
            await updateUser({
                dateOfBirth: formattedDateOfBirth,
                fullName: values.fullName,
                genderId: values.genderId,
                address: values.address,
                phoneNumber: values.phoneNumber,
                profileImage: profileImageUri || user.profileImage,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(t("createSuccess"), {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition:Slide
            });
        }
    }, [isSuccess]);

    let content;

    if (isLoadingGender || isLoadingProfile) content = <LoadingFetchingDataComponent />

    if (isSuccessGender && isSuccessProfile) {
        content = (
            <>
                <Formik
                    initialValues={{
                        fullName: user?.fullName,
                        genderId: user?.gender?.id,
                        email: user?.email,
                        address: user?.address || "",
                        phoneNumber: user?.phoneNumber,
                        profileImage: user?.profileImage,
                        dateOfBirth: dayjs(user?.dateOfBirth),
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
                                                    profileImageFile={profileImageFile || ""}
                                                    profileUrl={values?.profileImage || ""}
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
                                                    isLoading={isLoadingUpdateProfile}
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
        )
    }
    return content;
}

export default GeneralProfileComponent;