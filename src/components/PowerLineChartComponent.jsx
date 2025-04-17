import React, {useEffect, useMemo, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useGetPowerQuery} from "../redux/feature/analysis/analysisApiSlice";
import {setPowerChart} from "../redux/feature/analysis/analysisSlice";
import ReactApexChart from "react-apexcharts";
import {Card, Typography, Select, MenuItem, FormControl} from "@mui/material";
import {cardStyle} from "../assets/style.js";
import useTranslate from "../hook/useTranslate";

function PowerLineChartComponent() {
    const {t} = useTranslate();
    const dispatch = useDispatch();
    const [timeFilter, setTimeFilter] = useState("24h");
    const {data: powerData, isLoading} = useGetPowerQuery({range: timeFilter});
    const totalPower = useSelector((state) => state.analysis.totalPower);
    const seriesPower = useSelector((state) => state.analysis.seriesPower);

    useEffect(() => {
        if (powerData) {
            dispatch(setPowerChart(powerData));
        }
    }, [powerData, dispatch]);

    const handleChange = (event) => {
        setTimeFilter(event.target.value);
    };

    const options = useMemo(() => ({
        chart: {
            type: 'area',
            height: 350,
            stacked: true,
            events: {
                selection: function (chart, e) {
                    console.log(new Date(e?.xaxis?.min));
                }
            },
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        noData: {
            text: isLoading ? "Loading...":"No Data present in the graph!",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
                color: "#000000",
                fontSize: '14px',
                fontFamily: "Helvetica"
            }
        },
        colors: ['#008FFB', '#00E396', '#CED4DC'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'monotoneCubic'
        },
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.6,
                opacityTo: 0.8,
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: -35
        },
        xaxis: {
            type: 'datetime',
            labels: {
                formatter: function(value) {
                    const date = new Date(value);
                    return timeFilter === "24h"
                        ? `${date.getHours()}:00`
                        : date.toLocaleDateString('en-GB');
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function(value) {
                    return value >= 1000 ? `${(value / 1000).toFixed(2)} KW` : `${value} W`;
                }
            }
        },
        grid: {
            borderColor: '#e0e0e0',
            strokeDashArray: 4,
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: function (value) {
                    return value >= 1000 ? `${(value / 1000).toFixed(2)} KW` : `${value} W`;
                },
                title: {
                    formatter: function (seriesName) {
                        return seriesName;
                    }
                }
            },
            x: {
                format: 'dd MMM yyyy'
            },
        }
    }), [timeFilter, isLoading]);

    return (
        <Card sx={{...cardStyle, padding: "20px"}}>
            <div className="flex justify-between">
                <div>
                    <Typography variant="subtitle1">{t('totalEnergy')}</Typography>
                    <Typography variant="h4" sx={{fontWeight: "700", my: 2}}>
                        {totalPower >= 1000 ? `${(totalPower / 1000).toFixed(2)} KW` : `${totalPower} W`}
                    </Typography>
                </div>
                <FormControl sx={{m: 1, minWidth: 120}} size="small">
                    <Select
                        value={timeFilter}
                        sx={{borderRadius: "8px"}}
                        onChange={handleChange}
                    >
                        <MenuItem value="24h">{t('last24hrs')}</MenuItem>
                        <MenuItem value="7d">{t('last7days')}</MenuItem>
                        <MenuItem value="28d">{t('last28days')}</MenuItem>
                        <MenuItem value="90d">{t('last90days')}</MenuItem>
                        <MenuItem value="365d">{t('last365days')}</MenuItem>
                        <MenuItem value="lifetime">{t('lifetime')}</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div>
                <ReactApexChart
                    options={options}
                    series={JSON.parse(JSON.stringify(seriesPower))} // shallow copy to avoid mutation errors
                    type="area"
                    height={350}
                />
            </div>
        </Card>
    );
}

export default PowerLineChartComponent;
