import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import NavBarDashboardUser from "./NavBarDashboardUser.jsx";
import SideBarUser from "./SideBarUser.jsx";
import {useEffect, useRef, useState} from "react";
import {
    setIsPaginationSuccess,
    setIsScrolling,
} from "../../redux/feature/actions/actionSlice";
import {useConnectedUserMutation} from "../../redux/feature/users/userApiSlice";
import useWebSocket from "../../hook/useWebSocket";
import {setIsOnlineUser} from "../../redux/feature/users/userSlice";
import SnackBarComponent from "../../components/SnackBarComponent";
import {DESTINATION} from "../../config/destination";
import DeleteConfirmComponent from "../../components/DeleteConfirmComponent";
import {setUserProfile} from "../../redux/feature/auth/authSlice";
import SettingDrawerComponent from "../../components/SettingDrawerComponent";
import WaveLoadingComponent from "../../components/WaveLoadingComponent.jsx";
import {Paper} from "@mui/material";
import {useGetUserProfileQuery} from "../../redux/feature/auth/authApiSlice.js";
import {setOpenUtilSearch} from "../../redux/feature/app/appSlice.js";

function UserLayout() {
    const isPaginationSuccess = useSelector(
        (state) => state.action.isPaginationSuccess
    );
    const mainContentRef = useRef(null);
    const dispatch = useDispatch();
    const [scrolling, setScrolling] = useState();
    const {loading, error, messages} = useWebSocket(DESTINATION.isOnline);
    const isErrorSnackbar = useSelector((state) => state.action.isErrorSnackbar);
    const isLoadingSnackbar = useSelector(
        (state) => state.action.isLoadingSnackbar
    );
    const changedSite = useSelector((state) => state.sites.changedSite);
    const isOpenSnackBar = useSelector((state) => state.action.isOpenSnackBar);
    const captionSnackBar = useSelector((state) => state.action.captionSnackBar);
    const [isLoading, setIsLoading] = useState(true);
    const {data: user} = useGetUserProfileQuery("profileList");

    // const [
    //   getSitesList,
    //   {
    //     isSuccess: isGetSitesSuccess,
    //     isLoading: isGetSitesLoading,
    //     isError: isGetSitesError,
    //     error: errorGetSites,
    //   },
    // ] = useGetSitesListMutation();

    const [
        connectedUser,
        {isSuccess: isSuccessConnectUser, isLoading: isLoadingConnectUser},
    ] = useConnectedUserMutation();

    useEffect(() => {
        if (messages) {
            dispatch(setIsOnlineUser(messages));
        }
    }, [messages]);

    useEffect(() => {
        if (isPaginationSuccess) {
            console.log("Scrolling to top");
            if (mainContentRef.current) {
                mainContentRef.current.scrollTo({top: 0});
                dispatch(setIsPaginationSuccess(false));
            }
        }
    }, [isPaginationSuccess]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setIsLoading(true);
                const res = 1;
                dispatch(setUserProfile(res));
                await connectedUser({id: res, isOnline: true});
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserProfile();

    }, []);

    useEffect(() => {


        const handleScroll = () => {
            if (mainContentRef.current) {
                setScrolling(mainContentRef.current.scrollTop > 0);
            }
        };

        const currentRef = mainContentRef.current;
        if (currentRef) {
            currentRef.addEventListener("scroll", handleScroll);
        }

        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "k") {
                event.preventDefault();
                dispatch(setOpenUtilSearch(true));
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            if (currentRef) {
                currentRef.removeEventListener("scroll", handleScroll);
            }
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [dispatch]);

    useEffect(() => {
        if (changedSite) window.location.reload(true);
    }, [changedSite]);

    useEffect(() => {
        dispatch(setIsScrolling(scrolling));
    }, [scrolling]);

    let content;

    if (isLoading) {
        content = <WaveLoadingComponent/>; // Use LoadingOneComponent
    }

    if (isSuccessConnectUser) {
        content = (
            <Paper elevation={0} className="fixed top-0 left-0 w-full h-screen dark:bg-[#282828]">
                <Paper elevation={0} className="flex h-full bg-white">
                    <SideBarUser/>
                    {/* <main className="flex flex-grow h-full overflow-auto"> */}
                    <div className="flex-grow h-full overflow-auto">
                        <header className="sticky top-0 w-full z-20">
                            <NavBarDashboardUser/>
                        </header>
                        <main
                            ref={mainContentRef}
                            className="xl:px-[40px] px-[10px] sm:px-[20px] pt-[8px] pb-[64px] "
                        >
                            <Outlet/>
                        </main>
                    </div>
                    {/* </main> */}
                </Paper>
                <SnackBarComponent
                    isError={isErrorSnackbar}
                    isLoading={isLoadingSnackbar}
                    caption={captionSnackBar}
                    isOpen={isOpenSnackBar}
                />
                <DeleteConfirmComponent/>
                <SettingDrawerComponent/>
            </Paper>
        );
    }

    return content;
}

export default UserLayout;
