import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import AdminLayout from "../src/pages/Layouts/Admin.jsx";
import "./index.css";
import App from "./App.jsx";
import DashboardSupplier from "./pages/Admin/DashboardSupplier.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />} path="/admin">
          <Route element={<DashboardSupplier />} path="/admin/suppliers" />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
