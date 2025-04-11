import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user"); // Check if user exists in localStorage (or cookie/session)
    setIsAuthenticated(!!user);//user is object so for checking purpose we use 2 ! 
  }, []);

  return isAuthenticated;
};

export default useAuth;
