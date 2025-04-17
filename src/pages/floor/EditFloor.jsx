import {useParams} from "react-router-dom";
import {useGetFloorByIdQuery} from "../../redux/feature/floor/floorApiSlice.js";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent.jsx";
import EditFloorForm from "./EditFloorForm.jsx";
import {useEffect} from "react";

function EditFloor(){
    const { id } = useParams();

    const { data: floor, isFetching, isSuccess, isError, error, refetch } = useGetFloorByIdQuery(id);

    useEffect(() => {
        refetch();
    }, [refetch]);

    let content;

    if (isFetching) content = <LoadingFetchingDataComponent/>;

    else if (isSuccess && floor) content = <EditFloorForm floor={floor}/>
    else if (isError) {
        content = <div>Error: {error.message}</div>;
    } else {
        content = <div>Unexpected state: No building data found.</div>;
    }
    return content;

}

export default EditFloor;