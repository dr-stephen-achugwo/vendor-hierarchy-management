/*
the State of the Slice looks like this 

const state = {
  vehicles: [
    { id: "VH006", status: "Deployed", assignedCityVendor: 5, location: "Mysuru, Karnataka" },
    { id: "VH014", status: "Available", assignedCityVendor: null, location: "Bengaluru, Karnataka" }
  ],
  cityVendorAssignments: {
    5: ["VH006"],
    7: ["VH009"]
  }
};

*/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehicles: [], // Vehicles assigned to the logged-in Regional Vendor  by the Super vendor
  cityVendorAssignments: {
    
  }, // Mapping of City Vendor IDs to assigned vehicle IDs
  // vehicles: [
  //   { id: "VH006", status: "Deployed", assignedCityVendor: 5, location: "Mysuru, Karnataka" },
  //   { id: "VH014", status: "Available", assignedCityVendor: null, location: "Bengaluru, Karnataka" }
  // ],
  // cityVendorAssignments: {
  //   5: ["VH006"],
  //   7: ["VH009"]
  // }
};

const regionalFleetSlice = createSlice({
  name: "regionalFleet",
  initialState,
  reducers: {
    setVehiclesForRegionalVendor: (state, action) => {
      const { regionalVendorId, regionalVendors, fleet } = action.payload;
      const regionalVendor = regionalVendors.find(vendor => vendor.id === regionalVendorId);

      if (regionalVendor) {
        state.vehicles = fleet.filter(vehicle => regionalVendor.vehicles.includes(vehicle.id));
      } else {
        state.vehicles = []; // vehicles are cleared if no vendor is find
      }
    },

    assignVehicleToCityVendor: (state, action) => {
      const { vehicleId, cityVendorId } = action.payload;
      const vehicle = state.vehicles.find((v) => v.id === vehicleId);

      if (vehicle) {
        vehicle.assignedCityVendor = cityVendorId;

        if (!state.cityVendorAssignments[cityVendorId]) {
          state.cityVendorAssignments[cityVendorId] = [];
        }
        state.cityVendorAssignments[cityVendorId].push(vehicleId);
      }
    },

    unassignVehicleFromCityVendor: (state, action) => {
      const { vehicleId, cityVendorId } = action.payload;

      if (state.cityVendorAssignments[cityVendorId]) {
        state.cityVendorAssignments[cityVendorId] = state.cityVendorAssignments[cityVendorId].filter(
          (id) => id !== vehicleId
        );
      }

      const vehicle = state.vehicles.find((v) => v.id === vehicleId);
      if (vehicle) {
        vehicle.assignedCityVendor = null;
      }
    },
  },
});

export const { setVehiclesForRegionalVendor, assignVehicleToCityVendor, unassignVehicleFromCityVendor } =
  regionalFleetSlice.actions;
export default regionalFleetSlice.reducer;
