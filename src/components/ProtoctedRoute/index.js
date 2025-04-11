"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth?.user); // No fallback to null
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) {
      return; 
    }
    
    if (!user) {
      router.push("/sign-in");
    } else {
      setLoading(false);
    }
  }, [user, router]);


  return user ? children : null;
};

export default ProtectedRoute;

