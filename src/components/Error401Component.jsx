import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Error401Component() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center flex-col gap-5 h-screen">
      <img
        src="/images/error401.svg"
        alt="error401"
        className="max-w-[600px]"
      />
      <Button
        sx={{ textTransform: "none", borderRadius: "6px", boxShadow: "none" }}
        variant="contained"
        onClick={() => navigate("/login")}
      >
        Go to login
      </Button>
    </div>
  );
}

export default Error401Component;
