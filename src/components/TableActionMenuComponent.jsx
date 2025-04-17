import {IconButton, List, ListItemButton, ListItemText, Popover, Typography} from "@mui/material";
import PopupState, {bindPopover, bindTrigger} from "material-ui-popup-state";
import {BsFillPrinterFill, BsThreeDotsVertical} from "react-icons/bs";
import {listStyle} from "../assets/style";
import {useSelector} from "react-redux";


function TableActionMenuComponent() {

    const mode = useSelector((state) => state.theme.mode);

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
                            <ListItemButton
                                sx={{
                                    borderRadius: "6px",
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
