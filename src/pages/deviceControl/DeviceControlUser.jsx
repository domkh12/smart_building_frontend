import {Button, Card, Grid2, Switch, Typography} from "@mui/material";
import useTranslate from "../../hook/useTranslate.jsx";
import {HiLightBulb} from "react-icons/hi";
import {useEffect, useState} from "react";
import {PiFanFill} from "react-icons/pi";
import {TbAirConditioning} from "react-icons/tb";
import useWebsocketServer from "../../hook/useWebsocketServer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useGetByRoomIdMutation} from "../../redux/feature/room/roomApiSlice.js";
import {setMessagesFromWS} from "../../redux/feature/message/messageSlice.js";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent.jsx";
import useAuth from "../../hook/useAuth.jsx";
import TemperatureAndHumidityCardComponent from "../../components/TemperatureAndHumidityCardComponent.jsx";
import Pm2_5AndPowerCardComponent from "../../components/Pm2_5AndPowerCardComponent.jsx";
import {setDeviceDataByRoom} from "../../redux/feature/device/deviceSlice.js";
import SwitchControlCardUserComponent from "../../components/SwitchControlCardUserComponent.jsx";
import {setIsOpenDrawerSensor} from "../../redux/feature/actions/actionSlice.js";
import {MdOutlineSensors} from "react-icons/md";
import DrawerSensorUserComponent from "../../components/DrawerSensorUserComponent.jsx";

function DeviceControlUser() {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const {t} = useTranslate();
    const roomFetchedById = useSelector((state) => state.room.roomDataById);
    const [getByRoomId, {isSuccess: isSuccessGetRoomId, isLoading: isLoadingGetRoomById}] = useGetByRoomIdMutation();
    const {roomId} = useAuth();
    const {
        sendMessage,
        loading,
        isConnected
    } = useWebsocketServer(!isSuccessGetRoomId ? null : `/app/chat/${roomFetchedById?.data?.id}`);
    const {
        messages,
        loading: loadingReciveMessage,
        isConnected: isConnectedReciveMessage,
    } = useWebsocketServer(!isSuccessGetRoomId ? null : `/topic/messages/${roomFetchedById?.data?.id}`);
    const temperatureValue = useSelector((state) => state.message?.temperatureValue);
    const humidityValue = useSelector((state) => state.message?.humidityValue);
    const pm2_5Value = useSelector((state) => state.message?.pm2_5Value);
    const powerValue = useSelector((state) => state.message?.powerValue);
    const fanDevices = useSelector((state) => state.device.fanDevices);
    const lightDevices = useSelector((state) => state.device.lightDevices);
    const airConditionerDevices = useSelector((state) => state.device.airConditionerDevices);
    const messageSentToWs = useSelector((state) => state.message.messageSentToWs);

    useEffect(() => {
        if (messageSentToWs) {
            sendMessage(messageSentToWs);
        }
    }, [messageSentToWs]);

    useEffect(() => {
        if (roomFetchedById) {
            dispatch(setDeviceDataByRoom(roomFetchedById?.data?.devices))
        }
    }, [roomFetchedById]);

    useEffect(() => {
        dispatch(setMessagesFromWS(messages));
    }, [messages]);

    useEffect(() => {
        if (isConnectedReciveMessage && isConnected) {
            setIsLoading(false);
        }
    }, [isConnected, isConnectedReciveMessage]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([getByRoomId({id: roomId[0]})]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();

    }, []);

    let content;

    if (loading || loadingReciveMessage) content = <LoadingFetchingDataComponent/>

    if (!isLoading) content = (
        <>

            <div className="lg:block hidden">
                <Grid2 container spacing={2}>
                    <Grid2 size={{xs: 12, md: 6}}>
                        <TemperatureAndHumidityCardComponent temperatureValue={temperatureValue}
                                                             humidityValue={humidityValue}
                                                             devices={roomFetchedById?.data?.devices}/>
                    </Grid2>
                    <Grid2 size={{xs: 12, md: 6}}>
                        <Pm2_5AndPowerCardComponent pm2_5Value={pm2_5Value} powerValue={powerValue}/>
                    </Grid2>
                </Grid2>
            </div>

            {/* section switch*/}
            <Grid2 container spacing={2} sx={{mt: 2}}>
                <Grid2 size={{xs: 12, md: 4}}>
                    <SwitchControlCardUserComponent icon={<HiLightBulb className="w-32 h-32 text-gray-500"/>}
                                                    title={t('light')} devices={lightDevices}/>
                </Grid2>
                <Grid2 size={{xs: 12, md: 4}}>
                    <SwitchControlCardUserComponent icon={<PiFanFill className="w-32 h-32 text-gray-500"/>}
                                                    title={t('fan')} devices={fanDevices}/>
                </Grid2>
                <Grid2 size={{xs: 12, md: 4}}>
                    <SwitchControlCardUserComponent icon={<TbAirConditioning className="w-32 h-32 text-gray-500"/>}
                                                    title={t('airConditioner')} devices={airConditionerDevices}/>
                </Grid2>
            </Grid2>
            <div className="fixed top-20 right-0 lg:hidden">
                <Button
                    variant="contained"
                    sx={{borderRadius: 0}}
                    onClick={() => dispatch(setIsOpenDrawerSensor(true))}

                ><MdOutlineSensors className="w-7 h-7"/></Button>
            </div>
            <DrawerSensorUserComponent powerValue={powerValue} temperatureValue={temperatureValue}
                                   humidityValue={humidityValue} pm2_5Value={pm2_5Value} roomFetchedById={roomFetchedById}/>
        </>
    )

    return content;
}

export default DeviceControlUser