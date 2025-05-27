import { useDispatch, useSelector } from "react-redux";
import {Avatar, IconButton, Paper, Typography} from "@mui/material";
import { useEffect, useState } from "react";
import NotificationsNoneTwoToneIcon from "@mui/icons-material/NotificationsNoneTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import ToolTipButtonComponent from "../../components/ToolTipButtonComponent";
import SidebarDrawerComponent from "../../components/SidebarDrawerComponent";
import { IoSearch } from "react-icons/io5";
import SettingComponent from "../../components/SettingComponent";
import TranslateComponent from "../../components/TranslateComponent";
import ProfileDrawerComponent from "../../components/ProfileDrawerComponent";
import {useGetUserProfileQuery} from "../../redux/feature/auth/authApiSlice";
import { setChangedSite } from "../../redux/feature/site/siteSlice";
import UtilSearchComponent from "../../components/UtilSearchComponent.jsx";

function NavBarDashboardManager() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {data: user} = useGetUserProfileQuery("profileList");
  const dispatch = useDispatch();
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
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

  return (
    <>
      <Paper elevation={0} className="h-[70px] bg-white text-white bg-opacity-50 backdrop-blur-md flex justify-between flex-nowrap items-center xl:px-[40px] px-[10px] sm:px-[20px]">
        <div className=" flex items-center gap-[10px]">
          <div className="xl:hidden">
            <SidebarDrawerComponent listGroups={combinedLists} />
          </div>
        </div>

        <div className="flex lg:gap-2 items-center flex-nowrap">
          <UtilSearchComponent/>

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
              <Avatar alt="Profile" src={user?.profileImage} />
            </IconButton>
          </div>
        </div>
      </Paper>

      {
        drawerOpen && <ProfileDrawerComponent
              open={drawerOpen}
              onClose={handleDrawerClose}
          />
      }

    </>
  );
}

export default NavBarDashboardManager;
