import ReactApexChart from "react-apexcharts";
import {useState} from "react";

function LineChartCusOneComponent({ values = [], textColor = "#000" }) {
    const [state] = useState({
        series: [{
            name: '',
            data: values.length > 0 ? values : [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
                animations: {
                    enabled: true
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
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
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
    });

    return (
        <div style={{ width: '90px', height: '90px' }}>
            <ReactApexChart
                options={state.options}
                series={state.series}
                type="line"
                width="100%"
                height="100%"
            />
        </div>
    );

}

export default LineChartCusOneComponent;