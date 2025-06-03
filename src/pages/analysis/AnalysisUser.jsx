import StepLineChartForUserComponent from "../../components/StepLineChartForUserComponent.jsx";
import {Card, Grid2} from "@mui/material";
import {useGetAnalysisByRoomIdQuery} from "../../redux/feature/analysis/analysisApiSlice.js";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent.jsx";
import LineChartCusTwoComponent from "../../components/LineChartCusTwoComponent.jsx";

function AnalysisUser() {
    const {data: analysisByRoomIdData, isLoading, isSuccess} = useGetAnalysisByRoomIdQuery({
        roomId: 1,
        dateFrom: "2024-06-01",
        dateTo: "2025-06-05"
    });

    let content;

    if (isLoading) content = <LoadingFetchingDataComponent/>;

    if (isSuccess) content = <>
        <Grid2 container spacing={2} sx={{mt: 2}}>
            {
                analysisByRoomIdData?.map((item, index) => {
                        if (!item.controllable) {
                            return (
                                <Grid2 size={4} key={index}>
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
                                <Grid2 size={3} key={index}>
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