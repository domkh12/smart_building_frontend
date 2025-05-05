import {Link, useNavigate, useSearchParams} from "react-router-dom";
import useTranslate from "../../hook/useTranslate.jsx";
import {useEffect, useState} from "react";
import {useResetPasswordMutation} from "../../redux/feature/auth/authApiSlice.js";
import * as Yup from 'yup';
import SeoComponent from "../../components/SeoComponent.jsx";
import LogoComponent from "../../components/LogoComponent.jsx";
import TranslateComponent from "../../components/TranslateComponent.jsx";
import SettingComponent from "../../components/SettingComponent.jsx";
import {
    Alert,
    FormControl, FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, Paper, Stack,
    Typography
} from "@mui/material";
import {Form, Formik} from "formik";
import {IoEye, IoEyeOff} from "react-icons/io5";
import LoadingButton from "@mui/lab/LoadingButton";
import {MdKeyboardArrowLeft} from "react-icons/md";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState(null);
    const [open, setOpen] = useState(false);
    const {t} = useTranslate();
    const navigate = useNavigate();

    const [resetPassword, {isSuccess, isLoading, isError, error}] =
        useResetPasswordMutation();

    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(/[\W_]/, "Password must contain at least one special character")
            .required(t("passwordIsRequired")),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], t("passwordIsRequired"))
            .required(t("confirmPasswordIsRequired")),
    });

    useEffect(() => {
        if (isSuccess) {
            navigate("/login", {replace: true});
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            setOpen(true);
            setMessage(error.data.message);
        }
    }, [isError]);

    const handleSubmit = async (values) => {
        try {
            const token = searchParams.get("token");
            await resetPassword({token, newPassword: values.newPassword});
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpConfirmPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

    let content;

    content = (
        <>
            <SeoComponent title="Forgot Password"/>
            <Paper elevation={0}
                   className="fixed top-0 left-0 w-full bg-white bg-opacity-5 lg:bg-opacity-0 z-20 backdrop-blur-3xl lg:backdrop-blur-0">
                <div className="flex justify-between items-center xxs:flex-nowrap flex-wrap">
                    <LogoComponent/>
                    <div className="pr-[20px] flex gap-[16px]  items-center">
                        <TranslateComponent/>
                        <SettingComponent/>
                    </div>
                </div>
            </Paper>

            <Paper
                elevation={0}
                component="div"
            >
                <Formik
                    initialValues={{newPassword: "", confirmPassword: ""}}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({values, touched, errors, handleChange, handleBlur}) => (
                        <Form>
                            <section className="h-screen">
                                <Stack direction="row" spacing={2} sx={{
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
                                            <Typography variant="h6">{t('resetPassword')}</Typography>
                                            <Typography variant="body1">
                                                {t('resetPasswordDescription')}
                                            </Typography>
                                            {(open && isError) ? (
                                                <Alert
                                                    sx={{borderRadius: "6px"}}
                                                    severity={"error"}
                                                >
                                                    {message}
                                                </Alert>
                                            ) : (
                                                (open && !isError, isSuccess) && (<Alert
                                                    sx={{ borderRadius: "6px"}}
                                                    severity={"success"}
                                                >
                                                    {message}
                                                </Alert>)
                                            )}
                                            <FormControl
                                                sx={{width: "100%", mt: 1}}
                                                variant="outlined"
                                                size="medium"
                                                error={errors.newPassword && touched.newPassword}
                                            >
                                                <InputLabel htmlFor="newPassword">
                                                    {t("newPassword")}
                                                </InputLabel>
                                                <OutlinedInput
                                                    sx={{
                                                        "& .MuiInputBase-input": {
                                                            boxShadow: "none",
                                                        },
                                                        borderRadius: "6px",
                                                    }}
                                                    id="newPassword"
                                                    name="newPassword"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    autoComplete="off"
                                                    fullWidth
                                                    value={values.newPassword}
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
                                                    {errors.newPassword && touched.newPassword
                                                        ? errors.newPassword
                                                        : null}
                                                </FormHelperText>
                                            </FormControl>

                                            <FormControl
                                                sx={{width: "100%"}}
                                                variant="outlined"
                                                size="medium"
                                                error={errors.confirmPassword && touched.confirmPassword}
                                            >
                                                <InputLabel htmlFor="confirmPassword">
                                                    {t("confirmPassword")}
                                                </InputLabel>
                                                <OutlinedInput
                                                    sx={{
                                                        "& .MuiInputBase-input": {
                                                            boxShadow: "none",
                                                        },
                                                        borderRadius: "6px",
                                                    }}
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    autoComplete="off"
                                                    fullWidth
                                                    value={values.confirmPassword}
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label={
                                                                    showConfirmPassword
                                                                        ? "hide the password"
                                                                        : "display the password"
                                                                }
                                                                onClick={handleClickShowConfirmPassword}
                                                                onMouseDown={handleMouseDownConfirmPassword}
                                                                onMouseUp={handleMouseUpConfirmPassword}
                                                                edge="end"
                                                            >
                                                                {showConfirmPassword ? <IoEye/> : <IoEyeOff/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    label="Password"
                                                />
                                                <FormHelperText>
                                                    {errors.confirmPassword && touched.confirmPassword
                                                        ? errors.confirmPassword
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
                                                {t('sendRequest')}
                                            </LoadingButton>
                                            <div className="flex justify-center items-center hover:underline">
                                                <Link
                                                    to="/login"
                                                    className="flex justify-center items-center gap-2"
                                                >
                                                    <MdKeyboardArrowLeft className="w-5 h-5"/>
                                                    {t("returnToLogin")}
                                                </Link>
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
    return content;
}

export default ResetPassword;