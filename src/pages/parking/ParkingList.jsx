import React from "react";
import { useGetParkingSpacesQuery } from "../../redux/feature/parking/parkingApiSlice";
import LoadingFetchingDataComponent from "./../../components/LoadingFetchingDataComponent";
import SeoComponent from "../../components/SeoComponent";
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
import MainHeaderComponent from "../../components/MainHeaderComponent";
import useTranslate from "../../hook/useTranslate";
import { useNavigate } from "react-router-dom";
import { cardStyle } from "../../assets/style";
import FilterBarComponent from "../../components/FilterBarComponent";
import ParkingSpaceRowComponent from "../../components/ParkingSpaceRowComponent";
import useAuth from "./../../hook/useAuth";

function ParkingList() {
  const navigate = useNavigate();
  const { t } = useTranslate();
  const { isAdmin } = useAuth();

  const {
    data: getParkingSpacesData,
    isSuccess: isSuccessGetParkingSpaces,
    isLoading: isLoadingGetParkingSpaces,
    isError: isErrorGetParkingSpaces,
    error: errorGetParkingSpaces,
  } = useGetParkingSpacesQuery("parkingSpacesList");

  const breadcrumbs = [
    <button
      className="text-black hover:underline"
      onClick={() => navigate("/dash")}
      key={1}
    >
      {t("dashboard")}
    </button>,
    <Typography color="inherit" key={2}>
      {t("parkingSpace")}
    </Typography>,
    <Typography color="inherit" key={3}>
      {t("list")}
    </Typography>,
  ];

  const columns = [
    { id: "location", label: "Location", minWidth: 170, align: "left" },
    {
      id: "quantity",
      label: "Quantity\u00a0lots",
      minWidth: 120,
      align: "left",
    },
    {
      id: "filled",
      label: "Filled",
      minWidth: 120,
      align: "left",
    },
    {
      id: "created_at",
      label: "Created\u00a0at",
      minWidth: 120,
      align: "left",
    },
    {
      id: "action",
      label: "",
      minWidth: 30,
      align: "left",
    },
  ];

  let content;

  if (isLoadingGetParkingSpaces) {
    content = <LoadingFetchingDataComponent />;
  }

  if (isErrorGetParkingSpaces) {
    content = <p>Error: {errorGetParkingSpaces?.message}</p>;
  }

  if (isSuccessGetParkingSpaces) {
    const { ids } = getParkingSpacesData;

    const tableContent =
      ids?.length > 0
        ? ids.map((parkingId) => (
            <ParkingSpaceRowComponent parkingId={parkingId} key={parkingId} />
          ))
        : null;

    content = (
      <div data-aos="fade-left">
        <SeoComponent title="Parking List" />
        <MainHeaderComponent
          breadcrumbs={breadcrumbs}
          title={t("list")}
          {...(isAdmin && { btnTitle: t("newParkingSpace") })}
          {...(isAdmin && { onClick: () => navigate("new") })}
        />

        <Card sx={{ ...cardStyle }}>
          <FilterBarComponent showTabs={false} />
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
              count={displayTotalElements || 0}
              rowsPerPage={
                pageSizeSearch != null && pageSizeSearch !== 0
                  ? pageSizeSearch
                  : pageSize
              }
              page={
                pageNoSearch != null && pageNoSearch !== 0
                  ? pageNoSearch
                  : pageNo
              }
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
        </Card>
      </div>
    );
  }
  return content;
}

export default ParkingList;
