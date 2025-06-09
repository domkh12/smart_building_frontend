import ReactApexChart from "react-apexcharts";
import {useState} from "react";

function LineChartCusTwoComponent({data}) {

    const [state] = useState({

        series: [{
            name: '',
            data: data.series[0].data || [],
        }],
        options: {
            chart: {
                height: 500,
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
                height="300px"
            />
        </>
    )
}

export default LineChartCusTwoComponent;