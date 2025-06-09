import ReactApexChart from "react-apexcharts";
import {useState} from "react";

function StepLineChartForUserComponent({data}) {

    const [state] = useState({

        series: [{
            data: data.series[0].data || []
        }],

        options: {
            chart: {
                type: 'line',
                height: 200,
                toolbar: {
                    show: false
                }
            },
            xaxis: {
                categories: data.xAxis || [],
            },
            stroke: {
                curve: 'stepline',
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                hover: {
                    sizeOffset: 4
                }
            },
            title: {
                text: data.deviceName || "",
                align: 'left'
            },
            tooltip: {
                y: {
                    title: {
                        formatter: () => ""
                    }
                }
            }
        },


    });
    return(
        <>
            <ReactApexChart options={state.options} series={state.series} type="line" height="300px" />
        </>
    )
}

export default StepLineChartForUserComponent;