import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import useTranslate from '../../hook/useTranslate';
import {useGetDeviceFilterQuery, useGetDeviceQuery} from '../../redux/feature/device/deviceApiSlice';
import {
    Card, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography
} from '@mui/material';
import LoadingFetchingDataComponent from '../../components/LoadingFetchingDataComponent';
import DeviceRowComponent from '../../components/DeviceRowComponent';
import SeoComponent from '../../components/SeoComponent';
import MainHeaderComponent from '../../components/MainHeaderComponent';
import {cardStyle} from '../../assets/style';
import DataNotFound from '../../components/DataNotFound';
import FilterBarComponent from "../../components/FilterBarComponent.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useDebounce} from "use-debounce";
import {
    useGetAllNameBuildingQuery
} from "../../redux/feature/building/buildingApiSlice.js";
import {
    setBuildingFilterForDevice,
    setDeviceTypeFilterForDevice,
    setKeywordsSearchDevice,
    setPageNoDevice,
    setPageSizeDevice
} from "../../redux/feature/device/deviceSlice.js";
import {
    useGetAllDeviceTypesQuery,
} from "../../redux/feature/device/deviceTypeApiSlice.js";
import SkeletonTableRowComponent from "../../components/SkeletonTableRowComponent.jsx";
import FilterChipsComponent from "../../components/FilterChipsComponent.jsx";
import {setIsFiltered} from "../../redux/feature/actions/actionSlice.js";
import QuickEditDeviceComponent from "../../components/QuickEditDeviceComponent.jsx";
import useAuth from "../../hook/useAuth.jsx";

