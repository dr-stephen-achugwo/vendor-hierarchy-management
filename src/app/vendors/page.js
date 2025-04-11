

'use client';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { deleteVendor } from '@/redux/vendorSlice';
import EditVendorDialog from '@/components/EditVendorDialog';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import EditVendorWithParentDialog from '@/components/EditVendorParentDialog';
import AddVendorDialog from '@/components/AddvendorDialog';
import { redirect } from 'next/navigation';
export default function ManageVendors() {
  const dispatch = useDispatch();
  const vendors = useSelector((state) => state.vendors?.vendors || []);
  const user = useSelector((state) => state.auth?.user || null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  if (!user) redirect("/sign-in") // Prevent SSR mismatch

  const superVendors = vendors.filter((v) => v.level === 'Super');
  const regionalVendors = vendors.filter((v) => v.level === 'Regional');
  const cityVendors = vendors.filter((v) => v.level === 'City');
  const localVendors = vendors.filter((v) => v.level === 'Local');
  const deployAssociates = vendors.filter((v) => v.level === 'DeployAssociate');

  const canEdit = (vendor) => {
    return (
      user?.level === 'Super' ||
      (user?.level === 'Regional' && vendor.level !== 'Super') ||
      (user?.level === 'City' && vendor.level !== 'Super' && vendor.level !== 'Regional') ||
      (user?.level === 'Local' && (vendor.level === 'DeployAssociate' || vendor.level === 'Local'))
    );
  };

  const canDelete = (vendor) => {
    return (
      (user?.level === 'Super' && vendor.level !== 'Super') ||
      (user?.level === 'Regional' && vendor.level !== 'Super' && vendor.level !== 'Regional') ||
      (user?.level === 'City' && (vendor.level === 'Local' || vendor.level === 'DeployAssociate')) ||
      (user?.level === 'Local' && vendor.level === 'DeployAssociate')
    );
  };

  

  const handleEdit = (vendor) => {
    setSelectedVendor(vendor);
    setOpenEdit(true);
  };

  const handleDelete = (vendorId) => {
    dispatch(deleteVendor(vendorId));
  };

  const renderVendorTable = (title, vendorList) => {
    if (vendorList.length === 0) return null;

    return (
      <div className="mt-10 flex justify-center">
        <div className="w-3/4">
          <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>
          <table className="w-full border-collapse border border-gray-300 shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3">Name</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Level</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendorList.map((vendor) => (
                <tr key={vendor.id} className="border text-center">
                  <td className="p-3 border">{vendor.name}</td>
                  <td className="p-3 border">{vendor.email}</td>
                  <td className="p-3 border">{vendor.level}</td>
                  <td className="p-3 border">
                    <Button
                      className="mr-2"
                      onClick={() => handleEdit(vendor)}
                      disabled={!canEdit(vendor)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-500"
                      onClick={() => handleDelete(vendor.id)}
                      disabled={!canDelete(vendor)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-semibold mb-6 text-center">Manage Vendors</h2> */}
      <Label className="block text-center mb-8 text-gray-700">
        Welcome {user?.name}! You  have access to the sub-roles of {user?.level}.
      </Label>



{superVendors.length > 0 && (
  <div className="flex  flex-col items-center justify-center">
    <div className="w-1/3">
      <h3 className="text-xl font-semibold mb-4 text-center">Super Vendor</h3>
      <Card className="p-6 bg-white shadow-lg border rounded-lg text-center">
        {superVendors.map((vendor) => (
          <div key={vendor.id} className="mb-4">
            <h3 className="font-bold text-lg">{vendor.name}</h3>
            <p className="text-sm text-gray-500">{vendor.email}</p>
            <p className="text-sm font-semibold mt-2">Level: {vendor.level}</p>
            
            {user?.level === 'Super' ? (
              <Button className="mt-2" onClick={() => handleEdit(vendor)}>
                Edit
              </Button>
            ) : (
              <Button className="mt-2" disabled>
                No Edit Access
              </Button>
            )}
          </div>
        ))}
      </Card>
    </div>
        <div className='p-7'>
      <Button  onClick={()=>setOpenAdd(true)}>Add New Vendor</Button>

        </div>
  </div>
  
)}

      {/* Other Vendors in Separate Tables with spacing */}
      {renderVendorTable('Regional Vendors', regionalVendors)}
      {renderVendorTable('City Vendors', cityVendors)}
      {renderVendorTable('Local Vendors', localVendors)}
      {renderVendorTable('Deploy Associates', deployAssociates)}

      {openAdd && <AddVendorDialog open={openAdd} onClose={() => setOpenAdd(false)} user={user} vendors={vendors} />}

      {/* Edit Dialog */}
      {selectedVendor && (
        // <EditVendorDialog open={openEdit} onOpenChange={setOpenEdit} vendor={selectedVendor} />
        <EditVendorWithParentDialog open={openEdit} onOpenChange={setOpenEdit} vendor={selectedVendor} />

      )}
    </div>
  );
}
