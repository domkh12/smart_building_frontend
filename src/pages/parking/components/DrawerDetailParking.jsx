import {
  Box,
  Container,
  Divider,
  Drawer,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PiWarningCircleThin, PiXThin } from "react-icons/pi";

function DrawerDetailParking({ open, toggleDrawer, slotName }) {

  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h: ${m}m: ${s}s`;
  };

  const DrawerList = (
    <Box
      sx={{ width: "100%" }}
      role="presentation"
    >
      <Container maxWidth="sm" className="flex justify-between items-center">
        <Typography sx={{ p: 2, color: "text.primary", whiteSpace: "nowrap" }}>
          Parking Space - #{slotName}
        </Typography>
        <IconButton aria-label="close" onClick={toggleDrawer(false)}>
          <PiXThin />
        </IconButton>
      </Container>
      <Container className="bg-gray-200 h-40 flex justify-center items-center">
        <img
          src="/images/car_topview.png"
          alt={slotName}
          height="auto"
          width="200px"
          loading="lazy"
          style={{ transform: "rotate(270deg)" }}
          draggable="false"
        />
      </Container>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          mt: 3,
        }}
      >
        <Typography className="text-center" variant="h6">
          Luxes 570
        </Typography>
        <div className="flex justify-between items-center px-6">
          <div>
            <Typography variant="h5">1:00 PM</Typography>
            <Typography variant="body1" className="text-gray-500">
              START TIME
            </Typography>
          </div>
          <div>
            <Typography variant="h5">{formatTime(timeLeft)}</Typography>
            <Typography variant="body1" className="text-end text-gray-500">
              DURATION
            </Typography>
          </div>
        </div>
      </Box>

      <Typography
        className="flex justify-start items-center gap-2 text-primary"
        sx={{ mt: 3, mb: 1, px: 3 }}
      >
        <PiWarningCircleThin className="w-7 h-7" />
        Details
      </Typography>
      <Divider />

      <div>
        <Grid2 container sx={{ px: 3, mt: 3 }}>
          <Grid2 size={6}>
            <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
              OWNER
            </Typography>
            <Typography sx={{ mb: 3 }}>EI CHANUDOM</Typography>

            <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
              YEAR
            </Typography>
            <Typography sx={{ mb: 3 }}>2022</Typography>
            <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
              TYPE
            </Typography>
            <Typography sx={{ mb: 3 }}>SPORT</Typography>
          </Grid2>
          <Grid2 size={6}>
            <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
              NUMBER PLATE
            </Typography>
            <Typography sx={{ mb: 3 }}>123456</Typography>
            <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
              MODEL
            </Typography>
            <Typography sx={{ mb: 3 }}>LUXES 570</Typography>
            <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
              COLOR
            </Typography>
            <Typography sx={{ mb: 3 }}>WHITE</Typography>
          </Grid2>
        </Grid2>
      </div>
    </Box>
  );
  return (
    <div>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right"
        PaperProps={{
          sx: { width: "25rem" },
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default DrawerDetailParking;
