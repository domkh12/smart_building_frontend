import {lazy, Suspense, useEffect, useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {createTheme, CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css";
import RequireAuth from "./pages/auth/RequireAuth.jsx";
import {ROLES} from "./config/roles.js";
import {deepOrange, deepPurple} from "@mui/material/colors";
import {useSelector} from "react-redux";
import {getTheme} from "./redux/feature/theme/theme.js";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";

const AdminLayout = lazy(() => import("./pages/layoutAdmin/AdminLayout.jsx"));
const WaveLoadingComponent = lazy(() => import("./components/WaveLoadingComponent.jsx"));
const ManagerLayout = lazy(() => import("./pages/layoutManager/ManagerLayout.jsx"));
const ViewRoom = lazy(() => import("./pages/room/ViewRoom.jsx"));
const UserLayout = lazy(() => import("./pages/layoutUser/UserLayout.jsx"));
const DeviceControlUser = lazy(() => import("./pages/deviceControl/DeviceControlUser.jsx"));
const ViewFloor = lazy(() => import("./pages/floor/ViewFloor.jsx"));
const EditDevice = lazy(() => import("./pages/device/EditDevice.jsx"));
const EditFloor = lazy(() => import("./pages/floor/EditFloor.jsx"));
const ViewBuilding = lazy(() => import("./pages/building/ViewBuilding.jsx"));
const ViewDevice = lazy(() => import("./pages/device/ViewDevice.jsx"));
const EditRoom = lazy(() => import("./pages/room/EditRoom.jsx"));
const EditBuilding = lazy(() => import("./pages/building/EditBuilding.jsx"));
const AddNewDevice = lazy(() => import("./pages/device/AddNewDevice.jsx"));
const AddNewRoom = lazy(() => import("./pages/room/AddNewRoom.jsx"));
const DeviceList = lazy(() => import("./pages/device/DeviceList.jsx"));
const RoomList = lazy(() => import("./pages/room/RoomList.jsx"));
const BuildingList = lazy(() => import("./pages/building/BuildingList.jsx"));
const AddNewBuilding = lazy(() => import("./pages/building/AddNewBuilding.jsx"));
const Error403Component = lazy(() => import("./components/Error403Component.jsx"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard.jsx"));
const Prefetch = lazy(() => import("./pages/auth/Prefetch.jsx"));
const Login = lazy(() => import("./pages/auth/Login.jsx"));
const PersistLogin = lazy(() => import("./pages/auth/PersistLogin.jsx"));
const NotFound = lazy(() => import("./pages/not_found/NotFound.jsx"));
const MessagesList = lazy(() => import("./pages/messages/MessagesList.jsx"));
const EditUser = lazy(() => import("./pages/user/EditUser.jsx"));
const AddNewUser = lazy(() => import("./pages/user/AddNewUser.jsx"));
const ViewUser = lazy(() => import("./pages/user/ViewUser.jsx"));
const VehicleList = lazy(() => import("./pages/vehicle/VehicleList.jsx"));
const AddNewVehicle = lazy(() => import("./pages/vehicle/AddNewVehicle.jsx"));
const EditVehicle = lazy(() => import("./pages/vehicle/EditVehicle.jsx"));
const ViewVehicle = lazy(() => import("./pages/vehicle/ViewVehicle.jsx"));
const HistoryParking = lazy(() => import("./pages/parking/HistoryParking.jsx"));
const OAuth2RedirectHandler = lazy(() => import("./pages/auth/OAuth2RedirectHandler.jsx"));
const UserList = lazy(() => import("./pages/user/UserList.jsx"));
const AddNewFloor = lazy(() => import("./pages/floor/AddNewFloor.jsx"));
const Profile = lazy(() => import("./pages/profile/Profile.jsx"));
const DeviceControl = lazy(() => import("./pages/deviceControl/DeviceControl.jsx"));
const FloorList = lazy(() => import("./pages/floor/FloorList.jsx"));
const TestComponent = lazy(() => import("./components/TestComponent.jsx"));
const ReportList = lazy(() => import("./pages/report/ReportList.jsx"));
const CreateReport = lazy(() => import("./pages/report/CreateReport.jsx"));

function App() {

    const mode = useSelector((state) => state.theme.mode);
    const theme = getTheme(mode);
    window.addEventListener("vite:preloadError", (event) => {
        event.preventDefault();
        window.location.reload();
    });

    useEffect(() => {
        Aos.init({
            duration: 500,
        });
    }, []);

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<WaveLoadingComponent/>}>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Navigate to="/login" replace/>}/>
                <Route path="/test" element={<Error403Component/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="unauthorize" element={<Error403Component/>}/>
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Protected routes */}
                <Route element={<PersistLogin/>}>
                    <Route
                        element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}
                    >
                        <Route element={<Prefetch/>}>

                            {/* Start Admin */}
                            <Route
                                element={<RequireAuth allowedRoles={[ROLES.ROLE_ADMIN]}/>}
                            >
                                <Route path="/admin" element={<AdminLayout/>}>
                                    <Route index element={<Dashboard/>}/>
                                    <Route path="accounts" element={<Profile/>}/>

                                    <Route path="devices-control">
                                        <Route index element={<DeviceControl/>}/>
                                    </Route>

                                    <Route path="users">
                                        <Route index element={<UserList/>}/>
                                        <Route path="new" element={<AddNewUser/>}/>
                                        <Route path=":id" element={<EditUser/>}/>
                                        <Route path=":id/view" element={<ViewUser/>}/>
                                    </Route>

                                </Route>

                            </Route>
                            {/* End Admin */}

                            {/* Start dash */}
                            <Route
                                element={<RequireAuth allowedRoles={[ROLES.ROLE_MANAGER]}/>}
                            >
                                <Route path="/dash" element={<ManagerLayout/>}>
                                    <Route index element={<Dashboard/>}/>
                                    <Route path="accounts" element={<Profile/>}/>

                                    <Route path="devices">
                                        <Route index element={<DeviceList/>}/>
                                        <Route path="new" element={<AddNewDevice/>}/>
                                        <Route path=":id/view" element={<ViewDevice/>}/>
                                        <Route path=":id" element={<EditDevice/>}/>
                                    </Route>

                                    <Route path="rooms">
                                        <Route index element={<RoomList/>}/>
                                        <Route path="new" element={<AddNewRoom/>}/>
                                        <Route path=":id" element={<EditRoom/>}/>
                                        <Route path=":id/view" element={<ViewRoom/>}/>
                                    </Route>

                                    <Route path="users">
                                        <Route index element={<UserList/>}/>
                                        <Route path="new" element={<AddNewUser/>}/>
                                        <Route path=":id" element={<EditUser/>}/>
                                        <Route path=":id/view" element={<ViewUser/>}/>
                                    </Route>

                                    <Route path="vehicles">
                                        <Route index element={<VehicleList/>}/>
                                        <Route path="new" element={<AddNewVehicle/>}/>
                                        <Route path=":id" element={<EditVehicle/>}/>
                                        <Route path=":id/view" element={<ViewVehicle/>}/>
                                    </Route>

                                    <Route path="messages">
                                        <Route index element={<MessagesList/>}/>
                                    </Route>

                                    <Route path="devices-control">
                                        <Route index element={<DeviceControl/>}/>
                                    </Route>

                                    <Route path="floors">
                                        <Route index element={<FloorList/>}/>
                                        <Route path="new" element={<AddNewFloor/>}/>
                                        <Route index path=":id" element={<EditFloor/>}/>
                                        <Route path=":id/view" element={<ViewFloor/>}/>

                                        <Route path="history" element={<HistoryParking/>}/>
                                    </Route>

                                    <Route path="reports">
                                        <Route index element={<ReportList/>}/>
                                        <Route path="new" element={<CreateReport/>}/>
                                    </Route>

                                    <Route path="buildings">
                                        <Route index element={<BuildingList/>}/>
                                        <Route path="new" element={<AddNewBuilding/>}/>
                                        <Route path=":id" element={<EditBuilding/>}/>
                                        <Route path=":id/view" element={<ViewBuilding/>}/>
                                    </Route>
                                </Route>


                            </Route>

                            {/*User start*/}
                            <Route
                                element={<RequireAuth allowedRoles={[ROLES.ROLE_USER]}/>}
                            >
                                <Route path="/user" element={<UserLayout/>}>
                                    <Route index element={<DeviceControlUser/>}/>
                                    <Route path="accounts" element={<Profile/>}/>
                                    <Route path="devices-control" element={<DeviceControlUser/>}/>
                                </Route>
                            </Route>
                            {/*User End*/}
                            {/* End dash */}
                        </Route>
                    </Route>
                </Route>
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler/>}/>
                <Route
                    path={`${import.meta.env.VITE_API_BACKEND_URL}/oauth2/authorization/azure`}
                />

                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Suspense>
    </ThemeProvider>);
}

export default App;
