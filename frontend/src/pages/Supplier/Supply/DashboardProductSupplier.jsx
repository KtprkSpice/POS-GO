import { useEffect, useState } from "react";
import {
    Search,
    Package,
    DollarCircle,
    Box
} from "@boxicons/react";

function DashboardProductSupplier() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:8080/supplier/products", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const filteredProducts = products.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">

            {/* Header */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <h1 className="text-3xl font-bold text-amber-700">
                    Produk Saya
                </h1>
                <p className="text-gray-500 mt-1">
                    Kelola dan pantau produk yang Anda supply
                </p>
            </div>

            {/* Statistics */}
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
                        <Box className="w-8 h-8 text-green-600" />
                        <div>
                            <p className="text-gray-500 text-sm">
                                Total Stok
                            </p>
                            <h3 className="text-2xl font-bold">
                                {products.reduce(
                                    (sum, item) => sum + item.stock,
                                    0
                                )}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow">
                    <div className="flex items-center gap-3">
                        <DollarCircle className="w-8 h-8 text-blue-600" />
                        <div>
                            <p className="text-gray-500 text-sm">
                                Total Nilai Produk
                            </p>
                            <h3 className="text-xl font-bold">
                                Rp{" "}
                                {products
                                    .reduce(
                                        (sum, item) =>
                                            sum + item.price * item.stock,
                                        0
                                    )
                                    .toLocaleString("id-ID")}
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

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-2xl shadow hover:shadow-lg transition-all overflow-hidden"
                    >

                        <img
                            src={
                                product.image ||
                                "https://via.placeholder.com/400x250"
                            }
                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />

                        <div className="p-5">

                            <h3 className="text-xl font-semibold mb-2">
                                {product.name}
                            </h3>

                            <p className="text-gray-500 text-sm mb-4">
                                {product.description}
                            </p>

                            <div className="space-y-2">

                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Harga
                                    </span>
                                    <span className="font-semibold text-green-600">
                                        Rp {product.price?.toLocaleString("id-ID")}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Stok
                                    </span>
                                    <span className="font-semibold">
                                        {product.stock}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Kategori
                                    </span>
                                    <span className="font-semibold">
                                        {product.category}
                                    </span>
                                </div>

                            </div>

                        </div>
                    </div>
                ))}

            </div>

            {filteredProducts.length === 0 && (
                <div className="bg-white rounded-xl p-10 text-center shadow">
                    <h3 className="text-lg font-semibold text-gray-700">
                        Produk tidak ditemukan
                    </h3>
                </div>
            )}

        </div>
    );
}

export default DashboardProductSupplier;