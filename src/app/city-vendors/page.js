// 'use client';

// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addVendor, editVendor, deleteVendor } from "@/redux/vendorSlice";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// export default function CityVendorsPage() {
//   const dispatch = useDispatch();
//   const vendors = useSelector((state) => state.vendors.vendors.filter((v) => v.level === "City"));

//   const [open, setOpen] = useState(false);
//   const [editingVendor, setEditingVendor] = useState(null);
//   const [vendorData, setVendorData] = useState({ name: "", email: "", shortForm: "" });

//   const handleSave = () => {
//     if (editingVendor) {
//       dispatch(editVendor({ id: editingVendor.id, ...vendorData }));
//     } else {
//       dispatch(addVendor({ ...vendorData, level: "City", parentId: 2 })); // Default parent (change as needed)
//     }
//     setOpen(false);
//     setVendorData({ name: "", email: "", shortForm: "" });
//     setEditingVendor(null);
//   };

//   const handleDelete = (id) => {
//     if (confirm("Are you sure you want to delete this vendor?")) {
//       dispatch(deleteVendor(id));
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">City Vendors</h1>
//       <Button onClick={() => setOpen(true)}>Add City Vendor</Button>
      
//       <table className="w-full mt-4 border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Short Form</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {vendors.map((vendor) => (
//             <tr key={vendor.id} className="border">
//               <td className="border p-2">{vendor.name}</td>
//               <td className="border p-2">{vendor.email}</td>
//               <td className="border p-2">{vendor.shortForm}</td>
//               <td className="border p-2 flex gap-2">
//                 <Button onClick={() => { setEditingVendor(vendor); setVendorData(vendor); setOpen(true); }}>Edit</Button>
//                 <Button className="bg-red-500" onClick={() => handleDelete(vendor.id)}>Delete</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
      
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{editingVendor ? "Edit Vendor" : "Add Vendor"}</DialogTitle>
//           </DialogHeader>
//           <Input
//             value={vendorData.name}
//             onChange={(e) => setVendorData({ ...vendorData, name: e.target.value })}
//             placeholder="Name"
//             className="mb-2"
//           />
//           <Input
//             value={vendorData.email}
//             onChange={(e) => setVendorData({ ...vendorData, email: e.target.value })}
//             placeholder="Email"
//             className="mb-2"
//           />
//           <Input
//             value={vendorData.shortForm}
//             onChange={(e) => setVendorData({ ...vendorData, shortForm: e.target.value })}
//             placeholder="Short Form"
//             className="mb-2"
//           />
//           <Button onClick={handleSave}>{editingVendor ? "Save Changes" : "Add Vendor"}</Button>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVendor, editVendor } from "@/redux/vendorSlice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
export default function CityVendorsPage() {
  const dispatch = useDispatch();
  const vendors = useSelector((state) => state.vendors.vendors);
  const cityVendors = vendors.filter((v) => v.level === "City");
  const regionalVendors = vendors.filter((v) => v.level === "Regional");

  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [vendorData, setVendorData] = useState({ name: "", email: "", shortForm: "", parentId: "" });

  const handleSave = () => {
    if (editData) {
      dispatch(editVendor({ id: editData.id, ...vendorData }));
    } else {
      dispatch(addVendor({ ...vendorData, level: "City" }));
    }
    setOpenDialog(false);
    setVendorData({ name: "", email: "", shortForm: "", parentId: "" });
    setEditData(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">City Vendors</h1>
      <Button className="mt-4" onClick={() => setOpenDialog(true)}>
        Add City Vendor
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {cityVendors.map((vendor) => (
          <Card key={vendor.id} className="p-4">
            <h2 className="text-lg font-bold">{vendor.name}</h2>
            <p className="text-sm text-gray-500">{vendor.email}</p>
            <p className="text-sm font-semibold">Parent: {vendors.find((v) => v.id === vendor.parentId)?.name || "-"}</p>
            <Button
              className="mt-2"
              onClick={() => {
                setEditData(vendor);
                setVendorData(vendor);
                setOpenDialog(true);
              }}
            >
              Edit
            </Button>
          </Card>
        ))}
      </div>
      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>{editData ? "Edit Vendor" : "Add City Vendor"}</DialogHeader>
          <input
            className="border p-2 w-full"
            type="text"
            placeholder="Name"
            value={vendorData.name}
            onChange={(e) => setVendorData({ ...vendorData, name: e.target.value })}
          />
          <input
            className="border p-2 w-full mt-2"
            type="email"
            placeholder="Email"
            value={vendorData.email}
            onChange={(e) => setVendorData({ ...vendorData, email: e.target.value })}
          />
          <input
            className="border p-2 w-full mt-2"
            type="text"
            placeholder="Short Form"
            value={vendorData.shortForm}
            onChange={(e) => setVendorData({ ...vendorData, shortForm: e.target.value })}
          />
          {/* Dropdown for selecting Regional Vendor */}
          <select
            className="border p-2 w-full mt-2"
            value={vendorData.parentId}
            onChange={(e) => setVendorData({ ...vendorData, parentId: parseInt(e.target.value) })}
          >
            <option value="" disabled>
              Select Regional Vendor
            </option>
            {regionalVendors.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.name}
              </option>
            ))}
          </select>
          <Button className="mt-4" onClick={handleSave}>
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
