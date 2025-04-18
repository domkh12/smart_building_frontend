import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import SpaceDashboardTwoToneIcon from "@mui/icons-material/SpaceDashboardTwoTone";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";

import {
    Box,
    Collapse,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader, Paper,
    Typography,
} from "@mui/material";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import LogoComponent from "../../components/LogoComponent.jsx";
import { listItemButtonStyle } from "./../../assets/style";
import { toggleCollapsed } from "../../redux/feature/actions/actionSlice.js";
import useTranslate from "./../../hook/useTranslate";

function SideBarUser() {
  const isCollapsed = useSelector((state) => state.action.isCollapsed);
  const [isOverviewOpen, setIsOverviewOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslate();

  const handleOverViewClick = () => {
    setIsOverviewOpen(!isOverviewOpen);
  };

  const content = (
    <>
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
        }}
        className={`${
          isCollapsed
            ? "w-[90px] transition-all duration-500"
            : "w-[300px] transition-all duration-500"
        } h-full border-r-[1px] border-r-gray-200 w-[15rem] shrink-0 hidden xl:block`}
      >
        <Paper elevation={0} component="nav" className="flex flex-col relative h-screen">
            <IconButton
                aria-label="collapse_btn"
                sx={{
                    border: "0.5px solid #e5e7eb",
                    position: "absolute",
                    top: "23px",
                    right: "-14px",
                    width: "28px",
                    height: "28px",
                    zIndex: "30",
                }}
                onClick={() => dispatch(toggleCollapsed(true))}
                size="small"
            >
                {isCollapsed ? (
                    <KeyboardArrowRightRoundedIcon />
                ) : (
                    <KeyboardArrowLeftRoundedIcon />
                )}
            </IconButton>
          <LogoComponent />

          <div
            className={`${
              isCollapsed ? "px-[5px]" : "px-[16px]"
            }  overflow-auto`}
          >
            <List
              component="div"
              aria-labelledby="nested-list-subheader"
              subheader={
                !isCollapsed && (
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
                    // component="span"
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
                )
              }
            >
              <Collapse
                in={isCollapsed ? isCollapsed : isOverviewOpen}
                timeout="auto"
                unmountOnExit
              >

                <ListItemButton
                  sx={{
                    borderRadius: "10px",
                    mb: "5px",
                    ...listItemButtonStyle,
                  }}
                  onClick={() => navigate("/user")}
                  selected={location.pathname === "/user"}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      ...(!isCollapsed && {
                        mr: 1,
                      }),
                    }}
                    className={`${
                      isCollapsed &&
                      "flex flex-col justify-center items-center w-full"
                    }`}
                  >
                    <SpaceDashboardTwoToneIcon className="w-6 h-6" />
                    {isCollapsed && (
                      <ListItemText
                        secondary={
                          <Typography
                            component="span"
                            variant="caption"
                            sx={{
                              display: "inline",
                              textWrap: "nowrap",
                            }}
                          >
                            {t("dashboard")}
                          </Typography>
                        }
                      />
                    )}
                  </ListItemIcon>
                  {!isCollapsed && (
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
                          {t("dashboard")}
                        </Typography>
                      }
                    />
                  )}
                </ListItemButton>

              </Collapse>
            </List>

          </div>
        </Paper>
      </Box>
    </>
  );

  return content;
}

export default SideBarUser;
