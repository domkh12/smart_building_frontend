import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBarDashboardManager from "./NavBarDashboardManager.jsx";
import SideBarManager from "./SideBarManager.jsx";
import { useEffect, useRef, useState } from "react";
import {
  setIsPaginationSuccess,
  setIsScrolling,
} from "../../redux/feature/actions/actionSlice";
import { useConnectedUserMutation } from "../../redux/feature/users/userApiSlice";
import useWebSocket from "../../hook/useWebSocket";
import { setIsOnlineUser } from "../../redux/feature/users/userSlice";
import SnackBarComponent from "../../components/SnackBarComponent";
import { DESTINATION } from "../../config/destination";
import { useGetUserProfileMutation } from "../../redux/feature/auth/authApiSlice";
import DeleteConfirmComponent from "../../components/DeleteConfirmComponent";
import { setUserProfile } from "../../redux/feature/auth/authSlice";
import SettingDrawerComponent from "../../components/SettingDrawerComponent";
import WaveLoadingComponent from "../../components/WaveLoadingComponent.jsx";
import {Box, Paper} from "@mui/material";

function ManagerLayout() {
  const isPaginationSuccess = useSelector(
    (state) => state.action.isPaginationSuccess
  );
  const user = useSelector((state) => state.users.user);
  const mainContentRef = useRef(null);
  const dispatch = useDispatch();
  const [scrolling, setScrolling] = useState();
  const { loading, error, messages } = useWebSocket(DESTINATION.isOnline);
  const isErrorSnackbar = useSelector((state) => state.action.isErrorSnackbar);
  const isLoadingSnackbar = useSelector(
    (state) => state.action.isLoadingSnackbar
  );
  const changedSite = useSelector((state) => state.sites.changedSite);
  const isOpenSnackBar = useSelector((state) => state.action.isOpenSnackBar);
  const captionSnackBar = useSelector((state) => state.action.captionSnackBar);
  const [isLoading, setIsLoading] = useState(true);

  const [
    connectedUser,
    { isSuccess: isSuccessConnectUser, isLoading: isLoadingConnectUser },
  ] = useConnectedUserMutation();

  const [
    getUserProfile,
    { isSuccess: isSuccessGetUserProfile, isLoading: isLoadingGetUserProfile },
  ] = useGetUserProfileMutation();

  useEffect(() => {
    if (messages) {
      dispatch(setIsOnlineUser(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (isPaginationSuccess) {
      console.log("Scrolling to top");
      if (mainContentRef.current) {
        mainContentRef.current.scrollTo({ top: 0 });
        dispatch(setIsPaginationSuccess(false));
      }
    }
  }, [isPaginationSuccess]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const res = await getUserProfile().unwrap();
        dispatch(setUserProfile(res));
        await connectedUser({id: res?.id, isOnline: true});
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
        alert("Search Text");
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
    content = <WaveLoadingComponent />;
  }

  if (isSuccessGetUserProfile || isSuccessConnectUser) {
    content = (
      <Paper elevation={0} className="fixed top-0 left-0 w-full h-screen dark:bg-[#282828]">
        <Paper elevation={0} className="flex h-full bg-white">
          <SideBarManager />
          {/* <main className="flex flex-grow h-full overflow-auto"> */}
          <Box component="div" className="flex-grow h-full overflow-auto">
            <header className="sticky top-0 w-full z-20">
              <NavBarDashboardManager />
            </header>
            <Box component="main"
              ref={mainContentRef}
              className="xl:px-[40px] px-[10px] sm:px-[20px] pt-[8px] pb-[64px] "
            >
              <Outlet />
            </Box>
          </Box>
          {/* </main> */}
        </Paper>
        <SnackBarComponent
          isError={isErrorSnackbar}
          isLoading={isLoadingSnackbar}
          caption={captionSnackBar}
          isOpen={isOpenSnackBar}
        />
        <DeleteConfirmComponent />
        <SettingDrawerComponent />
      </Paper>
    );
  }

  return content;
}

export default ManagerLayout;
