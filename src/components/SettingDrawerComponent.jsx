import {
    Badge, badgeClasses,
    Box,
    Drawer, Grid2,
    IconButton, styled, Tooltip, Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setIsOpenSettingDrawer} from "../redux/feature/actions/actionSlice";
import useTranslate from "../hook/useTranslate.jsx";
import {GrPowerReset} from "react-icons/gr";
import {MdFullscreen} from "react-icons/md";
import SettingToggleButtonComponent from "./SettingToggleButtonComponent.jsx";
import {IoCloseOutline} from "react-icons/io5";
import {toggleMode} from "../redux/feature/theme/themeSlice.js";

function SettingDrawerComponent() {
    const open = useSelector((state) => state.action.isOpenSettingDrawer);
    const dispatch = useDispatch();
    const {t} = useTranslate();
    const mode = useSelector((state) => state.theme.mode);

    const CartBadge = styled(Badge)`
        & .${badgeClasses.badge} {
            top: -12px;
            right: -6px;
        }
    `;

    const handleFullScreen = () => {
        const doc = document;
        const docEl = document.documentElement;

        if (
            doc.fullscreenElement ||
            doc.webkitFullscreenElement ||
            doc.mozFullScreenElement ||
            doc.msFullscreenElement
        ) {
            // Exit full screen
            if (doc.exitFullscreen) {
                doc.exitFullscreen();
            } else if (doc.webkitExitFullscreen) {
                doc.webkitExitFullscreen();
            } else if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            } else if (doc.msExitFullscreen) {
                doc.msExitFullscreen();
            }
        } else {
            // Enter full screen
            if (docEl.requestFullscreen) {
                docEl.requestFullscreen();
            } else if (docEl.webkitRequestFullscreen) {
                docEl.webkitRequestFullscreen();
            } else if (docEl.mozRequestFullScreen) {
                docEl.mozRequestFullScreen();
            } else if (docEl.msRequestFullscreen) {
                docEl.msRequestFullscreen();
            }
        }
    };

    return (
        <>
            <Drawer
                anchor="right"
                open={open}
                onClose={() => dispatch(setIsOpenSettingDrawer(false))}
            >
                <Box
                    sx={{width: 360}}
                >
                    <div className="flex justify-between items-center p-4">
                        <Typography variant="h6"
                                    sx={{fontWeight: "500", fontSize: "1.2rem"}}>{t('settings')}</Typography>
                        <div>
                            <Tooltip arrow={true} title={t('fullScreen')}>
                                <IconButton aria-label="fullScreen" onClick={handleFullScreen}>
                                    <MdFullscreen className="w-7 h-7"/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={t('resetAll')}>
                                <IconButton>
                                    <GrPowerReset className="w-5 h-5"/>
                                    <CartBadge variant="dot" color="secondary" overlap="circular"/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow={true} title={t('close')}>
                                <IconButton aria-label="close" onClick={() => dispatch(setIsOpenSettingDrawer(false))}>

                                    <IoCloseOutline className="w-7 h-7"/>
                                </IconButton>
                            </Tooltip>

                        </div>
                    </div>

                    <Grid2 container spacing={2} sx={{paddingX: "16px"}}>
                        <Grid2 size={6}>
                            <SettingToggleButtonComponent title={t('darkMode')}
                                                          handleChange={() => dispatch(toggleMode())}
                                                          value={mode === "dark"}/>
                        </Grid2>
                    </Grid2>
                </Box>
            </Drawer>
        </>
    );
}

export default SettingDrawerComponent;
