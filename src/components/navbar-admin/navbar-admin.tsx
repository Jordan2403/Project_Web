// src/components/NavbarAdmin.tsx
import React from "react";
import { Link } from "react-router-dom"; // Necesitamos importar Link para las rutas

const NavbarAdmin: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/admin-profile">
          Admin Panel
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/admin-profile">
                Crear encuesta
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin-responses">
                Ver respuestas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Cerrar sesión
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
