import { Card, styled, Typography } from "@mui/material";
import {
  GaugeContainer,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts";
import {useEffect, useState} from "react";
import { FaSmog } from "react-icons/fa";
import { cardStyle } from "../assets/style";
import {useDispatch, useSelector} from "react-redux";
import {clearMessageFromWS} from "../redux/feature/message/messageSlice.js";
import StatusDeviceComponent from "./StatusDeviceComponent.jsx";

function GaugePM2_5Component({ value, device }) {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const [isOnline, setIsOnline] = useState(device?.status === "Active");
  const deviceStatus = useSelector((state) => state.message.deviceStatus);
  const valueMin = 0;
  const valueMax = 100;

  useEffect(() => {
    if (deviceStatus?.length > 0) {
      const deviceStatusObject = deviceStatus.find(
          (deviceStatus) => deviceStatus?.deviceId == device?.id
      );
      if (deviceStatusObject) {
        setIsOnline(deviceStatusObject?.status === "Active" ? true : false);
      }
      if (deviceStatusObject?.status === "Inactive") {
        dispatch(clearMessageFromWS());
      }
    }
  }, [deviceStatus]);

  const clampedValue = Math.min(Math.max(value, valueMin), valueMax);

  function GaugePointer() {
    const { valueAngle, outerRadius, cx, cy } = useGaugeState();

    if (valueAngle === null) {
      // No value to display
      return null;
    }

    const target = {
      x: cx + outerRadius * Math.sin(valueAngle),
      y: cy - outerRadius * Math.cos(valueAngle),
    };

    return (
      <g>
        <circle cx={cx} cy={cy} r={5} fill={`${mode === "dark"  ? "white" : "black"}`} />
        <path
          d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
          stroke={`${mode === "dark"  ? "white" : "black"}`}
          strokeWidth={4}
        />
      </g>
    );
  }

  const GaugeReferenceArcStyled = styled(GaugeReferenceArc)(() => {
    return {
      fill: "url(#pm25Gradient)",
    };
  });

  return (
    <Card
      sx={{ ...cardStyle, position: "relative" }}
      className="flex flex-col items-center justify-center py-5"
    >
      <StatusDeviceComponent isOnline={isOnline}/>
      <Typography
        variant="h6"
        className="flex justify-center items-center gap-2"
      >
        <FaSmog className="w-7 h-7" />
        PM 2.5
      </Typography>
      <div className="flex flex-col justify-center items-center">
        <div>
          <GaugeContainer
            width={220}
            height={150}
            startAngle={-90}
            endAngle={90}
            value={clampedValue}
            valueMin={valueMin}
            valueMax={valueMax}
            innerRadius={85}
          >
            <defs>
              <linearGradient
                id="pm25Gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#45e041" />
                <stop offset="35%" stopColor="#f2e30c" />
                <stop offset="70%" stopColor="#f2960c" />
                <stop offset="100%" stopColor="#d91d09" />
              </linearGradient>
            </defs>
            <GaugeReferenceArcStyled />
            <GaugePointer />
          </GaugeContainer>
        </div>
        <Typography variant="h4">{value ? `${value} µg/m³` : `__`}</Typography>
      </div>
    </Card>
  );
}

export default GaugePM2_5Component;
