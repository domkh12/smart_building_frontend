import {Box, Skeleton, TableCell, TableRow} from "@mui/material";

function LoadingSkeletonRowTable() {

    <TableRow>
        <TableCell align="center" colSpan={8}>
            <Box sx={{ width: 300 }}>
                <>Loading...</>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
            </Box>
        </TableCell>
    </TableRow>

}

export default LoadingSkeletonRowTable;