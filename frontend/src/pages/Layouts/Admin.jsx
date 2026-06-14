import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import {
  Community,
  Business,
  Home,
  UserIdCard,
  ArrowOutRightCircleHalf,
  Menu,
  X
} from "@boxicons/react";

function AdminLayout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex relative">

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={closeSidebar}
        />
      )}

      <aside className={`w-64 min-h-screen fixed bg-gray-800 shadow-2xl flex flex-col z-50 transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="relative overflow-hidden flex items-center flex-col justify-center p-8 border-b border-gray-700">
          <div className="absolute inset-0 bg-center bg-cover blur-xs scale-110 bg-[url(https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]"></div>
          <div className="absolute inset-0 bg-gray-900/40 z-0"></div>
          <button
            onClick={closeSidebar}
            className="absolute top-4 right-4 text-white hover:text-gray-300 lg:hidden z-20"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative z-10 flex flex-col items-center">
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt="Admin Avatar"
              className="w-16 h-16 rounded-full mb-3 border-2 border-white shadow-md"
            />
            <h2 className="text-white font-semibold text-lg capitalize">{user?.name || "lele"}</h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto mt-2">
          <ul className="space-y-1">
            <li>
              <Link
                to="/admin/dashboard"
                onClick={closeSidebar}
                className="px-6 py-4 text-gray-300 hover:text-white hover:bg-gray-700/50 flex gap-3 items-center transition border-b border-gray-700/40"
              >
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/suppliers"
                onClick={closeSidebar}
                className="px-6 py-4 text-gray-300 hover:text-white hover:bg-gray-700/50 flex gap-3 items-center transition border-b border-gray-700/40"
              >
                <Community className="w-5 h-5" />
                <span>Data Supplier</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/divisions"
                onClick={closeSidebar}
                className="px-6 py-4 text-gray-300 hover:text-white hover:bg-gray-700/50 flex gap-3 items-center transition border-b border-gray-700/40"
              >
                <Business className="w-5 h-5" />
                <span>Divisions</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/cashiers"
                onClick={closeSidebar}
                className="px-6 py-4 text-gray-300 hover:text-white hover:bg-gray-700/50 flex gap-3 items-center transition border-b border-gray-700/40"
              >
                <UserIdCard className="w-5 h-5" />
                <span>Data Cashier</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="border-t border-gray-700 bg-gray-900/20">
          <button
            onClick={handleLogout}
            className="w-full px-6 py-5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 flex items-center gap-4 transition text-left"
          >
            <ArrowOutRightCircleHalf className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen w-full lg:ml-64 transition-all">

        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-30 flex items-center lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-800 ml-4">
            Admin Panel
          </h1>
        </div>

        <section className="flex-1 p-4 sm:p-6 lg:p-10 flex justify-center">
          <div className="w-full max-w-6xl">
            <Outlet />
          </div>
        </section>
      </div>

    </div>
  );
}

export default AdminLayout;