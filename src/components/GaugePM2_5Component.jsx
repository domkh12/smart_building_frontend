import { Card, styled, Typography } from "@mui/material";
import {
  GaugeContainer,
  GaugeReferenceArc,
  GaugeValueArc,
  useGaugeState,
} from "@mui/x-charts";
import React from "react";
import { FaSmog } from "react-icons/fa";
import { cardStyle } from "../assets/style";
import {useSelector} from "react-redux";

function GaugePM2_5Component({ value }) {
  const mode = useSelector((state) => state.theme.mode);
  const valueMin = 0;
  const valueMax = 100;

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
      sx={{ ...cardStyle }}
      className="flex flex-col items-center justify-center py-5"
    >
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
        <Typography variant="h4">{value}µg/m³</Typography>
      </div>
    </Card>
  );
}

export default GaugePM2_5Component;
