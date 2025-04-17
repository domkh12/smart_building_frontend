import {
  Alert,
  Box,
  Button,
  Divider,
  Grid2,
  IconButton,
  Link,
  Paper,
  Popover,
  Skeleton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  useDisableTwoFaMutation,
  useGetQrCode2FaMutation,
  useVerifyTwoFaMutation,
} from "../../../redux/feature/auth/authApiSlice";
import { useEffect, useState } from "react";
import { PiCopyThin, PiXThin } from "react-icons/pi";
import OTPInput from "./OTPInput";
import {
  useGet2faSecretCodeMutation,
  useGet2faStatusMutation,
} from "../../../redux/feature/users/userApiSlice";
import {
  selectIsTwoFAEnabled,
  selectTwoFASecretCode,
} from "../../../redux/feature/auth/authSlice";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

function Google2FAAuthenticator({ qrCodeUrl }) {
  const [copied, setCopied] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpeningPoppOverForm, setIsOpeningPopOverForm] = useState(false);
  const twoFASecretCode = useSelector(selectTwoFASecretCode);
  const isTwoFaEnabled = useSelector(selectIsTwoFAEnabled);

  const [disableTwoFa, { isSuccess: isDisableTwoFaSuccess }] =
    useDisableTwoFaMutation();

  const [get2faStatus, { isLoading: isLoadingGet2faStatus }] =
    useGet2faStatusMutation();

  const [
    verifyTwoFa,
    {
      isSuccess: isVerifyTwoFaSuccess,
      isLoading: isVerifyTwoFaLoading,
      isError: isVerifyTwoFaError,
    },
  ] = useVerifyTwoFaMutation();

  const [getQrCode2Fa, { isLoading: isgetQrCode2FaLoading }] =
    useGetQrCode2FaMutation();

  const [
    get2faSecretCode,
    {
      isLoading: isget2faSecretCodeLoading,
      isSuccess: isget2faSecretCodeSuccess,
    },
  ] = useGet2faSecretCodeMutation();  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpeningPopOverForm(true);
  };

  const handleBtnDisable2FAClick = async () => {
    try {
      await disableTwoFa();
    } catch (err) {
      console.log(err);
    }
  };

  const handleActivateBtnClick = async (otp) => {
    await verifyTwoFa(otp);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  
  
  useEffect(() => {
    const fetch2faStatus = async () => {
      await get2faStatus();
    };
    fetch2faStatus();
  }, []);

  useEffect(() => {
    if (isVerifyTwoFaSuccess) {
      setAnchorEl(null);
      toast.success("2FA setup successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      const fetch2faStatus = async () => {
        await get2faStatus();
      };
      fetch2faStatus();
    }
  }, [isVerifyTwoFaSuccess]);

  useEffect(() => {
    if (isDisableTwoFaSuccess) {
      const fetch2faStatus = async () => {
        await get2faStatus();
      };
      fetch2faStatus();
    }
  }, [isDisableTwoFaSuccess]);

  useEffect(() => {
    if (isVerifyTwoFaError) {
      toast.error("Verification failed.", {
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
  }, [isVerifyTwoFaError]);

  useEffect(() => {
    if (isget2faSecretCodeSuccess) {
      setShortUrl(twoFASecretCode);
    }
  }, [isget2faSecretCodeSuccess]);

  useEffect(() => {
    if (isOpeningPoppOverForm) {
      const handleBtnEnable2FAClick = async () => {
        await getQrCode2Fa();
        await get2faSecretCode();
      };
      handleBtnEnable2FAClick();
    }
  }, [isOpeningPoppOverForm]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box className="p-3 rounded-[20px] border border-gray-300">
      <Grid2 container spacing={2} sx={{ alignItems: "center" }}>
        <Grid2 size={2}>
          <svg
            version="1.0"
            id="katman_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 841.89 595.28"
            xmlSpace="preserve"
          >
            <g>
              <path
                className="st0"
                d="M396.69,255.64h-48.5L277.4,133.02c-11.6-20.08-4.72-45.78,15.38-57.37c6.61-3.82,13.83-5.63,20.96-5.63
    c14.51,0,28.63,7.53,36.41,21.01l70.79,122.6L396.69,255.64z"
                style={{ fill: "#FCBC05" }}
              />
              <path
                className="st1"
                d="M549.11,519.63c-20.08,11.6-45.78,4.71-57.39-15.38l-70.79-122.6l-70.79,122.6
    c-11.6,20.08-37.29,26.98-57.37,15.38c-13.47-7.78-21.01-21.9-21.01-36.41c0-7.13,1.81-14.35,5.63-20.98l70.79-122.6H493.7
    l70.79,122.6C576.09,482.34,569.19,508.03,549.11,519.63z"
                style={{ fill: "#E94335" }}
              />
              <path
                className="st2"
                d="M677.28,297.63c0,23.2-18.81,42.01-42.01,42.01H493.7l-24.26-42.01l-24.24-42l-24.26-42.01l70.79-122.6
    c11.6-20.1,37.3-26.98,57.39-15.38c20.08,11.59,26.98,37.29,15.38,57.37L493.7,255.64h141.57
    C658.48,255.64,677.28,274.44,677.28,297.63z"
                style={{ fill: "#1973E8" }}
              />
              <path
                className="st3"
                d="M396.69,255.64l-24.26,42l-24.24,42.01H206.6c-23.19,0-42-18.81-42-42.01c0-11.59,4.69-22.09,12.3-29.7
    c7.61-7.59,18.09-12.3,29.7-12.3H396.69z"
                style={{ fill: "#34A853" }}
              />
              <polygon
                className="st4"
                points="493.7,339.64 348.19,339.64 372.43,297.63 396.69,255.64 420.94,213.62 445.2,255.64 469.44,297.63"
                style={{ fill: "#174FA7" }}
              />
            </g>
          </svg>
        </Grid2>
        <Grid2 size={8}>
          <div>
            <Typography variant="subtitle1">
              Two-factor authentication
            </Typography>
            <Typography sx={{ mt: 2 }} variant="body2">
              Two-factor authentication is an enhanced security measure. Onece
              enabled, you'll be required to give two types of indentification
              when you log into SPS.{" "}
              <span className="font-semibold">Google Authenticator</span>
            </Typography>
          </div>
        </Grid2>
        <Grid2
          size={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {isLoadingGet2faStatus ? (
            <>           
              <Skeleton sx={{ bgcolor: "grey.500" }} animation="wave" width={300} height={60} />
            </>
          ) : (
            <>
              {isTwoFaEnabled ? (
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    borderRadius: "2rem",
                    height: "2.5rem",
                    paddingX: "1.5rem",
                    textWrap: "nowrap",
                  }}
                  color="error"
                  onClick={handleBtnDisable2FAClick}
                  aria-describedby={id}
                >
                  Disable 2FA
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    borderRadius: "2rem",
                    height: "2.5rem",
                    paddingX: "1.5rem",
                    textWrap: "nowrap",
                  }}
                  onClick={handleClick}
                  aria-describedby={id}
                >
                  Enable 2FA
                </Button>
              )}
            </>
          )}

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              "& .MuiPopover-paper": {
                width: "38rem",
                height: "auto",
                borderRadius: "20px",
              },
            }}
          >
            <Box sx={{}}>
              <Typography variant="body2" component="div">
                <Typography
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  Two-factor authentication
                  <IconButton aria-label="close" onClick={handleClose}>
                    <PiXThin />
                  </IconButton>
                </Typography>
                <Divider />
                <div className="p-4 flex justify-center flex-col items-center">
                  {qrCodeUrl ? (
                    <img
                      src={qrCodeUrl}
                      alt="qrcode"
                      className="w-32 h-32"
                      loading="lazy"
                    />
                  ) : (
                    <Skeleton
                      sx={{ bgcolor: "grey.500" }}
                      variant="rectangular"
                      width={118}
                      height={118}
                    />
                  )}

                  <Typography
                    variant="body2"
                    component="div"
                    className="grid gap-5 grid-cols-12"
                    sx={{ mt: 2 }}
                  >
                    <div className="bg-gray-200 w-10 h-10 rounded-full col-span-1 flex justify-center items-center font-medium">
                      1
                    </div>
                    <p className="col-span-11">
                      Scan the QR code using any authentication application on
                      your phone. (e.g.{" "}
                      <Link
                        href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en"
                        underline="always"
                        target="_blank"
                      >
                        {"Google Authenticator"}
                      </Link>
                      ,{" "}
                      <Link
                        href="https://play.google.com/store/apps/details?id=com.duosecurity.duomobile&hl=en"
                        underline="always"
                        target="_blank"
                      >
                        {"Duo Mobile"}
                      </Link>
                      ,{" "}
                      <Link
                        href="https://play.google.com/store/apps/details?id=com.duosecurity.duomobile&hl=en"
                        underline="always"
                        target="_blank"
                      >
                        {"Authy"}
                      </Link>
                      ) or enter the following code:
                    </p>
                  </Typography>
                  {/* copy clipboard start */}
                  <Typography
                    component="div"
                    className="w-full grid grid-cols-12"
                  >
                    <div className="col-span-1"></div>
                    <Paper
                      sx={{
                        height: "3rem",
                        width: "100%",
                        mt: 2,
                        borderRadius: "25px",
                      }}
                      elevation={2}
                      className="copy-box flex justify-between items-center col-span-11"
                    >
                      <Box sx={{ p: "20px" }}>
                        {isget2faSecretCodeLoading ? (
                          <Skeleton
                            sx={{ bgcolor: "grey.500" }}
                            width={300}
                            height={30}
                          />
                        ) : (
                          <>{shortUrl}</>
                        )}
                      </Box>
                      <Tooltip title={copied ? "Copied" : "Copy to clipboard"}>
                        <IconButton
                          onClick={handleCopy}
                          sx={{ minWidth: "30px", marginRight: "1rem" }}
                        >
                          <PiCopyThin className="h-7 w-7" />
                        </IconButton>
                      </Tooltip>
                    </Paper>
                  </Typography>
                  {/* copy clipboard start */}
                  {/* code verify start */}
                  <Typography
                    variant="body2"
                    component="div"
                    className="grid gap-5 grid-cols-12 items-center"
                    sx={{ mt: 2 }}
                  >
                    <div className="bg-gray-200 w-10 h-10 rounded-full col-span-1 flex justify-center items-center font-medium">
                      2
                    </div>
                    <p className="col-span-11">
                      Enter the 6 figure confirmation code shown on the app:
                    </p>
                  </Typography>
                  <Typography
                    component="div"
                    className="grid grid-cols-12 w-full"
                    sx={{ mt: 2 }}
                  >
                    <div className="col-span-1"></div>
                    <div className="col-span-11">
                      <OTPInput
                        length={6}
                        onComplete={handleActivateBtnClick}
                      />
                    </div>
                  </Typography>
                  {/* code verify end */}
                  {/* warning start */}
                  <Typography component="div" sx={{ mt: 2 }} className="w-full">
                    <Alert severity="warning">
                      You will logged out from all your devices and browsers
                      that have been used to log in to your account recently for
                      security reasons.
                    </Alert>
                  </Typography>
                  {/* warning end */}
                </div>
                <Divider />
                <div className="flex justify-end items-center gap-2 p-4">
                  <Button
                    variant="text"
                    onClick={handleClose}
                    sx={{
                      borderRadius: "20px",
                      paddingX: "1rem",
                    }}
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    loading={isVerifyTwoFaLoading}
                    variant="contained"
                    sx={{
                      borderRadius: "20px",
                    }}
                  >
                    Verify
                  </LoadingButton>
                </div>
              </Typography>
            </Box>
          </Popover>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Google2FAAuthenticator;
