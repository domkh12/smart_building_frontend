import {
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import { BsThreeDotsVertical } from "react-icons/bs";
import { listStyle } from "../assets/style";
import React from "react";

function MoreActionComponent({
  menuItems,
  buttonIcon = <BsThreeDotsVertical className="w-5 h-5" />,
  // textColor = "#424242",
  // buttonColor = "#424242",
}) {
  
  return (
    <div>
      <PopupState variant="popover" popupId="more-action-popover">
        {(popupState) => (
          <div>
            <IconButton
              aria-label="more_menu"
              {...bindTrigger(popupState)}
              size="small"
              sx={{ width: "36px", height: "36px",backgroundColor: "transparent",
                "&:hover": {backgroundColor: "transparent"} }}
            >
              {buttonIcon}
            </IconButton>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              slotProps={{
                paper: {
                  style: {
                    padding: 10,
                    backgroundColor: "transparent",
                    boxShadow: "none",
                  },
                },
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <List
                component="div"
                disablePadding
                dense={true}
                sx={{
                  ...listStyle,
                }}
              >
                {menuItems.map((item, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => {
                      if (item.onClick) {
                        item.onClick();
                      }
                      popupState.close();
                    }}
                    sx={{
                      borderRadius: "6px",
                      color: item?.buttonColor,
                    }}
                  >
                    <ListItemText
                      primary={
                        <div className="flex items-center gap-3">
                          {item?.icon}
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{
                              color: item?.textColor,
                              display: "inline",
                            }}
                          >
                            {item?.label}
                          </Typography>
                        </div>
                      }
                    />
                  </ListItemButton>
                ))}
              </List>
            </Popover>
          </div>
        )}
      </PopupState>
    </div>
  );
}

export default MoreActionComponent;
