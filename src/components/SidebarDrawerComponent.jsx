import {
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader, Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ToolTipButtonComponent from "./ToolTipButtonComponent";
import { CgMenuLeftAlt } from "react-icons/cg";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { listItemButtonStyle } from "../assets/style";
import { useLocation, useNavigate } from "react-router-dom";
import SpaceDashboardTwoToneIcon from "@mui/icons-material/SpaceDashboardTwoTone";
import LogoComponent from "./LogoComponent";
import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import useTranslate from "../hook/useTranslate";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import ApartmentTwoToneIcon from "@mui/icons-material/ApartmentTwoTone";
import ElevatorTwoToneIcon from "@mui/icons-material/ElevatorTwoTone";
import MeetingRoomTwoToneIcon from "@mui/icons-material/MeetingRoomTwoTone";
import TipsAndUpdatesTwoToneIcon from "@mui/icons-material/TipsAndUpdatesTwoTone";

function SidebarDrawerComponent() {
  const [isOverviewOpen, setIsOverviewOpen] = useState(true);
  const [isManagementOpen, setIsManagementOpen] = useState(true);
  const [isFloorOpen, setIsFloorOpen] = useState(false);
  const [isRoomOpen, setIsRoomOpen] = useState(false);
  const [isBuildingOpen, setIsBuildingOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isDeviceOpen, setisDeviceOpen] = useState(false);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isRoomListPage = location.pathname === "/dash/rooms";
  const isRoomCreatePage = location.pathname === "/dash/rooms/new";
  const isFloorListPage = location.pathname === "/dash/floors";
  const isFloorCreatePage = location.pathname === "/dash/floors/new";
  const isUserListPage = location.pathname === "/dash/users";
  const isUserCreatePage = location.pathname === "/dash/users/new";
  const isBuildingListPage = location.pathname === "/dash/buildings";
  const isBuildingCreatePage = location.pathname === "/dash/buildings/new";
  const isDeviceListPage = location.pathname === "/dash/devices";
  const isDeviceCreatePage = location.pathname === "/dash/devices/new";
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
    <Paper elevation={0} >
      <ToolTipButtonComponent
        title={"Collapse"}
        icon={CgMenuLeftAlt}
        onClick={() => setOpen(true)}
      />
      {open && (
        <Drawer open={open} onClose={() => setOpen(false)} elevation={0}>
          <Paper elevation={0} sx={{ width: 280, height: "100%" }} role="presentation">
            <LogoComponent />
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
                      handleNavigation("/dash");
                      setOpen(false);
                    }}
                    selected={location.pathname === "/dash"}
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
                    onClick={() => handleNavigation("/dash/devices-control")}
                    selected={location.pathname === "/dash/devices-control"}
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
                  {/* Building Menu */}
                  <>
                    <ListItemButton
                      sx={{
                        borderRadius: "10px",
                        ...((isBuildingListPage || isBuildingCreatePage) &&
                          listItemButtonStyle),
                      }}
                      selected={
                        isBuildingOpen
                          ? isBuildingOpen
                          : isBuildingListPage || isBuildingCreatePage
                      }
                      onClick={() => setIsBuildingOpen(!isBuildingOpen)}
                      className="group relative"
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 1,
                        }}
                      >
                        <ApartmentTwoToneIcon className="w-6 h-6" />
                      </ListItemIcon>

                      <ListItemText
                        primary={
                          <Typography
                            component="span"
                            variant="body1"
                            sx={{ display: "inline" }}
                          >
                            {t("building")}
                          </Typography>
                        }
                      />

                      {isBuildingOpen ? (
                        <IoIosArrowDown />
                      ) : (
                        <IoIosArrowForward />
                      )}
                    </ListItemButton>
                  </>

                  <Collapse in={isBuildingOpen}>
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
                            onClick={() => handleNavigation("/dash/buildings")}
                            selected={location.pathname === "/dash/buildings"}
                          >
                            <ListItemText
                              primary={
                                <Typography
                                  component="span"
                                  variant="body1"
                                  sx={{ display: "inline" }}
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
                            onClick={() =>
                              handleNavigation("/dash/buildings/new")
                            }
                            selected={
                              location.pathname === "/dash/buildings/new"
                            }
                          >
                            <ListItemText
                              primary={
                                <Typography
                                  component="span"
                                  variant="body1"
                                  sx={{ display: "inline" }}
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

                  {/* Floor Menu */}
                  <>
                    <ListItemButton
                      sx={{
                        borderRadius: "10px",
                        mt: "5px",
                        ...((isFloorListPage || isFloorCreatePage) &&
                          listItemButtonStyle),
                      }}
                      selected={
                        isFloorOpen
                          ? isFloorOpen
                          : isFloorListPage || isFloorCreatePage
                      }
                      onClick={() => setIsFloorOpen(!isFloorOpen)}
                      className="group relative"
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 1,
                        }}
                      >
                        <ElevatorTwoToneIcon className="w-6 h-6" />
                      </ListItemIcon>

                      <ListItemText
                        primary={
                          <Typography
                            component="span"
                            variant="body1"
                            sx={{ display: "inline" }}
                          >
                            {t("floor")}
                          </Typography>
                        }
                      />

                      {isFloorOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
                    </ListItemButton>
                  </>

                  <Collapse in={isFloorOpen}>
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
                            onClick={() => handleNavigation("/dash/floors")}
                            selected={location.pathname === "/dash/floors"}
                          >
                            <ListItemText
                              primary={
                                <Typography
                                  component="span"
                                  variant="body1"
                                  sx={{ display: "inline" }}
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
                            onClick={() => handleNavigation("/dash/floors/new")}
                            selected={location.pathname === "/dash/floors/new"}
                          >
                            <ListItemText
                              primary={
                                <Typography
                                  component="span"
                                  variant="body1"
                                  sx={{ display: "inline" }}
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

                  {/* Room Menu */}
                  <>
                    <ListItemButton
                      sx={{
                        borderRadius: "10px",
                        ...((isRoomListPage || isRoomCreatePage) &&
                          listItemButtonStyle),
                        mt: "5px",
                      }}
                      selected={
                        isRoomOpen
                          ? isRoomOpen
                          : isRoomListPage || isRoomCreatePage
                      }
                      onClick={() => setIsRoomOpen(!isRoomOpen)}
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
                            sx={{ display: "inline" }}
                          >
                            {t("room")}
                          </Typography>
                        }
                      />

                      {isRoomOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
                    </ListItemButton>
                  </>

                  <Collapse in={isRoomOpen}>
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
                            onClick={() => handleNavigation("/dash/rooms")}
                            selected={location.pathname === "/dash/rooms"}
                          >
                            <ListItemText
                              primary={
                                <Typography
                                  component="span"
                                  variant="body1"
                                  sx={{ display: "inline" }}
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
                            onClick={() => handleNavigation("/dash/rooms/new")}
                            selected={location.pathname === "/dash/rooms/new"}
                          >
                            <ListItemText
                              primary={
                                <Typography
                                  component="span"
                                  variant="body1"
                                  sx={{ display: "inline" }}
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

                  {/* Device Menu */}

                  <ListItemButton
                      sx={{
                        borderRadius: "10px",
                        ...((isDeviceListPage || isDeviceCreatePage) &&
                            listItemButtonStyle),
                        mt: "5px",
                      }}
                      selected={
                        isDeviceOpen
                            ? isDeviceOpen
                            : isDeviceListPage || isDeviceCreatePage
                      }
                      onClick={() => setisDeviceOpen(!isDeviceOpen)}
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
                              sx={{ display: "inline" }}
                          >
                            {t("device")}
                          </Typography>
                        }
                    />

                    {isDeviceOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
                  </ListItemButton>

                  <Collapse in={isDeviceOpen}>
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
                                navigate("/dash/devices")
                                setOpen(false);
                              }}
                              selected={location.pathname === "/dash/devices"}
                          >
                            <ListItemText
                                primary={
                                  <Typography
                                      component="span"
                                      variant="body1"
                                      sx={{ display: "inline" }}
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
                                navigate("/dash/devices/new")
                                setOpen(false);
                              }}
                              selected={location.pathname === "/dash/devices/new"}
                          >
                            <ListItemText
                                primary={
                                  <Typography
                                      component="span"
                                      variant="body1"
                                      sx={{ display: "inline" }}
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
                          sx={{ display: "inline" }}
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
                              navigate("/dash/users")
                              setOpen(false);
                            }}
                            selected={location.pathname === "/dash/users"}
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
                              navigate("/dash/users/new")
                              setOpen(false);
                            }}
                            selected={location.pathname === "/dash/users/new"}
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
    </Paper >
  );
}

export default SidebarDrawerComponent;
