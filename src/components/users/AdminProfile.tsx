import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarAdmin from "../navbar-admin/navbar-admin";
import Footer from "../footer/footer";
const AdminProfile: React.FC = () => {
  const [surveyTitle, setSurveyTitle] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", type: "multipleChoice", options: ["", ""] },
  ]);
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", type: "multipleChoice", options: ["", ""] },
    ]);
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = value;
    setQuestions(updatedQuestions);
  };

  const handleQuestionTypeChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (
    index: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const validateSurvey = () => {
    if (!surveyTitle.trim()) {
      Swal.fire(
        "Error",
        "El título de la encuesta no puede estar vacío.",
        "error"
      );
      return false;
    }

    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].questionText.trim()) {
        Swal.fire(
          "Error",
          `La pregunta #${i + 1} no puede estar vacía.`,
          "error"
        );
        return false;
      }

      if (questions[i].type === "multipleChoice") {
        for (let j = 0; j < questions[i].options.length; j++) {
          if (!questions[i].options[j].trim()) {
            Swal.fire(
              "Error",
              `La opción #${j + 1} de la pregunta #${
                i + 1
              } no puede estar vacía.`,
              "error"
            );
            return false;
          }
        }
      }
    }

    return true;
  };

  const createSurvey = () => {
    if (!validateSurvey()) {
      return;
    }

    const newSurvey = { title: surveyTitle, questions };
    const surveys = JSON.parse(localStorage.getItem("surveys") || "[]");
    surveys.push(newSurvey);
    localStorage.setItem("surveys", JSON.stringify(surveys));
    Swal.fire("Éxito", "Encuesta creada exitosamente", "success").then(() => {
      setSurveyTitle("");
      setQuestions([
        { questionText: "", type: "multipleChoice", options: ["", ""] },
      ]);
      navigate("/admin-profile");
    });
  };

  return (
    <>
      <NavbarAdmin />
      <div className="container">
        <h2>Crear encuesta</h2>
        <div className="mb-3">
          <label htmlFor="surveyTitle" className="form-label">
            Título de la encuesta
          </label>
          <input
            type="text"
            className="form-control"
            id="surveyTitle"
            value={surveyTitle}
            onChange={(e) => setSurveyTitle(e.target.value)}
            placeholder="Escribe el título de la encuesta"
          />
        </div>

        {questions.map((question, index) => (
          <div key={index} className="mb-3">
            <label htmlFor={`question-${index}`} className="form-label">
              Pregunta #{index + 1}
            </label>
            <input
              type="text"
              className="form-control"
              id={`question-${index}`}
              value={question.questionText}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              placeholder="Escribe la pregunta"
            />

            <div>
              <label className="form-label">Tipo de pregunta</label>
              <select
                className="form-select"
                value={question.type}
                onChange={(e) =>
                  handleQuestionTypeChange(index, e.target.value)
                }
              >
                <option value="multipleChoice">Opción múltiple</option>
                <option value="openEnded">Escribir respuesta</option>
              </select>
            </div>

            {question.type === "multipleChoice" &&
              question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <label className="form-label">Opción {optionIndex + 1}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, optionIndex, e.target.value)
                    }
                    placeholder={`Opción #${optionIndex + 1}`}
                  />
                </div>
              ))}
            <br></br>
            <button
              className="btn btn-danger"
              onClick={() => removeQuestion(index)}
            >
              Eliminar pregunta
            </button>
          </div>
        ))}

        <button className="btn btn-secondary" onClick={addQuestion}>
          Añadir pregunta
        </button>
        <br />
        <button className="btn btn-primary mt-3" onClick={createSurvey}>
          Crear encuesta
        </button>
      </div>
      <Footer />
    </>
  );
};

export default AdminProfile;
