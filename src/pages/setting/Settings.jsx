import { useState } from "react";
import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useSelector } from "react-redux";
import {  
  selectQrCodeUrl,
} from "../../redux/feature/auth/authSlice";
import Google2FAAuthenticator from "./components/Google2FAAuthenticator";
import SeoComponent from "../../components/SeoComponent";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function Settings({ open, handleClose }) {
  const [value, setValue] = useState(0);
  const qrCodeUrl = useSelector(selectQrCodeUrl);  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "20px",
    outline: "none",    
  };
  return (
    <>
      <SeoComponent title={"Settings"} />
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"       
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            sx={{
              padding: "1rem",
            }}
            component="h2"
          >
            Settings
          </Typography>
          <Divider />

          <Box
            sx={{
              bgcolor: "background.paper",
              display: "grid",
              gridTemplateColumns: "1fr 4fr",
              height: 500,
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider", width: 200 }}
            >
              <Tab
                label="Security"
                {...a11yProps(0)}
                sx={{ textTransform: "none", display: "flex" }}
              />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Google2FAAuthenticator qrCodeUrl={qrCodeUrl} />
            </TabPanel>
          </Box>
          <Divider />
          <div className="p-[1rem] flex justify-end gap-3">
            <Button
              aria-label="close"
              onClick={handleClose}
              className="bg-gray-200"
              sx={{
                backgroundColor: "#e5e7eb",
                textTransform: "none",
                color: "black",
                fontWeight: "500",
                borderRadius: "10rem",
                paddingX: "1.5rem",
                paddingY: "0.5rem",
              }}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default Settings;
