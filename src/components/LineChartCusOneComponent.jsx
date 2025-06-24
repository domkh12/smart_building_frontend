import ReactApexChart from "react-apexcharts";
import {useMemo} from "react";

function LineChartCusOneComponent({ values = [], xaxis = [], textColor = "#000" }) {

    const chartConfig = useMemo(() => ({
        series: [{
            name: '',
            data: values || [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }],
        options: {
            chart: {
                type: 'line',
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                },
                height: 350,
                animations: {
                    enabled: false,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000
                    }
                },
                parentHeightOffset: 0,
                sparkline: {
                    enabled: true
                }
            },
            colors: [textColor],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 3
            },
            grid: {
                show: false
            },
            xaxis: {
                categories: xaxis,
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                show: false
            },
            tooltip: {
                enabled: true
            },
            legend: {
                show: false
            }
        },
    }), [values, xaxis, textColor]);

    return (
        <div style={{ width: '90px', height: '90px' }}>
            <ReactApexChart
                options={chartConfig.options}
                series={chartConfig.series}
                type="line"
                width="100%"
                height="100%"
            />
        </div>
    );

}

export default LineChartCusOneComponent;