// src/components/users/SurveyResponses.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import NavbarAdmin from "../navbar-admin/navbar-admin";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface SurveyResponse {
  surveyTitle: string;
  answers: string[]; // Array of answers
  username: string;
}

interface Survey {
  title: string;
  questions: {
    questionText: string;
    type: string;
    options: string[];
    questionIndex: number; // Ensure each question has a unique index
  }[];
}

const SurveyResponses: React.FC = () => {
  const { surveyIndex } = useParams();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [answers, setAnswers] = useState<SurveyResponse[]>([]);

  useEffect(() => {
    const savedSurveys = JSON.parse(localStorage.getItem("surveys") || "[]");
    const selectedSurvey = savedSurveys[parseInt(surveyIndex || "0")];
    setSurvey(selectedSurvey);

    // Obtener las respuestas para la encuesta seleccionada
    const savedResponses = JSON.parse(
      localStorage.getItem("completedSurveys") || "[]"
    );
    const surveyResponses = savedResponses.filter(
      (response: SurveyResponse) =>
        response.surveyTitle === selectedSurvey.title
    );
    setAnswers(surveyResponses);

    console.log("Selected Survey:", selectedSurvey);
    console.log("Survey Responses:", surveyResponses);
  }, [surveyIndex]);

  const generateBarChartData = () => {
    const labels = survey?.questions.map((q) => q.questionText) || [];
    console.log("Bar Chart Labels:", labels);

    const data =
      survey?.questions.map((q) => {
        // Asegurémonos de que cada pregunta tenga un `questionIndex` válido
        if (q.questionIndex === undefined) {
          console.error(
            `Question does not have a valid index: ${q.questionText}`
          );
          q.questionIndex = 0; // Asignar un índice predeterminado si no está presente
        }

        // Mapa para contar respuestas por opción
        const answerCountMap: { [key: string]: number } = {};
        q.options.forEach((option) => {
          answerCountMap[option] = 0;
        });

        // Depuración adicional para verificar las respuestas
        console.log("Survey Responses to map answers:", answers);

        // Contamos las respuestas para cada opción
        answers.forEach((response: SurveyResponse) => {
          // Verificar que la respuesta esté alineada con el índice de la pregunta
          console.log(`Checking answer for question: ${q.questionText}`);
          const answer = response.answers[q.questionIndex];
          console.log(`Answer for Question ${q.questionIndex}: ${answer}`);

          // Asegurarnos de que las respuestas no estén vacías
          if (answer && answer !== "") {
            if (answerCountMap[answer] !== undefined) {
              answerCountMap[answer] += 1;
            }
          }
        });

        console.log(
          "Answer Count Map for Question:",
          q.questionText,
          answerCountMap
        );

        // Devuelve las cantidades de cada opción
        return q.options.map((option) => answerCountMap[option] || 0); // Default to 0 if not found
      }) || [];

    console.log("Generated Bar Chart Data:", data);

    return {
      labels,
      datasets: data.map((answerCounts: number[], index: number) => ({
        label: `Question ${index + 1}`,
        data: answerCounts,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      })),
    };
  };

  const generatePieChartData = () => {
    const data =
      survey?.questions.map((q) => {
        // Asegurémonos de que cada pregunta tenga un `questionIndex` válido
        if (q.questionIndex === undefined) {
          console.error(
            `Question does not have a valid index: ${q.questionText}`
          );
          q.questionIndex = 0; // Asignar un índice predeterminado si no está presente
        }

        // Mapa para contar respuestas por opción
        const answerCountMap: { [key: string]: number } = {};
        q.options.forEach((option) => {
          answerCountMap[option] = 0;
        });

        // Depuración adicional para verificar las respuestas
        console.log("Survey Responses to map answers:", answers);

        // Contamos las respuestas para cada opción
        answers.forEach((response: SurveyResponse) => {
          console.log(
            `Checking answer for Pie Chart Question: ${q.questionText}`
          );
          const answer = response.answers[q.questionIndex];
          console.log(
            `Answer for Pie Chart Question ${q.questionIndex}: ${answer}`
          );

          // Asegurarnos de que las respuestas no estén vacías
          if (answer && answer !== "") {
            if (answerCountMap[answer] !== undefined) {
              answerCountMap[answer] += 1;
            }
          }
        });

        console.log(
          "Answer Count Map for Pie Chart Question:",
          q.questionText,
          answerCountMap
        );

        // Devuelve las cantidades de cada opción
        return q.options.map((option) => answerCountMap[option] || 0); // Default to 0 if not found
      }) || [];

    console.log("Generated Pie Chart Data:", data);

    return data.map((answerCounts: number[]) => ({
      labels: survey?.questions[0].options || [],
      datasets: [
        {
          data: answerCounts,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    }));
  };

  const generatePDF = () => {
    const input = document.getElementById("pdf-content");
    if (!input) {
      console.error("Element with id 'pdf-content' not found");
      return;
    }
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("survey_responses.pdf");
    });
  };

  if (!survey) return <div>Loading...</div>;

  return (
    <>
      <NavbarAdmin />
      <div className="container">
        <button onClick={generatePDF} className="btn btn-primary mb-4">
          Imprimir en PDF
        </button>
        <div id="pdf-content">
          <div className="mt-4">
            <h4>Tabla de respuestas</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Usuario</th>
                  {survey.questions.map((q, index) => (
                    <th key={index}>{q.questionText}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {answers.map((response, index) => (
                  <tr key={index}>
                    <td>{response.username}</td>
                    {response.answers.map((answer, i) => (
                      <td key={i}>{answer}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bar-chart-container">
            <h2 className="mt-4">Respuesta de la encuesta "{survey.title}"</h2>
            <h4>Gráfico de barras: respuestas por preguntas</h4>
            <Bar data={generateBarChartData()} options={{ responsive: true }} />
          </div>
          <div className="pie-chart-container">
            <h4 className="mt-4">
              Gráfico de pasteles: Respuestas por opciones elegidas
            </h4>
            {generatePieChartData().map((chartData: any, index: number) => (
              <div key={index} className="mb-4">
                <h5>Opciones {index + 1}</h5>
                <Pie data={chartData} options={{ responsive: true }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyResponses;
