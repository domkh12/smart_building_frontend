import { useParams } from "react-router-dom";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent";
import EditBuildingForm from "./EditBuildingForm";
import {useGetBuildingByIdQuery} from "../../redux/feature/building/buildingApiSlice";
import {useEffect} from "react";

function EditBuilding() {
  const { id } = useParams();

  const { data: building, isFetching, isSuccess, isError, error, refetch } = useGetBuildingByIdQuery(id);

  useEffect(() => {
    refetch();
  }, [refetch]);

  let content;

  if (isFetching) content = <LoadingFetchingDataComponent/>;

  else if (isSuccess && building) content = <EditBuildingForm building={building} />;
  else if (isError) {
    content = <div>Error: {error.message}</div>;
  } else {
    content = <div>Unexpected state: No building data found.</div>;
  }

  return content;
}

export default EditBuilding;
