import { useParams } from "react-router-dom";
import EditVehicleForm from "./EditVehicleForm";
import LoadingFetchingDataComponent from "../../components/LoadingFetchingDataComponent";
import { useGetVehiclesQuery } from "../../redux/feature/vehicles/vehicleApiSlice";

function EditVehicle() {
  const { id } = useParams();

  const { vehicle } = useGetVehiclesQuery("vehiclesList", {
    selectFromResult: ({ data }) => ({
      vehicle: data?.entities[id],
    }),
  });

  let content;
  
  if (!vehicle) content = <LoadingFetchingDataComponent />;

  content = <EditVehicleForm vehicle={vehicle} />;

  return content;
}

export default EditVehicle;
