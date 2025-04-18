import { useDispatch, useSelector } from "react-redux";
import {Avatar, IconButton, Paper} from "@mui/material";
import { useEffect, useState } from "react";
import NotificationsNoneTwoToneIcon from "@mui/icons-material/NotificationsNoneTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import ToolTipButtonComponent from "../../components/ToolTipButtonComponent";
import { IoSearch } from "react-icons/io5";
import SettingComponent from "../../components/SettingComponent";
import TranslateComponent from "../../components/TranslateComponent";
import ProfileDrawerComponent from "../../components/ProfileDrawerComponent";
import useAuth from "../../hook/useAuth";
import { selectCurrentToken } from "../../redux/feature/auth/authSlice";
import { useVerifySitesMutation } from "../../redux/feature/auth/authApiSlice";
import { setChangedSite } from "../../redux/feature/site/siteSlice";
import SidebarDrawerAdminComponent from "../../components/SidebarDrawerAdminComponent.jsx";

function NavBarDashboardAdmin() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const user = useSelector((state) => state.users.user);
  const sites = useSelector((state) => state.sites.sitesForChange);
  const { isAdmin, isManager, sites: currentSite } = useAuth();
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const [
    verifySites,
    {
      isSuccess: isVerifySiteSuccess,
      isLoading: isVerifySiteLoading,
      isError: isVerifySiteError,
      error: errorVerifySite,
    },
  ] = useVerifySitesMutation();

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleSendLogout = async () => {
    // await sendLogout();
    console.log("click");
    onClose();
  };

  const listGroup1 = [
    { text: "Inbox" },
    { text: "Starred" },
    { text: "Send email", onClick: () => console.log("Send email clicked") },
    { text: "Drafts" },
  ];

  const listGroup2 = [
    { text: "All mail" },
    { text: "Trash" },
    { text: "Spam", onClick: () => console.log("Spam Clicked") },
  ];

  const combinedLists = [listGroup1, listGroup2];

  useEffect(() => {
    if (isVerifySiteSuccess) {
      dispatch(setChangedSite(true));
    }
  }, [isVerifySiteSuccess]);

  return (
    <>
      <Paper elevation={0} className="h-[70px] bg-white text-white bg-opacity-50 backdrop-blur-md flex justify-between flex-nowrap items-center xl:px-[40px] px-[10px] sm:px-[20px]">
        <div className=" flex items-center gap-[10px]">
          <div className="xl:hidden">
            <SidebarDrawerAdminComponent listGroups={combinedLists} />
          </div>
        </div>

        <div className="flex lg:gap-2 items-center flex-nowrap">
          <button className="hidden  bg-black bg-opacity-5 hover:bg-opacity-10 w-[100px] h-[40px] rounded-xl gap-2 xl:flex justify-evenly items-center px-[7px] mr-[8px] shadow-inner">
            <SearchTwoToneIcon className="w-5 h-5 text-black text-opacity-50" />
            <span className="text-black bg-white px-[7px] py-[2px] rounded-lg shadow-sm">
              ⌘ K
            </span>
          </button>
          <div>
            <ToolTipButtonComponent title={"Search"} icon={IoSearch} />
          </div>

          <TranslateComponent />

          <IconButton
            aria-label="settings"
            size="large"
            className="active-scale hover-scale"
          >
            <NotificationsNoneTwoToneIcon className="w-6 h-6" />
          </IconButton>

          <SettingComponent />
          <div className="relative p-[2px] flex justify-center items-center active-scale hover-scale">
            <div className="w-full h-full bg-gradient-to-r from-primary to-secondary animate-spin-slow absolute rounded-full "></div>
            <IconButton
              sx={{ p: 0 }}
              className="w-auto h-auto  flex justify-center items-center"
              onClick={handleDrawerOpen}
            >
              <Avatar alt="Profile" src={user.profileImage} />
            </IconButton>
          </div>
        </div>
      </Paper>

      <ProfileDrawerComponent
        open={drawerOpen}
        onClose={handleDrawerClose}
        handleSendLogout={handleSendLogout}
      />
    </>
  );
}

export default NavBarDashboardAdmin;
