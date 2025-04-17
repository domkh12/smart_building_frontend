import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";

function ToolTipButtonComponent({ title, icon, onClick }) {
  const IconComponent = icon || CgMenuLeftAlt;
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const maxWidth = 1280;

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= maxWidth);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [maxWidth]);

  return (
    <div>
      {isSmallScreen ? (
        <IconButton onClick={onClick}>
          <IconComponent className="w-6 h-6" />
        </IconButton>
      ) : (
        <Tooltip
          title={title}
          arrow
          slots={{
            transition: Zoom,
          }}
        >
          <IconButton onClick={onClick}>
            <IconComponent className="w-6 h-6" />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
}

export default ToolTipButtonComponent;
