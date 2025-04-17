import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useLoginMutation,
  useSendLogoutMutation,
  useVerify2FALoginMutation,
  useVerifySitesMutation,
} from "../../redux/feature/auth/authApiSlice";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import LoadingButton from "@mui/lab/LoadingButton";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput, Paper,
  TextField,
  Typography,
} from "@mui/material";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { setUuid } from "../../redux/feature/users/userSlice";
import LogoComponent from "../../components/LogoComponent";
import TranslateComponent from "../../components/TranslateComponent";
import SettingComponent from "../../components/SettingComponent";
import useTranslate from "../../hook/useTranslate";
import usePersist from "../../hook/usePersist";
import SelectSingleComponent from "../../components/SelectSingleComponent";
import { ROLES } from "../../config/roles";
import SeoComponent from "../../components/SeoComponent";
import { useGetSitesListMutation } from "../../redux/feature/site/siteApiSlice";
import {setRoomId} from "../../redux/feature/room/roomSlice.js";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [step, setStep] = useState(1);
  const [persist, setPersist] = usePersist();
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("isRemember")
  );
  const [sitesUuid, setSitesUuid] = useState([]);
  const { t } = useTranslate();
  const [login, { isSuccess, isLoading }] = useLoginMutation();
  const [brachCount, setBranchCount] = useState(0);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [
    getSitesList,
    {
      isSuccess: isGetSitesSuccess,
      isLoading: isGetSitesLoading,
      isError: isGetSitesError,
      error: errorGetSites,
    },
  ] = useGetSitesListMutation();

  const [
    verify2FALogin,
    {
      isLoading: isVerify2FALoading,
      isSuccess: isVerify2FASuccess,
      isError: isVerify2FaError,
    },
  ] = useVerify2FALoginMutation();

  const [
    verifySites,
    {
      isSuccess: isVerifySiteSuccess,
      isLoading: isVerifySiteLoading,
      isError: isVerifySiteError,
      error: errorVerifySite,
    },
  ] = useVerifySitesMutation();

  const [
    sendLogout,
    { isSuccess: isLogoutSuccess, isLoading: isLoadingLogout, isError, error },
  ] = useSendLogoutMutation();

  const handleLogout = () => sendLogout();

  useEffect(() => {
    // if (rememberMe){
    //   navigate("/dash")
    // }

  }, [rememberMe]);

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

  const validationSchemaForVerifyForm = Yup.object().shape({
    code: Yup.string()
      .matches(/^[0-9]{6}$/, "Code must be a 6 digit number")
      .required(t("required")),
  });

  useEffect(() => {
    if (isVerifySiteSuccess) {
      navigate("/dash");
    }
  }, [isVerifySiteSuccess]);

  useEffect(() => {
    if (isVerify2FASuccess) {
      setStep(3);
    }
  }, [isVerify2FASuccess]);

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
        theme: "colored",
      });
    }
  }, [isVerify2FaError]);

  const handleSubmiteVerifyCode = async (values) => {
    try {
      console.log(values);
      const { code } = values;
      await verify2FALogin({ uuid });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitSite = async (values) => {
    try {
      await verifySites({
        uuid: values.siteUuid,
        token: token,
      });
      localStorage.setItem("isRemember", "true");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setPersist(true);
      const { accessToken } = await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      const decoded = jwtDecode(accessToken);
      const { jti: email, scope, uuid, isEnabledTwoFA, roomId } = decoded;

      const roles = scope ? scope.split(" ") : [];

      if (isEnabledTwoFA) {
        setStep(2);
        setToken(accessToken);
        handleLogout();
        resetForm({ values: { code: "" } });
        localStorage.setItem("isRemember", "true");
      }  else {
        if (roles.includes(ROLES.ROLE_ADMIN)) {
          try {
            dispatch(setUuid(uuid));
            localStorage.setItem("isRemember", "true");
            navigate("/admin");
          } catch (err) {
            console.log(err);
          }
        } else if (roles.includes(ROLES.ROLE_MANAGER)) {
          try {
            await verifySites({ uuid: roomId });
            dispatch(setUuid(uuid));
            localStorage.setItem("isRemember", "true");
            navigate("/dash");
          } catch (err) {
            console.log(err);
          }
        }else if (roles.includes(ROLES.ROLE_USER)){
          try {
            dispatch(setUuid(uuid));
            dispatch(setRoomId(roomId))
            localStorage.setItem("isRemember", "true");
            navigate("/user");
          }catch (error){
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
        <SeoComponent title="Login" />
        <nav className="fixed top-0 left-0 w-full bg-white bg-opacity-5 lg:bg-opacity-0 z-20 backdrop-blur-3xl lg:backdrop-blur-0">
          <Paper className="flex justify-between items-center xxs:flex-nowrap flex-wrap">
            <LogoComponent />
            <Paper className="pr-[20px] flex gap-[16px]  items-center">
              <TranslateComponent />
              <SettingComponent />
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
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, touched, errors, handleChange, handleBlur }) => (
              <Form>
                <section className="flex h-screen">
                  <Paper className="h-screen shrink-0 w-[480px] hidden lg:block bg-[#f5f5f5]">
                    <Paper className="px-[20px] h-full text-center flex justify-center items-center flex-col">
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
                    }}
                    className="flex flex-col justify-start items-center lg:justify-center"
                  >
                    <Paper className="max-w-[500px]">
                      <Typography variant="h6" sx={{ mb: "40px" }}>
                        {t("login-to-your-account")}
                      </Typography>

                      {open && (
                        <Alert
                          sx={{ mb: 2, borderRadius: "6px" }}
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

                      <FormControl
                        sx={{ width: "100%", mb: 2 }}
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
                                {showPassword ? <IoEye /> : <IoEyeOff />}
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
                      <Button
                        variant="outlined"
                        sx={{ textTransform: "none", borderRadius: "6px" }}
                        fullWidth
                        onClick={() =>
                          (window.location.href = `${
                            import.meta.env.VITE_API_BACKEND_URL
                          }/import SeoComponent from './../../components/SeoComponent';
oauth2/authorization/azure`)
                        }
                      >
                        <svg
                          width="30px"
                          height="30px"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-5"
                          fill="none"
                        >
                          <path fill="#F35325" d="M1 1h6.5v6.5H1V1z" />
                          <path fill="#81BC06" d="M8.5 1H15v6.5H8.5V1z" />
                          <path fill="#05A6F0" d="M1 8.5h6.5V15H1V8.5z" />
                          <path fill="#FFBA08" d="M8.5 8.5H15V15H8.5V8.5z" />
                        </svg>
                        <span className="text-gray-800 dark:text-gray-50">
                          {t("loginWithMicrosoft")}
                        </span>
                      </Button>
                    </Paper>
                  </Paper>
                </section>
              </Form>
            )}
          </Formik>
        </Paper>
      </>
    );
  } else if (step === 2) {
    content = (
      <Formik
        initialValues={{ code: "" }}
        validationSchema={validationSchemaForVerifyForm}
        onSubmit={handleSubmiteVerifyCode}
      >
        {({ values, touched, errors, handleChange, handleBlur }) => (
          <Form className="grid grid-cols-12 md:grid-cols-1 grid-flow-row justify-center items-center min-h-screen gap-10">
            <section className="md:hidden col-start-2 col-end-6">
              <img src="/images/login.svg" alt="login_image" />
            </section>
            <hr className="w-1 h-[30rem] bg-primary col-span-1 mx-auto md:hidden" />
            <Card
              sx={{ maxWidth: "100%" }}
              className="col-start-7 col-end-12 md:col-span-12"
            >
              <CardContent>
                <div className="flex gap-5 items-center justify-start mb-3">
                  <div className="col-span-2 row-span-2">
                    <img
                      src="/images/logo.png"
                      alt="logo"
                      width={50}
                      height={50}
                    />
                  </div>
                  <Grid2 container>
                    <Grid2
                      size={12}
                      className="font-semibold subpixel-antialiased tracking-wide text-nowrap text-clamp truncate col-span-10"
                    >
                      ប្រព័ន្ធចតរថយន្តឆ្លាតវៃ
                    </Grid2>
                    <Grid2
                      size={12}
                      className="subpixel-antialiased text-nowrap text-clampSmall col-start-3 col-end-13 row-start-2 truncate"
                    >
                      Smart Parking System
                    </Grid2>
                  </Grid2>
                </div>

                <div className="flex flex-col gap-5">
                  <TextField
                    label="Verificaiton Code"
                    variant="outlined"
                    sx={{
                      "& .MuiInputBase-input": {
                        boxShadow: "none",
                      },
                    }}
                    type="text"
                    id="code"
                    name="code"
                    // autoFocus
                    fullWidth
                    value={values.code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    error={errors.code && touched.code}
                    helperText={
                      errors.code && touched.code ? errors.code : null
                    }
                    size="medium"
                  />

                  <LoadingButton
                    variant="contained"
                    size="large"
                    sx={{
                      textTransform: "none",
                    }}
                    loading={isVerify2FALoading}
                    type="submit"
                    className="bg-primary w-full hover:bg-primary-hover"
                  >
                    Verify
                  </LoadingButton>
                </div>
              </CardContent>
            </Card>
          </Form>
        )}
      </Formik>
    );
  } else if (step === 3) {
    content = (
      <>
        <SeoComponent title="Select a branch" />
        <nav className="fixed top-0 left-0 w-full bg-white bg-opacity-5 lg:bg-opacity-0 z-20 backdrop-blur-3xl lg:backdrop-blur-0">
          <div className="flex justify-between items-center xxs:flex-nowrap flex-wrap">
            <LogoComponent />
            <div className="pr-[20px] flex gap-[16px]  items-center">
              <TranslateComponent />
              <SettingComponent />
            </div>
          </div>
        </nav>

        <Box
          component="div"
          sx={{
            bgcolor: "background.default",
            color: "text.primary",
            height: "100%",
          }}
        >
          <Formik
            initialValues={{ siteUuid: "" }}
            // validationSchema={validationSchema}
            onSubmit={handleSubmitSite}
          >
            {({
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              setFieldValue,
            }) => {
              const handleSiteChange = (value) => {
                console.log("value", value);
                setFieldValue("siteUuid", value);
              };
              return (
                <Form>
                  <section className="flex h-screen">
                    <div className="h-screen shrink-0 w-[480px] hidden lg:block bg-[#f5f5f5]">
                      <div className="px-[20px] h-full text-center flex justify-center items-center flex-col">
                        <img
                          src="/images/login_image.png"
                          alt="login_image"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                    <Box
                      sx={{
                        width: "100%",
                        px: "20px",
                        py: 15,
                      }}
                      className="flex flex-col justify-start items-center lg:justify-center"
                    >
                      <Box
                        sx={{ maxWidth: "500px" }}
                        className="w-full flex flex-col justify-center items-center"
                      >
                        <img
                          src="/images/building.png"
                          alt="branch_image"
                          className="w-20 h-auto mb-5"
                        />
                        <Typography variant="h6" sx={{ mb: "30px" }}>
                          {t("selectBranch")}
                        </Typography>
                        <Typography variant="body1" color="gray">
                          {t("your-account-have")} {brachCount}{" "}
                          {t("branch-to-select")}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ mb: "30px" }}
                          color="gray"
                        >
                          {t("please-select-branch")}
                        </Typography>
                        <SelectSingleComponent
                          label={t("Select-branch")}
                          fullWidth={true}
                          options={sitesUuid}
                          optionLabelKey="siteName"
                          onChange={handleSiteChange}
                        />
                        <LoadingButton
                          variant="contained"
                          size="large"
                          sx={{
                            textTransform: "none",
                            borderRadius: "6px",
                            mt: 2,
                          }}
                          loading={isVerifySiteLoading}
                          type="submit"
                          className="w-full "
                        >
                          {t("select")}
                        </LoadingButton>
                      </Box>
                    </Box>
                  </section>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </>
    );
  }

  return content;
}
