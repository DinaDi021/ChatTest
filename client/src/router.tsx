import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { MainLayout } from "./layout";
import {
  ChatPage,
  ForgotPasswordPage,
  LoginPage,
  NotFoundPage,
  PersonalAccount,
  RegisterPage,
  ResetPasswordPage,
  UserInfoPage,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"me"} />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "me",
        element: <PersonalAccount />,
        children: [
          {
            path: "info",
            element: <UserInfoPage />,
          },
        ],
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
        path: "resetPassword/:email/:token",
        element: <ResetPasswordPage />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export { router };
