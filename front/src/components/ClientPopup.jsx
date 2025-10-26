import React from "react";
import "./styles/ClientPopup.css";

export default function ClientPopup({ client, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <h2>Detalles del Cliente</h2>
        <p><strong>Código:</strong> {client.referenceCode}</p>
        <p><strong>Estado del Equipo:</strong> {client.computerStatus}</p>
        <p><strong>Nota:</strong> {client.note}</p>
        <p><strong>Tiempo Estimado:</strong> {client.estimatedTime}</p>
      </div>
    </div>
  );
}