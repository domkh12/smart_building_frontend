import {Typography} from "@mui/material";

function LogoTwoComponent() {
    return (
        <div className="flex items-center gap-2 mb-5 pl-[24px] pt-[20px]">
            <div className="overflow-hidden w-10 h-10">
                <img src="/images/logo.png" alt="logo_sps" className="object-cover" />
            </div>

            <div
                className={`flex flex-col text-nowrap transition-all duration-500 opacity-100`}
            >
                <Typography variant="h6" className="text-[16px] xs:text-xl tracking-wide">
                    ប្រព័ន្ធអគារឆ្លាតវៃ
                </Typography>
                <Typography variant="body1" className="text-[12px] xs:text-sm text-opacity-70 tracking-wide">
                    Smart Building System
                </Typography>
            </div>
        </div>
    );
}

export default LogoTwoComponent;