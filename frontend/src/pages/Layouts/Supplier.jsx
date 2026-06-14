import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import {
    Home,
    Package,
    User,
    ArrowOutRightCircleHalf,
    Menu,
    X
} from "@boxicons/react";
import LogoPos from "../../assets/logo.jpg";

function SupplierLayout() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex relative">

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
                    onClick={closeSidebar}
                />
            )}

            <aside className={`w-64 min-h-screen fixed bg-gradient-to-b from-amber-600 to-orange-600 shadow-xl flex flex-col z-50 transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                <div className="p-8 border-b border-amber-500 relative">
                    <button
                        onClick={closeSidebar}
                        className="absolute top-4 right-4 text-white hover:text-amber-200 lg:hidden"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="flex flex-col items-center">
                        <img
                            src={LogoPos}
                            alt="Logo"
                            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                        />
                        <h2 className="mt-4 text-white font-semibold text-lg text-center truncate w-full">
                            {user?.name || "Supplier"}
                        </h2>
                        <p className="text-amber-100 text-sm">
                            Supplier Account
                        </p>
                    </div>
                </div>

                <nav className="flex-1 mt-4">
                    <ul className="space-y-2 px-3">
                        <li>
                            <Link
                                to="/supplier/dashboard"
                                onClick={closeSidebar}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/20 transition"
                            >
                                <Home />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/supplier/products"
                                onClick={closeSidebar}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/20 transition"
                            >
                                <Package />
                                <span>Produk Saya</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/supplier/profile"
                                onClick={closeSidebar}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/20 transition"
                            >
                                <User />
                                <span>Profile</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="p-4 border-t border-amber-500">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-red-500 transition"
                    >
                        <ArrowOutRightCircleHalf />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-h-screen w-full lg:ml-64 transition-all">

                <div className="bg-white shadow-sm px-6 py-5 sticky top-0 z-30 flex items-center justify-between lg:justify-start">

                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-amber-700 p-1 rounded-lg hover:bg-amber-50 lg:hidden focus:outline-none"
                    >
                        <Menu className="w-7 h-7" />
                    </button>

                    <h1 className="text-2xl font-bold text-amber-700 lg:ml-2">
                        Supplier Panel
                    </h1>

                    <div className="w-7 lg:hidden" />
                </div>

                <main className="p-4 sm:p-6 lg:p-8 flex-1">
                    <Outlet />
                </main>
            </div>

        </div>
    );
}

export default SupplierLayout;