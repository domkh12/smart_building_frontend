import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import {Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setOpenUtilSearch} from "../redux/feature/app/appSlice.js";
import ModalUtilSearchComponent from "./ModalUtilSearchComponent.jsx";

function UtilSearchComponent() {
    const mode = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();
    return (<>
            <button
                onClick={() => dispatch(setOpenUtilSearch(true))}
                className={`hidden ${mode === "dark" ? "bg-[#1C252E]" : "bg-black bg-opacity-5 hover:bg-opacity-10"} w-[100px] h-[40px] rounded-xl gap-2 xl:flex justify-evenly items-center px-[7px] mr-[8px] shadow-inner`}>
                <SearchTwoToneIcon className="w-5 h-5 text-opacity-50"/>
                <Typography variant="body1" component="span"
                            className="text-black bg-white px-[7px] py-[2px] rounded-lg shadow-sm">
                    ⌘ K
                </Typography>
            </button>
            <ModalUtilSearchComponent/>
        </>
    );
}

export default UtilSearchComponent;