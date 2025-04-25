import {useEffect} from "react";
import {Outlet} from "react-router-dom";
import store from "./../../redux/app/store";
import {userApiSlice} from "../../redux/feature/users/userApiSlice";
import useAuth from "../../hook/useAuth";
import {buildingApiSlice} from "../../redux/feature/building/buildingApiSlice";
import {floorApiSlice} from "../../redux/feature/floor/floorApiSlice";
import {roomApiSlice} from "../../redux/feature/room/roomApiSlice";
import {deviceApiSlice} from "../../redux/feature/device/deviceApiSlice";
import {deviceTypeApiSlice} from "../../redux/feature/device/deviceTypeApiSlice.js";
import {authApiSlice} from "../../redux/feature/auth/authApiSlice.js";

function Prefetch() {
    const {isManager, isAdmin, isUser} = useAuth();

    useEffect(() => {
        if (isUser) {
            // store.dispatch(buildingApiSlice.util.prefetch("getBuilding", "buildingList", {
            //     force: true,
            // }));
            // store.dispatch(floorApiSlice.util.prefetch("getFloor", "floorList", {force: true}));
        }else if (isAdmin){
            store.dispatch(userApiSlice.util.prefetch("getUsers", "usersList", {force: true}));
        }else if (isManager) {
            store.dispatch(userApiSlice.util.prefetch("getAllSignUpMethods", "signupMethodList", {force: true}));
            store.dispatch(userApiSlice.util.prefetch("findAllGender", "genderList", {force: true}));
            store.dispatch(userApiSlice.util.prefetch("getAllRoles", "roleList", {force: true}));
            store.dispatch(floorApiSlice.util.prefetch("getAllFloorName", "floorNameList", {force: true}));
            store.dispatch(roomApiSlice.util.prefetch("getAllRoomNames", "roomNameList", {force: true}));
            store.dispatch(deviceTypeApiSlice.util.prefetch("getAllDeviceTypes", "deviceTypeList", {force: true}));
            store.dispatch(buildingApiSlice.util.prefetch("getAllNameBuilding", "buildingNameList", {force: true}));
            store.dispatch(userApiSlice.util.prefetch("getUsers", "usersList", {force: true}));
            store.dispatch(roomApiSlice.util.prefetch("getRoom", "roomList", {force: true}));
            store.dispatch(deviceApiSlice.util.prefetch("getDevice", "deviceList", {force: true}));
        }else {
            store.dispatch(authApiSlice.util.prefetch("getUserProfile", "profileList"), {force: true});
        }
    }, []);

    return <Outlet/>;
}

export default Prefetch;
