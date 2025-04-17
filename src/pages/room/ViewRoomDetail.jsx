import { useNavigate } from "react-router-dom";
import useTranslate from "../../hook/useTranslate";
import { Badge, Card, styled, Typography } from "@mui/material";
import MainHeaderComponent from "../../components/MainHeaderComponent";
import { cardStyle } from "../../assets/style";
import EditButtonComponent from "../../components/EditButtonComponent";

function ViewRoomDetail({ room }) {
 const { t } = useTranslate();
 const navigate = useNavigate();

 console.log("room: ", room);

 const StyledBadge = styled(Badge)(({ theme, isonline }) => ({
   "& .MuiBadge-badge": {
     backgroundColor: isonline === "true" ? "#44b700" : "#9E9E9E",
     color: isonline === "true" ? "#44b700" : "#9E9E9E",
     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
     "&::after": {
       position: "absolute",
       top: 0,
       left: 0,
       width: "100%",
       height: "100%",
       borderRadius: "50%",
       animation:
         isonline === "true" ? "ripple 1.2s infinite ease-in-out" : "none",
       border: "1px solid currentColor",
       content: '""',
     },
   },
   "@keyframes ripple": {
     "0%": {
       transform: "scale(.8)",
       opacity: 1,
     },
     "100%": {
       transform: "scale(2.4)",
       opacity: 0,
     },
   },
 }));

 const breadcrumbs = [
   <button
     className="text-black hover:underline"
     onClick={() => navigate("/dash")}
     key={1}
   >
     {t("dashboard")}
   </button>,
   <Typography color="inherit" key={2}>
     {t("room")}
   </Typography>,
   <Typography color="inherit" key={3}>
     {room.name}
   </Typography>,
 ];

 return (
   <>
     <MainHeaderComponent
       breadcrumbs={breadcrumbs}
       title={room.name}
       handleBackClick={() => navigate("/dash/rooms")}
     />
     <Card sx={{ ...cardStyle, p: "16px" }}>
       <div className="flex justify-between items-center mb-5">
         <Typography variant="h6">Room info</Typography>

         <EditButtonComponent
         // handleQuickEdit={() => {
         //   dispatch(setIsOpenQuickEditRoom(true));
         //   dispatch(setRoomForQuickEdit(room));
         // }}
         />
       </div>
       <div className="flex items-center gap-5">
         <div className="p-1 border-dashed border rounded-[12px]">
           <div className="w-48 h-28 rounded-[12px] overflow-hidden">
             <img
               src={room?.image || "/images/img_placeholder.jpg"}
               alt="roomImage"
               className="w-full h-full object-cover"
             />
           </div>
         </div>

       </div>
       <div className="flex flex-col gap-3 mt-5">
         <Typography variant="body1">
           <span className="text-gray-cus">Device name </span>
           {`${"\u00a0"}:${"\u00a0"}${room?.name}`}
         </Typography>
         <Typography variant="body1">
           <span className="text-gray-cus">Room id </span>
           {`${"\u00a0"}:${"\u00a0"}${room?.id}`}
         </Typography>
         <Typography variant="body1">
           <span className="text-gray-cus">Device quantity </span>
           {`${"\u00a0"}:${"\u00a0"}${room?.devicesQty}`}
         </Typography>
         <Typography variant="body1">
           <span className="text-gray-cus">Created at </span>
           {`${"\u00a0"}:${"\u00a0"}${room?.createdAt}`}
         </Typography>
         {/* <div className="flex gap-2">
            <Typography variant="body1">{`${t("color")}${"\u00a0"}:`}</Typography>
            <div
              className="w-5 h-5 rounded-full border-[2px]"
              style={{ backgroundColor: room.color }}
            ></div>
            <Typography variant="body1">{room.color}</Typography>
          </div>
          <Typography variant="body1">
            <span className="text-gray-cus">{t("licensePlateType")}</span>
            {`${"\u00a0"}:${"\u00a0"}${room.licensePlateType.name}`}
          </Typography>
          <Typography variant="body1">
            <span className="text-gray-cus">Total parking hours</span>
            {`${"\u00a0"}:${"\u00a0"}${room?.totalParkingHours || "N/A"}`}
          </Typography>
          <Typography variant="body1">
            <span className="text-gray-cus">Total parking fee</span>
            {`${"\u00a0"}:${"\u00a0"}${room?.totalParkingFees || "N/A"}`}
          </Typography>
          <Typography variant="body1">
            <span className="text-gray-cus">Last parking lot</span>
            {`${"\u00a0"}:${"\u00a0"}${room.lastParkingLot || "N/A"}`}
          </Typography>
          <Typography variant="body1">
            <span className="text-gray-cus">Last parking-time</span>
            {`${"\u00a0"}:${"\u00a0"}${room.lastParkingTime || "N/A"}`}
          </Typography> */}
       </div>
     </Card>
   </>
 );
}

export default ViewRoomDetail;
