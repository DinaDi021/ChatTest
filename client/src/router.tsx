import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { MainLayout } from "./layout";
import {
  ActivateEmailPage,
  ForgotPasswordPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  RegisterPage,
  ResetPasswordPage,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"main"} />,
      },
      {
        path: "main",
        element: <MainPage />,
      },
      {
        path: "activate/:actionToken",
        element: <ActivateEmailPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgotPassword",
        element: <ForgotPasswordPage />,
      },
      {
        path: "resetPassword",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export { router };
