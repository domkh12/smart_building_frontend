import {Card, styled, Typography} from "@mui/material";
import {
    GaugeContainer,
    GaugeReferenceArc,
    GaugeValueArc,
    useGaugeState,
} from "@mui/x-charts";
import React, {useEffect, useState} from "react";
import {MdOutlineWaves} from "react-icons/md";
import {cardStyle} from "../assets/style";
import useWebsocketServer from "../hook/useWebsocketServer";
import useTranslate from "../hook/useTranslate.jsx";
import {useSelector} from "react-redux";

function GaugeHumidityComponent({value}) {
    const {t} = useTranslate();
    const mode = useSelector((state) => state.theme.mode);
    const valueMin = 0;
    const valueMax = 100;

    const clampedValue = Math.min(Math.max(value, valueMin), valueMax);

    function GaugePointer() {
        const {valueAngle, outerRadius, cx, cy} = useGaugeState();

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
                <circle cx={cx} cy={cy} r={5} fill={`${mode === "dark"  ? "white" : "black"}`}/>
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
            fill: "url(#humidityGradient)",
        };
    });

    return (
        <Card
            sx={{...cardStyle}}
            className="flex flex-col items-center justify-center py-5"
        >
            <Typography
                variant="h6"
                className="flex justify-center items-center gap-2"
            >
                <MdOutlineWaves className="w-7 h-7"/>
                {t('humidity')}
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
                                id="humidityGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop offset="0%" stopColor="#48CBE8"/>
                                {/* Light Blue */}
                                <stop offset="50%" stopColor="#067CFF"/>
                                {/* Blue */}
                                <stop offset="100%" stopColor="#BA1561"/>
                                {/* Pink/Red */}
                            </linearGradient>
                        </defs>
                        <GaugeReferenceArcStyled/>
                        <GaugePointer/>
                    </GaugeContainer>
                </div>
                <Typography variant="h4">{value}%</Typography>
            </div>
        </Card>
    );
}

export default GaugeHumidityComponent;
