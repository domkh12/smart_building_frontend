import {
    Box,
    Card,
    FormControl,
    FormHelperText,
    Grid2, Paper, Tab, Tabs,
    TextField,
    Typography,
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {Form, Formik} from "formik";
import {useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import SeoComponent from "../../components/SeoComponent";
import useTranslate from "../../hook/useTranslate";
import MainHeaderComponent from "../../components/MainHeaderComponent";
import ProfileUploadComponent from "../../components/ProfileUploadComponent";
import {cardStyle} from "../../assets/style";
import * as Yup from "yup";
import SelectSingleComponent from "../../components/SelectSingleComponent";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent";
import ButtonComponent from "../../components/ButtonComponent";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import {
    useFindAllGenderQuery,
    useUpdateUserMutation
} from "../../redux/feature/users/userApiSlice.js";
import {useUploadImageMutation} from "../../redux/feature/uploadImage/uploadImageApiSlice.js";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import GeneralProfileComponent from "../../components/GeneralProfileComponent.jsx";

export default function Profile() {
    const [value, setValue] = useState('1');
    const {t} = useTranslate();
    const navigate = useNavigate();

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

    return (
        <>
            <SeoComponent title={"Account"}/>
            <MainHeaderComponent breadcrumbs={breadcrumbs} title={t("account")}
                                 handleBackClick={() => navigate("/dash")}/>
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
                    <TabPanel value="2">Item Two</TabPanel>
                </TabContext>
            </Box>

        </>
    )
        ;

}
