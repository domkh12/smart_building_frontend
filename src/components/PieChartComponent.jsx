import ReactApexChart from "react-apexcharts";
import {useState, useEffect} from "react";
import {Card, Typography, Box, Alert} from "@mui/material";
import {useTheme} from "@mui/material/styles";

function PieChartComponent({title, series, labels}) {
    const theme = useTheme();
    
    // Ensure we have valid data
    const validSeries = Array.isArray(series) && series.length > 0 ? series : [0];
    const validLabels = Array.isArray(labels) && labels.length > 0 ? labels : ['No Data'];
    
    // If we only have one data point with value 0, show a placeholder
    const hasData = validSeries.some(value => value > 0);
    
    const [state, setState] = useState({
        series: validSeries,
        options: {
            chart: {
                width: 380,
                type: 'pie',
                dropShadow: {
                    enabled: true,
                    color: '#111',
                    top: -1,
                    left: 3,
                    blur: 3,
                    opacity: 0.1
                }
            },
            labels: validLabels,
            legend: {
                position: 'bottom',
                show: true,
                horizontalAlign: 'center',
                floating: false,
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial',
                fontWeight: 400,
                offsetY: 7,
                itemMargin: {
                    horizontal: 10,
                    vertical: 5
                },
                borderWidth: 1,
                borderRadius: 0,
                markers: {
                    width: 12,
                    height: 12,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    radius: 12,
                    offsetX: 0,
                    offsetY: 0
                },
                onItemClick: {
                    toggleDataSeries: false
                },
                onItemHover: {
                    highlightDataSeries: false
                }
            },
            colors: ['#4CAF50', '#FF5252', '#FF9800', '#2196F3', '#9C27B0', '#607D8B'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom',
                        fontSize: '12px'
                    }
                }
            }],
            dataLabels: {
                enabled: true,
                formatter: function (val, opts) {
                    return opts.w.globals.seriesTotals[opts.seriesIndex] > 0 
                        ? opts.w.globals.seriesTotals[opts.seriesIndex] 
                        : '';
                },
                style: {
                    fontSize: '14px',
                    fontFamily: 'Helvetica, Arial',
                    fontWeight: 'bold'
                },
                dropShadow: {
                    enabled: false
                }
            },
            plotOptions: {
                pie: {
                    startAngle: 0,
                    endAngle: 360,
                    expandOnClick: true,
                    offsetX: 0,
                    offsetY: 0,
                    customScale: 1,
                    dataLabels: {
                        offset: 0,
                        minAngle: 0
                    },
                    donut: {
                        size: '65%',
                        background: 'transparent',
                        labels: {
                            show: false,
                            name: {
                                show: true,
                                fontSize: '22px',
                                fontFamily: 'Helvetica, Arial',
                                fontWeight: 600,
                                color: undefined,
                                offsetY: -10
                            },
                            value: {
                                show: true,
                                fontSize: '16px',
                                fontFamily: 'Helvetica, Arial',
                                fontWeight: 400,
                                color: undefined,
                                offsetY: 16,
                                formatter: function (val) {
                                    return val;
                                }
                            },
                            total: {
                                show: false,
                                label: 'Total',
                                fontSize: '16px',
                                fontFamily: 'Helvetica, Arial',
                                fontWeight: 600,
                                color: undefined,
                                formatter: function (w) {
                                    return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                }
                            }
                        }
                    }
                }
            },
            stroke: {
                width: 2,
                colors: ['#fff']
            },
            tooltip: {
                enabled: true,
                theme: 'light',
                style: {
                    fontSize: '14px'
                },
                y: {
                    formatter: function(value) {
                        return value;
                    }
                }
            }
        },
    });

    useEffect(() => {
        setState(prev => ({
            ...prev,
            series: validSeries,
            options: {
                ...prev.options,
                labels: validLabels
            }
        }));
    }, [series, labels]);

    return (
        <Card sx={{
            p: 3, 
            mx: "auto", 
            height: "100%",
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Typography
                variant="h6"
                sx={{
                    mb: 3,
                    textAlign: 'start',
                    fontWeight: 600,
                    color: 'text.primary'
                }}
            >
                {title}
            </Typography>
            
            {!hasData && (
                <Alert severity="info" sx={{ mb: 2 }}>
                    No device status data available
                </Alert>
            )}
            
            <Box sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                minHeight: 300
            }}>
                <ReactApexChart 
                    options={state.options} 
                    series={state.series} 
                    type="pie" 
                    width={350}
                />
            </Box>
        </Card>
    );
}

export default PieChartComponent;