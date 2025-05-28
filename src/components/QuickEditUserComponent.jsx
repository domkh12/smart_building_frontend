import {
    Backdrop,
    Box,
    Button,
    FormControl,
    FormHelperText,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
    setIsOpenQuickEdit,
} from "../redux/feature/users/userSlice";
import {buttonStyleContained, buttonStyleOutlined} from "../assets/style";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import useTranslate from "../hook/useTranslate";
import useAuth from "../hook/useAuth";
import {DatePicker} from "@mui/x-date-pickers";
import SelectComponent from "./SelectComponent";
import SelectSingleComponent from "./SelectSingleComponent";
import dayjs from "dayjs";
import {
    useFindAllGenderQuery,
    useGetAllRolesQuery,
    useUpdateUserMutation,
} from "../redux/feature/users/userApiSlice";
import {useEffect} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {
    setCaptionSnackBar,
    setIsOpenSnackBar,
} from "../redux/feature/actions/actionSlice";
import AlertMessageComponent from "./AlertMessageComponent";
import {useGetAllFloorNameQuery} from "../redux/feature/floor/floorApiSlice.js";
import {LoadingButton} from "@mui/lab";
import {Slide, toast} from "react-toastify";

function QuickEditUserComponent() {
    const open = useSelector((state) => state.users.isOpenQuickEdit);
    const user = useSelector((state) => state.users.userForQuickEdit);
    const dispatch = useDispatch();
    const handleClose = () => dispatch(setIsOpenQuickEdit(false));

    const mode = useSelector((state) => state.theme.mode);
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

        ...(isManager
            ? {
                roomId: Yup.array()
                    .test("len", "Room must not be empty", (val) => {
                        return val ? val.length !== 0 : false;
                    })
                    .required("Room is required"),
            }
            : {}),

        ...(isAdmin
            ? {
                roomId: Yup.array()
                    .test("len", "Room must not be empty", (val) => {
                        return val ? val.length !== 0 : false;
                    })
                    .required("Room is required"),
            } : {})
    });

    const handleSubmit = async (values, {setSubmitting}) => {
        try {
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
                profileImage: user.profileImage,
                isVerified: user.isVerified,
                isDeleted: false,
                roomId: values.roomId,
            });
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (isSuccessUpdateUser) {
            toast.success(t("createSuccess"), {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                transition: Slide,
            });
            dispatch(setIsOpenQuickEdit(false));
        }
    }, [isSuccessUpdateUser]);

    useEffect(() => {
        if (isErrorUpdateUser) {
            toast.error(`${errorUpdateUser?.data?.error?.description}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                transition: Slide,
            });
        }
    }, [isErrorUpdateUser]);

    const initialDateOfBirth = user.dateOfBirth ? dayjs(user.dateOfBirth) : null;

    let content;

    if (!gender && !role && !floor) content = (
        <Backdrop
            sx={(theme) => ({color: '#fff', zIndex: theme.zIndex.drawer + 1})}
            open={open}
            onClick={handleClose}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    );

    if (gender && role && floor)
        content = (
            <Box>
                <Formik
                    initialValues={{
                        fullName: user.fullName ? user.fullName : "",
                        genderId: user.gender ? user.gender.id : "",
                        email: user.email ? user.email : "",
                        address: user.address ? user.address : "",
                        phoneNumber: user.phoneNumber ? user.phoneNumber : "",
                        dateOfBirth: initialDateOfBirth || null,
                        roleId: user.roles[0].id,
                        roomId: Array.isArray(user.rooms) ? user.rooms.map(room => room.id) : [],
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

                        const handleRoleChange = (value) => {
                            setFieldValue("roleId", value);
                        };

                        const handleRoomChange = (value) => {
                            setFieldValue("roomId", value);
                        };

                        const handleGenderChange = (value) => {
                            console.log("value", value);
                            setFieldValue("genderId", value);
                        };

                        const errorDateOfBirth = errors.dateOfBirth && touched.dateOfBirth;
                        return (
                            <Form>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        padding: "24px", color: mode === "dark" ? "#fff" : "#000"
                                    }}
                                >
                                    {t('quickUpdate')}
                                </Typography>
                                <Box className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-[24px]">
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
                                            errors.address && touched.address ? errors.address : null
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

                                </Box>
                                <Box
                                    sx={{
                                        padding: "24px", display: "flex", justifyContent: "end",
                                    }}
                                >
                                    <Button
                                        onClick={() => dispatch(setIsOpenQuickEdit(false))}
                                        sx={{
                                            ...buttonStyleOutlined,
                                        }}
                                    >
                                        {t('cancel')}
                                    </Button>
                                    <LoadingButton
                                        loading={isLoadingUpdateUser}
                                        variant="contained"
                                        sx={{...buttonStyleContained, ml: 1}}
                                        type="submit"
                                    >
                                        {t('update')}
                                    </LoadingButton>
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
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
        >
            <Box>
                <Box
                    sx={{
                        backgroundColor: "background.paper",
                        borderRadius: "16px",
                        width: "95%",
                        maxWidth: "720px",
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        overflow: "auto",
                        maxHeight: "90vh",
                        boxShadow: "0px 10px 15px -3px rgb(0 0 0 / 20%), 0px 4px 6px -2px rgb(0 0 0 / 15%)",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {content}

                </Box>
            </Box>
        </Modal>
    );
}

export default QuickEditUserComponent;
