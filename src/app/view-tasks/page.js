
"use client";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { assignVehicleToAssociate } from "@/redux/deployAssociateSlice";
import { useRouter } from "next/navigation";

const DeployedTasks = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const loggedInUser = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);

  // Wait until loggedInUser is available
  useEffect(() => {
    if (loggedInUser !== null) {
      setLoading(false);
    }
  }, [loggedInUser]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  // Prevent filtering if loggedInUser is not available
  const vehicles = useSelector((state) =>
    loggedInUser ? state.deployAssociates.vehicles.filter((v) => v.assignedTo === loggedInUser.id) : []
  );

  const deployAssociates = useSelector((state) =>
    loggedInUser ? state.deployAssociates.deployAssociates.filter((d) => d.parentId === loggedInUser.id) : []
  );

  const [assignments, setAssignments] = useState({});

  const handleAssign = (vehicleId, associateId) => {
    dispatch(assignVehicleToAssociate({ vehicleId, associateId }));
    setAssignments({ ...assignments, [vehicleId]: associateId });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Deployed Tasks</h1>

      {/* Vehicles Table */}
      {vehicles.length > 0 ? (
        <table className="w-full mb-6 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Vehicle ID</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Location</th>
              <th className="border border-gray-300 p-2">Assign To</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="border border-gray-300">
                <td className="p-2">{vehicle.id}</td>
                <td className="p-2">{vehicle.status}</td>
                <td className="p-2">{vehicle.location}</td>
                <td className="p-2">
                  <select
                    value={assignments[vehicle?.id] || ""}
                    onChange={(e) => handleAssign(vehicle.id, Number(e.target.value))}
                    className="border p-1"
                  >
                    <option value="">Select Driver</option>
                    {deployAssociates.map((driver) => (
                      <option key={driver.id} value={driver.id}>
                        {driver.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No vehicles assigned to you.</p>
      )}

      {/* Deploy Associates Table */}
      {deployAssociates.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Deploy Associate</th>
              <th className="border border-gray-300 p-2">Assigned Vehicle</th>
            </tr>
          </thead>
          <tbody>
            {deployAssociates.map((associate) => {
              const assignedVehicle = vehicles.find((v) => v.assignedTo === associate.id);
              return (
                <tr key={associate.id} className="border border-gray-300">
                  <td className="p-2">{associate.name}</td>
                  <td className="p-2">{assignedVehicle ? assignedVehicle.id : "NA"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mt-4">No Deploy Associates found.</p>
      )}
    </div>
  );
};

export default DeployedTasks;
