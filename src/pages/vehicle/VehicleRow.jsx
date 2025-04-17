import { Button, Checkbox, TableCell, TableRow, Tooltip } from "flowbite-react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectVehicleById } from "../../redux/feature/vehicles/vehicleApiSlice";
import { FaEdit, FaEye } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";

function VehicleRow({ vehicleId }) {
  const vehicle = useSelector((state) => selectVehicleById(state, vehicleId));
  const navigate = useNavigate();

  if (vehicle) {
    var handleEdit = () => navigate(`/dash/vehicles/${vehicleId}`);
    var handleView = () => navigate(`/dash/vehicles/${vehicleId}/view`);
    var createdAt = vehicle.createdAt;
    var createdAtResult = createdAt.substring(0, createdAt.indexOf("T"));
  } else {
    return null;
  }
  return (
    <tr className="dark:text-white">
      <td>
        {vehicle.image ? (
          <>
            {" "}
            <div className="flex w-72 items-center">
              <img
                src={vehicle.image || "/images/vehiclePlaceHolder.png"}
                alt="car_Photo"
                className="w-32 h-20 object-cover rounded-lg bg-black"
              />
              <p className="text-pretty truncate ml-2">
                {vehicle.vehicleModel ? vehicle.vehicleModel : "N/A"}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex w-72 items-center">
              <div className="bg-gray-200 w-32 h-20 rounded-lg">
                <IoMdImages className="h-14 w-20 text-gray-400 ml-6 mt-3" />
              </div>
              <p className="text-pretty truncate ml-2">
                {vehicle.vehicleModel ? vehicle.vehicleModel : "N/A"}
              </p>
            </div>
          </>
        )}
      </td>
      <td>
        <div className="border-2 w-36 h-auto border-blue-600 text-center p-1 rounded-md bg-gray-50">
          <p className="text-blue-600 text-sm">
            {vehicle.licensePlateKhName || "Unknown"}
          </p>
          <span className="text-blue-600 text-lg">
            {vehicle.numberPlate ? vehicle.numberPlate : "Unknown"}
          </span>
          <div className="h-[0.2px] mx-1 mb-1 bg-blue-600"></div>
          <p className="text-red-600 text-xs">
            {vehicle.licensePlateEngName || "Unknown"}
          </p>
        </div>
      </td>
      <td>{vehicle.user.fullName ? vehicle.user.fullName : "N/A"}</td>
      <td className="text-right">
        {vehicle.user.phoneNumber ? vehicle.user.phoneNumber : "N/A"}
      </td>
      <td className="text-right text-nowrap">
        {createdAtResult ? createdAtResult : "N/A"}
      </td>
      <td>
        <div className="flex gap-2 items-center justify-end">
          <button
            onClick={handleEdit}
            className="button-squar text-white bg-primary hover:bg-primary-hover ring-transparent"
          >
            <FaEdit />
          </button>

          <button
            onClick={handleView}
            className="button-squar text-white bg-secondary hover:bg-secondary-hover ring-transparent"
          >
            <FaEye />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default VehicleRow;
