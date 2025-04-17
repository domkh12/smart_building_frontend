import { Alert } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function AlertMessageComponent() {
    const message = useSelector((state) => state.action.captionSnackBar);
  return (
    <Alert sx={{ mb: 2, borderRadius: "6px" }} severity="error">
      {message}
    </Alert>
  );
}

export default AlertMessageComponent;
