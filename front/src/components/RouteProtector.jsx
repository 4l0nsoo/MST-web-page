import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsValid(false);
      return;
    }

    fetch("http://localhost:3000/api/verify-token", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Token inválido");
        setIsValid(true);
      })
      .catch(() => {
        localStorage.removeItem("token"); // 👈 limpia si expiró
        setIsValid(false);
      });
  }, []);

  if (isValid === null) return <p>Verificando sesión...</p>;
  if (!isValid) return <Navigate to="/" replace />;
  return children;
}

export default ProtectedRoute;
