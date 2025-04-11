import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignDriverToVehicle } from "@/redux/subVendorSlice";

const AssignDriverModal = ({ vehicleId, onClose }) => {
  const drivers = useSelector((state) => state.subVendor.drivers);
  const dispatch = useDispatch();
  const [selectedDriver, setSelectedDriver] = useState("");

  const handleAssign = () => {
    if (selectedDriver) {
      dispatch(assignDriverToVehicle({ vehicleId, driverId: selectedDriver }));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded w-1/3">
        <h2 className="text-xl font-bold mb-4">Assign Driver</h2>

        <select
          className="border p-2 w-full mb-4"
          value={selectedDriver}
          onChange={(e) => setSelectedDriver(e.target.value)}
        >
          <option value="">Select a Driver</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>

        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAssign}>
          Assign
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded ml-2" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AssignDriverModal;
