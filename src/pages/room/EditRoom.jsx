import { useParams } from "react-router-dom";
import {useGetRoomByIdQuery} from "../../redux/feature/room/roomApiSlice";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent";
import EditRoomForm from "./EditRoomForm";
import {useEffect} from "react";

function EditRoom() {
  const { id } = useParams();

  const { data: room, isFetching, isSuccess, isError, error, refetch } = useGetRoomByIdQuery(id);

  useEffect(() => {
    refetch();
  }, [refetch]);

  let content;

  if (isFetching) content = <LoadingFetchingDataComponent/>;

  else if (isSuccess && room) content = <EditRoomForm room={room} />;
  else if (isError) {
    content = <div>Error: {error.message}</div>;
  } else {
    content = <div>Unexpected state: No building data found.</div>;
  }
  return content;

}

export default EditRoom;
