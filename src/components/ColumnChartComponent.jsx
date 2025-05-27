import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import {Card, Typography} from "@mui/material";
import { useSelector } from "react-redux";

function ColumnChartComponent({title}) {
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
            <Typography variant="h6" sx={{ mb: 2 }}>
                {title}
            </Typography>
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </Card>
    );
}

export default ColumnChartComponent;