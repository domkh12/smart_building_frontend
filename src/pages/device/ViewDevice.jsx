import { useParams } from "react-router-dom";
import {useGetDeviceByIdQuery} from "../../redux/feature/device/deviceApiSlice";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent";
import ViewDeviceDetail from "./ViewDeviceDetail";
import {useEffect} from "react";

function ViewDevice() {
  const { id } = useParams();

  const { data: device, isFetching, isSuccess, isError, error, refetch } = useGetDeviceByIdQuery(id);

  useEffect(() => {
    refetch();
  }, [refetch]);

  let content;

  if (isFetching) content = <LoadingFetchingDataComponent/>;

  else if (isSuccess && device) content = <ViewDeviceDetail device={device} />
  else if (isError) {
    content = <div>Error: {error.message}</div>;
  } else {
    content = <div>Unexpected state: No building data found.</div>;
  }
  return content;
}

export default ViewDevice;
