import {useSelector} from "react-redux";

function WaveLoadingComponent() {

    const mode = useSelector((state) => state.theme.mode);

    return (
        <div className={`w-screen h-screen flex items-center ${mode === "dark" ? "bg-[#141A21]" : "bg-white"} justify-center`}>
        <div className="loading-wave">
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
        </div>
        </div>
    )
}

export default WaveLoadingComponent