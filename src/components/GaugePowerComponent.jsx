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

function GaugePowerComponent({ value, device}) {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const [isOnline, setIsOnline] = useState(device?.status === "Active");
  const deviceStatus = useSelector((state) => state?.message?.deviceStatus);
  useEffect(() => {
    if (deviceStatus?.length > 0) {
      const deviceStatusObject = deviceStatus.find(
          (deviceStatus) => deviceStatus?.deviceId == device?.id
      );
      if (deviceStatusObject) {
        setIsOnline(deviceStatusObject?.status === "Active" ? true : false);
        if (deviceStatusObject?.status === "Inactive") {
          dispatch(clearMessageFromWS());
        }
      }
    }
  }, [deviceStatus]);

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
        <div>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={300}
            height={150}
            sx={() => ({
              [`.${lineElementClasses.root}`]: {
                strokeWidth: 3,
              },
              [`.${axisClasses.root}`]: {
                [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                  display: "none",
                },
                [`.${axisClasses.tickLabel}`]: {
                  display: "none",
                },
              },
              [`.${markElementClasses.root}`]: {
                display: "none",
              },
            })}
          />
        </div>
        <Typography variant="h4">{value ? `${value} W` : `__`}</Typography>
      </div>
    </Card>
  );
}

export default GaugePowerComponent;
