// src/components/users/StudentProfile.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../navbar-user/navbar-user";
import Footer from "../footer/footer";
import Swal from "sweetalert2";

const StudentProfile: React.FC = () => {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar las encuestas creadas por el administrador desde localStorage
    const savedSurveys = JSON.parse(localStorage.getItem("surveys") || "[]");
    setSurveys(savedSurveys);

    // Cargar el usuario actual desde localStorage
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    setCurrentUser(user);
    setEditedUser(user);
  }, []);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev: any) => ({ ...prev, [name]: value }));
  };

  const saveChanges = () => {
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = existingUsers.map((user: any) =>
      user.username === currentUser.username ? editedUser : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(editedUser));
    setCurrentUser(editedUser);
    setIsEditing(false);
    Swal.fire("Éxito", "Información actualizada correctamente", "success");
  };

  const takeSurvey = (surveyIndex: number) => {
    navigate(`/take-survey/${surveyIndex}`);
  };

  return (
    <>
      <NavbarUser />
      <div className="container">
        <h2 className="mt-4">Perfil del Estudiante</h2>
        {currentUser && (
          <div className="mb-4">
            {isEditing ? (
              <>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={editedUser.firstName}
                    onChange={handleEditChange}
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
                    name="lastName"
                    value={editedUser.lastName}
                    onChange={handleEditChange}
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
                    name="email"
                    value={editedUser.email}
                    onChange={handleEditChange}
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
                    name="faculty"
                    value={editedUser.faculty}
                    onChange={handleEditChange}
                  />
                </div>
                <button className="btn btn-primary" onClick={saveChanges}>
                  Guardar Cambios
                </button>
                <button
                  className="btn btn-secondary ms-2"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <h4>
                  Bienvenido, {currentUser.firstName} {currentUser.lastName}
                </h4>
                <p>
                  <strong>Nombre de usuario:</strong> {currentUser.username}
                </p>
                <p>
                  <strong>Correo electrónico:</strong> {currentUser.email}
                </p>
                <p>
                  <strong>Facultad:</strong> {currentUser.faculty}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Editar Información
                </button>
              </>
            )}
          </div>
        )}
        <h3>Encuestas Disponibles</h3>
        <ul className="list-group">
          {surveys.map((survey, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {survey.title}
              <button
                className="btn btn-success"
                onClick={() => takeSurvey(index)}
              >
                Realizar Encuesta
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default StudentProfile;
