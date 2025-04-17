import { LinearProgress } from "@mui/material";
import React from "react";

function LoadingFetchingDataComponent() {
  return (
    <div className="h-[80vh] flex justify-center w-[30vw] mx-auto flex-col">
      <LinearProgress sx={{ borderRadius: "6px" }} />
    </div>
  );
}

export default LoadingFetchingDataComponent;
