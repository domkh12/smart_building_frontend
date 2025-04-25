import {
    Box, Paper, Tab,
    Typography,
} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import SeoComponent from "../../components/SeoComponent";
import useTranslate from "../../hook/useTranslate";
import MainHeaderComponent from "../../components/MainHeaderComponent";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {TabContext, TabList, TabPanel} from "@mui/lab";
import GeneralProfileComponent from "../../components/GeneralProfileComponent.jsx";
import ProfileSecurityComponent from "../../components/ProfileSecurityComponent.jsx";
import useAuth from "../../hook/useAuth.jsx";

export default function Profile() {
    const [value, setValue] = useState('1');
    const {t} = useTranslate();
    const navigate = useNavigate();
    const {isManager, isAdmin, isUser} = useAuth();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const breadcrumbs = [
        <Paper
            elevation={0}
            component="button"
            className="text-black hover:underline"
            onClick={() => navigate("/dash")}
            key={1}
        >
            {t("dashboard")}
        </Paper>,
        <Typography color="inherit" key={3}>
            {t("account")}
        </Typography>,
    ];

    const handleBackClick = () => {
        if (isManager){
            navigate("/dash");
        }else if (isAdmin){
            navigate("/admin");
        }else if (isUser){
            navigate("/user");
        }
    }

    return (
        <>
            <SeoComponent title={"Account"}/>
            <MainHeaderComponent breadcrumbs={breadcrumbs}
                                 title={t("account")}
                                 handleBackClick={handleBackClick}
            />
            <Box sx={{width: '100%', typography: 'body1'}}>
                <TabContext value={value}>
                        <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                            variant="scrollable"
                            scrollButtons={false}
                            allowScrollButtonsMobile
                        >
                            <Tab label={t("general")} value="1" icon={<ContactEmergencyIcon/>}
                                 iconPosition="start"/>
                            <Tab label={t("security")} value="2" icon={<VpnKeyIcon/>} iconPosition="start"/>
                        </TabList>
                    <TabPanel value="1"><GeneralProfileComponent/></TabPanel>
                    <TabPanel value="2"><ProfileSecurityComponent /></TabPanel>
                </TabContext>
            </Box>

        </>
    )
        ;

}
