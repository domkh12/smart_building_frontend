import StepLineChartForUserComponent from "../../components/StepLineChartForUserComponent.jsx";
import {Card, Grid2, Typography} from "@mui/material";
import {useGetAnalysisByRoomIdQuery} from "../../redux/feature/analysis/analysisApiSlice.js";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent.jsx";
import LineChartCusTwoComponent from "../../components/LineChartCusTwoComponent.jsx";
import dayjs from "dayjs";
import useAuth from "../../hook/useAuth.jsx";
import useTranslate from "../../hook/useTranslate.jsx";

function AnalysisUser() {
    const now = dayjs();
    const {t} = useTranslate();
    const formattedDateNow = now.format('YYYY-MM-DD');
    const {roomId} = useAuth();
    const {data: analysisByRoomIdData, isLoading, isSuccess} = useGetAnalysisByRoomIdQuery({
        roomId: roomId[0],
        dateFrom: formattedDateNow,
        dateTo: formattedDateNow
    });

    let content;

    if (isLoading) content = <LoadingFetchingDataComponent/>;

    if (isSuccess) content = <>
        <Typography variant="body1" align={"right"}>{t('last24hrs')}</Typography>
        <Grid2 container spacing={2} sx={{mt: 2}}>
            {
                analysisByRoomIdData?.map((item, index) => {
                        if (!item.controllable) {
                            return (
                                <Grid2 size={{xs:12, md: 4, lg: 3}} key={index}>
                                    <Card sx={{p: 2}}>
                                        <LineChartCusTwoComponent data={item}/>
                                    </Card>
                                </Grid2>
                            )
                        }
                    }
                )
            }
        </Grid2>

        <Grid2 container spacing={2} sx={{mt: 2}}>
            {
                analysisByRoomIdData?.map((item, index) => {
                        if (item.controllable) {
                            return (
                                <Grid2 size={{xs:12, md: 4, lg: 3}} key={index}>
                                    <Card sx={{p: 2}}>
                                        <StepLineChartForUserComponent data={item}/>
                                    </Card>
                                </Grid2>
                            )
                        }
                    }
                )
            }
        </Grid2></>;

    return content;
}

export default AnalysisUser;