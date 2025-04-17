import { useEffect, useState } from "react";
import { Button, Card } from "@mui/material";
import { cardStyle } from "../../assets/style";
import SearchComponent from "../../components/SearchComponent";
import { useDispatch, useSelector } from "react-redux";
import useTranslate from "../../hook/useTranslate";
import SeoComponent from "../../components/SeoComponent";
import SelectSingleComponent from "../../components/SelectSingleComponent";
import {useGetAllNameBuildingQuery} from "../../redux/feature/building/buildingApiSlice";
import {
  useGetAllRoomNamesQuery,
  useGetByRoomIdMutation,
} from "../../redux/feature/room/roomApiSlice";
import ToggleSwitchButtonComponent from "../../components/ToggleSwitchButtonComponent";
import {useGetAllDeviceTypesQuery} from "../../redux/feature/device/deviceTypeApiSlice";
import GaugeTemperatureComponent from "../../components/GaugeTemperatureComponent";
import GaugeHumidityComponent from "../../components/GaugeHumidityComponent";
import DataNotFound from "../../components/DataNotFound";
import GaugePM2_5Component from "../../components/GaugePM2_5Component";
import GaugePowerComponent from "../../components/GaugePowerComponent";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent";
import { MdOutlineSensors } from "react-icons/md";
import useWebsocketServer from "../../hook/useWebsocketServer.jsx";
import DrawerSensorComponent from "../../components/DrawerSensorComponent.jsx";
import {setIsOpenDrawerSensor} from "../../redux/feature/actions/actionSlice.js";
import {clearMessageFromWS, setMessagesFromWS} from "../../redux/feature/message/messageSlice.js";
import { clearSelectFirstValueOfSelectBox} from "../../redux/feature/room/roomSlice.js";


function DeviceControl() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { t } = useTranslate();
  const [searchTerm, setSearchTerm] = useState("");
  const roomFetchedById = useSelector((state) => state.room.roomDataById);
  const temperatureValue = useSelector((state) => state.message?.temperatureValue);
  const humidityValue = useSelector((state) => state.message?.humidityValue);
  const powerValue = useSelector((state) => state.message?.powerValue);
  const pm2_5Value = useSelector((state) => state.message?.pm2_5Value);
  const selectFirstValueOfSelectBox = useSelector((state) => state.room.selectFistValueOfSelectBox);
  const [getByRoomId, {isSuccess: isSuccessGetRoomId, isLoading: isLoadingGetRoomById}] = useGetByRoomIdMutation();
  const {sendMessage,loading} = useWebsocketServer(!isSuccessGetRoomId ? null : `/app/chat/${roomFetchedById?.data?.id}`);
  const {messages,loading: loadingRecivceMessage} = useWebsocketServer(!isSuccessGetRoomId ? null : `/topic/messages/${roomFetchedById?.data?.id}`);

  const {data: deviceType} = useGetAllDeviceTypesQuery("deviceTypeList");
  const {data: roomName} = useGetAllRoomNamesQuery("roomNameList");

  useEffect(() => {
    if (!loading || !loadingRecivceMessage){
      setIsLoading(false);
    }
  }, [loading, loadingRecivceMessage]);

  useEffect(() => {
    dispatch(setMessagesFromWS(messages));
  }, [messages]);

  useEffect(() => {
    if(isLoadingGetRoomById){
      console.log("isLoading");
    }
  }, [isLoadingGetRoomById]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (roomName.length > 0) {
          await getByRoomId({ id: roomName[0]?.id });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally {
        setIsLoading(false);
      }
    };
    fetchData();

  }, []);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleSendMessage = (messages) => {
   sendMessage(messages);
  }

  const handleChange = async (value) => {
    await getByRoomId({ id: value });
    dispatch(clearMessageFromWS());
    dispatch(clearSelectFirstValueOfSelectBox());
  };

  let content;

  if (isLoading) content = <LoadingFetchingDataComponent />;

  if (!isLoading) {
    content = (
      <>
        <SeoComponent title={"Devices Control"} />
        <div className="w-full gap-5" data-aos="fade-left">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <div className="col-span-3">
              <Card
                sx={{
                  ...cardStyle,
                }}
              >
                <div className="flex gap-5 flex-col lg:flex-row p-[20px]">
                  <SelectSingleComponent
                    label={t("room")}
                    options={roomName}
                    onChange={handleChange}
                    className="lg:w-60 w-full shrink-0"
                    fullWidth={false}
                    optionLabelKey="name"
                    selectFistValue={selectFirstValueOfSelectBox}
                  />
                  <SearchComponent onSearchChange={handleSearchChange} />
                </div>

                {deviceType
                  ? deviceType.map((dt) =>
                      dt?.controllable &&
                      roomFetchedById?.data?.devices?.some(
                        (device) =>
                          device.deviceType?.id === dt?.id &&
                          device.deviceType
                      ) ? (
                        <div
                          key={dt?.id}
                          className="grid grid-cols-1 relative px-[20px] gap-[10px] py-[20px] xxs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 border mx-5 mb-10 rounded-lg mt-5 pt-10"
                        >
                          <div className="absolute -top-4 left-5 bg-black text-white px-6 py-2 rounded-full">
                            {dt.name}
                          </div>
                          {roomFetchedById?.data?.devices ? (
                            roomFetchedById?.data?.devices
                              .filter(
                                (device) =>
                                  device.deviceType?.id === dt?.id
                              )
                              .map((filteredDevice) => (
                                <ToggleSwitchButtonComponent
                                  device={filteredDevice}
                                  key={filteredDevice?.id}
                                  messages={messages}
                                  sendMessage={handleSendMessage}
                                />
                              ))
                          ) : (
                            <div className="py-10">
                              <DataNotFound />
                            </div>
                          )}
                        </div>
                      ) : null
                    )
                  : null}
              </Card>
            </div>

            <div className="col-span-1 gap-3 lg:flex flex-col hidden">
              <GaugePowerComponent value={powerValue} />
              <GaugeTemperatureComponent value={temperatureValue}/>
              <GaugeHumidityComponent value={humidityValue}/>
              <GaugePM2_5Component value={pm2_5Value}/>
            </div>
          </div>
        </div>
        <div className="fixed top-20 right-0 lg:hidden">
          <Button
            variant="contained"
            sx={{ borderRadius: 0 }}
            onClick={() => dispatch(setIsOpenDrawerSensor(true))}
            
          ><MdOutlineSensors className="w-7 h-7"/></Button>
        </div>
        <DrawerSensorComponent powerValue={powerValue} temperatureValue={temperatureValue} humidityValue={humidityValue} pm2_5Value={pm2_5Value}/>
      </>
    );
  }

  return content;
}

export default DeviceControl;
