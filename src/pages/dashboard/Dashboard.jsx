import {Box, Grid2, Popover, Typography, useMediaQuery} from "@mui/material";
import TotalCountComponent from "../../components/TotalCountComponent.jsx";
import useTranslate from "../../hook/useTranslate.jsx";
import {useEffect, useState} from "react";
import {useGetAnalysisQuery, useGetTotalCountsMutation} from "../../redux/feature/analysis/analysisApiSlice.js";
import {useDispatch, useSelector} from "react-redux";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent.jsx";
import {FaBuilding} from "react-icons/fa";
import {ImUsers} from "react-icons/im";
import {FaMicrochip} from "react-icons/fa6";
import {MdElevator, MdMeetingRoom} from "react-icons/md";
import useAuth from "../../hook/useAuth.jsx";
import ColumnChartComponent from "../../components/ColumnChartComponent.jsx";
import PieChartComponent from "../../components/PieChartComponent.jsx";
import {IoIosArrowDown} from "react-icons/io";
import {ToggleButtonGroup, ToggleButton} from '@mui/material';
import {DatePicker} from "@mui/x-date-pickers";
import {setSelectedPeriod} from "../../redux/feature/analysis/analysisSlice.js";

function Dashboard() {
    const dispatch = useDispatch();
    const {t} = useTranslate();
    const [isLoading, setIsLoading] = useState(true);
    const totalUserCount = useSelector((state) => state.analysis.totalCountUser);
    const totalCountBuilding = useSelector((state) => state.analysis.totalCountBuilding);
    const totalCountDevice = useSelector((state) => state.analysis.totalCountDevice);
    const totalCountRoom = useSelector((state) => state.analysis.totalCountRoom);
    const totalFloorCount = useSelector((state) => state.analysis.totalFloorCount);
    const sm = useMediaQuery(theme => theme.breakpoints.up('sm'));
    const lg = useMediaQuery(theme => theme.breakpoints.up('lg'));
    const selectedPeriod= useSelector((state) => state.analysis.selectedPeriod);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const {isManager, isAdmin} = useAuth();
    const dateFrom = useSelector((state) => state.analysis.dateFrom);
    const dateTo = useSelector((state) => state.analysis.dateTo);
    console.log(dateFrom, dateTo)
    const {data: analysis, isLoading: isLoadingGetAnalysis, isSuccess} = useGetAnalysisQuery({date_from: dateFrom, date_to: dateTo});
    const [getTotalCounts, {
        isSuccess: isSuccessGetAllTotalCount,
        isLoading: isLoadingGetAllTotalCount,
        isError: isErrorGetAllTotalCount,
        error: errorGetAllTotalCount
    }] = useGetTotalCountsMutation()

    useEffect(() => {
        if (!isLoadingGetAllTotalCount && isSuccessGetAllTotalCount) {
            setIsLoading(false);
        }
    }, [isLoadingGetAnalysis, isLoadingGetAllTotalCount]);

    const handleCustomClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    useEffect(() => {
        if (selectedPeriod === 'custom') {
            const buttonElement = document.querySelector('[value="custom"]');
            setAnchorEl(buttonElement);
        }
    }, [selectedPeriod]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([getTotalCounts()])
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    let content;

    if (isLoading || isLoadingGetAnalysis) content = <LoadingFetchingDataComponent/>;

    if (!isLoading && isSuccess) content = (
        <>
            <div className="flex justify-between items-center gap-5 mb-8">
                <Typography variant={sm ? "h5" : "body1"}>{t('welcomeBack')}</Typography>
                <div className="flex items-center gap-5">
                        <>
                            <ToggleButtonGroup
                                value={selectedPeriod}
                                exclusive
                                onChange={(event, newPeriod) => {
                                    if (newPeriod !== null) {
                                        dispatch(setSelectedPeriod(newPeriod))
                                    }
                                }}
                            >
                                <ToggleButton
                                    value={selectedPeriod}
                                    color="primary"
                                    onClick={handleCustomClick}
                                    sx={{justifyContent: "center", alignItems: "center", gap: 1}}
                                >
                                    {selectedPeriod === 'custom'
                                        ? (selectedDate ? selectedDate.format('MMM YYYY') : 'Custom')
                                        : selectedPeriod === 'month'
                                            ? 'Last month'
                                            : selectedPeriod === '30days'
                                                ? 'Last 30days'
                                                : 'Last 7days'
                                    }
                                    <IoIosArrowDown/>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </>
                </div>

            </div>


            <Grid2 container spacing={3} sx={{mb: 3}}>
                <Grid2 size={{xs: 12, sm: 6, md: 3}}>
                    <TotalCountComponent quantity={totalCountDevice} percentage={"+2.6%"}
                                         gradient1={"#BFDAF3"}
                                         gradient2={"#9DC0E0"}
                                         textColor={"#0C4C88"}
                                         title={t("device")}
                                         icon={<FaMicrochip
                                             className={`${lg ? "w-14 h-14" : "w-10 h-10"}  object-cover ml-2 mt-2 text-[#0C4C88]`}
                                         />}
                    />
                </Grid2>

                {
                    isAdmin && (<Grid2 size={{xs: 12, sm: 6, md: 3}}>
                        <TotalCountComponent quantity={totalFloorCount} percentage={"+2.6%"}
                                             gradient1={"#F3C8F7"}
                                             gradient2={"#DC9DE2"}
                                             textColor={"#6F0E78"}
                                             title={t("floor")}
                                             icon={<MdElevator
                                                 className={`${lg ? "w-14 h-14" : "w-10 h-10"} object-cover ml-2 mt-2 text-[#6F0E78]`}/>}
                        />
                    </Grid2>)
                }

                {
                    isManager && (<Grid2 size={{xs: 12, sm: 6, md: 3}}>
                        <TotalCountComponent quantity={totalCountBuilding} percentage={"+2.6%"}
                                             gradient1={"#F3C8F7"}
                                             gradient2={"#DC9DE2"}
                                             textColor={"#6F0E78"}
                                             title={t("building")}
                                             icon={<FaBuilding
                                                 className={`${lg ? "w-14 h-14" : "w-10 h-10"} object-cover ml-2 mt-2 text-[#6F0E78]`}/>}
                        />
                    </Grid2>)
                }

                <Grid2 size={{xs: 12, sm: 6, md: 3}}>
                    <TotalCountComponent quantity={totalCountRoom} percentage={"+2.6%"}
                                         gradient1={"#F6EACF"}
                                         gradient2={"#F9E3B0"}
                                         textColor={"#73550E"}
                                         title={t("room")}
                                         icon={<MdMeetingRoom
                                             className={`${lg ? "w-14 h-14" : "w-10 h-10"} object-cover ml-2 mt-1 text-[#73550E]`}/>}
                    />
                </Grid2>
                <Grid2 size={{xs: 12, sm: 6, md: 3}}>
                    <TotalCountComponent quantity={totalUserCount} percentage={"+2.6%"}
                                         gradient1={"#F7E0C5"}
                                         gradient2={"#E1C29E"}
                                         textColor={"#734005"}
                                         title={t("user")}
                                         icon={<ImUsers className={`${lg ? "w-14 h-14" : "w-10 h-10"} object-cover ml-2 mt-1 text-[#734005]`}/>}
                    />
                </Grid2>
            </Grid2>


            <Grid2 container spacing={2}>
                <Grid2 size={{xs: 12, md: 4}}>
                    <PieChartComponent title={t('deviceStatus')}
                                       series={analysis?.statusDevice?.series}
                                       labels={analysis?.statusDevice?.labels}
                    />
                </Grid2>
                <Grid2 size={{xs: 12, md: 8}}>
                    <ColumnChartComponent title={t('powerConsumption')}/>
                </Grid2>
            </Grid2>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Box sx={{p: 2, display: 'flex', flexDirection: 'column', gap: 2}}>

                        <div className="flex flex-col gap-2">
                            <ToggleButton
                                fullWidth
                                value="month"
                                selected={selectedPeriod === 'month'}
                                onClick={() => {
                                    dispatch(setSelectedPeriod("month"))
                                    handleClose();
                                }}
                            >
                                Last month
                            </ToggleButton>
                            <ToggleButton
                                fullWidth
                                value="30days"
                                selected={selectedPeriod === '30days'}
                                onClick={() => {
                                    dispatch(setSelectedPeriod("30days"))
                                    handleClose();
                                }}
                            >
                                Last 30days
                            </ToggleButton>
                            <ToggleButton
                                fullWidth
                                value="7days"
                                selected={selectedPeriod === '7days'}
                                onClick={() => {
                                    dispatch(setSelectedPeriod("7days"));
                                    handleClose();
                                }}
                            >
                                Last 7days
                            </ToggleButton>
                        </div>

                    <DatePicker
                        views={['month', 'year']}
                        label="Month and Year"
                        value={selectedDate}
                        onChange={(newValue) => {
                            setSelectedDate(newValue);
                            dispatch(setSelectedPeriod("custom"))
                            handleClose();
                        }}
                    />
                </Box>
            </Popover>


        </>

    )

    return content

}

export default Dashboard;
