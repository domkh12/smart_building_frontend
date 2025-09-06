import {Box, Card, Grid2, Typography, useMediaQuery} from "@mui/material";
import TotalCountComponent from "../../components/TotalCountComponent.jsx";
import useTranslate from "../../hook/useTranslate.jsx";
import {useMemo} from "react";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent.jsx";
import {FaBuilding} from "react-icons/fa";
import {ImUsers} from "react-icons/im";
import {FaMicrochip} from "react-icons/fa6";
import {MdElevator, MdMeetingRoom} from "react-icons/md";
import useAuth from "../../hook/useAuth.jsx";
import ReactApexChart from "react-apexcharts";
import {useGetAnalysisQuery} from "../../redux/feature/analysis/analysisApiSlice.js";

function Dashboard() {
    const {t} = useTranslate();
    const sm = useMediaQuery(theme => theme.breakpoints.up('sm'));
    const lg = useMediaQuery(theme => theme.breakpoints.up('lg'));
    const {isManager, isAdmin} = useAuth();

    const {
        data: analysisData,
        isSuccess,
        isLoading,
        isError,
        error
    } = useGetAnalysisQuery({
        dateFrom: '',
        dateTo: '',
    });
    console.log({analysisData});

    // Generate chart data from mock data
    const chartData = useMemo(() => {
        // Guard clause - ensure powerUsage data exists
        if (!analysisData?.powerUsage?.dates || !analysisData?.powerUsage?.buildings) {
            return {
                series: [],
                options: {
                    chart: {
                        type: 'area',
                        height: 350,
                    }
                }
            };
        }

        const categories = analysisData.powerUsage.dates.map(date => new Date(date).getTime());
        const series = analysisData.powerUsage.buildings.map(building => ({
            name: building.name,
            data: building.data
        }));
        const colors = analysisData.powerUsage.buildings.map(building => building.color);

        return {
            series: series,
            options: {
                chart: {
                    type: 'area',
                    height: 350,
                    stacked: false,
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                colors: colors,
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth',
                    width: 2
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.2,
                        stops: [0, 100]
                    }
                },
                legend: {
                    show: true,
                    position: 'top',
                    horizontalAlign: 'left',
                    fontSize: '14px',
                    fontFamily: 'Helvetica, Arial',
                    fontWeight: 500,
                    markers: {
                        width: 12,
                        height: 12,
                        radius: 6
                    },
                    itemMargin: {
                        horizontal: 10,
                        vertical: 5
                    }
                },
                xaxis: {
                    type: 'datetime',
                    categories: categories,
                    labels: {
                        style: {
                            colors: '#666',
                            fontSize: '12px'
                        },
                        formatter: function(value) {
                            const date = new Date(value);
                            return date.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                            });
                        }
                    }
                },
                yaxis: {
                    labels: {
                        formatter: function(value) {
                            return value >= 1000 ? `${(value / 1000).toFixed(1)} kWh` : `${value} Wh`;
                        },
                        style: {
                            colors: '#666',
                            fontSize: '12px'
                        }
                    }
                },
                grid: {
                    borderColor: '#e0e0e0',
                    strokeDashArray: 4,
                    xaxis: {
                        lines: {
                            show: false
                        }
                    },
                    yaxis: {
                        lines: {
                            show: true
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    theme: 'light',
                    shared: true,
                    intersect: false,
                    y: {
                        formatter: function (value) {
                            return value >= 1000 ? `${(value / 1000).toFixed(2)} kWh` : `${value} Wh`;
                        }
                    },
                    x: {
                        format: 'dd MMM yyyy'
                    }
                }
            }
        };
    }, [analysisData]);

    let content;

    if (isLoading) content = <LoadingFetchingDataComponent/>;

    if (!isLoading) content = (
        <>
            {/* Welcome Section */}
            <Box sx={{ mb: 4 }}>
                <Typography 
                    variant="h5"
                    sx={{ 
                        fontWeight: 500,
                        color: 'text.primary',
                        mb: 1
                    }}
                >
                    {t('welcomeBack')}
                </Typography>
            </Box>

            {/* Statistics Cards */}
            <Grid2 container spacing={3} sx={{mb: 4}}>
                <Grid2 size={{xs: 12, sm: 6, md: 3}}>
                    <TotalCountComponent 
                        quantity={analysisData?.stats?.devices}
                        gradient1={"#BFDAF3"}
                        gradient2={"#9DC0E0"}
                        textColor={"#0C4C88"}
                        title={t("device")}
                        icon={<FaMicrochip
                            className={`${lg ? "w-14 h-14" : "w-10 h-10"} object-cover ml-2 mt-2 text-[#0C4C88]`}
                        />}
                    />
                </Grid2>

                {isAdmin && (
                    <Grid2 size={{xs: 12, sm: 6, md: 3}}>
                        <TotalCountComponent 
                            quantity={analysisData?.stats?.floors}
                            gradient1={"#F3C8F7"}
                            gradient2={"#DC9DE2"}
                            textColor={"#6F0E78"}
                            title={t("floor")}
                            icon={<MdElevator
                                className={`${lg ? "w-14 h-14" : "w-10 h-10"} object-cover ml-2 mt-1 text-[#6F0E78]`}
                            />}
                        />
                    </Grid2>
                )}

                {isManager && (
                    <Grid2 size={{xs: 12, sm: 6, md: 3}}>
                        <TotalCountComponent 
                            quantity={analysisData?.stats?.buildings}
                            gradient1={"#F3C8F7"}
                            gradient2={"#DC9DE2"}
                            textColor={"#6F0E78"}
                            title={t("building")}
                            icon={<FaBuilding
                                className={`${lg ? "w-14 h-14" : "w-10 h-10"} object-cover ml-2 mt-1 text-[#6F0E78]`}
                            />}
                        />
                    </Grid2>
                )}

                <Grid2 size={{xs: 12, sm: 6, md: 3}}>
                    <TotalCountComponent 
                        quantity={analysisData?.stats?.rooms}
                        gradient1={"#F6EACF"}
                        gradient2={"#F9E3B0"}
                        textColor={"#73550E"}
                        title={t("room")}
                        icon={<MdMeetingRoom
                            className={`${lg ? "w-14 h-14" : "w-10 h-10"} object-cover ml-2 mt-1 text-[#73550E]`}
                        />}
                    />
                </Grid2>
                
                <Grid2 size={{xs: 12, sm: 6, md: 3}}>
                    <TotalCountComponent 
                        quantity={analysisData?.stats?.users}
                        gradient1={"#F7E0C5"}
                        gradient2={"#E1C29E"}
                        textColor={"#734005"}
                        title={t("user")}
                        icon={<ImUsers 
                            className={`${lg ? "w-14 h-14" : "w-10 h-10"} object-cover ml-2 mt-1 text-[#734005]`}
                        />}
                    />
                </Grid2>
            </Grid2>

            {/* Charts Section */}
            <Grid2 container spacing={3}>
                {/* Single Device Status Chart for All Buildings */}
                <Grid2 size={{xs: 12, md: 5}}>
                    <Card sx={{
                        p: 3,
                        height: "100%",
                        borderRadius: 2,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                Device Status by Building
                            </Typography>
                        </Box>

                        {/* Device Status Chart */}
                        <Box sx={{ position: 'relative' }}>
                            <ReactApexChart 
                                options={{
                                    chart: {
                                        type: 'bar',
                                        height: 300,
                                        toolbar: {
                                            show: false
                                        }
                                    },
                                    plotOptions: {
                                        bar: {
                                            horizontal: false,
                                            columnWidth: '55%',
                                            endingShape: 'rounded'
                                        },
                                    },
                                    dataLabels: {
                                        enabled: true,
                                        formatter: function (val) {
                                            return val;
                                        },
                                        style: {
                                            fontSize: '12px',
                                            colors: ['#fff']
                                        }
                                    },
                                    stroke: {
                                        show: true,
                                        width: 2,
                                        colors: ['transparent']
                                    },
                                    colors: ['#4CAF50', '#FF5252'],
                                    xaxis: {
                                        categories: analysisData?.buildingDeviceStatus?.map(b => b.name),
                                        labels: {
                                            style: {
                                                colors: '#666',
                                                fontSize: '14px',
                                                fontWeight: 500
                                            }
                                        }
                                    },
                                    yaxis: {                                       
                                        labels: {
                                            style: {
                                                colors: '#666',
                                                fontSize: '12px'
                                            }
                                        }
                                    },
                                    fill: {
                                        opacity: 1
                                    },
                                    tooltip: {
                                        y: {
                                            formatter: function (val) {
                                                return val + " devices";
                                            }
                                        }
                                    },
                                    legend: {
                                        position: 'top',
                                        horizontalAlign: 'center',
                                        fontSize: '14px',
                                        fontFamily: 'Helvetica, Arial',
                                        fontWeight: 500
                                    }
                                }}
                                series={[
                                    {
                                        name: 'Active',
                                        data: analysisData?.buildingDeviceStatus?.map(b => b.series[0])
                                    },
                                    {
                                        name: 'Inactive',
                                        data: analysisData?.buildingDeviceStatus?.map(b => b.series[1])
                                    }
                                ]}
                                type="bar"
                                height={300}
                            />
                        </Box>
                    </Card>
                </Grid2>
                
                {/* Power Usage Chart */}
                <Grid2 size={{xs: 12, md: 7}}>
                    <Card sx={{
                        p: 3,
                        height: "100%",
                        borderRadius: 2,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                Power Usage Overview (Last 28 Days)
                            </Typography>
                        </Box>

                        {/* Chart */}
                        <Box sx={{ position: 'relative' }}>
                            <ReactApexChart 
                                options={chartData.options} 
                                series={chartData.series} 
                                type="area" 
                                height={300} 
                            />
                        </Box>
                    </Card>
                </Grid2>
            </Grid2>
        </>
    );

    return content;
}

export default Dashboard;
