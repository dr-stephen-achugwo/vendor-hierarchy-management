

"use client";

import { useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import EditVendorDialog from "@/components/EditVendorDialog";
import MoveProfileDialog from "@/components/MoveProfileDialog";
import { useState } from "react";

const getRoleColor = (level) => {
  switch (level) {
    case "Super":
      return "bg-purple-500";
    case "Regional":
      return "bg-blue-500";
    case "City":
      return "bg-green-500";
    case "Local":
      return "bg-red-500";
    case "DeployAssociate":
      return "bg-orange-900";
    default:
      return "bg-gray-400";
  }
};

const getScaleFactor = (childrenCount) => {
  // if (childrenCount > 6) return 0.8;
  // if (childrenCount > 3) return 0.9;
  if (childrenCount > 15) return 0.85;  // Slightly smaller if too many children
  if (childrenCount > 10) return 0.9;
  if (childrenCount > 5) return 0.95;
  return 1;
};

const TreeNode = ({ vendor }) => {
  const { vendors } = useSelector((state) => state.vendors);
  const { user } = useSelector((state) => state.auth);
  const children = vendors.filter((v) => v.parentId === vendor.id);
  const scaleFactor = getScaleFactor(children.length);
  const [openEdit, setOpenEdit] = useState(false);
  const [openMove, setOpenMove] = useState(false);
  
  // Check if user has permission to edit this vendor
  const canEdit =
    user?.level === "Super" ||
    (user?.level === "Regional" && vendor.level !== "Super") ||
    (user?.level === "City" && vendor.level !== "Super" && vendor.level !== "Regional") ||
    (user?.level === "Local" && vendor.level === "DeployAssociate");

      const canMove= 
       user?.level === "Super" ||
      (user?.level === "Regional") ||
      (user?.level === "City") ;
  
  return (
    <div className="flex flex-col items-center relative">
      <div className="flex flex-col items-center relative">
        <div
          className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 flex items-center justify-center rounded-full text-white text-xs font-bold ${getRoleColor(
            vendor.level
          )}`}
        >
          {vendor.shortForm}
        </div>
        <Card
          className={`p-4 bg-white shadow-md border rounded-lg text-center min-w-[200px] ${
            vendor.level === "Super" ? "border-purple-500" : ""
          }`}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg ml-10 text-center">{vendor.name}</h3>
            {canEdit && (
              <button
                onClick={() => setOpenEdit(true)}
                className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                <Pencil size={16} />
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500">{vendor.email}</p>
          {vendor.level === "City" && canMove &&(
            <button
              className="mt-2 text-xs font-semibold px-2 py-1 rounded bg-gray-300"
              onClick={() => setOpenMove(true)}
            >
              Move Profile
            </button>
          )}
        </Card>
      </div>

      {children.length > 0 && <div className="w-1 h-6 bg-gray-400"></div>}

      {children.length > 0 && (
        <div
        // className="flex  justify-center mt-4 space-x-4 transition-all duration-300 relative"

          className="flex  justify-center mt-4 -ml-6 transition-all duration-300 relative"
          style={{ transform: `scale(${scaleFactor})` }}
        >
          {children.map((child) => (
            <TreeNode key={child.id} vendor={child} />
          ))}
        </div>
      )}

      {/* Dialogs */}
      <EditVendorDialog open={openEdit} onOpenChange={setOpenEdit} vendor={vendor} />
      <MoveProfileDialog open={openMove} onOpenChange={setOpenMove} vendor={vendor} />
    </div>
  );
};



const VendorNode = () => {
  const { vendors } = useSelector((state) => state.vendors);
  const superVendor = vendors.find((v) => v.level === "Super");
  const user=useSelector(state=>state.auth?.user || null);
  return (
    <div className="w-full ">
      {/* Left Sidebar with Search Bar, Select Tabs, and Vendor Type Tags */}
      <div className="flex justify-between mb-6">
        <div className="w-1/3 flex flex-row items-start">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            className="w-32 p-2 border rounded-md text-sm mb-4"
          />
          {/* Select Tabs for Vendor Types */}
          <div className="w-full mb-4">
            <select className="w-full p-2 border rounded-md text-sm">
              <option>Super</option>
              <option>Regional</option>
              <option>City</option>
              <option>Local</option>
              <option>DeployAssociate</option>
            </select>
          </div>
        </div>

        {/* Right Vendor Types with Small Circles */}
        <div className="w-2/3 flex justify-end space-x-6 items-center">
          {/* Vendor Type Circles */}
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
            <span className="text-xs">Admin</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-xs">Site Admin</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-xs">Group vendor</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-xs">Sub vendor</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 rounded-full bg-orange-900"></div>
            <span className="text-xs">Deployment Associate</span>
          </div>
        </div>
      </div>

      {/* Vendor Hierarchy */}
      <div className="w-full overflow-x-hidden flex flex-col items-center">
        <h1 className=" p-1 text-xl font-bold mb-4">{user?.name} - {user?.level} Dashboard</h1>
        {superVendor && <TreeNode vendor={superVendor} />}
      </div>
    </div>
  );
};

export default VendorNode;











// "use client";

// import { useSelector } from "react-redux";
// import { Card } from "@/components/ui/card";
// import { Pencil } from "lucide-react";
// import EditVendorDialog from "@/components/EditVendorDialog";
// import MoveProfileDialog from "@/components/MoveProfileDialog";
// import { useState } from "react";

// const getRoleColor = (level) => {
//   switch (level) {
//     case "Super":
//       return "bg-purple-500";
//     case "Regional":
//       return "bg-blue-500";
//     case "City":
//       return "bg-green-500";
//     case "Local":
//       return "bg-red-500";
//     case "DeployAssociate":
//       return "bg-orange-900";
//     default:
//       return "bg-gray-400";
//   }
// };

// const getScaleFactor = (childrenCount) => {
//   if (childrenCount > 15) return 0.85;
//   if (childrenCount > 10) return 0.9;
//   if (childrenCount > 5) return 0.95;
//   return 1;
// };

// const TreeNode = ({ vendor }) => {
//   const { vendors } = useSelector((state) => state.vendors);
//   const { user } = useSelector((state) => state.auth);
//   const children = vendors.filter((v) => v.parentId === vendor.id);
//   const scaleFactor = getScaleFactor(children.length);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openMove, setOpenMove] = useState(false);

//   // Only allow editing if the vendor is the logged-in user or their direct child
//   const canEdit = user && (user.id === vendor.id || vendor.parentId === user.id);

//   // Only allow moving if the vendor is the logged-in user or their direct child
//   const canMove = user && (user.id === vendor.id || vendor.parentId === user.id);

//   return (
//     <div className="flex flex-col items-center relative">
//       <div className="flex flex-col items-center relative">
//         <div
//           className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 flex items-center justify-center rounded-full text-white text-xs font-bold ${getRoleColor(
//             vendor.level
//           )}`}
//         >
//           {vendor.shortForm}
//         </div>
//         <Card
//           className={`p-4 bg-white shadow-md border rounded-lg text-center min-w-[200px] ${
//             vendor.level === "Super" ? "border-purple-500" : ""
//           }`}
//         >
//           <div className="flex justify-between items-center">
//             <h3 className="font-bold text-lg ml-10 text-center">{vendor.name}</h3>
//             {canEdit && (
//               <button
//                 onClick={() => setOpenEdit(true)}
//                 className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
//               >
//                 <Pencil size={16} />
//               </button>
//             )}
//           </div>
//           <p className="text-sm text-gray-500">{vendor.email}</p>
//           {canMove && vendor.level === "City" && (
//             <button
//               className="mt-2 text-xs font-semibold px-2 py-1 rounded bg-gray-300"
//               onClick={() => setOpenMove(true)}
//             >
//               Move Profile
//             </button>
//           )}
//         </Card>
//       </div>

//       {children.length > 0 && <div className="w-1 h-6 bg-gray-400"></div>}

//       {children.length > 0 && (
//         <div
//           className="flex justify-center mt-4 -ml-6 transition-all duration-300 relative"
//           style={{ transform: `scale(${scaleFactor})` }}
//         >
//           {children.map((child) => (
//             <TreeNode key={child.id} vendor={child} />
//           ))}
//         </div>
//       )}

//       {/* Dialogs */}
//       <EditVendorDialog open={openEdit} onOpenChange={setOpenEdit} vendor={vendor} />
//       <MoveProfileDialog open={openMove} onOpenChange={setOpenMove} vendor={vendor} />
//     </div>
//   );
// };

// const VendorNode = () => {
//   const { vendors } = useSelector((state) => state.vendors);
//   const user = useSelector((state) => state.auth?.user || null);
//   const superVendor = vendors.find((v) => v.level === "Super");

//   return (
//     <div className="w-full">
//       <div className="flex justify-between mb-6">
//         <div className="w-1/3 flex flex-row items-start">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-32 p-2 border rounded-md text-sm mb-4"
//           />
//           <div className="w-full mb-4">
//             <select className="w-full p-2 border rounded-md text-sm">
//               <option>Super</option>
//               <option>Regional</option>
//               <option>City</option>
//               <option>Local</option>
//               <option>DeployAssociate</option>
//             </select>
//           </div>
//         </div>

//         {/* Vendor Type Circles */}
//         <div className="w-2/3 flex justify-end space-x-6 items-center">
//           <div className="flex items-center space-x-1">
//             <div className="w-4 h-4 rounded-full bg-purple-500"></div>
//             <span className="text-xs">Admin</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <div className="w-4 h-4 rounded-full bg-blue-500"></div>
//             <span className="text-xs">Site Admin</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <div className="w-4 h-4 rounded-full bg-green-500"></div>
//             <span className="text-xs">Group vendor</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <div className="w-4 h-4 rounded-full bg-red-500"></div>
//             <span className="text-xs">Sub vendor</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <div className="w-4 h-4 rounded-full bg-orange-900"></div>
//             <span className="text-xs">Deployment Associate</span>
//           </div>
//         </div>
//       </div>

//       {/* Vendor Hierarchy */}
//       <div className="w-full overflow-x-hidden flex flex-col items-center">
//         <h1 className="p-1 text-xl font-bold mb-4">
//           {user?.name} - {user?.level} Vendor Dashboard
//         </h1>
//         {superVendor && <TreeNode vendor={superVendor} />}
//       </div>
//     </div>
//   );
// };

// export default VendorNode;
