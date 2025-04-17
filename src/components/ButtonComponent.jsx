import { LoadingButton } from "@mui/lab";
import React from "react";
import {FiPlus} from "react-icons/fi";

function ButtonComponent({
  onClick,
  btnTitle,
  icon,
  type,
  isLoading,
  loadingCaption,
}) {
  return (
    <LoadingButton
      variant="contained"
      color="primary"
      startIcon={icon ? <FiPlus /> : null}
      onClick={onClick}
      type={type}
      loading={isLoading}
      {...(loadingCaption && { loadingIndicator: loadingCaption })}
    >
      {btnTitle}
    </LoadingButton>
  );
}

export default ButtonComponent;
