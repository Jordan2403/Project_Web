// src/components/users/TakeSurvey.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarUser from "../navbar-user/navbar-user";
import Footer from "../footer/footer";

const TakeSurvey: React.FC = () => {
  const [survey, setSurvey] = useState<any | null>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const { surveyIndex } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const savedSurveys = JSON.parse(localStorage.getItem("surveys") || "[]");
    const selectedSurvey = savedSurveys[parseInt(surveyIndex || "0")];
    setSurvey(selectedSurvey);
    setAnswers(new Array(selectedSurvey?.questions.length).fill(""));
  }, [surveyIndex]);

  const handleAnswerChange = (questionIndex: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = value;
    setAnswers(updatedAnswers);
  };

  const submitSurvey = () => {
    // Validar que todas las preguntas tengan una respuesta
    for (let i = 0; i < answers.length; i++) {
      if (!answers[i]) {
        Swal.fire("Error", `Por favor responde la pregunta ${i + 1}.`, "error");
        return;
      }
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

    // Guardar las respuestas junto con el nombre del estudiante
    const completedSurveys = JSON.parse(
      localStorage.getItem("completedSurveys") || "[]"
    );
    completedSurveys.push({
      surveyTitle: survey.title,
      answers,
      username: currentUser.username,
    });
    localStorage.setItem("completedSurveys", JSON.stringify(completedSurveys));

    Swal.fire("Éxito", "Encuesta enviada exitosamente", "success").then(() => {
      navigate("/student-profile");
    });
  };

  if (!survey) return <div>Loading...</div>;

  return (
    <>
      <NavbarUser />
      <div className="container">
        <h2 className="mt-4">{survey.title}</h2>
        {survey.questions.map((question: any, index: number) => (
          <div key={index} className="mb-4">
            <p>{question.questionText}</p>

            {/* Pregunta de selección múltiple */}
            {question.type === "multipleChoice" &&
              question.options.map((option: string, optionIndex: number) => (
                <div key={optionIndex} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                  />
                  <label className="form-check-label">{option}</label>
                </div>
              ))}

            {/* Pregunta de respuesta abierta */}
            {question.type === "openEnded" && (
              <div>
                <textarea
                  className="form-control"
                  value={answers[index]}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder="Escribe tu respuesta aquí"
                  rows={4}
                />
              </div>
            )}
          </div>
        ))}
        <button className="btn btn-primary mt-3" onClick={submitSurvey}>
          Enviar
        </button>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </>
  );
};

export default TakeSurvey;
