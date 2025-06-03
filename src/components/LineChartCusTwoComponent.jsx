import ReactApexChart from "react-apexcharts";
import {useState} from "react";

function LineChartCusTwoComponent({data}) {
    console.log(data);
    const [state] = useState({

        series: [{
            data: data.series[0].data || [],
        }],
        options: {
            chart: {
                height: 350,
                type: 'area',
                toolbar: {
                    show: false
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: data.xAxis || []
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
            title: {
                text: data.deviceName,
                align: 'left'
            }
        },


    });

    return(
        <>
            <ReactApexChart
                options={state.options}
                series={state.series}
                type="line"
                width="100%"
                height="100%"
            />
        </>
    )
}

export default LineChartCusTwoComponent;