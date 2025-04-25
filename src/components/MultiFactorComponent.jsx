import {Card, Typography} from "@mui/material";
import useTranslate from "../hook/useTranslate.jsx";
import ButtonComponent from "./ButtonComponent.jsx";
import {useGet2faStatusMutation} from "../redux/feature/users/userApiSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {selectIsTwoFAEnabled} from "../redux/feature/auth/authSlice.js";
import {useEffect} from "react";
import {setIsOpenModalMultiFactor} from "../redux/feature/users/userSlice.js";
import ModalMultiFactorComponent from "./ModalMultiFactorComponent.jsx";

function MultiFactorComponent() {
    const {t} = useTranslate();
    const isTwoFaEnabled = useSelector(selectIsTwoFAEnabled);
    const dispatch = useDispatch();
    const [get2faStatus, {isLoading: isLoadingGet2faStatus}] =
        useGet2faStatusMutation();

    useEffect(() => {
        const fetchData = async () =>{
            await get2faStatus();
        }
        fetchData();
    }, [])
    console.log(isTwoFaEnabled)
    return (
        <>
            <Card sx={{p: 3, mx: "auto"}}>
                <Typography variant="h6" sx={{mb: 3}}>
                    {t('multiFactor')}
                </Typography>
                <div className="border p-5 rounded-[10px] gap-5 flex flex-col">
                    {isTwoFaEnabled ? (
                        <div className="flex justify-start items-center text-green-500 gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <p>{t('on')}</p>
                        </div>
                    ) : (
                        <div className="flex justify-start items-center text-red-500 gap-3">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <p>{t('off')}</p>
                        </div>
                    )}

                    <div className="flex justify-start flex-col items-start gap-2">
                        <p>Authenticator app</p>
                        <p>
                            Use an authenticator app to generate one time security codes.
                        </p>
                    </div>
                    {isTwoFaEnabled ? (
                        <div className="flex justify-end mt-[20px]">
                            <ButtonComponent
                                btnTitle={t("disable")}
                                backgroundColor="#ff0000"
                                hoverBackgroundColor="#ff0000"
                                // isLoading={isLoadingChangePassword}
                                // onClick={handleBtnDisable2FAClick}
                            />
                        </div>
                    ) : (
                        <div className="flex justify-end mt-[20px]">
                            <ButtonComponent
                                btnTitle={t("enable")}
                                // isLoading={isLoadingChangePassword}
                                onClick={() => dispatch(setIsOpenModalMultiFactor(true))}
                            />
                        </div>
                    )}
                </div>
            </Card>
            <ModalMultiFactorComponent />
        </>
    )
}

export default MultiFactorComponent;