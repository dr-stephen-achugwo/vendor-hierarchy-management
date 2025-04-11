"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(logout()); // Clear Redux state
    router.push("/sign-in"); // Redirect to sign in
  }, [dispatch, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl font-semibold">Logging out...</p>
    </div>
  );
};

export default Logout;
