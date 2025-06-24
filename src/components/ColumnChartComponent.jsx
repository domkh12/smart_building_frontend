import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import {Card, FormControl, MenuItem, Select, Typography} from "@mui/material";
import { useSelector } from "react-redux";
import useTranslate from "../hook/useTranslate.jsx";

function ColumnChartComponent({title}) {
    const {t} = useTranslate();
    const [timeFilter, setTimeFilter] = useState("24h");
    const handleChange = (event) => {
        setTimeFilter(event.target.value);
    };
    const mode = useSelector((state) => state.theme.mode);
    const [series] = useState([{
        name: 'Power',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }]);

    const options = {
        chart: {
            type: 'bar',
            height: 350,
            forceColors: [mode === "dark" ? "#111111" : "#ffffff"],
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 5,
                borderRadiusApplication: 'end'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            labels: {
                style: {
                    colors: mode === "dark" ? "#ffffff" : "#000000",
                }
            }
        },
        yaxis: {
            style: {
                colors: mode === "dark" ? "#ffffff" : "#000",
            },
            labels: {
                style: {
                    colors: mode === "dark" ? "#ffffff" : "#000000",
                }
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " W"
                },
            },
        },
    };

    return (
        <Card sx={{ p: 3, mx: "auto" }}>
            <div className="flex justify-between">
                <div>
                    <Typography variant="subtitle1">{title}</Typography>
                    <Typography variant="h4" sx={{fontWeight: "700", my: 2}}>
                        {/*{totalPower >= 1000 ? `${(totalPower / 1000).toFixed(2)} KW` : `${totalPower} W`}*/}10
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
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </Card>
    );
}

export default ColumnChartComponent;