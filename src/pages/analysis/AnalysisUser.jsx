import StepLineChartForUserComponent from "../../components/StepLineChartForUserComponent.jsx";
import {Grid2} from "@mui/material";

function AnalysisUser() {
    return(
        <>Analysis User
            <Grid2 container spacing={2} sx={{mt: 2}}>
                <Grid2 size={3}><StepLineChartForUserComponent/></Grid2>
                <Grid2 size={3}><StepLineChartForUserComponent/></Grid2>
                <Grid2 size={3}><StepLineChartForUserComponent/></Grid2>
                <Grid2 size={3}><StepLineChartForUserComponent/></Grid2>
            </Grid2>
        </>
    )
}

export default AnalysisUser;