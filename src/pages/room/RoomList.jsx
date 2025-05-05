import {useEffect} from "react";
import SeoComponent from "../../components/SeoComponent";
import {useNavigate} from "react-router-dom";
import useTranslate from "../../hook/useTranslate";
import {
    Card,
    Checkbox, Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import MainHeaderComponent from "../../components/MainHeaderComponent";
import {cardStyle} from "../../assets/style";
import {useGetRoomFilterQuery, useGetRoomQuery} from "../../redux/feature/room/roomApiSlice";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent";
import RoomRowComponent from "../../components/RoomRowComponent";
import DataNotFound from "../../components/DataNotFound";
import FilterBarComponent from "../../components/FilterBarComponent.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
    useGetAllNameBuildingQuery
} from "../../redux/feature/building/buildingApiSlice.js";
import {
    setBuildingFilterForRoom,
    setPageNoRoom,
    setPageSizeRoom,
    setSearchKeywordRoom
} from "../../redux/feature/room/roomSlice.js";
import {useDebounce} from "use-debounce";
import SkeletonTableRowComponent from "../../components/SkeletonTableRowComponent.jsx";
import FilterChipsComponent from "../../components/FilterChipsComponent.jsx";
import {setIsFiltered} from "../../redux/feature/actions/actionSlice.js";
import QuickEditRoomComponent from "../../components/QuickEditRoomComponent.jsx";
import useAuth from "../../hook/useAuth.jsx";

function RoomList() {
    const navigate = useNavigate();
    const {t} = useTranslate();
    const dispatch = useDispatch();
    const searchFilter = useSelector((state) => state.room.searchFilter);
    const [debounceInputSearch] = useDebounce(searchFilter, 1000);
    const buildingFilter = useSelector((state) => state.room.buildingFilterForRoom);
    const pageNo = useSelector((state) => state.room.pageNo);
    const pageSize = useSelector((state) => state.room.pageSize);
    const mode = useSelector((state) => state.theme.mode);
    const {isAdmin, isManager} = useAuth();

    const handleBackClick = () => {
        if (isManager) {
            navigate("/dash");
        }else if (isAdmin) {
            navigate("/admin");
        }
    }

    const {
        data: building,
        isLoading: isLoadingBuilding,
        isSuccess: isSuccessBuilding
    } = useGetAllNameBuildingQuery("buildingNameList", {
        skip: isAdmin,
    });

    const {data: roomData, isSuccess, isLoading} = useGetRoomQuery({
        pageNo,
        pageSize
    }, {
        pollingInterval: 60000, refetchOnFocus: true, refetchOnMountOrArgChange: true
    });

    const {
        data: roomDataFilter,
        isSuccess: isSuccessGetRoomFilter,
        isLoading: isLoadingGetRoomFilter,
        isError: isErrorGetRoomFilter,
        error: errorGetRoomFilter,
        isFetching: isFetchingGetRoomFilter
    } = useGetRoomFilterQuery({
        pageNo, pageSize, keywords: debounceInputSearch, buildingId: buildingFilter
    }, {skip: debounceInputSearch === "" && buildingFilter.length === 0});

    const handleSearch = (inputValue) => {
        dispatch(setSearchKeywordRoom(inputValue));
    }

    const handleBuildingChange = (building) => {
        dispatch(setBuildingFilterForRoom(building));
    }

    const handleChangePage = (event, newPage) => {
        dispatch(setPageNoRoom(newPage + 1));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(setPageSizeRoom(event.target.value));
        dispatch(setPageNoRoom(1));
    };

    const isFiltered = searchFilter !== "" || buildingFilter.length > 0

    useEffect(() => {
        dispatch(setIsFiltered(isFiltered));
    }, [isFiltered, dispatch]);


    const breadcrumbs = [
        <Paper
            elevation={0}
            component="button"
            className="text-black hover:underline"
            onClick={handleBackClick}
            key={1}
        >
            {t("dashboard")}
        </Paper>,
        <Typography color="inherit" key={2}>
            {t("room")}
        </Typography>,
        <Typography color="inherit" key={3}>
            {t("list")}
        </Typography>,
    ];

    const columns = [
        {
            id: "roomName",
            label: t("roomName"),
            minWidth: 230,
            align: "left",
        },
        {
            id: "deviceQty",
            label: t("deviceQty"),
            minWidth: 120,
            align: "left",
        },
        {
            id: "floor",
            label: t("floor"),
            minWidth: 120,
            align: "left",
        },
        {
            id: "createdAt",
            label: t("createdAt"),
            minWidth: 120,
            align: "left",
            format: (value) => value.toFixed(2),
        },
        {
            id: "action",
            label: "",
            minWidth: 30,
            align: "left",
            format: (value) => value.toFixed(2),
        },
    ];

    let content;

    if (isLoading || (!isAdmin && isLoadingBuilding)) content = <LoadingFetchingDataComponent/>;

    if (isSuccess && (isAdmin || isSuccessBuilding)) {
        const {ids, entities, totalElements, pageSize, pageNo} = roomData;
        const {
            ids: idsFilter,
            entities: entitiesFilter,
            totalElementsFilter,
            pageSizeFilter,
            pageNoFilter
        } = roomDataFilter || {};

        const displayTotalElements = debounceInputSearch !== "" || buildingFilter.length > 0 ? totalElementsFilter : totalElements;

        const tableContent = debounceInputSearch !== "" || buildingFilter.length > 0 ? (idsFilter?.length ? (idsFilter.map((roomId) =>
            <RoomRowComponent key={roomId}
                              room={entitiesFilter[roomId]}/>)) : (<TableRow>
            <TableCell align="center" colSpan={8}>
                <DataNotFound/>
            </TableCell>
        </TableRow>)) : (ids.length ? (ids.map((roomId) => (
            <RoomRowComponent key={roomId} room={entities[roomId]}/>))) : (<TableRow>
            <TableCell align="center" colSpan={8}>
                <DataNotFound/>
            </TableCell>
        </TableRow>))


        content = (
            <div data-aos="fade-left">
                <SeoComponent title="Room List"/>
                <MainHeaderComponent
                    breadcrumbs={breadcrumbs}
                    title={t("list")}
                    btnTitle={!isAdmin ? t("newRoom") : undefined}
                    onClick={!isAdmin ? () => navigate("/dash/rooms/new") : undefined}
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
                                              clearSearch={() => dispatch(setSearchKeywordRoom(""))}
                                              clearFilter={() => {
                                                  dispatch(setSearchKeywordRoom(""))
                                                  dispatch(setBuildingFilterForRoom([]));
                                              }}
                                              resultFound={displayTotalElements}
                        />
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
                                        {columns.map((column) => (
                                            <TableCell
                                                sx={{backgroundColor: mode === "dark" ? "#28323D" : "#F4F6F8"}}
                                                key={column.id}
                                                align={column.align}
                                                style={{minWidth: column.minWidth, color: "gray"}}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{border: "none"}}>
                                    {isFetchingGetRoomFilter ? (Array.from({length: pageSize}).map((_, index) => (
                                        <SkeletonTableRowComponent key={index} cellCount={4}/>
                                    ))) : (<>{tableContent}</>)}
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
                <QuickEditRoomComponent/>
            </div>
        );
    }

    return content;
}

export default RoomList;
