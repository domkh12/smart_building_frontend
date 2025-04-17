import { IconButton } from "@mui/material";
import React from "react";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { useDispatch } from "react-redux";
import { setIsOpenSettingDrawer } from "../redux/feature/actions/actionSlice";
import SidebarDrawerAdminComponent from "./SidebarDrawerAdminComponent.jsx";
import SettingDrawerComponent from "./SettingDrawerComponent.jsx";

function SettingComponent() {
  const dispatch = useDispatch()
  return (
      <>
          <IconButton
              aria-label="settings"
              size="large"
              className="active-scale hover-scale"
              onClick={() => dispatch(setIsOpenSettingDrawer(true))}
          >
              <SettingsTwoToneIcon className="w-6 h-6 animate-spin-slow"/>
          </IconButton>
          <SettingDrawerComponent />

      </>
  );
}

export default SettingComponent;
