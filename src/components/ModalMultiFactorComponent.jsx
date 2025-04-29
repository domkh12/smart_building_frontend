import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Divider, Modal, Skeleton, Typography} from "@mui/material";
import {useGetQrCode2FaMutation, useVerifyTwoFaMutation} from "../redux/feature/auth/authApiSlice.js";
import {useEffect, useState} from "react";
import {selectQrCodeUrl} from "../redux/feature/auth/authSlice.js";
import useTranslate from "../hook/useTranslate.jsx";
import {setIsOpenModalMultiFactor} from "../redux/feature/users/userSlice.js";
import OTPInput from "react-otp-input";
import {FaPaste} from "react-icons/fa6";
import {Slide, toast} from "react-toastify";

function ModalMultiFactorComponent() {
    const [otp, setOtp] = useState('');
    const mode = useSelector((state) => state.theme.mode);
    const {t} = useTranslate();
    const open = useSelector((state) => state.users.isOpenModalMultiFactor);
    const dispatch = useDispatch();
    const qrCodeUrl = useSelector(selectQrCodeUrl);
    const [getQrCode2Fa, {}] = useGetQrCode2FaMutation();
    const [verifyTwoFa, {
        isSuccess: isSuccessVerifyTwoFa,
        isLoading: isLoadingVerifyTwoFa,
        isError: isErrorVerifyTwoFa,
        error: errorVerifyTwoFa,
    }] = useVerifyTwoFaMutation();

    useEffect(() => {
        const fetchData = async () => {

            try {
                const promises = [];
                promises.push(getQrCode2Fa());

                await Promise.all(promises);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (open) {
            fetchData();
        }
    }, [open]);

    const handleClose = () => {
        dispatch(setIsOpenModalMultiFactor(false));
        setOtp('');
    };

    const handlePastBtnClick = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setOtp(text.slice(0, 6));
        }catch (error){
            console.log(error);
        }
    };

    const handlePaste = (event) => {
        const data = event.clipboardData.getData('text');
    };

    useEffect(() => {
        if (otp.length === 6) {
            verifyTwoFa({
                code: otp
            })
        }
    }, [otp])

    useEffect(() => {
        if (isSuccessVerifyTwoFa) {
            toast.success(t("verify2FaSuccess"), {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                transition: Slide,
            });
            handleClose();
        }
    }, [isSuccessVerifyTwoFa])

    useEffect(() => {
        if (isErrorVerifyTwoFa) {
            toast.error(t("verify2FaError"), {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                transition: Slide,
            });
        }
    }, [isErrorVerifyTwoFa]);

    return (<>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card
                sx={{p: 2}}
            >
                <Typography variant="h6"
                            sx={{
                                padding: "1rem",
                                display: "flex",
                                mb: 2,
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}>
                    {t('scanQrCode')}
                </Typography>

                <Typography align="center">
                    {t('qrScanDescription')}
                </Typography>

                <Typography align="center" mt={3}>
                    {t('scanQrGuide')}
                </Typography>

                <div className="p-4 flex justify-center flex-col items-center ">
                    {qrCodeUrl ? (
                        <img
                            src={qrCodeUrl}
                            alt="qrcode"
                            className="w-32 h-32"
                            loading="lazy"
                        />
                    ) : (
                        <Skeleton
                            sx={{bgcolor: "grey.500"}}
                            variant="rectangular"
                            width={118}
                            height={118}
                        />
                    )}

                    <Divider/>

                    {/* code verify start */}
                    <Typography
                        variant="body2"
                        sx={{mt: 2}}
                    >
                        {t("enterVerifyCode")}
                    </Typography>

                    <div>
                        <div className="flex justify-end items-end my-2">
                            <Button
                                startIcon={<FaPaste/>}
                                onClick={handlePastBtnClick}
                            >
                                Past
                            </Button>
                        </div>
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
                                backgroundColor: mode === "dark" ? "black" : "white"
                            }}
                        />
                    </div>
                    {/* code verify end */}

                </div>

                <div className="flex justify-end my-2 items-end gap-3">
                    <Button
                        variant="outlined"
                        onClick={handleClose}
                    >
                        {t('cancel')}
                    </Button>
                    <Button variant="contained">{t('enable')}</Button>
                </div>
            </Card>
        </Modal>
    </>);
}

export default ModalMultiFactorComponent;