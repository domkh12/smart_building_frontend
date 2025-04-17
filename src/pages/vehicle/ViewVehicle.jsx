import { useParams } from "react-router-dom";
import ViewVehicleDetail from "./ViewVehicleDetail";
import { useGetVehiclesQuery } from "../../redux/feature/vehicles/vehicleApiSlice";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent";
import { useGetUsersQuery } from "../../redux/feature/users/userApiSlice";

function ViewVehicle() {
  const { id } = useParams();

  const { vehicle } = useGetVehiclesQuery("vehiclesList", {
    selectFromResult: ({ data }) => ({
      vehicle: data?.entities[id],
    }),
  });   

  let content;
  
  if (!vehicle) {
    content = <LoadingFetchingDataComponent />;
  }

  content = <ViewVehicleDetail vehicle={vehicle} />;

  return content;
}

export default ViewVehicle;
