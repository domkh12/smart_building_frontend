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
import {useSelector} from "react-redux";

function MoreActionComponent({
  menuItems,
  buttonIcon = <BsThreeDotsVertical className="w-5 h-5" />,
}) {

  const mode = useSelector((state) => state.theme.mode);

  return (
    <>
      <PopupState variant="popover" popupId="more-action-popover">
        {(popupState) => (
          <div>
            <IconButton
              aria-label="more_menu"
              {...bindTrigger(popupState)}
              size="small"
              sx={{
                width: "36px",
                height: "36px",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent"
                }
              }}
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
                    background: "transparent",
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
                  minWidth: 0,
                  width: "200px",
                  padding: "5px",
                  borderRadius: "10px",
                  background: `${mode === "dark" ? "#1C252E" : "#fff"}`,
                  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)",
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
    </>
  );
}

export default MoreActionComponent;
