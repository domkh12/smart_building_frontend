import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    useLoginMutation,
    useVerify2FALoginMutation,
} from "../../redux/feature/auth/authApiSlice";
import {Slide, toast} from "react-toastify";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {jwtDecode} from "jwt-decode";
import LoadingButton from "@mui/lab/LoadingButton";
import {MdKeyboardArrowLeft} from "react-icons/md";

import {
    Alert, Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, Paper, Stack,
    TextField,
    Typography,
} from "@mui/material";
import {IoEye, IoEyeOff} from "react-icons/io5";
import {setUuid} from "../../redux/feature/users/userSlice";
import LogoComponent from "../../components/LogoComponent";
import TranslateComponent from "../../components/TranslateComponent";
import SettingComponent from "../../components/SettingComponent";
import useTranslate from "../../hook/useTranslate";
import usePersist from "../../hook/usePersist";
import SelectSingleComponent from "../../components/SelectSingleComponent";
import {ROLES} from "../../config/roles";
import SeoComponent from "../../components/SeoComponent";
import {useGetSitesListMutation} from "../../redux/feature/site/siteApiSlice";
import {setRoomId} from "../../redux/feature/room/roomSlice.js";
import OTPInput from "react-otp-input";
import useLocalStorage from "../../hook/useLocalStorage.jsx";
import LogoTwoComponent from "../../components/LogoTwoComponent.jsx";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [openErrorVerifyCode, setOpenErrorVerifyCode] = useState(false);
    const [verifyCodeErrorMessage, setVerifyCodeErrorMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [persist, setPersist] = usePersist();
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState("");
    const mode = useSelector((state) => state.theme.mode);
    const {t} = useTranslate();
    const [login, {isSuccess, isLoading}] = useLoginMutation();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [authData, setAuthData] = useLocalStorage('authData', {
        isRemember: false,
        userRoles: "",
        id: null,
        roomId: null
    });

    const saveLoginInfo = (roles, id, roomId = null) => {
        setAuthData({
            isRemember: true,
            userRoles: roles[0],
            id,
            roomId
        });
    };

    const [
        verify2FALogin,
        {
            isLoading: isVerify2FALoading,
            isSuccess: isVerify2FASuccess,
            isError: isVerify2FaError,
        },
    ] = useVerify2FALoginMutation();

    const handlePaste = (event) => {
        const data = event.clipboardData.getData('text');
    };

    useEffect(() => {
        const checkRememberedLogin = () => {
            if (authData.isRemember && authData.userRoles !== "") {
                if (authData.userRoles === "ROLE_ADMIN") {
                    navigate("/admin");
                } else if (authData.userRoles === "ROLE_MANAGER") {
                    navigate("/dash");
                } else if (authData.userRoles === "ROLE_USER") {
                    navigate("/user");
                }

            }
        };

        checkRememberedLogin();
    }, []);


    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setOpen(false);
            }, 3000);
        }
    }, [open]);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email(t("emailNotValid")).required(t("required")),
        password: Yup.string().required(t("noPasswordProvided")),
    });

    useEffect(() => {
        if (isVerify2FaError) {
            toast.error("Verification failed", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    }, [isVerify2FaError]);

    // Update your 2FA verification success handler
    useEffect(() => {
        if (otp.length === 6) {
            try {
                const postVerifyLogin = async () => {
                    const {accessToken} = await verify2FALogin({
                        code: otp,
                        email: email
                    }).unwrap();

                    const decoded = jwtDecode(accessToken);
                    const {scope, id, roomId} = decoded;
                    const roles = scope ? scope.split(" ") : [];

                    if (roles.includes(ROLES.ROLE_ADMIN)) {
                        saveLoginInfo(roles, id);
                        navigate("/admin");
                    } else if (roles.includes(ROLES.ROLE_MANAGER)) {
                        saveLoginInfo(roles, id);
                        navigate("/dash");
                    } else if (roles.includes(ROLES.ROLE_USER)) {
                        dispatch(setRoomId(roomId));
                        saveLoginInfo(roles, id, roomId);
                        navigate("/user");
                    }
                }
                postVerifyLogin();
            } catch (error) {
                console.log(error)
            }
        }
    }, [otp]);


    const handleSubmit = async (values, {setSubmitting, resetForm}) => {
        try {
            setPersist(true);
            const {accessToken, required2FA} = await login({
                email: values.email,
                password: values.password,
            }).unwrap();

            if (required2FA) {
                setStep(2);
                setEmail(values.email);
                resetForm({values: {code: ""}});
                localStorage.setItem("isRemember", "true");
            } else {
                const decoded = jwtDecode(accessToken);
                const {jti: email, scope, id, roomId} = decoded;

                const roles = scope ? scope.split(" ") : [];
                if (roles.includes(ROLES.ROLE_MANAGER)) {
                    try {
                        saveLoginInfo(roles, id);
                        navigate("/dash");
                    } catch (err) {
                        console.log(err);
                    }
                } else if (roles.includes(ROLES.ROLE_ADMIN)) {
                    try {
                        navigate("/admin");
                        saveLoginInfo(roles, id);
                    } catch (err) {
                        console.log(err);
                    }
                } else if (roles.includes(ROLES.ROLE_USER)) {
                    try {
                        dispatch(setRoomId(roomId));
                        saveLoginInfo(roles, id, roomId);
                        navigate("/user");
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        } catch (error) {
            console.log(error);
            if (error.status === "FETCH_ERROR") {
                setErrorMessage("Something went wrong!");
                setOpen(true);
            } else if (error.status === 400) {
                setErrorMessage("Email or Password is incorrect.");
                setOpen(true);
            } else if (error.status === 404) {
                setErrorMessage("Email or Password is incorrect.");
                setOpen(true);
            } else if (error.status === 401) {
                setErrorMessage("Email or Password is incorrect.");
                setOpen(true);
            } else {
                setErrorMessage(error?.data?.message);
            }
        } finally {
            setSubmitting(false);
        }
    };

    let content;

    if (step === 1) {
        content = (
            <>
                <SeoComponent title="Smart Building System NPIC"/>
                <nav
                    className="fixed top-0 left-0 w-full bg-white bg-opacity-5 lg:bg-opacity-0 z-20 backdrop-blur-3xl lg:backdrop-blur-0">
                    <Paper className="flex justify-between items-center xxs:flex-nowrap flex-wrap">
                        <LogoTwoComponent/>
                        <Paper className="pr-[20px] flex gap-[16px]  items-center">
                            <TranslateComponent/>
                            <SettingComponent/>
                        </Paper>
                    </Paper>
                </nav>

                <Paper
                    elevation={0}
                    component="div"
                    sx={{
                        color: "text.primary",
                        height: "100%",

                    }}
                >
                    <Formik
                        initialValues={{email: "", password: ""}}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({values, touched, errors, handleChange, handleBlur}) => (
                            <Form>
                                <section className="h-screen">
                                    <Stack direction="row" sx={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100%",
                                        maxWidth: "1280px",
                                        margin: "0 auto"
                                    }}>
                                        <Paper
                                            className="h-screen shrink-0 w-[480px] hidden lg:flex bg-[#f5f5f5] justify-center items-center">
                                            <Paper
                                                className="px-[20px] h-full text-center flex justify-center items-center flex-col">
                                                <img
                                                    src="/images/login_image.png"
                                                    alt="login_image"
                                                    className="w-full h-auto"
                                                />
                                            </Paper>
                                        </Paper>
                                        <Paper
                                            sx={{
                                                width: "100%",
                                                px: "20px",
                                                py: 15,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Paper sx={{maxWidth: "500px", width: "100%"}}>
                                                <Typography variant="h6" sx={{mb: "40px"}}>
                                                    {t("login-to-your-account")}
                                                </Typography>

                                                {open && (
                                                    <Alert
                                                        sx={{mb: 2, borderRadius: "6px"}}
                                                        severity="error"
                                                    >
                                                        {errorMessage}
                                                    </Alert>
                                                )}

                                                <TextField
                                                    label={t("email")}
                                                    variant="outlined"
                                                    sx={{
                                                        "& .MuiInputBase-input": {
                                                            boxShadow: "none",
                                                        },
                                                        borderRadius: "6px",
                                                        mb: 2,
                                                    }}
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    autoFocus
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

                                                <div className="flex justify-end">
                                                    <Link
                                                        to={"/forgot-password"}
                                                        className="text-sm hover:underline text-right"
                                                    >
                                                        {t('forgotPassword')}
                                                    </Link>
                                                </div>

                                                <FormControl
                                                    sx={{width: "100%", mb: 2}}
                                                    variant="outlined"
                                                    size="medium"
                                                    error={errors.password && touched.password}
                                                >
                                                    <InputLabel htmlFor="password">
                                                        {t("password")}
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        sx={{
                                                            "& .MuiInputBase-input": {
                                                                boxShadow: "none",
                                                            },
                                                            borderRadius: "6px",
                                                        }}
                                                        id="password"
                                                        name="password"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        autoComplete="new-password"
                                                        value={values.password}
                                                        type={showPassword ? "text" : "password"}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label={
                                                                        showPassword
                                                                            ? "hide the password"
                                                                            : "display the password"
                                                                    }
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                    onMouseUp={handleMouseUpPassword}
                                                                    edge="end"
                                                                >
                                                                    {showPassword ? <IoEye/> : <IoEyeOff/>}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                        label="Password"
                                                    />
                                                    <FormHelperText>
                                                        {errors.password && touched.password
                                                            ? errors.password
                                                            : null}
                                                    </FormHelperText>
                                                </FormControl>

                                                <LoadingButton
                                                    variant="contained"
                                                    size="large"
                                                    sx={{
                                                        textTransform: "none",
                                                        borderRadius: "6px",
                                                        mb: 2,
                                                    }}
                                                    loading={isLoading}
                                                    type="submit"
                                                    className="w-full "
                                                >
                                                    {t("login")}
                                                </LoadingButton>
                                                <Box sx={{display: "flex", justifyContent: "center", width: "100%"}}>
                                                    <IconButton
                                                        onClick={() =>
                                                            (window.location.href = `${
                                                                import.meta.env.VITE_API_BACKEND_URL
                                                            }`)
                                                        }
                                                    >
                                                        <svg
                                                            width="30px"
                                                            height="30px"
                                                            viewBox="0 0 16 16"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                        >
                                                            <path fill="#F35325" d="M1 1h6.5v6.5H1V1z"/>
                                                            <path fill="#81BC06" d="M8.5 1H15v6.5H8.5V1z"/>
                                                            <path fill="#05A6F0" d="M1 8.5h6.5V15H1V8.5z"/>
                                                            <path fill="#FFBA08" d="M8.5 8.5H15V15H8.5V8.5z"/>
                                                        </svg>
                                                    </IconButton>
                                                </Box>
                                            </Paper>
                                        </Paper>
                                    </Stack>
                                </section>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </>
        );
    } else if (step === 2) {
        content = (

            <>
                <SeoComponent title="Smart Building System NPIC"/>
                <nav
                    className="fixed top-0 left-0 w-full bg-white bg-opacity-5 lg:bg-opacity-0 z-20 backdrop-blur-3xl lg:backdrop-blur-0">
                    <Paper className="flex justify-between items-center xxs:flex-nowrap flex-wrap">
                        <LogoTwoComponent/>
                        <Paper className="pr-[20px] flex gap-[16px]  items-center">
                            <TranslateComponent/>
                            <SettingComponent/>
                        </Paper>
                    </Paper>
                </nav>

                <Paper
                    elevation={0}
                    component="div"
                    sx={{
                        color: "text.primary",
                        height: "100%",

                    }}
                >
                    <Formik
                        initialValues={{code: "", password: email}}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({values, touched, errors, handleChange, handleBlur}) => (
                            <Form>
                                <section className="h-screen">
                                    <Stack direction="row" sx={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "100%",
                                        maxWidth: "1280px",
                                        margin: "0 auto"
                                    }}>
                                        <Paper
                                            className="h-screen shrink-0 w-[480px] hidden lg:flex bg-[#f5f5f5] justify-center items-center">
                                            <Paper
                                                className="px-[20px] h-full text-center flex justify-center items-center flex-col">
                                                <img
                                                    src="/images/login_image.png"
                                                    alt="login_image"
                                                    className="w-full h-auto"
                                                />
                                            </Paper>
                                        </Paper>

                                        <Paper
                                            sx={{
                                                width: "100%",
                                                px: "20px",
                                                py: 15,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Paper sx={{
                                                maxWidth: "500px",
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 2
                                            }}>
                                                <img
                                                    src="/images/email.svg"
                                                    alt="branch_image"
                                                    className="w-20 mx-auto mb-2"
                                                />

                                                <Typography variant="h6" className="text-center">
                                                    Two-Factor Authentication Required
                                                </Typography>

                                                <Typography variant="body1" className="text-center">
                                                    Please enter the 6-digit code from your authentication app to verify
                                                    your identity.
                                                </Typography>
                                                <div>
                                                    {openErrorVerifyCode && (
                                                        <Alert
                                                            sx={{mb: 2, borderRadius: "6px"}}
                                                            severity="error"
                                                        >
                                                            {verifyCodeErrorMessage}
                                                        </Alert>
                                                    )}

                                                    <div className="flex justify-center items-center">
                                                        <OTPInput
                                                            value={otp}
                                                            onChange={setOtp}
                                                            numInputs={6}
                                                            renderSeparator={<span>-</span>}
                                                            onPaste={handlePaste}
                                                            inputType="tel"
                                                            renderInput={(props) => <input {...props} />}
                                                            inputStyle={{
                                                                width: "2.5rem",
                                                                height: "2.5rem",
                                                                margin: "0 0.5rem",
                                                                fontSize: "1.5rem",
                                                                borderRadius: 4,
                                                                border: "1px solid #ccc",
                                                                color: mode === "dark" ? "white" : "black",
                                                                backgroundColor: mode === "dark" ? "black" : "white",
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <LoadingButton
                                                    variant="contained"
                                                    size="large"
                                                    sx={{
                                                        textTransform: "none",
                                                        borderRadius: "6px",
                                                        mb: 2,
                                                    }}
                                                    loading={isLoading}
                                                    type="submit"
                                                    loadingIndicator="Logging..."
                                                    className="w-full "
                                                >
                                                    Verify
                                                </LoadingButton>
                                                <div
                                                    className="flex justify-center items-center hover:underline cursor-pointer">
                                                    <a
                                                        onClick={() => setStep(1)}
                                                        className="flex justify-center items-center gap-2"
                                                    >
                                                        <MdKeyboardArrowLeft className="w-5 h-5"/>
                                                        {t("returnToLogin")}
                                                    </a>
                                                </div>
                                            </Paper>

                                        </Paper>
                                    </Stack>
                                </section>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </>
        );
    }

    return content;
}
