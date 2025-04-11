

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editVendor } from "@/redux/vendorSlice";
import { Label } from "@/components/ui/label";

const EditVendorWithParentDialog = ({ open, onOpenChange, vendor }) => {
  const dispatch = useDispatch();
  const vendors = useSelector((state) => state.vendors?.vendors || []);

  // Get the current parent vendor (if exists)
  const parentVendor = vendors.find((v) => v.id === vendor?.parentId);

  // Define allowed parent roles for the vendor level
  const getParentRoles = () => {
    if (!vendor) return [];
    switch (vendor.level) {
      case "Regional":
        return vendors.filter((v) => v.level === "Super");
      case "City":
        return vendors.filter((v) => v.level === "Super" || v.level === "Regional");
      case "Local":
        return vendors.filter((v) => v.level === "Super" || v.level === "Regional" || v.level === "City");
      case "DeployAssociate":
        return vendors.filter((v) => ["Super", "Regional", "City", "Local"].includes(v.level));
      default:
        return [];
    }
  };

  const [formData, setFormData] = useState({
    shortForm: "",
    name: "",
    email: "",
    parentId: "",
  });

  // ✅ Reset formData when vendor changes OR when the dialog opens
  useEffect(() => {
    if (open && vendor) {
      setFormData({
        shortForm: vendor.shortForm || "",
        name: vendor.name || "",
        email: vendor.email || "",
        parentId: vendor.parentId || "",
      });
    }
  }, [vendor, open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(editVendor({ id: vendor.id, ...formData }));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Edit Vendor</DialogTitle>
        <div className="flex flex-col gap-4">

          {/* Display Current Parent Vendor */}
          {parentVendor && (
            <div>
              <Label className="text-sm font-medium">Current Parent Vendor</Label>
              <Input value={parentVendor.name} disabled className="bg-gray-100" />
            </div>
          )}

          {/* Parent Vendor Selection Dropdown */}
          <div>
            <Label className="text-sm font-medium">Select New Parent Vendor</Label>
            <select
              name="parentId"
              value={formData.parentId}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            >
              <option value="">Select Parent Vendor</option>
              {getParentRoles().map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.name} ({parent.level})
                </option>
              ))}
            </select>
          </div>

          {/* Short Form */}
          <div>
            <Label className="text-sm font-medium">Short Form</Label>
            <Input name="shortForm" value={formData.shortForm} onChange={handleChange} />
          </div>

          {/* Vendor Name */}
          <div>
            <Label className="text-sm font-medium">Vendor Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </div>

          {/* Email */}
          <div>
            <Label className="text-sm font-medium">Email</Label>
            <Input name="email" value={formData.email} onChange={handleChange} />
          </div>

          {/* Save Button */}
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditVendorWithParentDialog;
