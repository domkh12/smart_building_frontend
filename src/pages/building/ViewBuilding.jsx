import {useParams} from "react-router-dom";
import {useGetBuildingByIdQuery} from "../../redux/feature/building/buildingApiSlice";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent";
import ViewBuildingDetail from "./ViewBuildingDetail";
import {useEffect} from "react";

function ViewBuilding() {
    const {id} = useParams();

    const { data: building, isFetching, isSuccess, isError, error, d } = useGetBuildingByIdQuery(id);

    useEffect(() => {
        refetch();
    }, [refetch]);

    let content;

    if (isFetching) content = <LoadingFetchingDataComponent/>;

    if (isFetching) content = <LoadingFetchingDataComponent/>;
    else if (isSuccess && building) content = <ViewBuildingDetail building={building}/>;
    else if (isError) {
        content = <div>Error: {error.message}</div>;
    } else {
        content = <div>Unexpected state: No building data found.</div>;
    }

    return content;
}

export default ViewBuilding;
