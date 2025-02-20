"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken, decodeToken } from "../backend/JwtUtils";
import AuthRequired from "../components/AuthRequired";
import NotAuthorized from "../components/NotAuthorized";

export default function AdminProtectedRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      const decoded = decodeToken(token);
      setIsAuthenticated(true);
      setIsAdmin(decoded?.role === "ADMIN");
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, []);

  if (isAdmin === null) return <p>Loading...</p>; 

  if (!isAuthenticated) return <AuthRequired />;  
  if (!isAdmin) return <NotAuthorized />; 

  return children;  
}
