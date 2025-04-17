import {
    Avatar,
    Box,
    Button,
    Chip,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {IoClose} from "react-icons/io5";
import {useSendLogoutMutation} from "../redux/feature/auth/authApiSlice";
import {useNavigate} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import useAuth from "../hook/useAuth";
import {useSelector} from "react-redux";
import {FaUserCircle, FaUserTie} from "react-icons/fa";
import {listItemButtonStyle} from "../assets/style";
import {useConnectedUserMutation} from "../redux/feature/users/userApiSlice";
import PortraitTwoToneIcon from "@mui/icons-material/PortraitTwoTone";
import useTranslate from "../hook/useTranslate";
import {deepPurple, red} from "@mui/material/colors";

function ProfileDrawerComponent({open: initialOpen, onClose}) {
    const {username, status} = useAuth();
    const user = useSelector((state) => state.users.user);
    const [open, setOpen] = useState(initialOpen);
    const {t} = useTranslate();
    const navigate = useNavigate();
    const [sendLogout, {isLoading, isSucess, isError, error}] =
        useSendLogoutMutation();

    const handleDrawerClose = () => {
        onClose();
    };

    const [
        connectedUser,
        {isSuccess: isSuccessConnectUser, isLoading: isLoadingConnectUser},
    ] = useConnectedUserMutation();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleSendLogout = async () => {
        try {
            await connectedUser({uuid: user?.uuid, isOnline: false});
            await sendLogout().unwrap();
            navigate("/login");
            localStorage.removeItem("isRemember");
            onClose();
        } catch (err) {
            console.error("Logout failed:", err);
            onClose();
        }
    };

    useEffect(() => {
        setOpen(initialOpen);
    }, [initialOpen]);

    return (
        <div>
            <Drawer open={open} onClose={handleDrawerClose} anchor={"right"}>
                <Box
                    sx={{width: 320}}
                    role="presentation"
                    onClick={toggleDrawer(true)}
                >
                    <div className="overflow-auto pb-[20px]">
                        <Box sx={{mt: "10px", paddingX: "10px"}}>
                            <IconButton onClick={handleDrawerClose}>
                                <IoClose/>
                            </IconButton>
                        </Box>

                        <List
                            component="div"
                            aria-labelledby="nested-list-subheader"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                paddingBottom: "30px",
                                gap: "30px",
                            }}
                            className="border-b border-dashed"
                        >
                            <div className="relative p-[3px] flex justify-center items-center  w-fit ">
                                <div
                                    className="w-full h-full bg-gradient-to-r from-primary to-secondary animate-spin-slow absolute rounded-full "></div>
                                <IconButton
                                    sx={{
                                        p: 0,
                                        cursor: "auto",
                                    }}
                                    className="flex justify-center items-center"
                                    disableRipple
                                >
                                    <Avatar
                                        alt="Profile"
                                        src={user.profileImage}
                                        sx={{width: 100, height: 100}}
                                    />
                                </IconButton>
                            </div>
                            <Box className="flex flex-col justify-center items-center">
                                <Typography>{user.fullName}</Typography>
                                <Chip icon={<FaUserTie className="w-5 h-5"/>} label={status}/>
                                <Typography variant="body1" color="gray">
                                    {username}
                                </Typography>
                            </Box>
                        </List>

                        <List
                            component="div"
                            aria-labelledby="nested-list-subheader"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                paddingBottom: "30px",
                                gap: "30px",
                                mt: "20px",
                                paddingX: "20px",
                            }}
                            className="border-b border-dashed"
                        >
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        navigate("accounts");
                                        handleDrawerClose();
                                    }}
                                    sx={{borderRadius: "6px", ...listItemButtonStyle}}
                                >
                                    <ListItemIcon sx={{mr: "10px", minWidth: 0}}>
                                        <PortraitTwoToneIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={t("account")}/>
                                </ListItemButton>
                            </ListItem>
                        </List>

                        <List
                            component="div"
                            aria-labelledby="nested-list-subheader"
                            sx={{paddingX: "20px"}}
                        >
                            <LoadingButton
                                variant="contained"
                                loading={isLoading}
                                loadingIndicator="Logging out..."
                                sx={{
                                    color: "#B60A00",
                                    width: "100%",
                                    height: "50px",
                                    boxShadow: "none",
                                    backgroundColor: red[200],
                                    borderRadius: "8px",
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: red[300],
                                        boxShadow: "none",
                                    }
                                }}
                                onClick={handleSendLogout}
                            >
                                Logout
                            </LoadingButton>
                        </List>
                    </div>
                </Box>
            </Drawer>
        </div>
    );
}

export default ProfileDrawerComponent;
