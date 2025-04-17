import {Card, Paper, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import MainHeaderComponent from "../../components/MainHeaderComponent";

import {cardStyle} from "../../assets/style";
import {useDispatch, useSelector} from "react-redux";
import {
    useGetAllRolesQuery, useGetAllSignUpMethodsQuery, useGetUsersQuery, useSearchUserQuery,
} from "../../redux/feature/users/userApiSlice";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent";
import SeoComponent from "../../components/SeoComponent";
import {useEffect, useState} from "react";
import useTranslate from "../../hook/useTranslate";
import {
    clearFilter,
    setBranchFilter,
    setClearSearchQuery,
    setPageNo,
    setPageSize,
    setRoleFilter,
    setSearchQuery,
    setSignUpMethodFilter,
    setStatusFilter,
} from "../../redux/feature/users/userSlice";
import FilterBarComponent from "../../components/FilterBarComponent";
import FilterChipsComponent from "../../components/FilterChipsComponent";
import UserTableComponent from "../../components/UserTableComponent";
import QuickEditUserComponent from "../../components/QuickEditUserComponent";
import {setIsFiltered} from "../../redux/feature/actions/actionSlice";
import {useDebounce} from "use-debounce";
import useAuth from "../../hook/useAuth.jsx";

function UserList() {
    const statusFilter = useSelector((state) => state.users.statusFilter);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pageNo = useSelector((state) => state.users.pageNo);
    const pageSize = useSelector((state) => state.users.pageSize);
    const {t} = useTranslate();
    const searchQuery = useSelector((state) => state.users.searchQuery);
    const [debounceInputSearch] = useDebounce(searchQuery, 1000);
    const roleFilter = useSelector((state) => state.users.roleFilter);
    const signUpMethodFilter = useSelector((state) => state.users.signUpMethodFilter);
    const {isManager, isAdmin} = useAuth();
    const isOpenQuickEditUser = useSelector((state) => state.users.isOpenQuickEdit);
    const {data: role} = useGetAllRolesQuery("roleList", {
        skip: !isManager,
    });
    const {data: signupMethod} = useGetAllSignUpMethodsQuery("signupMethodList");

    const {
        data: users, isLoading: isLoadingGetAllUsers, isSuccess, isError, error,
    } = useGetUsersQuery({
        pageNo, pageSize,
    }, {
        pollingInterval: 60000, refetchOnFocus: true, refetchOnMountOrArgChange: true
    });

    const {
        data: searchData,
        isSuccess: isSuccessSearch,
        isLoading: isLoadingSearch,
        isError: isErrorSearch,
        error: errorSearch,
        isFetching: isFetchingUserFilter
    } = useSearchUserQuery({
        pageNo,
        pageSize,
        keywords: debounceInputSearch,
        roleId: roleFilter,
        signupMethodId: signUpMethodFilter,
        status: statusFilter,
    }, {
        skip: debounceInputSearch === "" && statusFilter === "" && roleFilter.length === 0 && signUpMethodFilter.length === 0
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
        {t("user")}
    </Typography>, <Typography color="inherit" key={3}>
        {t("list")}
    </Typography>,];

    const columns = [{id: "name", label: t("name"), minWidth: 170, align: "left"}, {
        id: "phoneNumber", label: t("phoneNumber"), minWidth: 120, align: "left",
    }, {
        id: "role", label: t("role"), minWidth: 120, align: "left",
    }, {
        id: "room", label: t('room'), minWidth: 120, align: "left",
    }, {
        id: "status", label: t('status'), minWidth: 120, align: "left",
    }, {
        id: "createdAt", label: "Created\u00a0At", minWidth: 120, align: "left",
    }, {
        id: "action", label: "", minWidth: 30, align: "left",
    },].filter(Boolean);

    const handleChange = (event, newValue) => {
        dispatch(setStatusFilter(newValue));
    };

    const handleAddNewClick = () => {
        if (isAdmin) {
            navigate("/admin/users/new");
        } else if (isManager) {
            navigate("/dash/users/new");
        }
    };

    const handleRoleChange = (role) => {
        dispatch(setRoleFilter(role));
    };

    const handleMethodChange = (method) => {
        dispatch(setSignUpMethodFilter(method));
    };

    const handleBranchChange = (branch) => {
        dispatch(setBranchFilter(branch));
    };
    const handleSearchChange = (statusFilter) => {
        dispatch(setSearchQuery(statusFilter));
    };

    const handleChangePage = (event, newPage) => {
        dispatch(setPageNo(newPage + 1));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(setPageSize(event.target.value));
        dispatch(setPageNo(1));
    };

    const isFiltered = searchQuery !== "" || roleFilter.length > 0 || signUpMethodFilter.length > 0 || statusFilter !== ""

    useEffect(() => {
        dispatch(setIsFiltered(isFiltered));
    }, [isFiltered, dispatch]);

    let content;

    if (!role && !signupMethod && isLoadingGetAllUsers) content = <LoadingFetchingDataComponent/>;

    if (isError) {
        content = <p>Error: {error?.message}</p>;
    }

    if (isSuccess && signupMethod && (isManager ? role : true)) {
        const {
            totalElements, pageSize, pageNo, entities, activeCount, pendingCount, bannedCount,
        } = users;

        const {
            totalElements: totalElementsSearch,
            pageSize: pageSizeSearch,
            pageNo: pageNoSearch,
            entities: searchEntities,
        } = searchData || {};

        // const displayTotalElements =
        //   searchQuery !== "" ||
        //   roleFilter.length > 0 ||
        //   signUpMethodFilter.length > 0 ||
        //   statusFilter !== "" ||
        //   branchFilter.length > 0
        //     ? totalElementsSearch
        //     : totalElements;

        // useEffect(() => {
        //   if (displayTotalElements) {
        //     dispatch(setResultFound(displayTotalElements));
        //   }
        // }, [displayTotalElements]);

        content = (<div data-aos="fade-left">
                <SeoComponent title="User List"/>
                <MainHeaderComponent
                    breadcrumbs={breadcrumbs}
                    title={t("list")}
                    btnTitle={t('newUser')}
                    onClick={handleAddNewClick}
                />
                <Card sx={{...cardStyle}}>
                    <FilterBarComponent
                        statusFilter={statusFilter}
                        roleFetched={role}
                        signUpMethodsFetched={signupMethod}
                        handleRoleChange={handleRoleChange}
                        handleMethodChange={handleMethodChange}
                        handleBranchChange={handleBranchChange}
                        handleSearchChange={handleSearchChange}
                        searchQuery={searchQuery}
                        dispatch={dispatch}
                        activeCount={activeCount}
                        pendingCount={pendingCount}
                        bannedCount={bannedCount}
                        totalElements={totalElements}
                        roleFilter={roleFilter}
                        signUpMethodFilter={signUpMethodFilter}
                        handleChange={handleChange}
                    />
                    <FilterChipsComponent
                        statusFilter={statusFilter}
                        searchQuery={searchQuery}
                        roleFilter={roleFilter}
                        signUpMethodFilter={signUpMethodFilter}
                        roleFetched={role}
                        signUpMethodsFetched={signupMethod}
                        handleRoleChange={handleRoleChange}
                        handleBranchChange={handleBranchChange}
                        handleMethodChange={handleMethodChange}
                        clearFilter={() => dispatch(clearFilter())}
                        clearSearch={() => dispatch(setClearSearchQuery())}
                    />
                    <UserTableComponent
                        columns={columns}
                        users={users}
                        searchData={searchData}
                        searchQuery={searchQuery}
                        roleFilter={roleFilter}
                        signUpMethodFilter={signUpMethodFilter}
                        statusFilter={statusFilter}
                        pageSize={pageSize}
                        pageNo={pageNo}
                        totalElements={totalElements}
                        pageSizeSearch={pageSizeSearch}
                        pageNoSearch={pageNoSearch}
                        totalElementsSearch={totalElementsSearch}
                        dispatch={dispatch}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        entities={entities}
                        searchEntities={searchEntities}
                        isFetchingUserFilter={isFetchingUserFilter}
                    />
                </Card>
                {isOpenQuickEditUser && <QuickEditUserComponent/>}
            </div>);
    }
    return content;
}

export default UserList;
