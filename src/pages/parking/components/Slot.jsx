import { useEffect, useState } from "react";
import DrawerDetailParking from "./DrawerDetailParking";
import { Button, Card, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetParkingDetailByUuidMutation } from "../../../redux/feature/parking/parkingDetailApiSlice";

function Slot({ isAvailable, slotName, uuid }) {
  const [open, setOpen] = useState(false);
  const slotDetails = useSelector((state) => state.parkingDetail.slotDetails);
  const [isAvailableUpdated, setIsAvailableUpdated] = useState(isAvailable);

  const [getParkingDetailByUuid, { isSuccess, isLoading, isError, error }] =
  useGetParkingDetailByUuidMutation();

  const toggleDrawer = (newOpen) => async () => {
    console.log(newOpen);
    setOpen(newOpen);
    if (newOpen) {
      await getParkingDetailByUuid({ uuid });
    }
  };

  useEffect(() => {
    if (
      slotDetails &&
      slotDetails.messages &&
      slotDetails.messages.parkingSlotResponse &&
      slotDetails.messages.parkingSlotResponse.uuid === uuid
    ) {
      setIsAvailableUpdated(
        slotDetails.messages.parkingSlotResponse.isAvailable
      );
    }
  }, [slotDetails]);

  return (
    <>
      <Card
        variant="outlined"
        className="border flex justify-center items-center h-32 w-auto"
      >
        {!isAvailableUpdated ? (
          <Button
            color="#e5e7eb"
            onClick={toggleDrawer(true)}
            className="w-full h-full flex justify-center items-center cursor-pointer"
          >
            <img
              src="/images/car_topview.png"
              alt={slotName}
              height="50px"
              width="100px"
              loading="lazy"
              style={{ transform: "rotate(270deg)" }}
              draggable="false"
            />
          </Button>
        ) : (
          <p className="text-lg text-gray-700">{slotName}</p>
        )}
      </Card>
      <DrawerDetailParking
        open={open}
        toggleDrawer={toggleDrawer}
        slotName={slotName}
        uuid={uuid}
      />
    </>
  );
}

export default Slot;
