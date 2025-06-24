import {Box, Tab} from "@mui/material";
import {TabContext, TabList} from "@mui/lab";
import SelectComponent from "./SelectComponent";
import SearchComponent from "./SearchComponent";
import TableActionMenuComponent from "./TableActionMenuComponent";
import {useSelector} from "react-redux";
import useTranslate from "../hook/useTranslate";
import useAuth from "../hook/useAuth.jsx";

function FilterBarComponent({
                                deviceTypeFilter,
                                buildingFilter,
                                statusFilter,
                                branchFilter,
                                roleFilter,
                                signUpMethodFilter,
                                vehicleTypeFilter,
                                cityFilter,
                                branchTypeFilter,
                                companyFilter,
                                deviceTypeFetched,
                                roleFetched,
                                signUpMethodsFetched,
                                branchFetched,
                                vehicleTypeFetched,
                                companyFetched,
                                cityFetched,
                                branchTypeFetched,
                                buildingNamesFetched,
                                handleDeviceTypeChange,
                                handleRoleChange,
                                handleMethodChange,
                                handleBranchChange,
                                handleSearchChange,
                                handleVehicleTypeChange,
                                handleBranchTypeChange,
                                handleBuildingChange,
                                handleCityChange,
                                handleCompanyChange,
                                searchQuery,
                                activeCount,
                                pendingCount,
                                bannedCount,
                                totalElements,
                                handleChange,
                                showTabs = true,
                            }) {
    const {isAdmin, isManager} = useAuth();
    const {t} = useTranslate();
    return (<>
            {showTabs && (<TabContext value={statusFilter}>
                    <Box sx={{borderBottom: 1, borderColor: "divider", px: "20px"}}>
                        <TabList onChange={handleChange} aria-label="tabs">
                            <Tab
                                icon={<>
                                    <div className="px-[10px] py-[4px] rounded-[5px] ml-2 bg-black">
                                        <p className="text-white text-center">{totalElements}</p>
                                    </div>
                                </>}
                                iconPosition="end"
                                sx={{p: 0, minWidth: 0, mr: 5, textTransform: "none"}}
                                disableRipple
                                label="All"
                                value=""
                            />
                            <Tab
                                icon={<>
                                    <div
                                        className={`px-[10px] py-[4px] rounded-[5px] ml-2 ${statusFilter === "Active" ? "bg-green-400 bg-opacity-100" : "bg-green-400 bg-opacity-20"} `}
                                    >
                                        <p
                                            className={`text-center ${statusFilter === "Active" ? "text-white" : "text-green-400"}`}
                                        >
                                            {activeCount}
                                        </p>
                                    </div>
                                </>}
                                iconPosition="end"
                                sx={{p: 0, minWidth: 0, mr: 5, textTransform: "none"}}
                                disableRipple
                                label="Active"
                                value="Active"
                            />
                            <Tab
                                icon={<>
                                    <div
                                        className={`px-[10px] py-[4px] rounded-[5px] ml-2 ${statusFilter === "Pending" ? "bg-yellow-400 bg-opacity-100" : "bg-yellow-400 bg-opacity-20"} `}
                                    >
                                        <p
                                            className={`text-center ${statusFilter === "Pending" ? "text-white " : "text-yellow-400 "}`}
                                        >
                                            {pendingCount}
                                        </p>
                                    </div>
                                </>}
                                iconPosition="end"
                                sx={{p: 0, minWidth: 0, mr: 5, textTransform: "none"}}
                                disableRipple
                                label="Pending"
                                value="Pending"
                            />
                            <Tab
                                icon={<>
                                    <div
                                        className={`px-[10px] py-[4px] rounded-[5px] ml-2 ${statusFilter === "Banned" ? "bg-red-500 bg-opacity-100" : "bg-red-500 bg-opacity-20"} `}
                                    >
                                        <p
                                            className={`${statusFilter === "Banned" ? "text-white" : "text-red-500"}  text-center`}
                                        >
                                            {bannedCount}
                                        </p>
                                    </div>
                                </>}
                                iconPosition="end"
                                sx={{p: 0, minWidth: 0, mr: 5, textTransform: "none"}}
                                disableRipple
                                label="Banned"
                                value="Banned"
                            />
                        </TabList>
                    </Box>
                </TabContext>)}

            <div className={`p-[20px] gap-[16px] flex flex-col lg:flex-row`}>

                {buildingNamesFetched && (<SelectComponent
                        label={t("building")}
                        labelId="building_label"
                        id="buidling"
                        options={buildingNamesFetched}
                        onChange={handleBuildingChange}
                        optionLabelKey="name"
                        value={buildingFilter}
                        width60={true}

                    />)}

                {deviceTypeFetched && (<SelectComponent
                        label={t("deviceType")}
                        labelId="deviceType_label"
                        id="deviceType"
                        options={deviceTypeFetched}
                        onChange={handleDeviceTypeChange}
                        optionLabelKey="name"
                        value={deviceTypeFilter}
                        width60={true}
                    />)}

                {isManager && (<>{roleFetched && (<SelectComponent
                        label={t("role")}
                        labelId="role_label"
                        id="role"
                        options={roleFetched}
                        onChange={handleRoleChange}
                        optionLabelKey="name"
                        value={roleFilter}
                        width60={true}
                    />)}</>)}


                {signUpMethodsFetched && (<SelectComponent
                        label={t("signUpMethod")}
                        labelId="signUpMehod_label"
                        id="sighUpMethod"
                        options={signUpMethodsFetched}
                        onChange={handleMethodChange}
                        optionLabelKey="name"
                        value={signUpMethodFilter}
                        width60={true}
                    />)}

                <div className="flex items-center gap-3 w-full flex-1">
                    <SearchComponent
                        onSearchChange={handleSearchChange}
                        value={searchQuery}
                    />
                    {/*<TableActionMenuComponent/>*/}
                </div>
            </div>
        </>);
}

export default FilterBarComponent;
