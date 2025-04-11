import { configureStore } from "@reduxjs/toolkit";
import vendorReducer from "./vendorSlice";
import authReducer from "./authSlice";
import permissionsReducer from "./permissionSlice";
import fleetReducer from "./fleetSlice";
import regionalFleetSlice from "./regionalFleetSlice"
import deployAssociatesReducer from "./deployAssociateSlice";
import subVendorReducer from "./subVendorSlice"
export const store = configureStore({
  reducer: {
    vendors: vendorReducer,
    auth: authReducer,
    permissions: permissionsReducer,
    fleet: fleetReducer,
    regionalFleet: regionalFleetSlice,
    deployAssociates: deployAssociatesReducer,
    subVendor: subVendorReducer
  },
});

export default store;
