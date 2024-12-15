// src/components/users/AdminResponses.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../navbar-admin/navbar-admin";

const AdminResponses: React.FC = () => {
  const [surveys, setSurveys] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar las encuestas creadas desde localStorage
    const savedSurveys = JSON.parse(localStorage.getItem("surveys") || "[]");
    setSurveys(savedSurveys);
  }, []);

  const handleSurveySelect = (surveyIndex: number) => {
    // No necesitamos la variable `selected`
    navigate(`/survey-responses/${surveyIndex}`); // Navegar a la página de respuestas con el título seleccionado
  };

  return (
    <>
      <NavbarAdmin />
      <div className="container">
        <h2 className="mt-4">
          Selecciona la encuesta para visualizar respuestas
        </h2>
        <ul className="list-group">
          {surveys.map((survey, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {survey.title}
              <button
                className="btn btn-primary"
                onClick={() => handleSurveySelect(index)}
              >
                Ver respuestas
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdminResponses;
