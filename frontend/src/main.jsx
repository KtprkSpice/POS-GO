import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import AdminLayout from "../src/pages/Layouts/Admin.jsx";
import "./index.css";
import App from "./App.jsx";
import DashboardSupplier from "./pages/Admin/Suppliers/DashboardSupplier.jsx";
import CreateSupplier from "./pages/Admin/Suppliers/CreateSupplier.jsx";
import EditSupplier from "./pages/Admin/Suppliers/EditSupplier.jsx";
import DashboardCashier from "./pages/Admin/Cashiers/DashboardCashier.jsx";
import CreateCashier from "./pages/Admin/Cashiers/CreateCashier.jsx";
import EditCashier from "./pages/Admin/Cashiers/EditCashier.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import SupplierLayout from "./pages/Layouts/Supplier.jsx";
import DashboardProductSupplier from "./pages/Supplier/Supply/DashboardProductSupplier.jsx";
import DetailProductSupplier from "./pages/Supplier/Supply/DetailProductSupplier.jsx";
import CreateProduct from "./pages/Supplier/Supply/CreateProduct.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<ForgotPassword />} path="/forgot-password" />
        <Route element={<AdminLayout />} path="/admin">
          {/* Suppliers */}
          <Route element={<DashboardSupplier />} path="/admin/suppliers" />
          <Route element={<CreateSupplier />} path="/admin/supplier/create" />
          <Route element={<EditSupplier />} path="/admin/supplier/edit/:id" />
          {/* Cashier */}
          <Route element={<DashboardCashier />} path="/admin/cashiers" />
          <Route element={<CreateCashier />} path="/admin/cashier/create" />
          <Route element={<EditCashier />} path="/admin/cashier/edit/:id" />
        </Route>

        {/* Supplier Layout */}
        <Route element={<SupplierLayout />}>
          <Route element={<DashboardProductSupplier />} path="/supplier/dashboard" />
          <Route element={<DetailProductSupplier />} path="/supplier/product/:id" />
          <Route element={<CreateProduct />} path="/supplier/product/create" />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
