// src/components/users/StudentResponses.tsx
import React, { useState, useEffect } from "react";
import NavbarUser from "../navbar-user/navbar-user";
import Footer from "../footer/footer";
import Swal from "sweetalert2";

const StudentResponses: React.FC = () => {
  const [completedSurveys, setCompletedSurveys] = useState<any[]>([]);

  useEffect(() => {
    // Cargar las respuestas completadas del estudiante desde localStorage
    const savedResponses = JSON.parse(
      localStorage.getItem("completedSurveys") || "[]"
    );
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

    // Filtrar las respuestas solo para el estudiante actual
    const studentResponses = savedResponses.filter(
      (response: any) => response.username === currentUser.username
    );
    setCompletedSurveys(studentResponses);
  }, []);

  const deleteResponse = (surveyIndex: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, bórralo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedSurveys = completedSurveys.filter(
          (_, index) => index !== surveyIndex
        );
        setCompletedSurveys(updatedSurveys);
        localStorage.setItem(
          "completedSurveys",
          JSON.stringify(updatedSurveys)
        );
        Swal.fire("Borrado", "La respuesta ha sido borrada.", "success");
      }
    });
  };

  return (
    <>
      <NavbarUser />
      <div className="container">
        <h2 className="mt-4">Tus encuestas</h2>
        {completedSurveys.length === 0 ? (
          <p>No has completado ninguna encuesta</p>
        ) : (
          completedSurveys.map((survey: any, index: number) => (
            <div key={index} className="mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <h4>{survey.surveyTitle}</h4>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteResponse(index)}
                >
                  Borrar Respuesta
                </button>
              </div>
              <ul className="list-group">
                {survey.answers.map((answer: any, answerIndex: number) => (
                  <li key={answerIndex} className="list-group-item">
                    <strong>Respuesta {answerIndex + 1}: </strong> {answer}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Footer />
    </>
  );
};

export default StudentResponses;
