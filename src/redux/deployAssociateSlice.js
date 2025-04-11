

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehicles: [
    { id: "VH001", status: "Available", assignedTo: null, location: "Bengaluru, Karnataka" },
    { id: "VH002", status: "In Service", assignedTo: null, location: "Hyderabad, Telangana" },
    { id: "VH003", status: "Under Maintenance", assignedTo: null, location: "Chennai, Tamil Nadu" },
    { id: "VH004", status: "Deployed", assignedTo: 2, location: "Vijayawada, Andhra Pradesh" },
    { id: "VH005", status: "Available", assignedTo: 3, location: "Kochi, Kerala" },
    { id: "VH006", status: "Deployed", assignedTo: 2, location: "Mysuru, Karnataka" },
    { id: "VH007", status: "In Service", assignedTo: null, location: "Visakhapatnam, Andhra Pradesh" },
    { id: "VH008", status: "Available", assignedTo: null, location: "Coimbatore, Tamil Nadu" },
    { id: "VH009", status: "Deployed", assignedTo: 4, location: "Bangalore, Karnataka" },
  ],

  deployAssociates: [
    { id: 10, name: "Driver A", parentId: 2 },
    { id: 11, name: "Driver B", parentId: 2 },
    { id: 12, name: "Driver C", parentId: 3 },
    { id: 13, name: "Driver D", parentId: 3 },
    { id: 14, name: "Driver E", parentId: 4 },
  ],
};

const deployAssociatesSlice = createSlice({
  name: "deployAssociates",
  initialState,
  reducers: {
    assignVehicleToAssociate: (state, action) => {
      const { vehicleId, associateId } = action.payload;
      const vehicle = state.vehicles.find((v) => v.id === vehicleId);
      if (vehicle) {
        vehicle.assignedTo = associateId;
      }
    },
  },
});

export const { assignVehicleToAssociate } = deployAssociatesSlice.actions;
export default deployAssociatesSlice.reducer;
