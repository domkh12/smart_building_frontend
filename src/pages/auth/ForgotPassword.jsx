import {useState, useEffect} from "react";
import useTranslate from "../../hook/useTranslate.jsx";
import {Link, useNavigate} from "react-router-dom";
import * as Yup from 'yup';
import {useForgotPasswordMutation} from "../../redux/feature/auth/authApiSlice.js";
import SeoComponent from "../../components/SeoComponent.jsx";
import LogoComponent from "../../components/LogoComponent.jsx";
import TranslateComponent from "../../components/TranslateComponent.jsx";
import SettingComponent from "../../components/SettingComponent.jsx";
import {Alert, Box, Paper, Stack, TextField, Typography} from "@mui/material";
import {Form, Formik} from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import {MdKeyboardArrowLeft} from "react-icons/md";

function ForgotPassword() {
    const [message, setMessage] = useState(null);
    const [open, setOpen] = useState(false);
    const {t} = useTranslate();
    const validationSchema = Yup.object().shape({
        email: Yup.string().email(t("emailNotValid")).required(t("required")),
    });
    const [forgotPassword, {isSuccess, isLoading, isError, error}] =
        useForgotPasswordMutation();

    useEffect(() => {
        if (isSuccess) {
            setOpen(true);
            setMessage(t("passwordResetLinkSent"));
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            setOpen(true);
            setMessage(error?.data?.error?.description);
        }
    }, [isError]);

    const handleSubmit = async (email) => {
        try {
            console.log("values", email);
            await forgotPassword(email);
        } catch (error) {
            console.log("error", error);
        }
    };
    let content;
    content = (
        <Paper elevation={0}>
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
                    initialValues={{email: ""}}
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
                                        <img
                                            src="/images/lock.svg"
                                            alt="branch_image"
                                            className="w-20 mx-auto"
                                        />
                                        <Typography variant="h6" className="text-center">
                                            {t("forgotYourPassword")}
                                        </Typography>
                                        <Typography variant="body1" className="text-center">
                                            {t("forgotPasswordDescription")}
                                        </Typography>
                                        <div className="w-full">
                                            {(open && isError) ? (
                                                <Alert
                                                    sx={{mb: 2, borderRadius: "6px"}}
                                                    severity={"error"}
                                                >
                                                    {message}
                                                </Alert>
                                            ) : (
                                                (open && !isError, isSuccess) && (<Alert
                                                    sx={{mb: 2, borderRadius: "6px"}}
                                                    severity={"success"}
                                                >
                                                    {message}
                                                </Alert>)
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
                                            className="w-full "
                                        >
                                            {t("sendRequest")}
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
        </Paper>
    );
    return content;
}

export default ForgotPassword;