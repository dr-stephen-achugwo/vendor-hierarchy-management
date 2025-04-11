
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drivers: [], // Stores onboarded drivers
  vehicles: [], // Stores onboarded vehicles
  documents: {}, // Key: driverId, Value: Array of uploaded documents
};

const subVendorSlice = createSlice({
  name: "subVendor",
  initialState,
  reducers: {
    // Add a new driver
    addDriver: (state, action) => {
      const newDriver = {
        id: state.drivers.length ? state.drivers[state.drivers.length - 1].id + 1 : 1,
        name: action.payload.name,
        email: action.payload.email,
        assignedVehicle: null, // No vehicle assigned initially
      };
      state.drivers.push(newDriver);
    },

    // Assign a vehicle to a driver
    assignVehicleToDriver: (state, action) => {
      const { driverId, vehicleId } = action.payload;
      const driver = state.drivers.find((d) => d.id === driverId);
      if (driver) {
        driver.assignedVehicle = vehicleId;
      }
    },

    // Upload documents for a driver
    uploadDriverDocuments: (state, action) => {
      const { driverId, document } = action.payload;
      if (!state.documents[driverId]) {
        state.documents[driverId] = [];
      }
      state.documents[driverId].push(document);
    },
  },
});

export const { addDriver, assignVehicleToDriver, uploadDriverDocuments } = subVendorSlice.actions;
export default subVendorSlice.reducer;
