import React, { useState, useEffect } from "react";
import "./styles/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkingToken, setCheckingToken] = useState(true); // 👈 renombrado para más claridad
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔍 Verifica si ya hay sesión activa
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCheckingToken(false);
      return;
    }

    fetch("http://localhost:3000/api/verify-token", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Token inválido");
        navigate("/edit-pc"); // 🔁 Redirige si ya hay sesión activa
      })
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => setCheckingToken(false)); // ✅ asegura que termine el estado
  }, [navigate]);

  // 🕐 Mientras verifica el token, no mostrar el formulario aún
  if (checkingToken) return <p>Verificando sesión...</p>;

  // 🧠 Enviar datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/login-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al iniciar sesión");
      } else {
        localStorage.setItem("token", data.token);
        alert("Inicio de sesión exitoso ✅");
        navigate("/edit-pc");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar sesión (Admin)</h2>

        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          placeholder="admin@tecnostore.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

export default Login;
