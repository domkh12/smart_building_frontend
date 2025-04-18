import {
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import DataNotFound from "./DataNotFound";
import UserRowComponent from "./UserRowComponent";
import useTranslate from "../hook/useTranslate";
import SkeletonTableRowComponent from "./SkeletonTableRowComponent.jsx";
import {useSelector} from "react-redux";

function UserTableComponent({
                                columns,
                                users,
                                searchData,
                                searchQuery,
                                roleFilter,
                                signUpMethodFilter,
                                statusFilter,
                                branchFilter,
                                pageSize,
                                pageNo,
                                totalElements,
                                pageSizeSearch,
                                pageNoSearch,
                                totalElementsSearch,
                                dispatch,
                                handleChangePage,
                                handleChangeRowsPerPage,
                                entities,
                                searchEntities,
                                isFetchingUserFilter
                            }) {
    const {t} = useTranslate();
    const mode = useSelector((state) => state.theme.mode);
    const tableContent =
        searchQuery !== "" ||
        roleFilter.length > 0 ||
        signUpMethodFilter.length > 0 ||
        statusFilter !== "" ? (
            <>
                {searchData?.ids?.length ? (
                    searchData.ids.map((userId) => (
                        <UserRowComponent
                            key={userId}
                            userId={userId}
                            user={searchEntities[userId]}
                        />
                    ))
                ) : (
                    <TableRow >
                        <TableCell align="center" colSpan={8}>
                            <DataNotFound/>
                        </TableCell>
                    </TableRow>
                )}
            </>
        ) : (
            <>
                {users?.ids?.length ? (
                    users.ids.map((userId) => (
                        <UserRowComponent
                            key={userId}
                            userId={userId}
                            user={entities[userId]}
                        />
                    ))
                ) : (
                    <TableRow >
                        <TableCell align="center" colSpan={8}>
                            <DataNotFound/>
                        </TableCell>
                    </TableRow>
                )}
            </>
        );
    const displayTotalElements =
        searchQuery !== "" ||
        roleFilter.length > 0 ||
        signUpMethodFilter.length > 0 ||
        statusFilter !== ""
            ? totalElementsSearch
            : totalElements;
    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox"
                                       sx={{backgroundColor: mode === "dark" ? "#28323D" : "#F4F6F8"}}>
                                <Checkbox
                                    sx={{
                                        "&.Mui-checked": {
                                            color: "#2C3092",
                                        },
                                        "&:hover": {
                                            color: "#2C3092",
                                        },

                                    }}
                                    color="primary"
                                />
                            </TableCell>
                            {columns?.map((column) => (
                                <TableCell
                                    sx={{backgroundColor: mode === "dark" ? "#28323D" : "#F4F6F8"}}
                                    key={column?.id}
                                    align={column?.align}
                                    style={{minWidth: column?.minWidth, color: "gray"}}
                                >
                                    {column?.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody
                        sx={{border: "none"}}>{isFetchingUserFilter ? (Array.from({length: pageSize}).map((_, index) => (
                        <SkeletonTableRowComponent key={index}
                                                   cellCount={6}/>))) : (<>{tableContent}</>)}</TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={displayTotalElements || 0}
                rowsPerPage={
                    pageSizeSearch != null && pageSizeSearch !== 0
                        ? pageSizeSearch
                        : pageSize
                }
                page={
                    pageNoSearch != null && pageNoSearch !== 0 ? pageNoSearch : pageNo
                }
                labelRowsPerPage={t('rowPerPage')}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}

export default UserTableComponent;
