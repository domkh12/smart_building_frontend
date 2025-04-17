import {IconButton, List, ListItemButton, ListItemText, Popover, Typography} from "@mui/material";
import PopupState, {bindPopover, bindTrigger} from "material-ui-popup-state";
import {BsFillPrinterFill, BsThreeDotsVertical} from "react-icons/bs";
import {listStyle} from "../assets/style";


function TableActionMenuComponent() {
    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div>
                    <IconButton
                        aria-label="more_menu"
                        {...bindTrigger(popupState)}
                        size="small"
                        sx={{width: "36px", height: "36px", backgroundColor: "transparent"}}
                    >
                        <BsThreeDotsVertical className="w-5 h-5"/>
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
                            <ListItemButton
                                sx={{
                                    borderRadius: "6px",
                                    color: "#424242",
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <div className="flex items-center gap-3">
                                            <BsFillPrinterFill className="w-5 h-5"/>
                                            <Typography
                                                component="span"
                                                variant="body1"
                                                sx={{
                                                    color: "#424242",
                                                    display: "inline",
                                                }}
                                            >
                                                Print
                                            </Typography>
                                        </div>
                                    }
                                />
                            </ListItemButton>
                        </List>
                    </Popover>
                </div>
            )}
        </PopupState>
    );
}

export default TableActionMenuComponent
