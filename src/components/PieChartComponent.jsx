import ReactApexChart from "react-apexcharts";
import {useState} from "react";
import {Card, Typography} from "@mui/material";

function PieChartComponent({title, series, labels}) {

    const [state, setState] = useState({
        series: series || [0, 0],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: labels || ['Active', 'Inactive'],
            legend: {
                position: 'bottom',
                show: true,
                horizontalAlign: 'center',
                floating: false,
                fontSize: '14px',
                offsetY: 7,
                itemMargin: {
                    horizontal: 5,
                    vertical: 3
                },
                borderWidth: 1,
                borderRadius: 0,
                markers: {
                    width: 12,
                    height: 12,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    radius: 12,
                },
            },
            colors: ['#4CAF50', '#FF5252'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    }
                }
            }]
        },
    });

    return (
        <Card sx={{p: 3, mx: "auto", height: "100%"}}>
            <Typography
                variant="h6"
                sx={{
                    mb: 2,
                    textAlign: 'start'
                }}
            >
                {title}
            </Typography>
            <div className="flex justify-center items-center">
                <ReactApexChart options={state.options} series={state.series} type="pie" width={350}/>
            </div>
        </Card>
    );
}

export default PieChartComponent;