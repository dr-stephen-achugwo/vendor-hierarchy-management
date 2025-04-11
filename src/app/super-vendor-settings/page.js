


'use client';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateRolePermissions } from "@/redux/permissionSlice";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const SuperVendorSettings = () => {
  const user = useSelector(store => store.auth.user);
  // if (!user) redirect("/sign-in");

  const dispatch = useDispatch();
  const rolePermissions = useSelector((state) => state.permissions.rolePermissions);
  const allFunctionalities = ["Manage Vendors", "View Fleet Status", "Assign Roles", "Manage City Vendors", "Onboard Drivers", "Manage Fleet", "Deploy Tasks", "View Tasks"];

  const [selectedRole, setSelectedRole] = useState("");
  const [selectedPermission, setSelectedPermission] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdatePermissions = () => {
    if (selectedPermission) {
      dispatch(updateRolePermissions({ role: selectedRole, permissions: [...rolePermissions[selectedRole], selectedPermission] }));
    }
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg w-[80%] max-w-4xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Manage Role Permissions</h2>

        {/* Role Selection Dropdown */}
        <div className="flex justify-center mb-4">
          <select 
            onChange={(e) => setSelectedRole(e.target.value)} 
            className="p-2 border rounded w-1/3"
          >
            <option value="">Select Role</option>
            {Object.keys(rolePermissions).map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        {/* Permissions Table */}
        {selectedRole && (
          <div className="overflow-x-auto">
            <h3 className="text-lg font-semibold text-center mb-2">Permissions for {selectedRole}</h3>
            
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Functionality</th>
                  <th className="border p-2">Access</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allFunctionalities.map((func) => (
                  <tr key={func} className="text-center">
                    <td className="border p-2">{func}</td>
                    <td className="border p-2">
                      {rolePermissions[selectedRole]?.includes(func) ? "✅ Allowed" : "❌ Not Allowed"}
                    </td>
                    <td className="border p-2">
                      {!rolePermissions[selectedRole]?.includes(func) && (
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              onClick={() => { setSelectedPermission(func); }} 
                              className="bg-blue-500 text-white"
                            >
                              Add Permission
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Grant Permission</DialogTitle>
                            </DialogHeader>
                            <p>Are you sure you want to grant <b>{selectedPermission}</b> access to <b>{selectedRole}</b>?</p>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                              <Button className="bg-blue-500 text-white" onClick={handleUpdatePermissions}>Confirm</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperVendorSettings;
