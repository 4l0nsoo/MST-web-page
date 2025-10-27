import React, { useState } from "react";
import "./styles/EditPc.css";
import { Link } from "react-router-dom";

function EditPc() {
  const [refCode, setRefCode] = useState("");
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

  // 🔎 Buscar cliente por código
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setClientData(null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/client/${refCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Código no encontrado");
      } else {
        setClientData(data);
      }
    } catch {
      setMessage("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  // 💾 Guardar cambios del estado del equipo
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/update-client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ref: refCode,
          computerStatus: clientData.computerStatus,
          note: clientData.note,
          estimatedTime: clientData.estimatedTime,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Error al actualizar");
      } else {
        setMessage("✅ Datos actualizados correctamente");
      }
    } catch {
      setMessage("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editpc-container">
      <h2>Panel del Técnico</h2>
      <Link to={"/"}><button>Home</button></Link>
      {/* 🔍 Buscar cliente */}
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Código de referencia (ej: REF-12345)"
          value={refCode}
          onChange={(e) => setRefCode(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}

      {/* ✏️ Formulario de edición */}
      {clientData && (
        <form className="edit-form" onSubmit={handleUpdate}>
          <label>Estado del equipo:</label>
          <input
            type="text"
            value={clientData.computerStatus}
            onChange={(e) =>
              setClientData({ ...clientData, computerStatus: e.target.value })
            }
          />

          <label>Nota:</label>
          <textarea
            rows="3"
            value={clientData.note}
            onChange={(e) =>
              setClientData({ ...clientData, note: e.target.value })
            }
          />

          <label>Tiempo estimado:</label>
          <input
            type="text"
            value={clientData.estimatedTime}
            onChange={(e) =>
              setClientData({ ...clientData, estimatedTime: e.target.value })
            }
          />

          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      )}
    </div>
  );
}

export default EditPc;
