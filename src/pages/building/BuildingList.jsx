import {useEffect, useState} from "react";
import {
    useFilterBuildingQuery, useGetBuildingQuery,
} from "../../redux/feature/building/buildingApiSlice";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent";
import SeoComponent from "../../components/SeoComponent";
import MainHeaderComponent from "../../components/MainHeaderComponent";
import {useNavigate} from "react-router-dom";
import {
    Button,
    Card,
    Checkbox, Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import useTranslate from "../../hook/useTranslate";
import {cardStyle} from "../../assets/style";
import BuildingRowComponent from "../../components/BuildingRowComponent";
import DataNotFound from "../../components/DataNotFound";
import FilterBarComponent from "../../components/FilterBarComponent.jsx";
import {useDebounce} from "use-debounce";
import {useDispatch, useSelector} from "react-redux";
import QuickEditBuildingComponent from "../../components/QuickEditBuildingComponent.jsx";
import {
    setBuildingSearchKeyword, setPageNoBuilding, setPageSizeBuilding
} from "../../redux/feature/building/buildingSlice.js";
import FilterChipsComponent from "../../components/FilterChipsComponent.jsx";
import {setIsFiltered} from "../../redux/feature/actions/actionSlice.js";
import SkeletonTableRowComponent from "../../components/SkeletonTableRowComponent.jsx";

function BuildingList() {
    const navigate = useNavigate();
    const {t} = useTranslate();
    const isQuickEditBuildingOpen = useSelector((state) => state.building.isQuickEditBuildingOpen);
    const buildingSearchKeyword = useSelector((state) => state.building.buildingSearchKeyword);
    const [debounceInputSearch] = useDebounce(buildingSearchKeyword, 1000);
    const pageSize = useSelector((state) => state.building.pageSize);
    const pageNo = useSelector((state) => state.building.pageNo);
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.theme.mode);

    const {
        data: filterBuildingData,
        isSuccess: isSuccessFilterBuilding,
        isLoading: isLoadingFilterBuilding,
        isError: isErrorFilterBuilding,
        error: errorFilterBuilding,
        isFetching: isFetchingFilterBuilding,
    } = useFilterBuildingQuery({
        keywords: debounceInputSearch, pageSize, pageNo
    }, {skip: debounceInputSearch === ""});

    const {
        data: buildingData,
        isSuccess: isSuccessGetBuilding,
        isLoading: isLoadingGetBuilding,
        error: errorGetBuilding,
        isError: isErrorGetBuilding,
    } = useGetBuildingQuery({
        pageNo, pageSize
    }, {
        pollingInterval: 60000, refetchOnFocus: true, refetchOnMountOrArgChange: true,
    });

    const breadcrumbs = [<Paper
        elevation={0}
        component="button"
        className="text-black hover:underline"
        onClick={() => navigate("/dash")}
        key={1}
    >
        {t("dashboard")}
    </Paper>, <Typography color="inherit" key={2}>
        {t("building")}
    </Typography>, <Typography color="inherit" key={3}>
        {t("list")}
    </Typography>,];

    const columns = [{
        id: "nameBuilding", label: t("nameBuilding"), minWidth: 230, align: "left",
    }, {
        id: "floorQty", label: t("floorQty"), minWidth: 120, align: "left",
    }, {
        id: "createdAt", label: t("createdAt"), minWidth: 120, align: "left", format: (value) => value.toFixed(2),
    }, {
        id: "action", label: "", minWidth: 30, align: "left", format: (value) => value.toFixed(2),
    },];

    const handleSearch = (inputValue) => {
        dispatch(setBuildingSearchKeyword(inputValue));
    }

    const handleChangePage = (event, newPage) => {
        dispatch(setPageNoBuilding(newPage + 1));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(setPageSizeBuilding(event.target.value));
        dispatch(setPageNoBuilding(1));
    };

    const isFiltered = buildingSearchKeyword !== ""

    useEffect(() => {
        dispatch(setIsFiltered(isFiltered));
    }, [isFiltered, dispatch]);


    let content;

    if (isLoadingGetBuilding) content = <LoadingFetchingDataComponent/>;

    if (isSuccessGetBuilding) {
        const {ids, entities: buildingEntities, pageNo, pageSize, totalElements} = buildingData;
        const {
            ids: idsFilterData, entities, pageNoFilter, pageSizeFilter, totalElementsFilter
        } = filterBuildingData || {};

        const displayTotalElements = debounceInputSearch !== "" ? totalElementsFilter : totalElements;

        const tableContent = debounceInputSearch !== "" ? (idsFilterData?.length ? (idsFilterData.map((filterDataId) => (
            <BuildingRowComponent key={filterDataId} building={entities[filterDataId]}/>))) : (<TableRow>
            <TableCell align="center" colSpan={8}>
                <DataNotFound/>
            </TableCell>
        </TableRow>)) : (ids?.length ? (ids.map((buildingId) => (
            <BuildingRowComponent key={buildingId} building={buildingEntities[buildingId]}/>))) : (<TableRow>
            <TableCell align="center" colSpan={8}>
                <DataNotFound/>
            </TableCell>
        </TableRow>))

        content = (<>
            <div data-aos="fade-left">
                <SeoComponent title="Building List"/>
                <MainHeaderComponent
                    breadcrumbs={breadcrumbs}
                    title={t("list")}
                    btnTitle={t("newBuilding")}
                    onClick={() => navigate("/dash/buildings/new")}
                />
                <div>
                    <Card sx={{...cardStyle}}>
                        <FilterBarComponent showTabs={false} searchQuery={buildingSearchKeyword}
                                            handleSearchChange={handleSearch}/>
                        <FilterChipsComponent searchQuery={buildingSearchKeyword}
                                              clearSearch={() => dispatch(setBuildingSearchKeyword(""))}
                                              clearFilter={() => dispatch(setBuildingSearchKeyword(""))}/>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox" sx={{backgroundColor: mode === "dark" ? "#28323D" : "#F4F6F8"}}>
                                            <Checkbox
                                                sx={{
                                                    "&.Mui-checked": {
                                                        color: "#2C3092",
                                                    }, "&:hover": {
                                                        color: "#2C3092",
                                                    },

                                                }}
                                                color="primary"
                                            />
                                        </TableCell>
                                        {columns.map((column) => (<TableCell
                                            sx={{backgroundColor: mode === "dark" ? "#28323D" : "#F4F6F8"}}
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth, color: "gray"}}
                                        >
                                            {column.label}
                                        </TableCell>))}
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{border: "none"}}>
                                    {isFetchingFilterBuilding ? (Array.from({length: pageSize}).map((_, index) => (
                                        <SkeletonTableRowComponent key={index} cellCount={3}/>))) : (<>{tableContent}</>)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={displayTotalElements || 0}
                            labelRowsPerPage={t('rowPerPage')}
                            rowsPerPage={pageSizeFilter != null && pageSizeFilter !== 0 ? pageSizeFilter : pageSize}
                            page={pageNoFilter != null && pageNoFilter !== 0 ? pageNoFilter : pageNo}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Card>
                </div>
            </div>
            {isQuickEditBuildingOpen && <QuickEditBuildingComponent/>}
        </>);
    }

    return content;
}

export default BuildingList;
