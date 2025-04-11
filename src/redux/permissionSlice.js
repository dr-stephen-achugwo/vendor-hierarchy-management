import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   rolePermissions: {
//     "Super Vendor": ["Manage Vendors", "View Fleet Status", "Assign Roles","Manage Roles"],
//     "Regional Vendor": ["Manage City Vendors", "Onboard Drivers"],
//     "City Vendor": ["Manage Fleet", "Onboard Drivers"],
//     "Local Vendor": ["Deploy Tasks"],
//     "DeployAssociate": ["View Tasks"],
//   },
// };


const initialState = {
  rolePermissions: {
    "Super": ["Manage Vendors", "View Fleet Status", "Assign Roles","Manage Roles"],
    "Regional": ["Manage City Vendors","Manage Regional Fleet"],
    "City": ["Manage Fleet", "Onboard Drivers"],
    "Local": ["Deploy Tasks"],
    "DeployAssociate": ["View Tasks"],
  },
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    updateRolePermissions: (state, action) => {
      const { role, permissions } = action.payload;
      if (state.rolePermissions[role]) {
        state.rolePermissions[role] = permissions; // Update role permissions
      }
    },
  },
});

export const { updateRolePermissions } = permissionsSlice.actions;
export default permissionsSlice.reducer;
