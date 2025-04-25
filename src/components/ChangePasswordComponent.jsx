import {Form, Formik} from "formik";
import {
    Box, Button,
    Card,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from "@mui/material";
import {CgEyeAlt} from "react-icons/cg";
import {TbEyeClosed} from "react-icons/tb";
import useTranslate from "../hook/useTranslate.jsx";
import {useEffect, useState} from "react";
import {useChangePasswordMutation} from "../redux/feature/auth/authApiSlice.js";
import {Slide, toast} from "react-toastify";
import * as Yup from "yup";
import ButtonComponent from "./ButtonComponent.jsx";

function ChangePasswordComponent(){
    const {t} = useTranslate();
    const [isErrorCurrentPassword, setIsErrorCurrentPassword] = useState(false);

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [changePassword, {isSuccess, isLoading, isError, error}] = useChangePasswordMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success(t("successChangePassword"), {
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

    useEffect(() => {
        if (isError && error.status === 400){
            toast.error(t("currentPasswordIncorrect"), {
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
            setIsErrorCurrentPassword(true);
        }
    }, [isError]);

    const toggleShowPassword = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string().required(t('required')),
        newPassword: Yup.string()
            .min(8, t('valid8CharNewPassword'))
            .required(t('required'))
            .notOneOf([Yup.ref('currentPassword')], t('newPasswordMustBeDifferent')),
        confirmNewPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], t('passwordMustMatch'))
            .required(t('required'))
    });

    const handleSubmit = async (values, {resetForm}) => {
        try {
            await changePassword({
                oldPassword: values.currentPassword,
                newPassword: values.newPassword,
            });
            resetForm();
        }catch (error){
            console.log(error);
        }
    };

    return(
        <Formik
            initialValues={{
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: ""
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({values, errors, touched, handleChange, handleBlur}) => (
                <Form>
                    <Card sx={{p: 3, mx: "auto"}}>
                        <Typography variant="h6" sx={{mb: 3}}>
                            {t('changePassword')}
                        </Typography>

                        <Stack spacing={3}>
                            {/* Current Password */}
                            <FormControl variant="outlined" fullWidth
                                         error={Boolean(touched.currentPassword && errors.currentPassword) || isErrorCurrentPassword}>
                                <InputLabel htmlFor="currentPassword">{t('currentPassword')}</InputLabel>
                                <OutlinedInput
                                    id="currentPassword"
                                    name="currentPassword"
                                    type={showPassword.current ? "text" : "password"}
                                    value={values.currentPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => toggleShowPassword("current")}
                                                onMouseDown={(e) => e.preventDefault()}
                                                edge="end"
                                            >
                                                {showPassword.current ? <CgEyeAlt/> : <TbEyeClosed/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Current Password"
                                />
                                {touched.currentPassword && errors.currentPassword && (
                                    <Typography variant="caption" color="error">
                                        {errors.currentPassword}
                                    </Typography>
                                )}
                            </FormControl>

                            {/* New Password */}
                            <FormControl variant="outlined" fullWidth
                                         error={Boolean(touched.newPassword && errors.newPassword)}>
                                <InputLabel htmlFor="newPassword">{t('newPassword')}</InputLabel>
                                <OutlinedInput
                                    id="newPassword"
                                    name="newPassword"
                                    type={showPassword.new ? "text" : "password"}
                                    value={values.newPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => toggleShowPassword("new")}
                                                onMouseDown={(e) => e.preventDefault()}
                                                edge="end"
                                            >
                                                {showPassword.new ? <CgEyeAlt/> : <TbEyeClosed/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="New Password"
                                />
                                {touched.newPassword && errors.newPassword && (
                                    <Typography variant="caption" color="error">
                                        {errors.newPassword}
                                    </Typography>
                                )}
                            </FormControl>

                            {/* Confirm New Password */}
                            <FormControl variant="outlined" fullWidth
                                         error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}>
                                <InputLabel htmlFor="confirmNewPassword">{t('confirmNewPassword')}</InputLabel>
                                <OutlinedInput
                                    id="confirmNewPassword"
                                    name="confirmNewPassword"
                                    type={showPassword.confirm ? "text" : "password"}
                                    value={values.confirmNewPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => toggleShowPassword("confirm")}
                                                onMouseDown={(e) => e.preventDefault()}
                                                edge="end"
                                            >
                                                {showPassword.confirm ? <CgEyeAlt/> : <TbEyeClosed/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm New Password"
                                />
                                {touched.confirmNewPassword && errors.confirmNewPassword && (
                                    <Typography variant="caption" color="error">
                                        {errors.confirmNewPassword}
                                    </Typography>
                                )}
                            </FormControl>
                        </Stack>
                        <Box sx={{width: "100%", display: "flex", justifyContent: "end", alignItems: "center", mt: 2}}>
                            <ButtonComponent
                                btnTitle={t("saveChanges")}
                                type="submit"
                                isLoading={isLoading}
                            />
                        </Box>
                    </Card>
                </Form>
            )}
        </Formik>
    );
}

export default ChangePasswordComponent;