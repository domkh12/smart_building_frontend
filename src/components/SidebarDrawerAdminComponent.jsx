import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useTranslate from "../hook/useTranslate.jsx";
import ToolTipButtonComponent from "./ToolTipButtonComponent.jsx";
import {CgMenuLeftAlt} from "react-icons/cg";
import {
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
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import MeetingRoomTwoToneIcon from "@mui/icons-material/MeetingRoomTwoTone";
import TipsAndUpdatesTwoToneIcon from "@mui/icons-material/TipsAndUpdatesTwoTone";
import LogoTwoComponent from "./LogoTwoComponent.jsx";

function SidebarDrawerAdminComponent() {
    const [isOverviewOpen, setIsOverviewOpen] = useState(true);
    const [isManagementOpen, setIsManagementOpen] = useState(true);
    const [isUserOpen, setIsUserOpen] = useState(false);
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const isUserListPage = location.pathname === "/admin/users";
    const isUserCreatePage = location.pathname === "/admin/users/new";
    const navigate = useNavigate();
    const { t } = useTranslate();

    const handleOverViewClick = () => {
        setIsOverviewOpen(!isOverviewOpen);
    };

    const handleManagementClick = () => {
        setIsManagementOpen(!isManagementOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setOpen(false);
    };

    return (
        <Paper elevation={0}>
            <ToolTipButtonComponent
                title={"Collapse"}
                icon={CgMenuLeftAlt}
                onClick={() => setOpen(true)}
            />
            {open && (
                <Drawer open={open} onClose={() => setOpen(false)} elevation={0}>
                    <Paper elevation={0} sx={{ width: 280 }} role="presentation">
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
                                            <IoIosArrowDown className="absolute w-4 h-auto left-0 opacity-0 group-hover:opacity-100 " />
                                        ) : (
                                            <IoIosArrowForward className="absolute w-4 h-auto left-0 opacity-0 group-hover:opacity-100 " />
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
                                            handleNavigation("/admin");
                                            setOpen(false);
                                        }}
                                        selected={location.pathname === "/admin"}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: 1,
                                            }}
                                        >
                                            <SpaceDashboardTwoToneIcon className="w-6 h-6" />
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
                                    <ListItemButton
                                        sx={{
                                            borderRadius: "10px",
                                            
                                            mb: "5px",
                                            ...listItemButtonStyle,
                                        }}
                                        onClick={() => handleNavigation("/admin/devices-control")}
                                        selected={location.pathname === "/admin/devices-control"}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,

                                                mr: 1,
                                            }}
                                        >
                                            <SettingsRemoteIcon className="w-6 h-6" />
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={
                                                <Typography
                                                    component="span"
                                                    variant="body1"
                                                    sx={{
                                                        
                                                        display: "inline",
                                                        textWrap: "nowrap",
                                                    }}
                                                >
                                                    {t("controll_device")}
                                                </Typography>
                                            }
                                        />
                                    </ListItemButton>

                                </Collapse>
                            </List>

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
                                        id="managements"
                                        onClick={handleManagementClick}
                                    >
                                        {isManagementOpen ? (
                                            <IoIosArrowDown className="absolute w-4 h-auto left-0 opacity-0 group-hover:opacity-100 " />
                                        ) : (
                                            <IoIosArrowForward className="absolute w-4 h-auto left-0 opacity-0 group-hover:opacity-100 " />
                                        )}
                                        <p
                                            className={`group-hover:translate-x-1 transition-[2s] duration-200`}
                                        >
                                            {t('management')}
                                        </p>
                                    </ListSubheader>
                                }
                            >
                                <Collapse in={isManagementOpen} timeout="auto" unmountOnExit>

                                    {/* Room Menu */}
                                    <ListItemButton
                                        sx={{
                                            borderRadius: "10px",

                                            mb: "5px",
                                            ...listItemButtonStyle,
                                        }}
                                        onClick={() => {
                                            handleNavigation("/admin/rooms");
                                            setOpen(false);
                                        }}
                                        selected={location.pathname === "/admin/rooms"}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: 1,
                                            }}
                                        >
                                            <MeetingRoomTwoToneIcon className="w-6 h-6" />
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
                                                    {t("room")}
                                                </Typography>
                                            }
                                        />
                                    </ListItemButton>

                                    {/*Device Menu */}
                                    <ListItemButton
                                        sx={{
                                            borderRadius: "10px",

                                            mb: "5px",
                                            ...listItemButtonStyle,
                                        }}
                                        onClick={() => {
                                            handleNavigation("/admin/devices");
                                            setOpen(false);
                                        }}
                                        selected={location.pathname === "/admin/devices"}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: 1,
                                            }}
                                        >
                                            <TipsAndUpdatesTwoToneIcon className="w-6 h-6" />
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
                                                    {t("device")}
                                                </Typography>
                                            }
                                        />
                                    </ListItemButton>

                                    {/* User Menu */}
                                    <ListItemButton
                                        sx={{
                                            borderRadius: "10px",
                                            
                                            ...((isUserListPage || isUserCreatePage) &&
                                                listItemButtonStyle),
                                            mt: "5px",
                                        }}
                                        selected={
                                            isUserOpen
                                                ? isUserOpen
                                                : isUserListPage || isUserCreatePage
                                        }
                                        onClick={() => setIsUserOpen(!isUserOpen)}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: 1,
                                            }}
                                        >
                                            <AccountBoxTwoToneIcon className="w-6 h-6" />
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={
                                                <Typography
                                                    component="span"
                                                    variant="body1"
                                                    sx={{  display: "inline" }}
                                                >
                                                    {t("user")}
                                                </Typography>
                                            }
                                        />

                                        {isUserOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
                                    </ListItemButton>

                                    <Collapse in={isUserOpen}>
                                        <List
                                            component="div"
                                            disablePadding
                                            sx={{ pt: 1 }}
                                            dense={true}
                                        >
                                            <ul className="ml-6 pl-[12px]">
                                                <div className="absolute h-[60px] border-l-[2px] bg-primary left-6 top-0"></div>
                                                <li>
                                                    <img
                                                        src="/images/nav_sublist.svg"
                                                        alt="sub_list_img"
                                                        className="absolute top-[6px] left-6 h-[30px] w-[14px]"
                                                    />
                                                    <ListItemButton
                                                        sx={{
                                                            borderRadius: "10px",
                                                            
                                                            mb: "5px",
                                                        }}
                                                        onClick={() => {
                                                            navigate("/admin/users")
                                                            setOpen(false);
                                                        }}
                                                        selected={location.pathname === "/admin/users"}
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                <Typography
                                                                    component="span"
                                                                    variant="body1"
                                                                    sx={{  display: "inline" }}
                                                                >
                                                                    {t("list")}
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItemButton>
                                                </li>
                                                <li>
                                                    <img
                                                        src="/images/nav_sublist.svg"
                                                        alt="sub_list_img"
                                                        className="absolute top-[55px] left-6 h-[14px] w-[14px]"
                                                    />
                                                    <ListItemButton
                                                        sx={{
                                                            borderRadius: "10px",
                                                            
                                                            mb: "5px",
                                                        }}
                                                        onClick={() => {
                                                            navigate("/admin/users/new")
                                                            setOpen(false);
                                                        }}
                                                        selected={location.pathname === "/admin/users/new"}
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                <Typography
                                                                    component="span"
                                                                    variant="body1"
                                                                    sx={{  display: "inline" }}
                                                                >
                                                                    {t("create")}
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItemButton>
                                                </li>
                                            </ul>
                                        </List>
                                    </Collapse>


                                </Collapse>
                            </List>
                        </div>
                    </Paper>
                </Drawer>
            )}
        </Paper>
    );
}

export default SidebarDrawerAdminComponent;