import React from "react";
import { Typography } from "@mui/material";

function ParkingSlotComponent({ slot }) {
  return (
    <div className="relative border border-dashed h-[240px] flex justify-center items-center rounded-[6px] border-light-gray hover:scale-105 transition-all duration-400 cursor-pointer">
      <div className="absolute left-0 top-0 w-full h-[70px] flex justify-center items-center">
        <span className="border border-dashed px-4 py-1 rounded-xl border-light-gray">
          {slot.lotName}
        </span>
      </div>
      {slot.isAvailable ? (
        <>
          <div className="h-[140px] absolute bottom-0 left-0 w-full flex justify-center items-center pb-[20px]">
            <Typography variant="body1" className="text-primary">Availabe</Typography>
          </div>
        </>
      ) : (
        <>
          <img src="/images/car.png" alt="car" />
        </>
      )}
    </div>
  );
}

export default ParkingSlotComponent;
