// 'use client';

// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col items-center p-8 sm:p-20 bg-gray-100">
//       {/* Header */}
//       <header className="text-center mb-10">
//         <Image src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
//         <h1 className="text-3xl font-semibold text-gray-800 mt-4">Fleet & Driver Management System</h1>
//         <p className="text-gray-600 mt-2">A role-based vendor management system built with Next.js & Redux.</p>
//       </header>

//       {/* Features Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
//         {/* Super Vendor */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800">🚀 Super Vendor</h2>
//           <p className="text-gray-600 mt-2">Manages the entire fleet and assigns vehicles to <b>Regional Vendors</b>.</p>
//           <ul className="list-disc pl-5 mt-2 text-gray-600">
//             <li>Assigns vehicles to Regional Vendors</li>
//             <li>Oversees fleet distribution</li>
//           </ul>
//         </div>

//         {/* Regional Vendor */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800">🏢 Regional Vendor</h2>
//           <p className="text-gray-600 mt-2">Receives vehicles from the Super Vendor and distributes them to <b>City Vendors</b>.</p>
//           <ul className="list-disc pl-5 mt-2 text-gray-600">
//             <li>Manages assigned fleet</li>
//             <li>Assigns vehicles to City Vendors</li>
//           </ul>
//         </div>

//         {/* City Vendor */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800">🏙️ City Vendor</h2>
//           <p className="text-gray-600 mt-2">Manages vehicle-to-driver assignments for smooth operations.</p>
//           <ul className="list-disc pl-5 mt-2 text-gray-600">
//             <li>Assigns vehicles to drivers</li>
//             <li>Manages compliance for driver documents</li>
//           </ul>
//         </div>

//         {/* Deploy Associate */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800">👨‍💼 Deploy Associate</h2>
//           <p className="text-gray-600 mt-2">Receives an assigned vehicle and completes deployment tasks.</p>
//           <ul className="list-disc pl-5 mt-2 text-gray-600">
//             <li>Views assigned vehicle</li>
//             <li>Completes assigned tasks</li>
//           </ul>
//         </div>

//         {/* Local Vendor */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800">📌 Local Vendor</h2>
//           <p className="text-gray-600 mt-2">Manages job assignments for drivers (Deploy Associates).</p>
//           <ul className="list-disc pl-5 mt-2 text-gray-600">
//             <li>Assigns jobs to drivers</li>
//             <li>Monitors deployment tasks</li>
//           </ul>
//         </div>

//         {/* Sub Vendor */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800">🛠️ Sub Vendor</h2>
//           <p className="text-gray-600 mt-2">Handles fleet & driver onboarding, document uploads, and assignments.</p>
//           <ul className="list-disc pl-5 mt-2 text-gray-600">
//             <li>Onboards vehicles & drivers</li>
//             <li>Uploads essential driver documents</li>
//           </ul>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="mt-12 text-center text-gray-600">
//         <p>© 2025 Fleet Management System. Built with ❤️ using Next.js & Redux.</p>
//       </footer>
//     </div>
//   );
// }


'use client';

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-8 sm:p-20 bg-gray-100">
      {/* Header */}
      <header className="text-center mb-10">
        <Image src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
        <h1 className="text-3xl font-semibold text-gray-800 mt-4">Vendor Hierarchy  Management System</h1>
        <p className="text-gray-600 mt-2">A role-based vendor management system built with Next.js, Shadcn,Tailwind & Redux.</p>
      </header>

      {/* Features Section with Proper Grid Alignment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Super Vendor */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">🚀 Super Vendor</h2>
          <p className="text-gray-600 mt-2">Manages the entire fleet, assigns vehicles to <b>Regional Vendors</b>, and controls vendor roles.</p>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>Assigns vehicles to Regional Vendors</li>
            <li>Manages vendor roles & permissions</li>
            <li>Oversees fleet distribution</li>
          </ul>
        </div>

        {/* Regional Vendor */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">🏢 Regional Vendor</h2>
          <p className="text-gray-600 mt-2">Receives vehicles from the Super Vendor and distributes them to <b>City Vendors</b>.</p>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>Manages assigned fleet</li>
            <li>Assigns vehicles to City Vendors</li>
          </ul>
        </div>

        {/* City Vendor */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">🏙️ City Vendor</h2>
          <p className="text-gray-600 mt-2">Manages vehicle-to-driver assignments for smooth operations.</p>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>Assigns vehicles to drivers</li>
            <li>Manages compliance for driver documents</li>
          </ul>
        </div>

        {/* Local Vendor */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">📌 Local Vendor</h2>
          <p className="text-gray-600 mt-2">Manages job assignments for drivers (Deploy Associates).</p>
          <ul className="list-disc pl-5 mt-2 text-gray-600">
            <li>Assigns jobs to drivers</li>
            <li>Monitors deployment tasks</li>
          </ul>
        </div>

        {/* Deploy Associate (Centered using flex) */}
        <div className="bg-white p-6 rounded-lg shadow-md sm:col-span-2 lg:col-span-1 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800">👨‍💼 Deploy Associate</h2>
          <p className="text-gray-600 mt-2 text-center">Receives an assigned vehicle and completes deployment tasks.</p>
          <ul className="list-disc pl-5 mt-2 text-gray-600 text-left">
            <li>Views assigned vehicle</li>
            <li>Completes assigned tasks</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-600">
        <p>© 2025 Fleet Management System. Ajay Bhaskar</p>
      </footer>
    </div>
  );
}
