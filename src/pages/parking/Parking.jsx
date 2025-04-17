import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useWebSocket from "../../hook/useWebSocket";

function Parking() {
  const navigator = useNavigate();
  const [activeTab, setActiveTab] = useState("parking-areas");
  const [value, setValue] = useState(0);
 

  // useEffect(() => {
  //   navigator(activeTab);
  // }, [activeTab]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const tabMapping = ["parking-areas", "history"];
    setActiveTab(tabMapping[newValue]);
  };

  return (
    <div>
      <h1 className="text-2xl font-medium dark:text-gray-50 py-4 px-8">
        Parking
      </h1>
      {/* <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", paddingX: "2rem" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="tabs"
            TabIndicatorProps={{
              sx: {
                display: "flex",
                justifyContent: "center",
                width: "100%",
                backgroundColor: "#111827",
                padding: "0px",
              },
            }}
          >
            <Tab
              label="Parking Area"
              sx={{
                textTransform: "none",
                color: "#4b5563",
                "&.Mui-selected": {
                  color: "#111827",
                },
                padding: "0px",
                minWidth: 0,
                marginRight: "2rem",
              }}
              disableRipple
            />
            <Tab
              label="History"
              sx={{
                textTransform: "none",
                color: "#4b5563",
                "&.Mui-selected": {
                  color: "#111827",
                },
                padding: "0px",
                minWidth: 0,
                marginRight: "2rem",
              }}
              disableRipple
            />
          </Tabs>
        </Box>
      </Box>
      <div>
        <Outlet />
      </div> */}
    </div>
  );
}

export default Parking;
