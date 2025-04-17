import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  selectAllParking,
  useGetParkingSpacesQuery,
} from "../../../redux/feature/parking/parkingApiSlice";
import { Box, Grid2, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Slot from "./Slot";
import useWebSocket from "../../../hook/useWebSocket";
import { setParkingSlot } from "../../../redux/feature/parking/parkingDetailSlice";
import SeoComponent from "../../../components/SeoComponent";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Grid2 container spacing={2} className="grid grid-cols-5">
            {children}
          </Grid2>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function ParkingAreas() {
  const parkingArea = useSelector((state) => selectAllParking(state));
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const {
    loading,
    error: errorWebsocker,
    messages,
  } = useWebSocket("/topic/slot-update");

  useEffect(() => {
    if (messages) {
      dispatch(setParkingSlot({ messages }));
    }
  }, [messages]);

  const {
    data: parkingAreas,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetParkingSpacesQuery();

  let content;

  useEffect(() => {
    if (isLoading) {
      content = <p>Loading...</p>;
    }
  }, [isLoading]);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  content = (
    <div>
      <SeoComponent title="Parking Areas" />
      <Box
        sx={{
          maxWidth: { xs: 320, sm: 480 },
          bgcolor: "#e5e7eb",
          marginX: "2rem",
          marginY: "1.7rem",
          borderRadius: "0.6rem",
          padding: "0.3rem",
        }}
      >
        <Tabs
          value={value}
          variant="scrollable"
          onChange={handleChange}
          scrollButtons="auto"
          aria-label="tab"
          TabIndicatorProps={{
            sx: {
              width: "100%",
              backgroundColor: "#2C3092",
              height: "100%",
              zIndex: "0",
              borderRadius: "0.5rem",
            },
          }}
        >
          {parkingArea.map((p, index) => (
            <Tab
              key={index}
              label={p.parkingName}
              value={index}
              sx={{
                textTransform: "none",
                color: "#4b5563",
                "&.Mui-selected": {
                  color: "white",
                },
                paddingX: "1rem",
                minWidth: "0",
                zIndex: "1",
                height: "auto",
              }}
              disableRipple
            />
          ))}
        </Tabs>
      </Box>
      {parkingArea.map((p, index) => (
        <TabPanel value={value} index={index} key={index}>
          {p?.parkingSlots.length > 0
            ? p.parkingSlots.map((slot) => (
                <Grid2 size={2} key={slot.uuid}>
                  <Slot
                    key={slot.uuid}
                    isAvailable={slot.isAvailable}
                    slotName={slot.slotName}
                    uuid={slot.uuid}
                  />
                </Grid2>
              ))
            : "No parking slots available"}
        </TabPanel>
      ))}
      <div>
        <Outlet />
      </div>
    </div>
  );

  return content;
}

export default ParkingAreas;
