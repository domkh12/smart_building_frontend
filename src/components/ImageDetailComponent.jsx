import { Typography } from "@mui/material";
import React from "react";

function ImageDetailComponent({name, image}) {
  return (
    <>
      <div className="flex items-center gap-5">
        <div className="p-1 border-dashed border rounded-[12px]">
          <div className="w-48 h-28 rounded-[12px] overflow-hidden">
            <img
              src={image || "/images/img_placeholder.jpg"}
              alt="roomImage"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="body1">{name}</Typography>
        </div>
      </div>
    </>
  );
}

export default ImageDetailComponent;
