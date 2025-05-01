import {Button, Paper} from "@mui/material";
import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hook/useLocalStorage.jsx";

function Error403Component() {
  const navigate = useNavigate();
    const [authData, setAuthData] = useLocalStorage('authData', {
        isRemember: false,
        userRoles: "",
        uuid: null,
        roomId: null
    });

    useEffect(() => {
        setAuthData({
            isRemember: false,
            userRoles: "",
            uuid: null,
            roomId: null
        });
    }, []);
  return (
    <Paper elevation={0} className="flex justify-center items-center flex-col gap-5 h-screen">
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
    </Paper>
  );
}

export default Error403Component;
