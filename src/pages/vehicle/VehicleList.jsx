import React, { useEffect, useRef, useState } from "react";
import {
  useFilterVehiclesQuery,
  useGetAllVehicleTypesMutation,
  useGetVehiclesQuery,
} from "../../redux/feature/vehicles/vehicleApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsFiltered,
  setIsLoadingBar,
  setIsPaginationSuccess,
} from "../../redux/feature/actions/actionSlice";
import {
  setTotalPages,
  setBranchFilter,
  setVehicleTypeFilter,
  setSearchKeywords,
  setClearVehicleFilter,
} from "../../redux/feature/vehicles/vehicleSlice";
import SeoComponent from "../../components/SeoComponent";
import MainHeaderComponent from "../../components/MainHeaderComponent";
import {
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { cardStyle, listStyle } from "../../assets/style";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import { BsFillPrinterFill, BsThreeDotsVertical } from "react-icons/bs";
import useTranslate from "../../hook/useTranslate";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent";
import VehicleRowComponent from "../../components/VehicleRowComponent";
import useAuth from "../../hook/useAuth";
import QuickEditVehicleComponent from "../../components/QuickEditVehicleComponent";
import { useGetSitesListMutation } from "../../redux/feature/site/siteApiSlice";
import DataNotFound from "../../components/DataNotFound";
import FilterChipsComponent from "../../components/FilterChipsComponent";
import FilterBarComponent from "../../components/FilterBarComponent";

function VehicleList() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const pageNo = useSelector((state) => state.vehicles.pageNo);
  const pageSize = useSelector((state) => state.vehicles.pageSize);
  const totalPages = useSelector((state) => state.vehicles.totalPages);
  const [isPageSizeOpen, setIsPageSizeOpen] = useState(false);
  const pageSizeRef = useRef(null);
  const { t } = useTranslate();
  const [isLoading, setIsLoading] = useState(true);
  const branchFetched = useSelector((state) => state.sites.sites);
  const branchFilter = useSelector((state) => state.vehicles.branchFilter);
  const vehicleTypeFetched = useSelector(
    (state) => state.vehicles.vehicleTypeFetched
  );
  const vehicleTypeFilter = useSelector(
    (state) => state.vehicles.vehicleTypeFilter
  );
  const searchKeywords = useSelector((state) => state.vehicles.searchKeywords);

  const {
    data: vehicles,
    isLoading: isLoadingGetVehicles,
    isSuccess,
    isError,
    refetch,
    isFetching,
    error,
  } = useGetVehiclesQuery("vehiclesList");

  const {
    data: vehicleFilterData,
    isLoading: isLoadingGetVehicleFilter,
    isSuccess: isSuccessGetVehicleFilter,
    isError: isErrorGetVehicleFilter,
    error: errorGetVehicleFilter,
  } = useFilterVehiclesQuery(
    {
      query: "vehicleList",
      keywords: searchKeywords,
      vehiceTypeId: vehicleTypeFilter,
      branchId: branchFilter,
    },
    {
      skip:
        searchKeywords === "" &&
        vehicleTypeFilter.length === 0 &&
        branchFilter.length === 0,
    }
  );

  const [
    getSitesList,
    {
      isSuccess: isGetSitesListSuccess,
      isLoading: isGetSitesListLoading,
      isError: isGetSitesListError,
      error: errorGetSitesList,
    },
  ] = useGetSitesListMutation();

  const [
    getAllVehicleTypes,
    {
      isSuccess: isGetAllVehicleTypesSuccess,
      isLoading: isGetAllVehicleTypesLoading,
      isError: isGetAllVehicleTypesError,
      error: errorGetAllVehicleTypes,
    },
  ] = useGetAllVehicleTypesMutation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([getSitesList(), getAllVehicleTypes()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isFetching) {
      dispatch(setIsLoadingBar(true));
    } else {
      dispatch(setIsLoadingBar(false));
    }
  }, [isFetching]);

  useEffect(() => {
    refetch();
    setIsPageSizeOpen(false);
    dispatch(setIsPaginationSuccess(true));
  }, [pageNo, pageSize, refetch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pageSizeRef.current && !pageSizeRef.current.contains(event.target)) {
        setIsPageSizeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setTotalPages(vehicles.totalPages));
    }
  }, [vehicles, totalPages, pageNo]);

  const breadcrumbs = [
    <button
      className="text-black hover:underline"
      onClick={() => navitage("/dash")}
      key={1}
    >
      Dashboard
    </button>,
    <Typography color="inherit" key={2}>
      Vehicle
    </Typography>,
    <Typography color="inherit" key={3}>
      List
    </Typography>,
  ];

  const columns = [
    { id: "model", label: "Model", minWidth: 170, align: "left" },
    {
      id: "licensePlateNumber",
      label: "License\u00a0Plate\u00a0Number",
      minWidth: 120,
      align: "left",
    },
    {
      id: "type",
      label: "Type",
      minWidth: 120,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "color",
      label: "Color",
      minWidth: 120,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "createdAt",
      label: "Created\u00a0At",
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

  const handleBranchChange = (branch) => {
    dispatch(setBranchFilter(branch));
  };

  const handleVehicleTypeChange = (vehicleType) => {
    dispatch(setVehicleTypeFilter(vehicleType));
  };

  const handleSearchChange = (keyword) => {
    dispatch(setSearchKeywords(keyword));
  };

  const isFiltered =
    searchKeywords !== "" ||
    branchFilter?.length > 0 ||
    vehicleTypeFilter?.length > 0;

  useEffect(() => {
    dispatch(setIsFiltered(isFiltered));
  }, [isFiltered, dispatch]);

  let content;

  if (isLoading) content = <LoadingFetchingDataComponent />;

  if (isError) {
    content = <p>Error: {error?.message}</p>;
  }

  if (!isLoading && isSuccess) {
    const { ids, totalPages, totalElements } = vehicles;

    const {
      ids: idsFilteredVehicles,
      totalPages: totalFilteredVehicles,
      totalElements: totalElementsFilteredVehicles,
    } = vehicleFilterData || {};

    const tableContent =
      searchKeywords !== "" ||
      vehicleTypeFilter.length > 0 ||
      branchFilter.length > 0 ? (
        <>
          {idsFilteredVehicles?.length ? (
            idsFilteredVehicles.map((vehicleId) => (
              <VehicleRowComponent key={vehicleId} vehicleId={vehicleId} />
            ))
          ) : (
            <TableRow sx={{ bgcolor: "#f9fafb" }}>
              <TableCell align="center" colSpan={8}>
                <DataNotFound />
              </TableCell>
            </TableRow>
          )}
        </>
      ) : (
        <>
          {ids.length ? (
            ids.map((vehicleId) => (
              <VehicleRowComponent key={vehicleId} vehicleId={vehicleId} />
            ))
          ) : (
            <TableRow sx={{ bgcolor: "#f9fafb" }}>
              <TableCell align="center" colSpan={8}>
                <DataNotFound />
              </TableCell>
            </TableRow>
          )}
        </>
      );

    content = (
      <div data-aos="fade-left">
        <SeoComponent title={"Vehicles List"} />
        <MainHeaderComponent
          breadcrumbs={breadcrumbs}
          title={"List"}
          btnTitle={t("newVehicle")}
          onClick={() => navigator("/dash/vehicles/new")}
        />
        <div>
          <Card sx={{ ...cardStyle }}>
            <FilterBarComponent
              showTabs={false}
              searchQuery={searchKeywords}
              branchFilter={branchFilter}
              vehicleTypeFilter={vehicleTypeFilter}
              branchFetched={branchFetched}
              vehicleTypeFetched={vehicleTypeFetched}
              handleVehicleTypeChange={handleVehicleTypeChange}
              handleBranchChange={handleBranchChange}
              handleSearchChange={handleSearchChange}
            />

            <FilterChipsComponent
              searchQuery={searchKeywords}
              branchFilter={branchFilter}
              branchFetched={branchFetched}
              vehicleTypeFilter={vehicleTypeFilter}
              vehicleTypeFetched={vehicleTypeFetched.data}
              handleVehicleTypeChange={handleVehicleTypeChange}
              handleSearchChange={handleSearchChange}
              handleBranchChange={handleBranchChange}
              dispatch={dispatch}
              clearFilter={() => dispatch(setClearVehicleFilter())}
              clearSearch={() => dispatch(setSearchKeywords(""))}
              t={t}
            />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
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
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, color: "gray" }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody sx={{ border: "none" }}>{tableContent}</TableBody>
              </Table>
            </TableContainer>
            {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalElements}
              rowsPerPage={pageSize}
              page={pageNo}
              // onPageChange={handleChangePage}
              // onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </Card>
        </div>

        {/* <div className="flex flex-col w-full pb-16">
          <h1 className="text-2xl font-medium dark:text-gray-50 py-4 px-8">
            Vehicles List
          </h1>

          <table className="w-full">
            <thead
              className={`dark:bg-[#282828] ${isScrolling ? "shadow-md" : ""}`}
            >
              <tr className="p-0 w-full">
                <th className="h-20" colSpan={6}>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 justify-start ">
                      <div className="relative">
                        <TextInput
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="PlateNumber, Owner, Owner Phone"
                          style={{
                            backgroundColor: mode === "dark" ? "#161616" : "",
                            color: mode === "dark" ? "#f2f2f2" : "#161616",
                            fontWeight: "400",
                          }}
                        />
                        {search && (
                          <button
                            onClick={handleClearSearch}
                            className="absolute right-3 top-5 transform -translate-y-1/2"
                          >
                            <IoClose className="dark:text-[#f2f2f2] text-lg" />
                          </button>
                        )}
                      </div>
                      <Button
                        onClick={handleBtnSearch}
                        className="bg-primary flex justify-center items-center hover:bg-primary-hover ring-transparent h-10 w-28 sm:w-14"
                      >
                        <FaSearch className="mr-2 sm:mr-0" />{" "}
                        <span className="sm:hidden">Search</span>{" "}
                      </Button>
                    </div>
                    <Button
                      className="bg-primary flex justify-center items-center hover:bg-primary-hover ring-transparent h-10"
                      onClick={handleBtnAddNewClicked}
                    >
                      <FaPlus className="mr-2 sm:mr-0" />
                      <span className="sm:hidden">Create Vehicle</span>
                    </Button>
                  </div>
                </th>
              </tr>
              <tr className="border-0 dark:text-white text-gray-500">
                <th>Vehicle</th>
                <th>License Plate Number</th>
                <th>Owner</th>
                <th className="text-right">Owner PhoneNumber</th>
                <th className="text-right">Date</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>{tableContent}</tbody>
            <tfoot>
              <tr>
                <td colSpan={7} className="py-2 px-8">
                  <div className="flex justify-end items-center gap-4">
                    <div className="text-gray-500">
                      <p>Rows per page: </p>
                    </div>
                    <div className="relative" ref={pageSizeRef}>
                      <button
                        className="hover:bg-gray-200 p-2 rounded-lg flex justify-center items-center gap-4"
                        onClick={toggleDropdown}
                      >
                        <span className="text-gray-900 ml-3">{pageSize}</span>
                        <PiCaretDownThin className="h-5 w-5" />
                      </button>
                      {isPageSizeOpen && (
                        <div className="w-full h-28 absolute bottom-0 left-0 rounded-lg bg-gray-50 shadow-md border-[1px] flex flex-col justify-between items-center py-2">
                          <button
                            className="hover:bg-gray-200 w-full py-1 h-full"
                            onClick={() => handleSetPageSize(10)}
                          >
                            10
                          </button>
                          <button
                            className="hover:bg-gray-200 w-full py-1 h-full"
                            onClick={() => handleSetPageSize(30)}
                          >
                            30
                          </button>
                          <button
                            className="hover:bg-gray-200 w-full py-1 h-full"
                            onClick={() => handleSetPageSize(50)}
                          >
                            50
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="text-gray-500 text-sm">
                      <p>
                        {calculateItemRange()} of about {totalPages}
                      </p>
                    </div>
                    <button
                      className={`p-2 rounded-full ${
                        pageNo === 1
                          ? "opacity-50 cursor-default"
                          : "hover:bg-gray-200 "
                      }`}
                      disabled={pageNo === 1}
                      onClick={handleResetPagination}
                    >
                      <PiCaretLineLeftThin className="h-5 w-5" />
                    </button>
                    <button
                      className={`p-2 rounded-full ${
                        pageNo === 1
                          ? "opacity-50 cursor-default"
                          : "hover:bg-gray-200 "
                      }`}
                      disabled={pageNo === 1}
                      onClick={handleBackPagination}
                    >
                      <PiCaretLeftThin className="h-5 w-5" />
                    </button>

                    <button
                      className={`p-2 rounded-full ${
                        totalPages === pageNo
                          ? "opacity-50 cursor-default"
                          : "hover:bg-gray-200 "
                      }`}
                      onClick={handleNextPagination}
                      disabled={totalPages == pageNo}
                    >
                      <PiCaretRightThin className="h-5 w-5" />
                    </button>

                    <button
                      className={`p-2 rounded-full ${
                        totalPages === pageNo
                          ? "opacity-50 cursor-default"
                          : "hover:bg-gray-200 "
                      }`}
                      onClick={handleLastPagination}
                      disabled={totalPages == pageNo}
                    >
                      <PiCaretLineRightThin className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div> */}
        <QuickEditVehicleComponent />
      </div>
    );
  }

  return content;
}

export default VehicleList;
