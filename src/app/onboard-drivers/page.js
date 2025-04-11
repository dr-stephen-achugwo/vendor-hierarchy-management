

'use client';

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDriver, assignVehicleToDriver, uploadDriverDocuments } from "@/redux/subVendorSlice";

const OnboardDrivers = () => {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.subVendor.drivers);
  const documents = useSelector((state) => state.subVendor.documents);

  const [driverName, setDriverName] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [vehicleId, setVehicleId] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  // Add Driver
  const handleAddDriver = () => {
    if (driverName && driverEmail) {
      dispatch(addDriver({ name: driverName, email: driverEmail }));
      setDriverName("");
      setDriverEmail("");
    }
  };

  // Assign Vehicle
  const handleAssignVehicle = () => {
    if (selectedDriver && vehicleId) {
      dispatch(assignVehicleToDriver({ driverId: selectedDriver, vehicleId }));
      setVehicleId("");
    }
  };

  // Upload Document (with FileReader)
  const handleUploadDocument = () => {
    if (selectedDriver && uploadedFile) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const fileData = {
          name: uploadedFile.name,
          url: e.target.result, // Base64 URL for direct viewing
        };

        dispatch(uploadDriverDocuments({ driverId: selectedDriver, document: fileData }));
      };

      reader.readAsDataURL(uploadedFile); // Converts file to Base64 URL
      setUploadedFile(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Onboard Drivers</h2>

      {/* Add Driver Form */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Driver Name"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Driver Email"
          value={driverEmail}
          onChange={(e) => setDriverEmail(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddDriver}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Driver
        </button>
      </div>

      {/* Assign Vehicle */}
      <div className="mb-6 flex space-x-4">
        <select
          onChange={(e) => setSelectedDriver(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Driver</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Vehicle ID"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAssignVehicle}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Assign Vehicle
        </button>
      </div>

      {/* Upload Documents */}
      <div className="mb-6 flex space-x-4">
        <input
          type="file"
          onChange={(e) => setUploadedFile(e.target.files[0])}
          className="border border-gray-300 rounded-md px-3 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleUploadDocument}
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
        >
          Upload Document
        </button>
      </div>

      {/* Drivers Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Driver ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Assigned Vehicle</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Documents</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{driver.id}</td>
                <td className="border border-gray-300 px-4 py-2">{driver.name}</td>
                <td className="border border-gray-300 px-4 py-2">{driver.email}</td>
                <td className="border border-gray-300 px-4 py-2">{driver.assignedVehicle || "NA"}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {documents[driver.id] ? (
                    documents[driver.id].map((doc, index) => (
                      <a 
                        key={index} 
                        href={doc.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {doc.name}
                      </a>
                    ))
                  ) : (
                    <span className="text-gray-500">No Documents</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OnboardDrivers;
