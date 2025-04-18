import {Button, Chip} from "@mui/material";
import {FaTrashCan} from "react-icons/fa6";
import {
    clearFilter,
    setClearSearchQuery,
    setClearStatusFilter,
} from "../redux/feature/users/userSlice";
import {useDispatch, useSelector} from "react-redux";
import useTranslate from "../hook/useTranslate.jsx";

function FilterChipsComponent({
                                  statusFilter = "",
                                  searchQuery,
                                  roleFilter,
                                  branchFilter,
                                  buildingFilter,
                                  signUpMethodFilter,
                                  vehicleTypeFilter,
                                  deviceTypeFilter,
                                  roleFetched,
                                  branchFetched,
                                  signUpMethodsFetched,
                                  vehicleTypeFetched,
                                  deviceTypeFetched,
                                  buildingFetched,
                                  handleRoleChange,
                                  handleBranchChange,
                                  handleMethodChange,
                                  handleBuildingChange,
                                  handleDeviceTypeChange,
                                  handleVehicleTypeChange,
                                  clearFilter,
                                  clearSearch,
                                  resultFound
                              }) {
    const isFiltered = useSelector((state) => state.action.isFiltered);
    const dispatch = useDispatch();
    const {t} = useTranslate();
    return (
        <>
            {isFiltered && (
                <div className="pl-[20px] pb-[20px]">
                    <p>
                        <span className="font-bold">{resultFound}</span>
                        <span className="text-light-gray text-sm">{`${"\u00a0"}${t('resultFound')}`}</span>
                    </p>

                    <div className="flex items-center gap-5 mt-3">
                        {statusFilter !== "" ? (
                            <div className="p-2 rounded-[7px] border-dashed border w-fit">
                                <div>
                                    <span className="font-medium mr-2">Status:</span>
                                    <Chip
                                        size="small"
                                        sx={{borderRadius: "8px"}}
                                        label={statusFilter}
                                        onDelete={() => dispatch(setClearStatusFilter())}
                                    />
                                </div>
                            </div>
                        ) : null}

                        {searchQuery !== "" ? (
                            <div className="p-2 rounded-[7px] border-dashed border w-fit">
                                <div>
                                    <span className="font-medium mr-2">{t('keyword')}:</span>
                                    <Chip
                                        size="small"
                                        sx={{borderRadius: "8px"}}
                                        label={searchQuery}
                                        onDelete={clearSearch}
                                    />
                                </div>
                            </div>
                        ) : null}

                        {buildingFilter?.length > 0 ? (
                            <div className="p-2 rounded-[7px] border-dashed border w-fit flex items-center">
                                <span className="font-medium mr-2">{t('building')}:</span>
                                <div className="flex gap-3">
                                    {buildingFilter.map((building) => {
                                        const matchedBuilding = buildingFetched?.find(
                                            (fetchedBuilding) => fetchedBuilding.id === building
                                        );
                                        const buildingName = matchedBuilding ? matchedBuilding.name : building; // Use fetched name if match found
                                        return (
                                            <Chip
                                                key={building}
                                                size="small"
                                                sx={{borderRadius: "8px"}}
                                                label={buildingName} //Display fetched name or original role
                                                onDelete={() =>
                                                    handleBuildingChange(buildingFilter.filter((b) => b !== building))
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        ) : null}

                        {deviceTypeFilter?.length > 0 ? (
                            <div className="p-2 rounded-[7px] border-dashed border w-fit flex items-center">
                                <span className="font-medium mr-2">{t('deviceType')}:</span>
                                <div className="flex gap-3">
                                    {deviceTypeFilter.map((deviceType) => {
                                        const matchedDeviceType = deviceTypeFetched?.find(
                                            (fetchedDeviceType) => fetchedDeviceType.id === deviceType
                                        );
                                        const DeviceTypeName = matchedDeviceType ? matchedDeviceType.name : deviceType; // Use fetched name if match found
                                        return (
                                            <Chip
                                                key={deviceType}
                                                size="small"
                                                sx={{borderRadius: "8px"}}
                                                label={DeviceTypeName} //Display fetched name or original role
                                                onDelete={() =>
                                                    handleDeviceTypeChange(deviceTypeFilter.filter((dt) => dt !== deviceType))
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        ) : null}

                        {roleFilter?.length > 0 ? (
                            <div className="p-2 rounded-[7px] border-dashed border w-fit flex items-center">
                                <span className="font-medium mr-2">Role:</span>
                                <div className="flex gap-3">
                                    {roleFilter.map((role) => {
                                        const matchedRole = roleFetched?.find(
                                            (fetchedRole) => fetchedRole.id === role
                                        );
                                        const roleName = matchedRole ? matchedRole.name : role; // Use fetched name if match found
                                        return (
                                            <Chip
                                                key={role}
                                                size="small"
                                                sx={{borderRadius: "8px"}}
                                                label={roleName} //Display fetched name or original role
                                                onDelete={() =>
                                                    handleRoleChange(roleFilter.filter((r) => r !== role))
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        ) : null}

                        {signUpMethodFilter?.length > 0 ? (
                            <div className="p-2 rounded-[7px] border-dashed border w-fit flex items-center">
                                <span className="font-medium mr-2">{`Sign\u00a0up\u00a0method:`}</span>
                                <div className="flex gap-3">
                                    {signUpMethodFilter.map((signUpMethod) => {
                                        const matchedSignUpMethod = signUpMethodsFetched?.find(
                                            (fetchedSignUpMethod) =>
                                                fetchedSignUpMethod.id === signUpMethod
                                        );
                                        const signUpMethodName = matchedSignUpMethod
                                            ? matchedSignUpMethod.name
                                            : signUpMethod; // Use fetched name if match found
                                        return (
                                            <Chip
                                                key={signUpMethod}
                                                size="small"
                                                sx={{borderRadius: "8px"}}
                                                label={signUpMethodName} //Display fetched name or original role
                                                onDelete={() =>
                                                    handleMethodChange(
                                                        signUpMethodFilter.filter((s) => s !== signUpMethod)
                                                    )
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        ) : null}

                        <Button
                            onClick={clearFilter}
                            sx={{borderRadius: "8px"}}
                            color="error"
                            startIcon={<FaTrashCan/>}
                        >
                            Clear
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}

export default FilterChipsComponent;
