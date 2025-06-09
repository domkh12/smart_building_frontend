import { IconButton, Tooltip } from "@mui/material";
import { FaPen } from "react-icons/fa6";
import useTranslate from "../hook/useTranslate.jsx";

function EditButtonComponent({ handleQuickEdit, icon, tooltipTitle }) {
  const {t} = useTranslate();
  return (
    <Tooltip
      sx={{
        color: "",
      }}
      title={tooltipTitle? tooltipTitle : t('quickEdit')}
      placement="top"
      arrow
    >
      <IconButton size="large" onClick={handleQuickEdit} sx={{backgroundColor: "transparent",
          "&:hover": {backgroundColor: "transparent"}}}>
          {icon ? icon : <FaPen className="w-5 h-5" />}
      </IconButton>
    </Tooltip>
  );
}

export default EditButtonComponent;
