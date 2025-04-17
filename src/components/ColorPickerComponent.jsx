import React, { useState, useRef, useMemo } from "react";
import { TextField, Popover } from "@mui/material";
import { HexColorPicker } from "react-colorful";

function ColorPickerComponent({ value, onChange, label, ...props }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleColorChange = (color) => {
    onChange(color);
  };

  return (
    <div className="relative">
      <TextField
        label={label}
        variant="outlined"
        value={value}
        onClick={handleOpen}
        inputRef={anchorRef}
        sx={{
          width: "100%",
          "& .MuiInputBase-input": {
            boxShadow: "none",
            borderRadius: "6px",
          },

          borderRadius: "6px",
        }}
        {...props}
      />
      <div
        className="cursor-pointer w-7 h-7 rounded-full absolute top-[13px] right-3 border shadow-sm border-black"
        style={{ backgroundColor: value }}
        onClick={handleOpen}
      ></div>
      <Popover
        open={open}
        anchorEl={anchorRef.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className="p-3 rounded-xl">
          <HexColorPicker color={value} onChange={handleColorChange} />
        </div>
      </Popover>
    </div>
  );
}

export default ColorPickerComponent;
