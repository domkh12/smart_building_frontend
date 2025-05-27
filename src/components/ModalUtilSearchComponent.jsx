import {Dialog, DialogContent, Paper, Typography} from "@mui/material";
import {useSelector, useDispatch} from "react-redux";
import {setOpenUtilSearch} from "../redux/feature/app/appSlice.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import useAuth from "../hook/useAuth.jsx";
import useTranslate from "../hook/useTranslate.jsx";

function ModalUtilSearchComponent() {
    const {t} = useTranslate();
    const open = useSelector((state) => state.app.isOpenUtilSearch);
    const mode = useSelector((state) => state.theme.mode); // dark | light
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const {isAdmin, isManager, isUser} = useAuth();

    const routes = [];
    if (isAdmin) {
        routes.push({title: t('dashboard'), path: "/admin", action: t('overview')});
        routes.push({title: t('controll_device'), path: "/admin/devices_control", action: t('overview')});
        routes.push({title: t('device'), path: "/admin/devices", action: t('management')});
        routes.push({title: t('user'), path: "/admin/user", action: t('management')});
        routes.push({title: t('newUser'), path: "/admin/users/new", action: t('management')});
    }

    if (isManager) {
        routes.push({title: t('dashboard'), path: "/dash", action: t('overview')});
        routes.push({title: t('building'), path: "/dash/buildings", action: t('management')});
        routes.push({title: t('newBuilding'), path: "/dash/buildings/new", action: t('management')});
        routes.push({title: t('floor'), path: "/dash/floors", action: t('management')});
        routes.push({title: t('newFloor'), path: "/dash/floors/new", action: t('management')});
        routes.push({title: t('room'), path: "/dash/rooms", action: t('management')});
        routes.push({title: t('newRoom'), path: "/dash/rooms/new", action: t('management')});
        routes.push({title: t('device'), path: "/dash/devices", action: t('management')});
        routes.push({title: t('newDevice'), path: "/dash/devices/new", action: t('management')});
        routes.push({title: t('user'), path: "/dash/users", action: t('management')});
        routes.push({title: t('newUser'), path: "/dash/users/new", action: t('management')});
    }

    if (isUser) {
        routes.push({title: t('dashboard'), path: "/user", action: t('overview')});
        routes.push({title: t('analysis'), path: "/user/analysis", action: t('overview')});
    }

    const isDark = mode === "dark";
    const lowerSearch = searchTerm.toLowerCase();

    const filteredRoutes = routes.filter((route) =>
        [route.title, route.path, route.action].some((field) =>
            field.toLowerCase().includes(lowerSearch)
        )
    );

    return (
        <Dialog
            open={open}
            onClose={() => dispatch(setOpenUtilSearch(false))}
            fullWidth
            maxWidth="sm"
            sx={{"& .MuiPaper-root": {borderRadius: "26px"}}}
        >
            <Paper>
                <DialogContent sx={{p: 0}} className="h-[600px]">
                    {/* Search Header */}
                    <Paper sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        px: 3,
                        py: 2,
                        borderBottom: "1px solid #E5E7EB",
                        position: "sticky",
                        top: 0,
                    }}>
                        <SearchTwoToneIcon
                            className={isDark ? "text-gray-400" : "text-gray-500"}
                        />
                        <input
                            autoFocus
                            type="text"
                            placeholder="Search..."
                            className={`w-full bg-transparent outline-none border-none focus:ring-0 ${
                                isDark
                                    ? "text-white placeholder-gray-500"
                                    : "text-black placeholder-gray-400"
                            }`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span
                            className={`text-xs px-2 py-0.5 rounded ${
                                isDark ? "bg-[#1E293B] text-gray-300" : "bg-gray-100 text-gray-600"
                            }`}
                        >
                          Esc
                        </span>
                    </Paper>

                    {/* Route List */}
                    <div className="p-4 overflow-y-auto h-[500px]">
                        {filteredRoutes.map((route) => {
                            const match =
                                route.title.toLowerCase().includes(lowerSearch) ||
                                route.path.toLowerCase().includes(lowerSearch) ||
                                route.action.toLowerCase().includes(lowerSearch);

                            return (
                                <button
                                    key={route.path}
                                    onClick={() => {
                                        navigate(route.path);
                                        dispatch(setOpenUtilSearch(false));
                                    }}
                                    className={`w-full text-left flex items-center justify-between p-4 transition-all rounded-lg hover:outline-1 hover:outline-dashed ${
                                        isDark ? "hover:bg-[#1E293B]" : "hover:bg-gray-100"
                                    }`}
                                >
                                    <div className="min-w-0 flex-1">
                                        <Typography variant="subtitle1"
                                        >
                                            {route.title}
                                        </Typography>
                                        <p
                                            className={`text-sm truncate ${
                                                isDark ? "text-gray-400" : "text-gray-500"
                                            }`}
                                        >
                                            {route.path}
                                        </p>
                                    </div>
                                    <span
                                        className={`text-sm px-3 py-1 rounded ${
                                            isDark ? "bg-[#334155] text-white" : "bg-gray-200 text-gray-700"
                                        }`}
                                    >
                                        {route.action}
                                      </span>
                                </button>
                            );
                        })}

                        {filteredRoutes.length === 0 && (
                            <div className={`flex flex-col items-center justify-center py-8 px-4 ${
                                isDark ? "text-gray-500" : "text-gray-400"
                            }`}>
                                <SearchTwoToneIcon sx={{fontSize: 48, opacity: 0.5, mb: 2}}/>
                                <Typography variant="h6" sx={{mb: 1}}>
                                    {t('noResultFound')}
                                </Typography>
                                <Typography variant="body2" textAlign="center">
                                    {t('noMatchesFoundFor')} "{searchTerm}". {t('checkYourKeyword')}
                                </Typography>
                            </div>

                        )}
                    </div>
                </DialogContent>
            </Paper>
        </Dialog>
    );
}

export default ModalUtilSearchComponent;
