// src/components/login/Register.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [faculty, setFaculty] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRegister = () => {
    if (
      !username ||
      !password ||
      !firstName ||
      !lastName ||
      !email ||
      !faculty
    ) {
      Swal.fire("Error", "Todos los campos son obligatorios.", "error");
      return;
    }

    if (username.length < 3 || username.length > 20) {
      Swal.fire(
        "Error",
        "El nombre de usuario debe tener entre 3 y 20 caracteres.",
        "error"
      );
      return;
    }

    if (password.length < 6 || password.length > 20) {
      Swal.fire(
        "Error",
        "La contraseña debe tener entre 6 y 20 caracteres.",
        "error"
      );
      return;
    }

    if (firstName.length < 2 || firstName.length > 50) {
      Swal.fire(
        "Error",
        "El nombre debe tener entre 2 y 50 caracteres.",
        "error"
      );
      return;
    }

    if (lastName.length < 2 || lastName.length > 50) {
      Swal.fire(
        "Error",
        "El apellido debe tener entre 2 y 50 caracteres.",
        "error"
      );
      return;
    }

    if (!validateEmail(email)) {
      Swal.fire("Error", "El correo electrónico no es válido.", "error");
      return;
    }

    const newUser = {
      username,
      password,
      firstName,
      lastName,
      email,
      faculty,
      role: "student", // Asignar siempre el rol de "student"
    };

    // Obtener los usuarios actuales desde localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // Verificar si el usuario ya existe
    if (existingUsers.find((user: any) => user.username === username)) {
      Swal.fire("Error", "El nombre de usuario ya existe.", "error");
    } else {
      // Agregar el nuevo usuario al array
      existingUsers.push(newUser);

      // Guardar nuevamente en localStorage
      localStorage.setItem("users", JSON.stringify(existingUsers));
      Swal.fire("Éxito", "Registro exitoso", "success").then(() => {
        navigate("/login");
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="mt-4 text-center">Registro</h2>
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
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ingresa tu nombre"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ingresa tu apellido"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="faculty" className="form-label">
                Facultad
              </label>
              <input
                type="text"
                className="form-control"
                id="faculty"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                placeholder="Ingresa tu facultad"
              />
            </div>
            <button className="btn btn-primary w-100" onClick={handleRegister}>
              Registrar
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
