import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useTranslate from "../hook/useTranslate.jsx";
import ToolTipButtonComponent from "./ToolTipButtonComponent.jsx";
import {CgMenuLeftAlt} from "react-icons/cg";
import {
    Box,
    Collapse,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader, Paper,
    Typography
} from "@mui/material";
import LogoComponent from "./LogoComponent.jsx";
import {IoIosArrowDown, IoIosArrowForward} from "react-icons/io";
import {listItemButtonStyle} from "../assets/style.js";
import SpaceDashboardTwoToneIcon from "@mui/icons-material/SpaceDashboardTwoTone";
import LogoTwoComponent from "./LogoTwoComponent.jsx";

function SidebarDrawerUserComponent() {
    const [isOverviewOpen, setIsOverviewOpen] = useState(true);
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const {t} = useTranslate();

    const handleOverViewClick = () => {
        setIsOverviewOpen(!isOverviewOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setOpen(false);
    };

    return (
        <div>
            <ToolTipButtonComponent
                title={"Collapse"}
                icon={CgMenuLeftAlt}
                onClick={() => setOpen(true)}
            />
            {open && (
                <Drawer open={open} onClose={() => setOpen(false)} elevation={0}>
                    <Paper elevation={0} sx={{width: 280, height: "100%"}} role="presentation">
                        <LogoTwoComponent/>
                        <div className="px-[16px] overflow-auto">
                            <List
                                component="div"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader
                                        sx={{
                                            fontSize: "12px",
                                            minWidth: 0,
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "auto",
                                            position: "inherit",
                                        }}
                                        className="group cursor-pointer hover:text-gray-cus"
                                        component="span"
                                        id="overview"
                                        onClick={handleOverViewClick}
                                    >
                                        {isOverviewOpen ? (
                                            <IoIosArrowDown
                                                className="absolute w-4 h-auto left-0 opacity-0 group-hover:opacity-100 "/>
                                        ) : (
                                            <IoIosArrowForward
                                                className="absolute w-4 h-auto left-0 opacity-0 group-hover:opacity-100 "/>
                                        )}
                                        <p
                                            className={`group-hover:translate-x-1 transition-[2s] duration-200`}
                                        >
                                            {t('overview')}
                                        </p>
                                    </ListSubheader>
                                }
                            >
                                <Collapse in={isOverviewOpen} timeout="auto" unmountOnExit>
                                    <ListItemButton
                                        sx={{
                                            borderRadius: "10px",

                                            mb: "5px",
                                            ...listItemButtonStyle,
                                        }}
                                        onClick={() => {
                                            handleNavigation("/user");
                                            setOpen(false);
                                        }}
                                        selected={location.pathname === "/user"}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: 1,
                                            }}
                                        >
                                            <SpaceDashboardTwoToneIcon className="w-6 h-6"/>
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={
                                                <Typography
                                                    component="span"
                                                    variant="body1"
                                                    sx={{

                                                        display: "inline",
                                                    }}
                                                >
                                                    {t("dashboard")}
                                                </Typography>
                                            }
                                        />
                                    </ListItemButton>

                                </Collapse>
                            </List>

                        </div>
                    </Paper>
                </Drawer>
            )}
        </div>
    );
}

export default SidebarDrawerUserComponent;