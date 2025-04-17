import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { FaPen } from "react-icons/fa6";
import useTranslate from "../hook/useTranslate.jsx";

function EditButtonComponent({ handleQuickEdit }) {
  const {t} = useTranslate();
  return (
    <Tooltip
      sx={{
        color: "",
      }}
      title={t('quickEdit')}
      placement="top"
      arrow
    >
      <IconButton size="large" onClick={handleQuickEdit} sx={{backgroundColor: "transparent",
          "&:hover": {backgroundColor: "transparent"}}}>
        <FaPen className="w-5 h-5" />
      </IconButton>
    </Tooltip>
  );
}

export default EditButtonComponent;
