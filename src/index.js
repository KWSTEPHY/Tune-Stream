import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
 
  {
    path: "/login",
    element: <LoginPage />,
  },
  
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
