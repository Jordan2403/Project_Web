import React from "react";
import Home from "../components/home/Home";

export { Home };

export const Login = React.lazy(() => import("../components/login/Login"));
export const Perfil = React.lazy(() => import("../components/users/perfil"));
export const Register = React.lazy(
  () => import("../components/register/Register")
);
export const AdminProfile = React.lazy(
  () => import("../components/users/AdminProfile")
);
export const StudentProfile = React.lazy(
  () => import("../components/users/StudentProfile")
);
export const TakeSurvey = React.lazy(
  () => import("../components/users/TakeSurvey")
);
export const AdminResponses = React.lazy(
  () => import("../components/users/AdminResponses")
);
export const StudentResponses = React.lazy(
  () => import("../components/users/StudentResponses")
);
export const SurveyResponses = React.lazy(
  () => import("../components/users/SurveyResponses")
);

