import ReactApexChart from "react-apexcharts";
import {useState} from "react";

function StepLineChartForUserComponent() {
    const [state, setState] = useState({

        series: [{
            data: [1,0,1,0,1,0,1,0,1,0]
        }],
        options: {
            chart: {
                type: 'line',
                height: 200,
                toolbar: {
                    show: false
                }
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
                text: 'Step Line Chart',
                align: 'left'
            }
        },


    });
    return(
        <>
            <ReactApexChart options={state.options} series={state.series} type="line" height={200} />
        </>
    )
}

export default StepLineChartForUserComponent;