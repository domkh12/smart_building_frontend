import {axisClasses, LineChart, lineElementClasses, markElementClasses} from "@mui/x-charts";
import {Card, Grid2, Typography} from "@mui/material";
import {cardStyle} from "../../assets/style.js";
import TotalCountComponent from "../../components/TotalCountComponent.jsx";
import useTranslate from "../../hook/useTranslate.jsx";
import {useEffect, useState} from "react";
import {useGetPowerQuery, useGetTotalCountsMutation} from "../../redux/feature/analysis/analysisApiSlice.js";
import {useDispatch, useSelector} from "react-redux";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent.jsx";
import {FaBuilding} from "react-icons/fa";
import {ImUsers} from "react-icons/im";
import {FaMicrochip} from "react-icons/fa6";
import {MdElevator, MdMeetingRoom} from "react-icons/md";
import PowerLineChartComponent from "../../components/PowerLineChartComponent.jsx";
import dayjs from "dayjs";
import useAuth from "../../hook/useAuth.jsx";
import {setPowerChart} from "../../redux/feature/analysis/analysisSlice.js";

function Dashboard() {
    const {t} = useTranslate();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const totalUserCount = useSelector((state) => state.analysis.totalCountUser);
    const totalCountBuilding = useSelector((state) => state.analysis.totalCountBuilding);
    const totalCountDevice = useSelector((state) => state.analysis.totalCountDevice);
    const totalCountRoom = useSelector((state) => state.analysis.totalCountRoom);
    const totalFloorCount = useSelector((state) => state.analysis.totalFloorCount);

    const {isManager, isAdmin} = useAuth();

    const [getTotalCounts, {
        isSuccess: isSuccessGetAllTotalCount,
        isLoading: isLoadingGetAllTotalCount,
        isError: isErrorGetAllTotalCount,
        error: errorGetAllTotalCount
    }] = useGetTotalCountsMutation()

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await Promise.all([getTotalCounts()])
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    let content;

    if (isLoading) content = <LoadingFetchingDataComponent/>;

    if (!isLoading) content = (
        <>
            <Typography variant="h5" sx={{marginBottom: 4}}>{t('welcomeBack')}</Typography>
            <Grid2 container spacing={3} sx={{mb: 3}}>
                <Grid2 size={{xs: 12, sm: 6, md: 3}}>
                    <TotalCountComponent quantity={totalCountDevice} percentage={"+2.6%"}
                                         gradient1={"#BFDAF3"}
                                         gradient2={"#9DC0E0"}
                                         textColor={"#0C4C88"}
                                         title={t("device")}
                                         icon={<FaMicrochip
                                             className="h-14 w-14 object-cover ml-2 mt-2 text-[#0C4C88]"/>}
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
                                                 className="h-12 w-12 object-cover ml-2 mt-2 text-[#6F0E78]"/>}
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
                                                 className="h-12 w-12 object-cover ml-2 mt-2 text-[#6F0E78]"/>}
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
                                             className="h-14 w-14 object-cover ml-2 mt-1 text-[#73550E]"/>}
                    />
                </Grid2>
                <Grid2 size={{xs: 12, sm: 6, md: 3}}>
                    <TotalCountComponent quantity={totalUserCount} percentage={"+2.6%"}
                                         gradient1={"#F7E0C5"}
                                         gradient2={"#E1C29E"}
                                         textColor={"#734005"}
                                         title={t("user")}
                                         icon={<ImUsers className="h-14 w-14 object-cover ml-2 mt-1 text-[#734005]"/>}
                    />
                </Grid2>
            </Grid2>


            <Grid2 container spacing={2}>

                <Grid2 size={12}>
                    <PowerLineChartComponent />
                </Grid2>

            </Grid2>
        </>

    )

    return content

}

export default Dashboard;
