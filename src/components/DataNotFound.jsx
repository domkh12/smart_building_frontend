import React from "react";
import { Typography } from "@mui/material";
import useTranslate from "../hook/useTranslate";

function DataNotFound() {
  const { t } = useTranslate();
  return (
    <div className="flex justify-center items-center w-full h-auto flex-col col-span-full">
      <img
        src="/images/ic-content.svg"
        alt="ic_content"
        className="w-[160px] h-fit"
        
      />
      <Typography variant="body1" sx={{ color: "gray" }}>
        {t("noData")}
      </Typography>
    </div>
  );
}

export default DataNotFound;
