


'use client'
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const rolePermissions = useSelector((state) => state.permissions.rolePermissions);
      // console.log("In navbar: ",user.level);
  const canAccess = (permission) => user && rolePermissions[user.level]?.includes(permission);

  return (
    <nav className="p-4 bg-gray-800 text-white flex">
      <Link href="/" className="px-4">Home</Link>

      {user && (
        <>
          <Link href="/dashboard" className="px-4">Dashboard</Link>
          {canAccess("Manage Vendors") && <Link href="/vendors" className="px-4">Manage Vendors</Link>}
          {canAccess("View Fleet Status") && <Link href="/fleet-status" className="px-4">View Fleet</Link>}
          {canAccess("Manage City Vendors") && <Link href="/city-vendors" className="px-4">Manage City Vendors</Link>}
          {/* {user.role === "Super Vendor" && <Link href="/super-vendor-settings" className="px-4">Manage Roles</Link>} */}
          {canAccess("Manage Roles") && <Link href="/super-vendor-settings" className="px-4">Manage Roles</Link>}
          {canAccess("Manage Regional Fleet") && <Link href="/regional-fleet" className="px-4">Regional Fleet Management </Link>}

          
          {canAccess("Onboard Drivers") && <Link href="/onboard-drivers" className="px-4">Onboard  Drivers</Link>}  
          {/* {canAccess("Manage Fleet") && <Link href="/manage-fleet" className="px-4">Manage Fleet</Link>} */}
          {canAccess("View Tasks") && <Link href="/view-tasks" className="px-4">View Tasks</Link>}
          {/* {canAccess("Deploy Tasks") && <Link href="/manage-fleet" className="px-4"> Deployed Tasks</Link>} */}



        </>
      )}

      <div className="ml-auto">
        {!user ? (
          <Link href="/sign-in" className="px-4">Login</Link>
        ) : (
          <Link href="/logout" className="px-4">Logout</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
