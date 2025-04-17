import {Typography} from "@mui/material";
import {
    axisClasses,
    LineChart,
    lineElementClasses,
    markElementClasses,
} from "@mui/x-charts";
import {HiMiniArrowTrendingUp} from "react-icons/hi2";

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
            className={`h-52 rounded-xl flex justify-between p-3`}
            style={{
                background: `linear-gradient(to bottom right, ${gradient1}, ${gradient2})`,
            }}
        >
            <div className="flex flex-col justify-between">
                {
                    img && (<img
                        src={img}
                        alt={title}
                        className="h-16 w-16 object-cover ml-2 mt-2"
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
                        {quantity}
                    </Typography>
                </div>
            </div>

            <div className="flex flex-col justify-between items-end">
                <div className="flex items-center gap-3 text-2xl">
                    <HiMiniArrowTrendingUp className="w-5 h-auto" style={{color: textColor}}/>
                    <Typography variant="body1" sx={{color: textColor}} noWrap>
                        {percentage}
                    </Typography>
                </div>

                <LineChart
                    sx={() => ({
                        [`.${lineElementClasses.root}`]: {
                            strokeWidth: 3,
                        },
                        [`.${axisClasses.root}`]: {
                            [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                                display: "none",
                            },
                            [`.${axisClasses.tickLabel}`]: {
                                display: "none",
                            },
                        },
                        [`.${markElementClasses.root}`]: {
                            display: "none",
                        },
                    })}
                    xAxis={[
                        {
                            data: formattedDateData,
                            id: "bottomAxis",
                            scaleType: "point",
                        },
                    ]}
                    slotProps={{legend: {hidden: true}}}
                    series={[
                        {
                            color: textColor ? textColor : "#000",
                            type: "line",
                            data: values ? values : [],
                        },
                    ]}
                    margin={{top: 80, bottom: 20, left: 10, right: 10}}
                    grid={{horizontal: false}}
                    tooltip={{trigger: "axis"}}
                    width={140}
                    height={200}
                />
            </div>
        </div>
    );
}

export default TotalCountComponent;
