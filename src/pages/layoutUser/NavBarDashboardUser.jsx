import {useDispatch} from "react-redux";
import {Avatar, IconButton, Paper} from "@mui/material";
import {useEffect, useState} from "react";
import NotificationsNoneTwoToneIcon from "@mui/icons-material/NotificationsNoneTwoTone";
import ToolTipButtonComponent from "../../components/ToolTipButtonComponent";
import {IoSearch} from "react-icons/io5";
import SettingComponent from "../../components/SettingComponent";
import TranslateComponent from "../../components/TranslateComponent";
import ProfileDrawerComponent from "../../components/ProfileDrawerComponent";
import SelectRoomComponent from "../../components/SelectRoomComponent.jsx";
import useAuth from "../../hook/useAuth";
import {
    useChangeRoomMutation,
    useGetUserProfileQuery,
} from "../../redux/feature/auth/authApiSlice";
import {setChangedSite} from "../../redux/feature/site/siteSlice";
import SidebarDrawerUserComponent from "../../components/SidebarDrawerUserComponent.jsx";
import {useGetAllRoomNamesQuery} from "../../redux/feature/room/roomApiSlice.js";
import UtilSearchComponent from "../../components/UtilSearchComponent.jsx";

function NavBarDashboardUser() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const {isAdmin, isManager, isUser, roomId} = useAuth();
    const dispatch = useDispatch();
    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };
    const {data: user} = useGetUserProfileQuery("profileList");
    const {data: room} = useGetAllRoomNamesQuery("roomNameList");

    const [
        changeRoom,
        {
            isSuccess: isSuccessChangeRoom,
            isLoading: isLoadingChangeRoom,
            isError: isErrorChangeRoom,
            error: errorChangeRoom,
        }
    ] = useChangeRoomMutation();

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const handleChange = async (value) => {
        await changeRoom({
            id: value
        });
    };

    useEffect(() => {
        if (isSuccessChangeRoom) {
            dispatch(setChangedSite(true));
        }
    }, [isSuccessChangeRoom]);

    return (
        <>
            <Paper elevation={0}
                   className="h-[70px] bg-white text-white bg-opacity-50 backdrop-blur-md flex justify-between flex-nowrap items-center xl:px-[40px] px-[10px] sm:px-[20px]">
                <div className=" flex items-center gap-[10px]">
                    <div className="xl:hidden">
                        <SidebarDrawerUserComponent />
                    </div>
                    {isUser && !isAdmin && !isManager && (
                        <SelectRoomComponent
                            options={room}
                            optionLabelKey="name"
                            onChange={handleChange}
                            selectFistValue={roomId[0]}
                        />
                    )}
                </div>

                <div className="flex lg:gap-2 items-center flex-nowrap">
                    <UtilSearchComponent/>

                    <TranslateComponent/>

                    <IconButton
                        aria-label="settings"
                        size="large"
                        className="active-scale hover-scale"
                    >
                        <NotificationsNoneTwoToneIcon className="w-6 h-6"/>
                    </IconButton>

                    <SettingComponent/>
                    <div className="relative p-[2px] flex justify-center items-center active-scale hover-scale">
                        <div
                            className="w-full h-full bg-gradient-to-r from-primary to-secondary animate-spin-slow absolute rounded-full "></div>
                        <IconButton
                            sx={{p: 0}}
                            className="w-auto h-auto  flex justify-center items-center"
                            onClick={handleDrawerOpen}
                        >
                            <Avatar alt="Profile" src={user?.profileImage}/>
                        </IconButton>
                    </div>
                </div>
            </Paper>

            {drawerOpen &&
                <ProfileDrawerComponent
                    open={drawerOpen}
                    onClose={handleDrawerClose}
                />
            }

        </>
    );
}

export default NavBarDashboardUser;
