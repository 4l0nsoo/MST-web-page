import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Services from "./components/Services.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Products from "./components/Products.jsx";
import Login from "./components/Login.jsx";
import EditPc from "./components/EditPc.jsx";
import ProtectedRoute from "./components/RouteProtector.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/services", element: <Services /> },
  { path: "/aboutus", element: <AboutUs /> },
  { path: "/products", element: <Products /> },
  { path: "/login", element: <Login /> },

  // 🔒 Ruta protegida
  {
    path: "/edit-pc",
    element: (
      <ProtectedRoute>
        <EditPc />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);