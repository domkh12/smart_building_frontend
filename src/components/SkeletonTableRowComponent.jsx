import {Checkbox, Skeleton, TableCell, TableRow} from "@mui/material";

function SkeletonTableRowComponent({cellCount}) {

    return (<TableRow>
        <TableCell padding="checkbox" sx={{borderBottomStyle: "dashed"}}>
            <Checkbox color="primary" disabled/>
        </TableCell>
        <TableCell align="left" colSpan={1} sx={{
            borderBottomStyle: "dashed",
            display: "flex",
            justifyContent: "start",
            alignItems: "center"
        }}>
            <Skeleton animation="wave" height={80} width={128}
                      variant="rectangular"/>
            <Skeleton animation="wave" height={50} width="30%"
                      sx={{ml: 2}}/>
        </TableCell>
        {cellCount && (Array.from({length: cellCount}).map((_, index) => (
                <TableCell key={index} align="left" colSpan={1}
                           sx={{borderBottomStyle: "dashed"}}>
                    <Skeleton animation="wave" height={50} width="60%"/>
                </TableCell>
        )))}

    </TableRow>)
}

export default SkeletonTableRowComponent