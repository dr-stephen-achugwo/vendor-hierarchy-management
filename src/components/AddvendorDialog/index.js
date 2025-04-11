'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addVendor } from '@/redux/vendorSlice';

export default function AddVendorDialog({ open, onClose, user, vendors }) {
  const dispatch = useDispatch();
  const [newVendor, setNewVendor] = useState({
    shortForm: '',
    name: '',
    email: '',
    parentId: '',
    level: '',
  });

  if (!open) return null;

  // Get Parent Vendors based on User Role
  const getAllowedParentVendors = () => {
    return vendors.filter((vendor) => {
      return canCreateVendorUnder(vendor.level);
    });
  };

  // Get Allowed Vendor Levels (User Can Add Below Their Role)
  const getAllowedVendorLevels = () => {
    switch (user.level) {
      case 'Super':
        return ['Super','Regional', 'City', 'Local', 'DeployAssociate'];
      case 'Regional':
        return ['Regional','City', 'Local', 'DeployAssociate'];
      case 'City':
        return ['City','Local', 'DeployAssociate'];
      case 'Local':
        return ['Local','DeployAssociate'];
      default:
        return [];
    }
  };

  // Check if user can create vendor under a specific level
  const canCreateVendorUnder = (level) => {
    const allowedLevels = getAllowedVendorLevels();
    return allowedLevels.includes(level);
  };

  const handleAddVendor = () => {
    dispatch(addVendor(newVendor));
    onClose();
    setNewVendor({ shortForm: '', name: '', email: '', parentId: '', level: '' });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h3 className="text-xl font-semibold mb-4">Add Vendor</h3>

        <Label>Parent Vendor</Label>
        <select 
          className="w-full border p-2 mb-4"
          value={newVendor.parentId}
          onChange={(e) => setNewVendor({ ...newVendor, parentId: e.target.value })}
        >
          <option value="">Select Parent Vendor</option>
          {getAllowedParentVendors().map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.name} ({vendor.level})
            </option>
          ))}
        </select>

        <Label>Vendor Level</Label>
        <select
          className="w-full border p-2 mb-4"
          value={newVendor.level}
          onChange={(e) => setNewVendor({ ...newVendor, level: e.target.value })}
        >
          <option value="">Select Vendor Level</option>
          {getAllowedVendorLevels().map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        <Label>Short Form</Label>
        <Input
          className="w-full mb-4"
          value={newVendor.shortForm}
          onChange={(e) => setNewVendor({ ...newVendor, shortForm: e.target.value })}
        />

        <Label>Vendor Name</Label>
        <Input
          className="w-full mb-4"
          value={newVendor.name}
          onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
        />

        <Label>Email</Label>
        <Input
          className="w-full mb-4"
          value={newVendor.email}
          onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
        />

        <div className="flex justify-end gap-4">
          <Button onClick={onClose} className="bg-gray-400">
            Cancel
          </Button>
          <Button onClick={handleAddVendor} className="bg-blue-500">
            Add Vendor
          </Button>
        </div>
      </div>
    </div>
  );
}
