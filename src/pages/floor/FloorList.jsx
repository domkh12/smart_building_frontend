import {lazy, useEffect} from "react";
import {useGetFloorFilterQuery, useGetFloorQuery} from "../../redux/feature/floor/floorApiSlice";
import {useNavigate} from "react-router-dom";
import useTranslate from "../../hook/useTranslate";
import {
    Card,
    Checkbox, Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent";
import FloorRowComponent from "../../components/FloorRowComponent";
import SeoComponent from "../../components/SeoComponent";
import MainHeaderComponent from "../../components/MainHeaderComponent";
import {cardStyle} from "../../assets/style";
import {useDispatch, useSelector} from "react-redux";
import DataNotFound from "../../components/DataNotFound";
import FilterBarComponent from "../../components/FilterBarComponent.jsx";
import {useDebounce} from "use-debounce";
import {
    setBuildingFilter,
} from "../../redux/feature/building/buildingSlice.js";
import {setPageNoFloor, setPageSizeFloor, setSearchKeywordsFloor} from "../../redux/feature/floor/floorSlice.js";
import SkeletonTableRowComponent from "../../components/SkeletonTableRowComponent.jsx";
import FilterChipsComponent from "../../components/FilterChipsComponent.jsx";
import {setIsFiltered} from "../../redux/feature/actions/actionSlice.js";
import {useGetAllNameBuildingQuery} from "../../redux/feature/building/buildingApiSlice.js";
const QuickEditFloorComponent = lazy(() => import("../../components/QuickEditFloorComponent.jsx"));

function FloorList() {
    const navigate = useNavigate();
    const {t} = useTranslate();
    const searchFilter = useSelector((state) => state.floor.searchKeywordsFloor);
    const [debounceInputSearch] = useDebounce(searchFilter, 1000);
    const dispatch = useDispatch();
    const buildingFilter = useSelector((state) => state.building.buildingFilter);
    const pageNo = useSelector((state) => state.floor.pageNo);
    const pageSize = useSelector((state) => state.floor.pageSize);
    const mode = useSelector((state) => state.theme.mode);

    const {data: building, isLoading: isLoadingBuilding, isSuccess: isSuccessBuilding} = useGetAllNameBuildingQuery("buildingNameList");

    const {
        data: floorData,
        isSuccess: isSuccessGetFloor,
        isLoading: isLoadingGetFloor,
        error: errorGetFloor,
        isError: isErrorGetFloor,
    } = useGetFloorQuery({
        pageNo, pageSize
    }, {
        pollingInterval: 60000, refetchOnFocus: true, refetchOnMountOrArgChange: true
    });

    const {
        data: floorDataFilter,
        isSuccess: isSuccessGetFloorFilter,
        isLoadingGetFloorFilter,
        isErrorGetFloorFilter,
        errorGetFloorFilter,
        isFetching: isFetchingGetFloorFilter
    } = useGetFloorFilterQuery({
        pageNo, pageSize, keywords: debounceInputSearch, buildingId: buildingFilter

    }, {skip: debounceInputSearch === "" && buildingFilter.length === 0});

    const breadcrumbs = [
        <Paper
            elevation={0}
            component="button"
            className="text-black hover:underline"
            onClick={() => navigate("/dash")}
            key={1}
        >
            {t("dashboard")}
        </Paper>, <Typography color="inherit" key={2}>
            {t("floor")}
        </Typography>, <Typography color="inherit" key={3}>
            {t("list")}
        </Typography>
    ];

    const handleSearch = (inputValue) => {
        dispatch(setSearchKeywordsFloor(inputValue));
    }

    const handleBuildingChange = (building) => {
        dispatch(setBuildingFilter(building));
    }

    const handleChangePage = (event, newPage) => {
        dispatch(setPageNoFloor(newPage + 1));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(setPageSizeFloor(event.target.value));
        dispatch(setPageNoFloor(1));
    };

    const columns = [{
        id: "nameBuilding", label: t("nameBuilding"), minWidth: 230, align: "left",
    }, {
        id: "roomQty", label: t("roomQty"), minWidth: 120, align: "left",
    }, {
        id: "building", label: t("building"), minWidth: 120, align: "left",
    }, {
        id: "createdAt", label: t("createdAt"), minWidth: 120, align: "left", format: (value) => value.toFixed(2),
    }, {
        id: "action", label: "", minWidth: 30, align: "left", format: (value) => value.toFixed(2),
    },];

    const isFiltered = searchFilter !== "" || buildingFilter.length > 0

    useEffect(() => {
        dispatch(setIsFiltered(isFiltered));
    }, [isFiltered, dispatch]);

    let content;

    if (isLoadingGetFloor && isLoadingBuilding) content = <LoadingFetchingDataComponent/>;

    if (isSuccessGetFloor && isSuccessBuilding) {
        const {ids, entities, totalElements, pageNo, pageSize} = floorData;
        const {
            ids: idsDataFilter,
            entities: entitiesFilter,
            totalElementsFilter,
            pageSizeFilter,
            pageNoFilter
        } = floorDataFilter || {};

        const displayTotalElements = debounceInputSearch !== "" || buildingFilter.length > 0 ? totalElementsFilter : totalElements;

        const tableContent = debounceInputSearch !== "" || buildingFilter.length > 0 ? (idsDataFilter?.length ? (idsDataFilter.map((floorId) =>
            <FloorRowComponent key={floorId}
                               floor={entitiesFilter[floorId]}/>)) : (<TableRow>
            <TableCell align="center" colSpan={8}>
                <DataNotFound/>
            </TableCell>
        </TableRow>)) : (ids.length ? (ids.map((floorId) => (
            <FloorRowComponent key={floorId} floor={entities[floorId]}/>))) : (<TableRow>
            <TableCell align="center" colSpan={8}>
                <DataNotFound/>
            </TableCell>
        </TableRow>))

        content = (<>
            <div data-aos="fade-left">
                <SeoComponent title="Floor List"/>
                <MainHeaderComponent
                    breadcrumbs={breadcrumbs}
                    title={t("list")}
                    btnTitle={t("newFloor")}
                    onClick={() => navigate("/dash/floors/new")}
                />
                <div>
                    <Card sx={{...cardStyle}}>
                        <FilterBarComponent showTabs={false} searchQuery={searchFilter}
                                            buildingNamesFetched={building}
                                            handleBuildingChange={handleBuildingChange}
                                            buildingFilter={buildingFilter}
                                            handleSearchChange={handleSearch}/>
                        <FilterChipsComponent searchQuery={searchFilter}
                                              buildingFetched={building}
                                              buildingFilter={buildingFilter}
                                              handleBuildingChange={handleBuildingChange}
                                              clearSearch={() => dispatch(setSearchKeywordsFloor(""))}
                                              clearFilter={() => {
                                                  dispatch(setSearchKeywordsFloor(""))
                                                  dispatch(setBuildingFilter([]));
                                              }}
                                              resultFound={displayTotalElements}
                        />
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
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth, color: "gray"}}
                                            sx={{backgroundColor: mode === "dark" ? "#28323D" : "#F4F6F8"}}
                                        >
                                            {column.label}
                                        </TableCell>))}
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{border: "none"}}>
                                    {isFetchingGetFloorFilter && idsDataFilter?.length === 0 ? (Array.from({length: pageSize}).map((_, index) => (
                                        <SkeletonTableRowComponent key={index} cellCount={4}/>
                                    ))) : (<>{tableContent}</>)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination

                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={displayTotalElements || 0}
                            rowsPerPage={pageSizeFilter != null && pageSizeFilter !== 0 ? pageSizeFilter : pageSize}
                            labelRowsPerPage={t('rowPerPage')}
                            page={pageNoFilter != null && pageNoFilter !== 0 ? pageNoFilter : pageNo}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Card>
                </div>
            </div>
            <QuickEditFloorComponent />
        </>);
    }

    return content;
}

export default FloorList;
