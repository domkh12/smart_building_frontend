import { Tab } from "@mui/material";
import { useSelector } from "react-redux";
import { selectParkingById } from "../../redux/feature/parking/parkingApiSlice";

function TabParking({ parkingId,value }) {  
  const parkingArea = useSelector((state) =>
    selectParkingById(state, parkingId)
  );
  console.log("value2",parkingArea.parkingName)
  return (
    <>
      
    </>
  );
}

export default TabParking;
