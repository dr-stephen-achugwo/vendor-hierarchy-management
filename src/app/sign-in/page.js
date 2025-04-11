
'use client'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/redux/authSlice';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [selectedVendor, setSelectedVendor] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  // Get vendors from Redux store
  const vendors = useSelector((state) => state.vendors.vendors);

  const handleLogin = () => {
    if (selectedVendor) {
      const vendorData = JSON.parse(selectedVendor);
      dispatch(login(vendorData));
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section - Info */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-800 text-white p-10">
        <h1 className="text-3xl font-bold mb-4">Vendor Cab & Driver Onboarding</h1>
        <p className="text-lg text-gray-300 text-center">
          A comprehensive Vendor Hierarchy Management system designed for <b>MoveInSync</b> to streamline onboarding and operational efficiency.
        </p>
        <div className="mt-6 italic text-gray-400 text-center">
          <p>🚀 "Great journeys start with a single move!"</p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-1/2 flex justify-center items-center bg-white">
        <div className="w-2/3 p-6 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

          <select
            className="border p-2 w-full rounded mb-4"
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
          >
            <option value="">Select Vendor</option>
            {vendors.map((vendor) => (
              <option key={vendor.id} value={JSON.stringify(vendor)}>
                {vendor.name} - {vendor.level}
              </option>
            ))}
          </select>

          <button 
            onClick={handleLogin} 
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
