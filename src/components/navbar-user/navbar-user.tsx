// src/components/navbar-user/NavbarUser.tsx
import React from "react";
import { Link } from "react-router-dom"; // Necesitamos importar Link para las rutas

const NavbarUser: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/student-profile">
          Panel de Usuario
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
              <Link className="nav-link" to="/student-profile">
                Perfil del Estudiante
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/student-responses">
                Respuestas del Estudiante
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

export default NavbarUser;
