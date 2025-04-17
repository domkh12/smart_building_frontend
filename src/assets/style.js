import { tooltipClasses } from "@mui/material";

export const listItemButtonStyle = {
  // "&.Mui-selected": {
  //   backgroundColor: "#D5D6E9",
  //   "& .MuiListItemIcon-root": {
  //     color: "#2C3092",
  //   },
  //   "& .MuiListItemText-root > span": {
  //     color: "#2C3092",
  //   },
  //   "&:hover": {
  //     backgroundColor: "#C0C1DE",
  //   },
  //   "& .MuiTouchRipple-child": {
  //     backgroundColor: "#5659A8",
  //   },
  // },
};

export const cardStyle = {
  "&.MuiCard-root": {
    borderRadius: "14px",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  },
};

export const selectStyle = {
  borderRadius: "7px",
};

export const textFieldStyle = {
  "& .MuiInputBase-input": {
    boxShadow: "none",
  },
  borderRadius: "7px",
};

export const selectMenuStyle = {
  "& .MuiPaper-root": {
    background: "linear-gradient(to top right,#FFE4D6,#fff, #E0E0F6)",
    borderRadius: "10px",
    padding: "6px",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
    marginTop: "0.5rem",
  },
  "& .MuiList-root": {
    padding: "0",
    display: "grid",
    gap: "6px",
  },
};

export const listStyle = {
  minWidth: 0,
  width: "200px",
  padding: "5px",
  borderRadius: "10px",
  background: "linear-gradient(to top right,#FFE4D6,#fff, #E0E0F6)",
  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)",
};

export const toolTipStyle = {
  slotProps: {
    popper: {
      sx: {
        [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
          {
            borderRadius: "8px",
            backgroundColor: "#000000",
          },
        [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.arrow}`]:
          {
            color: "#000000",
          },
      },
    },
  },
};

export const buttonStyleContained = {
  textTransform: "none",
  borderRadius: "10px",
  boxShadow: "none",
};

export const buttonStyleOutlined = {
  border: "1px solid gray",
  borderRadius: "10px",
  fontWeight: "500",
  textTransform: "none",
};