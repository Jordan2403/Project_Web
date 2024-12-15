// src/components/login/Login.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Crear usuario administrador si no existe
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const adminUser = existingUsers.find(
      (user: any) => user.username === "fernan@admin"
    );

    if (!adminUser) {
      const newAdminUser = {
        username: "fernan@admin",
        password: "123456",
        firstName: "Fernan",
        lastName: "Admin",
        email: "fernan@admin.com",
        faculty: "Administración",
        role: "admin",
      };
      existingUsers.push(newAdminUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
    }
  }, []);

  const handleSubmit = () => {
    // Obtener los usuarios desde localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // Buscar el usuario por el username
    const user = existingUsers.find((user: any) => user.username === username);

    if (user) {
      if (user.password === password) {
        // Almacenar al usuario que ha iniciado sesión
        localStorage.setItem("currentUser", JSON.stringify(user));
        navigate(user.role === "admin" ? "/admin-profile" : "/student-profile");
      } else {
        Swal.fire("Error", "Contraseña incorrecta", "error");
      }
    } else {
      Swal.fire("Error", "Usuario no encontrado", "error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="mt-4 text-center">Iniciar sesión</h2>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Nombre de usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu nombre de usuario"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
              />
            </div>
            <button className="btn btn-primary w-100" onClick={handleSubmit}>
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
