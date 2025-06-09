import {Card, Tooltip, Typography} from "@mui/material";
import {
  axisClasses,
  LineChart,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts";
import {useEffect, useState} from "react";
import { GiElectric } from "react-icons/gi";
import { cardStyle } from "../assets/style";
import useTranslate from "../hook/useTranslate.jsx";
import {useDispatch, useSelector} from "react-redux";
import {clearMessageFromWS} from "../redux/feature/message/messageSlice.js";
import StatusDeviceComponent from "./StatusDeviceComponent.jsx";
import LineChartCusOneComponent from "./LineChartCusOneComponent.jsx";

function GaugePowerComponent({ value, device}) {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const [isOnline, setIsOnline] = useState(device?.status === "Active");
  const deviceStatus = useSelector((state) => state?.message?.deviceStatus);

  const [chartValues, setChartValues] = useState([]);
  const [chartXAxis, setChartXAxis] = useState([]);

  useEffect(() => {
    if (device?.events?.length > 0) {
      const initialValues = device.events.map(event => parseFloat(event.value));
      const initialXAxis = device.events.map(event => event.createdAt);
      setChartValues(initialValues);
      setChartXAxis(initialXAxis);
    }
  }, [device?.events]);

  useEffect(() => {
    if (deviceStatus?.length > 0) {
      const deviceStatusObject = deviceStatus.find(
          (deviceStatus) => deviceStatus?.deviceId == device?.id
      );

      if (deviceStatusObject) {
        setIsOnline(deviceStatusObject?.status === "Active");
        if (deviceStatusObject?.status === "Inactive") {
          dispatch(clearMessageFromWS());
        }
      }
    }
  }, [deviceStatus]);

  useEffect(() => {
    if (value) {
      // Format current date time to match the required format
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).replace(',', '');

      // Update the arrays with new value
      setChartValues(prev => {
        const newValues = [...prev, parseFloat(value)];
        // Keep only last 10 values
        return newValues.slice(-25);
      });

      setChartXAxis(prev => {
        const newXAxis = [...prev, formattedDate];
        // Keep only last 10 timestamps
        return newXAxis.slice(-25);
      });
    }
  }, [value]);


  return (
    <Card
      sx={{ ...cardStyle, position: "relative" }}
      className="flex flex-col justify-center items-center py-5"
    >
     <StatusDeviceComponent isOnline={isOnline}/>
      <Typography variant="h6" className="flex justify-center items-center gap-2">
        <GiElectric className="w-5 h-5" /> {t("power")}
      </Typography>
      <div className="flex flex-col justify-center items-center">
        <div className='py-2'>
          <LineChartCusOneComponent values={chartValues} xaxis={chartXAxis}/>
        </div>
        <Typography variant="h4">{value ? `${value} W` : `__`}</Typography>
      </div>
    </Card>
  );
}

export default GaugePowerComponent;
