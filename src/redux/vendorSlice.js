

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendors: [
    { id: 1, name: "Ajay Bhaskar", email: "ajay@supervendor.com", level: "Super", parentId: null, shortForm: "AB" },

    { id: 2, name: "Pranav", email: "pranav@regional.com", level: "Regional", parentId: 1, shortForm: "P" },
    { id: 3, name: "Vinay", email: "vinay@regional.com", level: "Regional", parentId: 1, shortForm: "V" },
    { id: 4, name: "Tirupathi Reddy", email: "tirupathi@regional.com", level: "Regional", parentId: 1, shortForm: "TR" },

    { id: 5, name: "Akshaya", email: "akshaya@city.com", level: "City", parentId: 2, shortForm: "A" },
    { id: 7, name: "Prasad", email: "prasad@city.com", level: "City", parentId: 4, shortForm: "P" },
    { id: 8, name: "Chandu", email: "chandu@city.com", level: "City", parentId: 3, shortForm: "C" },
    { id: 11, name: "PawanKalyan", email: "kalyan@city.com", level: "City", parentId: 4, shortForm: "PK" },

    { id: 10, name: "Raja", email: "raja@local.com", level: "Local", parentId: 7, shortForm: "D" },
    { id: 16, name: "Local Vendor", email: "lv@local.com", level: "Local", parentId: 5, shortForm: "LV" },

    { id: 13, name: "Driver 1", email: "driver1@deployassociate.com", level: "DeployAssociate", parentId: 10, shortForm: "D1", documents: [], assignedVehicle: null },
    { id: 14, name: "Driver 2", email: "driver2@deployassociate.com", level: "DeployAssociate", parentId: 10, shortForm: "D2", documents: [], assignedVehicle: null },
    { id: 15, name: "Driver 3", email: "driver3@deployassociate.com", level: "DeployAssociate", parentId: 16, shortForm: "D3", documents: [], assignedVehicle: null },
    { id: 17, name: "Driver Ashok", email: "driverAshok@deployassociate.com", level: "DeployAssociate", parentId: 16, shortForm: "D4", documents: [], assignedVehicle: null },
  ],
};

const vendorsSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {
    addVendor: (state, action) => {
      const newVendor = {
        id: state.vendors.length ? state.vendors[state.vendors.length - 1].id + 1 : 1, // Auto-increment ID
        name: action.payload.name,
        email: action.payload.email,
        level: action.payload.level,
        parentId: action.payload.parentId,
        shortForm: action.payload.shortForm,
        documents: [], // Empty document list
        assignedVehicle: null, // No vehicle assigned initially
      };
      state.vendors.push(newVendor);
    },

    editVendor: (state, action) => {
      const { id, name, email, shortForm } = action.payload;
      const vendorIndex = state.vendors.findIndex((v) => v.id === id);
      if (vendorIndex !== -1) {
        state.vendors[vendorIndex] = {
          ...state.vendors[vendorIndex],
          name,
          email,
          shortForm,
        };
      }
    },

    moveVendor: (state, action) => {
      const { id, newParentId } = action.payload;
      const vendorIndex = state.vendors.findIndex((v) => v.id === id);
      if (vendorIndex !== -1) {
        state.vendors[vendorIndex].parentId = newParentId;
      }
    },

    deleteVendor: (state, action) => {
      const vendorId = action.payload;
      
      // Ensure child vendors are also removed
      const removeVendorAndChildren = (id) => {
        state.vendors = state.vendors.filter(vendor => vendor.id !== id);
        const childVendors = state.vendors.filter(v => v.parentId === id);
        childVendors.forEach(child => removeVendorAndChildren(child.id));
      };

      removeVendorAndChildren(vendorId);
    },

    // ✅ Upload Document for Deploy Associate
    uploadDocument: (state, action) => {
      const { driverId, document } = action.payload;
      const driverIndex = state.vendors.findIndex(v => v.id === driverId && v.level === "DeployAssociate");
      if (driverIndex !== -1) {
        state.vendors[driverIndex].documents.push(document);
      }
    },

    // ✅ Assign Vehicle to Deploy Associate
    assignVehicleToDriver: (state, action) => {
      const { driverId, vehicleId } = action.payload;
      const driverIndex = state.vendors.findIndex(v => v.id === driverId && v.level === "DeployAssociate");
      if (driverIndex !== -1) {
        state.vendors[driverIndex].assignedVehicle = vehicleId;
      }
    },
  },
});

export const { addVendor, editVendor, moveVendor, deleteVendor, uploadDocument, assignVehicleToDriver } = vendorsSlice.actions;
export default vendorsSlice.reducer;
