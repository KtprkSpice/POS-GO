import { Link, Outlet, useNavigate } from "react-router";
import {
    Home,
    Package,
    User,
    ArrowOutRightCircleHalf,
} from "@boxicons/react";
import LogoPos from "../../assets/logo.jpg";

function SupplierLayout() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <>
            {/* Sidebar */}
            <aside className="w-64 min-h-screen fixed bg-gradient-to-b from-amber-600 to-orange-600 shadow-xl flex flex-col">

                {/* Profile */}
                <div className="p-8 border-b border-amber-500">

                    <div className="flex flex-col items-center">

                        <img
                            src={LogoPos}
                            alt="Logo"
                            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                        />

                        <h2 className="mt-4 text-white font-semibold text-lg">
                            {user?.name || "Supplier"}
                        </h2>

                        <p className="text-amber-100 text-sm">
                            Supplier Account
                        </p>

                    </div>

                </div>

                {/* Menu */}
                <nav className="flex-1 mt-4">

                    <ul className="space-y-2 px-3">

                        <li>
                            <Link
                                to="/supplier/dashboard"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/20 transition"
                            >
                                <Home />
                                <span>Dashboard</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/supplier/products"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/20 transition"
                            >
                                <Package />
                                <span>Produk Saya</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/supplier/profile"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/20 transition"
                            >
                                <User />
                                <span>Profile</span>
                            </Link>
                        </li>

                    </ul>

                </nav>

                {/* Logout */}
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

            {/* Content */}
            <section className="ml-64 min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">

                {/* Top Header */}
                <div className="bg-white shadow-sm px-8 py-5 sticky top-0 z-10">

                    <h1 className="text-2xl font-bold text-amber-700">
                        Supplier Panel
                    </h1>

                </div>

                {/* Main Content */}
                <div className="p-8">
                    <Outlet />
                </div>

            </section>
        </>
    );
}

export default SupplierLayout;