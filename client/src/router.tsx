import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { MainLayout } from "./layout";
import { LoginPage, MainPage, NotFoundPage, RegisterPage } from "./pages";

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
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      // {
      //   path: "forgotPassword",
      //   element: <ForgotPasswordPage />,
      // },
      // {
      //   path: "resetPassword",
      //   element: <ResetPasswordPage />,
      // },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export { router };
