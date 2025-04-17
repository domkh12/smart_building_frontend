import React from "react";
import Typography from "@mui/material/Typography";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import PopupState, { bindHover, bindPopover } from "material-ui-popup-state";
import { Box } from "@mui/material";

function TestComponent() {
  return (
    <PopupState variant="popover" popupId="demoPopover">
      {(popupState) => (
        <Box sx={{ display: "inline-block" }}>
          <Typography {...bindHover(popupState)}>
            Hover with a Popover.
          </Typography>

          <HoverPopover
            {...bindPopover(popupState)}
            slotProps={{              
              paper: { style: { padding: 10, backgroundColor:"transparent",boxShadow:"none" } },
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Box sx={{ pt: 10, background: "black" }}>
              <Typography>The content of the Popover.</Typography>
            </Box>
          </HoverPopover>
        </Box>
      )}
    </PopupState>
  );
}

export default TestComponent;
