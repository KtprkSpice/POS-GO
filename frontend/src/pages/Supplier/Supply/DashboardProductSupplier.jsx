import { useEffect, useState } from "react";
import {
    Search,
    Package,
    CheckCircle,
    Timer
} from "@boxicons/react";
import { useNavigate } from "react-router";

function DashboardProductSupplier() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:8080/supplier/products", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Gagal memuat data");
                }
                return res.json();
            })
            .then((data) => {
                setProducts(Array.isArray(data) ? data : []);
            })
            .catch((err) => {
                console.error(err);
                setProducts([]);
            });
    }, []);

    const filteredProducts = products.filter((item) =>
        item.product_name?.toLowerCase().includes(search.toLowerCase())
    );

    const activeProducts = products.filter(
        (item) => item.status === "approved"
    ).length;

    const pendingProducts = products.filter(
        (item) => item.status === "pending"
    ).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">

            {/* Header */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-amber-700">
                            Produk Kemitraan
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Pantau produk yang sedang bekerja sama dengan perusahaan
                        </p>
                    </div>

                    <button onClick={() => navigate("/supplier/product/create")}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded-xl font-medium transition"
                    >
                        + Kirim Sample Produk
                    </button>
                </div>
            </div>

            {/* Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                <div className="bg-white rounded-xl p-5 shadow">
                    <div className="flex items-center gap-3">
                        <Package className="w-8 h-8 text-amber-600" />
                        <div>
                            <p className="text-gray-500 text-sm">
                                Total Produk
                            </p>
                            <h3 className="text-2xl font-bold">
                                {products.length}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                        <div>
                            <p className="text-gray-500 text-sm">
                                Produk Aktif
                            </p>
                            <h3 className="text-2xl font-bold">
                                {activeProducts}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow">
                    <div className="flex items-center gap-3">
                        <Timer className="w-8 h-8 text-orange-600" />
                        <div>
                            <p className="text-gray-500 text-sm">
                                Menunggu Review
                            </p>
                            <h3 className="text-2xl font-bold">
                                {pendingProducts}
                            </h3>
                        </div>
                    </div>
                </div>

            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow p-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Cari produk..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                </div>
            </div>

            {/* Produk */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-2xl shadow hover:shadow-lg transition-all overflow-hidden"
                    >
                        <div className="p-5">

                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold text-amber-900 capitalize">
                                    {product.product_name}
                                </h3>

                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${product.status === "approved"
                                        ? "bg-green-100 text-green-700"
                                        : product.status === "rejected"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-orange-100 text-orange-700"
                                        }`}
                                >
                                    {product.status || "pending"}
                                </span>
                            </div>

                            <div className="space-y-3 text-sm">

                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Supplier
                                    </span>
                                    <span className="font-semibold capitalize">
                                        {product.supplier_name || "-"}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Penerima
                                    </span>
                                    <span className="font-semibold capitalize">
                                        {product.reciver_name || "-"}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Diterima Pada
                                    </span>
                                    <span className="font-semibold">
                                        {product.recived_at
                                            ? new Date(
                                                product.recived_at
                                            ).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })
                                            : "-"}
                                    </span>
                                </div>

                            </div>

                            <div className="flex gap-2 mt-6">

                                <button onClick={() => navigate(`/supplier/product/${product.id}`)}
                                    className="flex-1 border border-amber-500 text-amber-600 py-2 rounded-lg hover:bg-amber-50 transition"
                                >
                                    Detail
                                </button>


                                {product.status !== "approved" && product.status !== "active" && (
                                    <button
                                        className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition"
                                    >
                                        Kirim Sample
                                    </button>
                                )}

                            </div>

                        </div>
                    </div>
                ))}

            </div>

            {filteredProducts.length === 0 && (
                <div className="bg-white rounded-xl p-10 text-center shadow">
                    <Package className="mx-auto mb-3 w-12 h-12 text-gray-300" />

                    <h3 className="text-lg font-semibold text-gray-500">
                        Tidak ada produk ditemukan
                    </h3>

                    <p className="text-gray-400 mt-2">
                        Produk yang Anda supply akan muncul di sini
                    </p>
                </div>
            )}

        </div>
    );
}

export default DashboardProductSupplier;