import {cardStyle} from "../assets/style.js";
import {Card, Grid2, Typography} from "@mui/material";
import {Gauge, gaugeClasses} from "@mui/x-charts";
import useTranslate from "../hook/useTranslate.jsx";
import {useSelector} from "react-redux";
import PowerForUserComponent from "./PowerForUserComponent.jsx";
import Pm2_5ForUserComponent from "./Pm2_5ForUserComponent.jsx";

function Pm2_5AndPowerCardComponent({pm2_5Value, powerValue}) {

    return (<>
        <Card sx={{...cardStyle, padding: "24px"}}>
            <Grid2 container spacing={2}>
                <Grid2 size={{xs: 12, sm: 6}} display="flex" flexDirection="column" justifyContent="center"
                       alignItems="center" sx={{position: "relative"}}>
                    <Pm2_5ForUserComponent pm2_5Value={pm2_5Value}/>
                </Grid2>

                <Grid2 size={{xs: 12, sm: 6}} display="flex" flexDirection="column" justifyContent="center"
                       alignItems="center" sx={{position: "relative"}}>
                    <PowerForUserComponent powerValue={powerValue}/>
                </Grid2>
            </Grid2>
        </Card>
    </>)
}

export default Pm2_5AndPowerCardComponent;