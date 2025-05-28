import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import useTranslate from "../../hook/useTranslate.jsx";
import useAuth from "../../hook/useAuth.jsx";
import {
    useFindAllGenderQuery,
    useGetAllRolesQuery, useUpdateUserMutation
} from "../../redux/feature/users/userApiSlice.js";
import {useUploadImageMutation} from "../../redux/feature/uploadImage/uploadImageApiSlice.js";
import * as Yup from "yup";
import dayjs from "dayjs";
import {
    Card,
    FormControl,
    FormHelperText,
    Grid2, Paper,
    styled,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import {setCaptionSnackBar, setErrorSnackbar, setIsOpenSnackBar} from "../../redux/feature/actions/actionSlice.js";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent.jsx";
import SeoComponent from "../../components/SeoComponent.jsx";
import MainHeaderComponent from "../../components/MainHeaderComponent.jsx";
import {Form, Formik} from "formik";
import {cardStyle} from "../../assets/style.js";
import ProfileUploadComponent from "../../components/ProfileUploadComponent.jsx";
import SelectSingleComponent from "../../components/SelectSingleComponent.jsx";
import {DatePicker} from "@mui/x-date-pickers";
import SelectComponent from "../../components/SelectComponent.jsx";
import ButtonComponent from "../../components/ButtonComponent.jsx";
import {useGetAllFloorNameQuery} from "../../redux/feature/floor/floorApiSlice.js";

function EditUserForm({user}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [error, setError] = useState(null);
    const {t} = useTranslate();
    const {isManager, isAdmin} = useAuth();


    const {data: floor} = useGetAllFloorNameQuery("floorNameList");
    const {data: role} = useGetAllRolesQuery("roleList");
    const {data: gender} = useFindAllGenderQuery("genderList");

    const [
        updateUser,
        {
            isSuccess: isSuccessUpdateUser,
            isLoading: isLoadingUpdateUser,
            isError: isErrorUpdateUser,
            error: errorUpdateUser,
        },
    ] = useUpdateUserMutation();


    const [uploadImage] = useUploadImageMutation();

    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .matches(
                /^[\u1780-\u17FF\sA-Za-z]+$/,
                "Full name must contain only Khmer and English letters and spaces"
            )
            .min(2, "Full name must 2 characters")
            .max(100, "Full name must 300 characters")
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

        ...(isManager
            ? {
                roleId: Yup.array()
                    .test("len", "Role must not be empty", (val) => {
                        return val ? val.length !== 0 : false;
                    })
                    .required("Role is required"),
                roomId: Yup.array()
                    .test("len", "Room must not be empty", (val) => {
                        return val ? val.length !== 0 : false;
                    })
                    .required("Room is required"),
            }
            : {}),
    });

    const AntSwitch = styled(Switch)(({theme}) => ({
        width: 36,
        height: 20,
        padding: 0,
        display: "flex",
        "&:active": {
            "& .MuiSwitch-thumb": {
                width: 17,
            },
            "& .MuiSwitch-switchBase.Mui-checked": {
                transform: "translateX(15px)",
            },
        },
        "& .MuiSwitch-switchBase": {
            padding: 2,
            "&.Mui-checked": {
                transform: "translateX(17px)",
                color: "#fff",
                "& + .MuiSwitch-track": {
                    opacity: 1,
                    backgroundColor: "#2C3092",
                    ...theme.applyStyles("dark", {
                        backgroundColor: "#177ddc",
                    }),
                },
            },
        },
        "& .MuiSwitch-thumb": {
            boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
            width: 15,
            height: 15,
            borderRadius: 10,
            transition: theme.transitions.create(["width"], {
                duration: 200,
            }),
        },
        "& .MuiSwitch-track": {
            borderRadius: 32 / 2,
            opacity: 1,
            backgroundColor: "rgba(0,0,0,.25)",
            boxSizing: "border-box",
            ...theme.applyStyles("dark", {
                backgroundColor: "rgba(255,255,255,.35)",
            }),
        },
    }));

    useEffect(() => {
        if (isSuccessUpdateUser) {
            if (isManager){
                navigate("/dash/users");
            }else if (isAdmin){
                navigate("/admin/users");
            }

            dispatch(setIsOpenSnackBar(true));
            dispatch(setCaptionSnackBar(t("createSuccess")));
            setTimeout(() => {
                dispatch(setIsOpenSnackBar(false));
            }, 3000);
        }
    }, [isSuccessUpdateUser]);

    useEffect(() => {
        if (isErrorUpdateUser) {
            dispatch(setIsOpenSnackBar(true));
            dispatch(setErrorSnackbar(true));
            dispatch(
                setCaptionSnackBar(`${errorUpdateUser?.data?.error?.description}`)
            );
            setTimeout(() => {
                dispatch(setIsOpenSnackBar(false));
            }, 3000);

            setTimeout(() => {
                dispatch(setErrorSnackbar(false));
            }, 3500);
        }
    }, [isErrorUpdateUser]);

    const handleSubmit = async (values, {setSubmitting}) => {
        try {
            const formData = new FormData();
            let profileImageUri = null;
            if (profileImageFile) {
                formData.append("file", profileImageFile);
                const uploadResponse = await uploadImage(formData).unwrap();
                profileImageUri = uploadResponse.uri;
            }
            const dateOfBirth = new Date(values.dateOfBirth);
            const formattedDateOfBirth = dateOfBirth.toISOString().split("T")[0];
            await updateUser({
                id: user.id,
                fullName: values.fullName,
                dateOfBirth: formattedDateOfBirth,
                genderId: values.genderId,
                email: values.email,
                address: values.address,
                phoneNumber: values.phoneNumber,
                roleId: [values.roleId],
                profileImage: profileImageUri || user.profileImage,
                isVerified: values.isVerified,
                isDeleted: false,
                roomId: values.roomId,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleNavigate = () => {
        if (isManager){
            navigate("/dash")
        }else if (isAdmin){
            navigate("/admin")
        }
    }

    const breadcrumbs = [
        <Paper
            elevation={0}
            component="button"
            className="text-black hover:underline"
            onClick={handleNavigate}
            key={1}
        >
            {t("dashboard")}
        </Paper>,
        <Typography color="inherit" key={2}>
            {t("user")}
        </Typography>,
        <Typography color="inherit" key={3}>
            {user.fullName}
        </Typography>,
    ];

    const handleBackClick = () => {
        if (isManager){
            navigate("/dash/users")
        }else if (isAdmin){
            navigate("/admin/users")
        }
    }

    let content;

    if (!gender && !role && !floor) content = <LoadingFetchingDataComponent/>;

    if (error) {
        content = "Error";
    }
    if (gender && role && floor) {
        content = (
            <div data-aos="fade-left">
                <SeoComponent title={"Create a new user"}/>
                <MainHeaderComponent
                    breadcrumbs={breadcrumbs}
                    title={t("edit")}
                    handleBackClick={handleBackClick}
                />
                <Formik
                    initialValues={{
                        fullName: user.fullName,
                        genderId: user.gender.id,
                        email: user.email,
                        address: user.address,
                        phoneNumber: user.phoneNumber,
                        profileImage: user.profileImage,
                        dateOfBirth: dayjs(user.dateOfBirth),
                        roleId: user.roles[0].id,
                        roomId: Array.isArray(user.rooms) ? user.rooms.map(room => room.id) : [],
                        isVerified: user.isVerified,
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
                        const handleRoleChange = (value) => {
                            setFieldValue("roleId", value);
                        };

                        const handleRoomChange = (value) => {
                            setFieldValue("roomId", value);
                        };

                        const handleGenderChange = (value) => {
                            setFieldValue("genderId", value);
                        };

                        const handleIsVerifiedChange = (event) => {
                            setFieldValue("isVerified", event.target.checked);
                        };

                        return (
                            <Form className="pb-8">
                                <Grid2 container spacing={3}>
                                    <Grid2 size={{xs: 12, md: 4}}>
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
                                            <div className="flex items-center justify-between gap-7 mt-5">
                                                <div className="flex flex-col gap-2">
                                                    <Typography
                                                        variant="body1"
                                                        sx={{fontWeight: "500"}}
                                                    >
                                                        {t("emailVerified")}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {t(
                                                            "disabling-this-will-automatically-send-the-user-a-verification-email"
                                                        )}
                                                    </Typography>
                                                </div>
                                                <AntSwitch
                                                    checked={values.isVerified}
                                                    onChange={handleIsVerifiedChange}
                                                    inputProps={{"aria-label": "ant design"}}
                                                />
                                            </div>
                                        </Card>
                                    </Grid2>

                                    <Grid2 size={{xs: 12, md: 8}}>
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

                                                <TextField
                                                    label={t("email")}
                                                    variant="outlined"
                                                    sx={{
                                                        "& .MuiInputBase-input": {
                                                            boxShadow: "none",
                                                        },
                                                        borderRadius: "6px",
                                                    }}
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    fullWidth
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    autoComplete="off"
                                                    error={errors.email && touched.email}
                                                    helperText={
                                                        errors.email && touched.email ? errors.email : null
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
                                                    sx={{width: "100%"}}
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
                                                                ...(errorDateOfBirth && {color: "#f44336"}),
                                                            },
                                                        }}
                                                        label={t("dateOfBirth")}
                                                        value={values.dateOfBirth}
                                                        id="dateOfBirth"
                                                        name="dateOfBirth"
                                                        onChange={(value) => {
                                                            console.log("value", value);
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

                                                {isManager && (
                                                    <SelectSingleComponent
                                                        label={t("role")}
                                                        options={role}
                                                        onChange={handleRoleChange}
                                                        fullWidth={true}
                                                        error={errors.roleId}
                                                        touched={touched.roleId}
                                                        optionLabelKey="name"
                                                        selectFistValue={values.roleId}
                                                    />
                                                )}

                                                    <SelectComponent
                                                        label={t("room")}
                                                        options={floor}
                                                        onChange={handleRoomChange}
                                                        fullWidth={true}
                                                        error={errors.roomId}
                                                        touched={touched.roomId}
                                                        groupLabelKey="name"
                                                        itemsLabelKey="rooms"
                                                        optionLabelKey="name"
                                                        value={values.roomId}
                                                    />

                                            </div>

                                            <div className="col-span-2 flex justify-end mt-[20px]">
                                                <ButtonComponent
                                                    btnTitle={t("saveChanges")}
                                                    type={"submit"}
                                                    isLoading={isLoadingUpdateUser}
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
        );
    }

    return content;
}

export default EditUserForm;