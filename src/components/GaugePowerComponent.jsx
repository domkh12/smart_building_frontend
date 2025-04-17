import { Card, Typography } from "@mui/material";
import {
  axisClasses,
  GaugeContainer,
  GaugeReferenceArc,
  GaugeValueArc,
  LineChart,
  lineElementClasses,
  markElementClasses,
  useGaugeState,
} from "@mui/x-charts";
import React, {useEffect, useState} from "react";
import { GiElectric } from "react-icons/gi";
import { cardStyle } from "../assets/style";
import useTranslate from "../hook/useTranslate.jsx";

function GaugePowerComponent({ value }) {
  const { t } = useTranslate();
  return (
    <Card
      sx={{ ...cardStyle }}
      className="flex flex-col justify-center items-center py-5"
    >
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
        <Typography variant="h4">{value} W</Typography>
      </div>
    </Card>
  );
}

export default GaugePowerComponent;