function DeviceList() {
    const navigate = useNavigate();
    const {t} = useTranslate();
    const dispatch = useDispatch();
    const searchFilter = useSelector((state) => state.device.searchFilter);
    const [debounceInputSearch] = useDebounce(searchFilter, 1000);
    const buildingFilter = useSelector((state) => state.device.buildingFilterForDevice);
    const deviceTypeFilter = useSelector((state) => state.device.deviceTypeFilters);
    const pageNo = useSelector((state) => state.device.pageNo);
    const pageSize = useSelector((state) => state.device.pageSize);
    const isQuickEditDeviceOpen = useSelector((state) => state.device.isOpenQuickEditDevice);
    const mode = useSelector((state) => state.theme.mode);
    const { isAdmin, isManager } = useAuth();

    const handleBackClick = () => {
        if (isManager) navigate("/dash");
        else if(isAdmin) navigate("/admin");
    }

    const {data: deviceType, isSuccess : isSuccessDeviceType, isLoading : isLoadingDeviceType} = useGetAllDeviceTypesQuery("deviceTypeList");
    const {data: building, isSuccess : isSuccessBuilding, isLoading : isLoadingBuilding} = useGetAllNameBuildingQuery("buildingNameList",{
        skip: isAdmin
    })

    const {
        data: deviceDataFilter,
        isSuccess: isSuccessGetDeviceFilter,
        isLoading: isLoadingGetDeviceFilter,
        isError: isErrorGetDeviceFilter,
        error: errorGetDeviceFilter,
        isFetching: isFetchingDeviceFilter
    } = useGetDeviceFilterQuery({
        pageNo, pageSize, keywords: debounceInputSearch, deviceTypeId: deviceTypeFilter, buildingId: buildingFilter,
    }, {skip: debounceInputSearch === "" && buildingFilter.length === 0 && deviceTypeFilter.length === 0});

    const {
        data: deviceData,
        isSuccess: isSuccessGetDevice,
        isLoading: isLoadingGetDevice,
        isError: isErrorGetDevice,
        error: errorGetDevice
    } = useGetDeviceQuery({
        pageNo, pageSize
    }, {
        pollingInterval: 60000, refetchOnFocus: true, refetchOnMountOrArgChange: true
    });


    const handleSearch = (inputValue) => {
        dispatch(setKeywordsSearchDevice(inputValue));
    }

    const handleBuildingChange = (building) => {
        dispatch(setBuildingFilterForDevice(building));
    }

    const handleDeviceTypeChange = (deviceType) => {
        dispatch(setDeviceTypeFilterForDevice(deviceType));
    }

    const handleChangePage = (event, newPage) => {
        dispatch(setPageNoDevice(newPage + 1));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(setPageSizeDevice(event.target.value));
        dispatch(setPageNoDevice(1));
    };

    const isFiltered = searchFilter !== "" || buildingFilter.length > 0 || deviceTypeFilter.length > 0

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
            {t("device")}
        </Typography>,
        <Typography color="inherit" key={3}>
            {t("list")}
        </Typography>
    ];

    const columns = [{
        id: "deviceName", label: t("deviceName"), minWidth: 230, align: "left",
    }, {
        id: "type", label: t("type"), minWidth: 120, align: "left",
    }, {
        id: "room", label: t("room"), minWidth: 120, align: "left",
    }, {
        id: "floor", label: t("floor"), minWidth: 120, align: "left",
    }, {
        id: "building", label: t("building"), minWidth: 120, align: "left",
    }, {
        id: "createdAt", label: t("createdAt"), minWidth: 120, align: "left", format: (value) => value.toFixed(2),
    }, {
        id: "action", label: "", minWidth: 30, align: "left", format: (value) => value.toFixed(2),
    },];

    let content;

    if (isLoadingGetDevice || isLoadingDeviceType || (!isAdmin && isLoadingBuilding)) content = <LoadingFetchingDataComponent/>;

    if (isSuccessGetDevice && (isAdmin || isSuccessBuilding)  && isSuccessDeviceType) {
        const {ids, entities, totalElements, pageNo, pageSize} = deviceData;
        const {ids: idsDeviceFilter, entities: entitiesFilter, totalElementsFilter, pageSizeFilter, pageNoFilter} = deviceDataFilter || {};

        const displayTotalElements = debounceInputSearch !== "" || buildingFilter.length > 0 || deviceTypeFilter.length > 0 ? totalElementsFilter : totalElements;

        const tableContent = debounceInputSearch !== "" || buildingFilter.length > 0 || deviceTypeFilter.length > 0 ? (idsDeviceFilter?.length ? (idsDeviceFilter.map((id) =>
            <DeviceRowComponent key={id} device={entitiesFilter[id]}/>)) : (
            <TableRow>
            <TableCell align="center" colSpan={8}>
                <DataNotFound/>
            </TableCell>
            </TableRow>)) : (ids.length ? (ids.map((id) => (<DeviceRowComponent key={id} device={entities[id]}/>))) : (
            <TableRow>
                <TableCell align="center" colSpan={8}>
                    <DataNotFound/>
                </TableCell>
            </TableRow>))

        content = (<div data-aos="fade-left">
                <SeoComponent title="Device List"/>
            <MainHeaderComponent
                breadcrumbs={breadcrumbs}
                title={t("list")}
                btnTitle={isManager ? t("newDeviceType") : undefined}
                onClick={isManager ? () => navigate("/dash/devices/new") : undefined}
            />

                <div>
                    <Card sx={{...cardStyle}}>
                        <FilterBarComponent showTabs={false} searchQuery={searchFilter}
                                            buildingNamesFetched={building}
                                            handleBuildingChange={handleBuildingChange}
                                            buildingFilter={buildingFilter}
                                            handleSearchChange={handleSearch}
                                            deviceTypeFetched={deviceType}
                                            handleDeviceTypeChange={handleDeviceTypeChange}
                                            deviceTypeFilter={deviceTypeFilter}
                        />

                        <FilterChipsComponent searchQuery={searchFilter}
                                              buildingFetched={building}
                                              buildingFilter={buildingFilter}
                                              handleBuildingChange={handleBuildingChange}
                                              deviceTypeFetched={deviceType}
                                              handleDeviceTypeChange={handleDeviceTypeChange}
                                              deviceTypeFilter={deviceTypeFilter}
                                              clearSearch={() => dispatch(setKeywordsSearchDevice(""))}
                                              clearFilter={() => {
                                                  dispatch(setKeywordsSearchDevice(""))
                                                  dispatch(setBuildingFilterForDevice([]));
                                                  dispatch(setDeviceTypeFilterForDevice([]));
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
                                        {columns.map((column) => (
                                            <TableCell
                                            sx={{
                                                backgroundColor: mode === "dark" ? "#28323D" : "#F4F6F8"}}
                                                key={column.id}
                                                align={column.align}
                                                style={{minWidth: column.minWidth, color: "gray"
                                            }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody
                                    sx={{border: "none"}}>
                                    {isFetchingDeviceFilter ?
                                        (Array.from({length: pageSize}).map((_, index) => (
                                            <SkeletonTableRowComponent key={index} cellCount={6}/>))) :
                                        (<>{tableContent}</>)
                                    }
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
            {isQuickEditDeviceOpen && <QuickEditDeviceComponent />}
            </div>);
    }

    return content;
}

export default DeviceList
