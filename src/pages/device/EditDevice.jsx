import {useParams} from "react-router-dom";
import {useGetDeviceByIdQuery} from "../../redux/feature/device/deviceApiSlice.js";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent.jsx";
import EditDeviceForm from "./EditDeviceForm.jsx";
import {useEffect} from "react";

function EditDevice() {
    const { id } = useParams();

    const { data: device, isFetching, isSuccess, isError, error, refetch } = useGetDeviceByIdQuery(id);

    useEffect(() => {
        refetch();
    }, [refetch]);

    let content;

    if (isFetching) content = <LoadingFetchingDataComponent/>;

    else if (isSuccess && device)   content = <EditDeviceForm device={device}/>
    else if (isError) {
        content = <div>Error: {error.message}</div>;
    } else {
        content = <div>Unexpected state: No building data found.</div>;
    }
    return content;
}

export default EditDevice;