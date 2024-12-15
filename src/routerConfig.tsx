import React from "react";
import {
  AdminProfile,
  AdminResponses,
  Home,
  Login,
  Register,
  StudentProfile,
  StudentResponses,
  SurveyResponses,
  TakeSurvey,
} from "./pages";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin-profile",
    element: <AdminProfile />,
  },
  {
    path: "/student-profile",
    element: <StudentProfile />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/take-survey/:surveyIndex",
    element: <TakeSurvey />,
  },
  {
    path: "/admin-responses",
    element: <AdminResponses />,
  },
  {
    path: "/student-responses",
    element: <StudentResponses />,
  },
  { path: "/survey-responses/:surveyIndex", element: <SurveyResponses /> },
];
