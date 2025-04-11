

"use client";

import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setVehiclesForRegionalVendor,
  assignVehicleToCityVendor,
  unassignVehicleFromCityVendor,
} from "@/redux/regionalFleetSlice";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ManageFleet() {
  const dispatch = useDispatch();

  // Get Redux state
  const vehicles = useSelector((state) => state.regionalFleet.vehicles);
  const cityVendorAssignments = useSelector(
    (state) => state.regionalFleet.cityVendorAssignments
  );
  const user = useSelector((state) => state.auth.user);
  const fleet = useSelector((state) => state.fleet.fleet);
  const regionalVendors = useSelector((state) => state.fleet.regionalVendors);
  const cityVendors = useSelector((state) => state.vendors.vendors);

  // Memoized City Vendors
  const memoizedCityVendors = useMemo(
    () => cityVendors.filter((v) => v.level === "City"),
    [cityVendors]
  );

  // State for Assign Modal
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedCityVendor, setSelectedCityVendor] = useState("");

  // Fetch Vehicles Assigned to Logged-in Regional Vendor
  useEffect(() => {
    if (user) {
      dispatch(setVehiclesForRegionalVendor({ regionalVendorId: user.id, regionalVendors, fleet }));
    }
  }, [dispatch, user, fleet, regionalVendors]);

  if (!user || user.level !== "Regional") return <p>Access Denied</p>;

  // Assign Vehicle to City Vendor
  const handleAssign = () => {
    if (selectedVehicle && selectedCityVendor) {
      dispatch(assignVehicleToCityVendor({ vehicleId: selectedVehicle, cityVendorId: selectedCityVendor }));
      setSelectedVehicle(null);
      setSelectedCityVendor("");
    }
  };

  // Unassign Vehicle from City Vendor
  const handleUnassign = (vehicleId, cityVendorId) => {
    dispatch(unassignVehicleFromCityVendor({ vehicleId, cityVendorId }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">  Assigns vehicles to City Vendors </h2>

      {/* Vehicles Assigned to Regional Vendor */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Vehicles Assigned to You</h3>
        <table className="w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3">Vehicle ID</th>
              {/* <th className="border p-3">Vehicle Type</th> */}
              <th className="border p-3">Status</th>
              <th className="border p-3">Assigned City Vendor</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border text-center">
                  <td className="p-3 border">{vehicle.id}</td>
                  {/* <td className="p-3 border">{vehicle.type || "N/A"}</td> */}
                  <td className="p-3 border">{vehicle.status}</td>
                  <td className="p-3 border">
  {vehicle.assignedCityVendor
    ? (cityVendors.find(v => v.id === vehicle.assignedCityVendor)?.name || `City Vendor ${vehicle.assignedCityVendor}`)
    : "Not Assigned"}
    
  {/* {vehicle.assignedCityVendor !== null && vehicle.assignedCityVendor !== undefined ? "Assigned" : "Not Assigned"} */}
</td>

                  <td className="p-3 border">
                    {vehicle.assignedCityVendor ? (
                      <Button
                        className="bg-red-500"
                        onClick={() => handleUnassign(vehicle.id, vehicle.assignedCityVendor)}
                      >
                        Unassign
                      </Button>
                    ) : (
                      <Button className="bg-blue-500" onClick={() => setSelectedVehicle(vehicle.id)}>
                        Assign
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No vehicles assigned to you.
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      {/* Assign Vehicle to City Vendor */}
      {selectedVehicle && (
        <Card className="p-4 bg-white shadow-lg border rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Assign Vehicle {selectedVehicle} to City Vendor</h3>
          <select
            className="w-full p-2 border rounded-md mb-4"
            value={selectedCityVendor}
            onChange={(e) => setSelectedCityVendor(e.target.value)}
          >
            <option value="">Select City Vendor</option>
            {memoizedCityVendors.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.name} (ID: {vendor.id})
              </option>
            ))}
          </select>
          <Button className="bg-green-500" onClick={handleAssign}>
            Confirm Assignment
          </Button>
        </Card>
      )}

      {/* City Vendor Assignments Summary */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">City Vendor Assignments</h3>
        <table className="w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3">City Vendor ID</th>
              <th className="border p-3">City Vendor Name</th>
              <th className="border p-3">Assigned Vehicles</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(cityVendorAssignments).length > 0 ? (
              Object.entries(cityVendorAssignments).map(([vendorId, assignedVehicles]) => {
                const vendor = memoizedCityVendors.find((v) => v.id ===Number(vendorId));
                return (
                  <tr key={vendorId} className="border text-center">
                    <td className="p-3 border">{vendorId}</td>
                    <td className="p-3 border">{vendor?.name || "Unknown"}</td>
                    <td className="p-3 border">
                      {assignedVehicles.length > 0 ? assignedVehicles.join(", ") : "No Vehicles Assigned"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  No City Vendor Assignments yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="p-4 bg-gray-100 border rounded-lg">
        <h3 className="text-lg font-semibold">Summary</h3>
        <p>Total Vehicles Assigned: {vehicles.length}</p>
        <p>Vehicles Assigned to City Vendors: {Object.values(cityVendorAssignments).flat().length}</p>
        <p>Unassigned Vehicles: {vehicles.filter((v) => !v.assignedCityVendor).length}</p>
      </div>
    </div>
  );
}
