import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Error403Component() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center flex-col gap-5 h-screen">
      <img
        src="/images/error403.svg"
        alt="error401"
        className="max-w-[600px]"
      />
      <Button
        sx={{ textTransform: "none", borderRadius: "6px", boxShadow: "none" }}
        variant="contained"
        onClick={() => navigate("/login")}
      >
        Go to Dashboard
      </Button>
    </div>
  );
}

export default Error403Component;
