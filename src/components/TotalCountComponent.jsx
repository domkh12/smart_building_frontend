import {Typography} from "@mui/material";
import {HiMiniArrowTrendingUp} from "react-icons/hi2";
import LineChartCusOneComponent from "./LineChartCusOneComponent.jsx";

function TotalCountComponent({
                                 icon,
                                 img,
                                 title,
                                 quantity,
                                 percentage,
                                 gradient1,
                                 gradient2,
                                 textColor,
                                 dateData = [],
                                 values = [],
                             }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const formattedDateData = dateData.map((date) => formatDate(date));

    return (
        <div
            className={`h-52 rounded-xl flex justify-between p-4`}
            style={{
                background: `linear-gradient(to bottom right, ${gradient1}, ${gradient2})`,
            }}
        >
            <div className="flex flex-col justify-between">
                {
                    img && (<img
                        src={img}
                        alt={title}
                        className={`h-16 w-16 object-cover ml-2 mt-2`}
                    />)
                }

                {
                    icon && (
                        icon
                    )
                }

                <div className="ml-2 mb-2">
                    <Typography variant="body1" sx={{color: textColor}}>
                    {title}
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{fontWeight: "bold", color: textColor}}
                    >
                        {quantity || 0}
                    </Typography>
                </div>
            </div>

            <div className="flex flex-col justify-between items-end">
                <div className="flex items-center gap-3 text-2xl">
                    {/*<HiMiniArrowTrendingUp className="w-5 h-auto" style={{color: textColor}}/>*/}
                    {/*<Typography variant="body1" sx={{color: textColor}} noWrap>*/}
                    {/*    {percentage}*/}
                    {/*</Typography>*/}
                </div>
                {/*<LineChartCusOneComponent values={values} textColor={textColor}/>*/}
            </div>
        </div>
    );
}

export default TotalCountComponent;
