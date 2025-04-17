import { Alert, IconButton, Slide, Snackbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { IoClose } from "react-icons/io5";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

function SnackBarComponent({
  isLoading,
  caption,
  isOpen,
  onClose,
  isError,
}) {
  return (
    <>
      <Snackbar
        open={isOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        message="Note archived"
        TransitionComponent={SlideTransition}
        sx={{
          "&.MuiSnackbar-root": { top: "15px", right: "20px" },
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            width: "300px",
            backgroundColor: "white",
            p: 0,
            borderRadius: "12px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            display: "flex",
            alignItems: "center",
          }}
          action={
            <IconButton
              onClick={onClose}
              size="small"
              disableRipple
              sx={{
                border: "1px solid #C2C2C2",
                backgroundColor: "#F5F5F5",
                p: "2px",
                mr: 2,
                mb: 3,
              }}
              aria-label="close"
            >
              <IoClose className="text-[12px] text-black" />
            </IconButton>
          }
          icon={
            isLoading ? (
              <div className="p-[12px] bg-[#EBEBEB] rounded-[12px] ml-[6px]">
                <div className="loader"></div>
              </div>
            ) : (
              <div
                className={`${isError ? "bg-[#FFEBEB]" : "bg-[#E2F3E3]"}  p-[12px] ml-[7px] rounded-[12px]`}
              >
                {isError ? (
                  <IoIosWarning className="text-[#d32f2f]" />
                ) : (
                  <FaCheckCircle className="text-[#388e3c]" />
                )}
              </div>
            )
          }
        >
          <div
            style={{
              pointerEvents: "auto",
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ color: "black", fontWeight: "400" }}
            >
              {caption}
            </Typography>
          </div>
        </Alert>
      </Snackbar>
    </>
  );
}

export default SnackBarComponent;
