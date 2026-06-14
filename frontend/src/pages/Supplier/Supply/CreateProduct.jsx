import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AlertSuccess, AlertError } from "../../../components/Alert";

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        product_name: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        // Validasi
        if (!formData.product_name) {
            setMessage({ type: "error", text: "Nama produk harus diisi" });
            setLoading(false);
            return;
        }

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/supplier/product/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        product_name: formData.product_name,
                        description: formData.description || null,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                AlertSuccess("Berhasil Menambah Produk");
                // Reset form
                setFormData({
                    product_name: "",
                    description: "",
                });
                navigate("/supplier/dashboard", {
                    state: {
                        successMessage: data.message || "Produk berhasil ditambahkan"
                    }
                });
            } else {
                setMessage({
                    type: "error",
                    text: data.message || data.error || "Gagal menambahkan produk"
                });
            }
        } catch (error) {
            setMessage({
                type: "error",
                text: "Terjadi kesalahan koneksi ke server."
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
            <div className="flex items-center space-x-2 border-b pb-4 mb-6">
                <i className="bx bx-package text-2xl text-amber-600"></i>
                <h2 className="text-xl font-bold text-gray-800">Tambah Produk Baru</h2>
            </div>

            {/* Alert Message */}
            {message.text && (
                <div
                    className={`p-4 mb-6 rounded-md text-sm flex items-center space-x-2 ${message.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                >
                    <i className={`bx ${message.type === "success" ? "bx-check-circle" : "bx-error-circle"} text-lg`}></i>
                    <span>{message.text}</span>
                </div>
            )}

            {/* Info Tambahan */}
            <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-md mb-6 text-xs flex items-start space-x-2">
                <i className="bx bx-info-circle text-sm mt-0.5"></i>
                <p>
                    <strong>Catatan:</strong> Produk yang ditambahkan akan langsung tersedia untuk transaksi.
                    Deskripsi produk bersifat opsional dan dapat diisi nanti.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nama Produk */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Produk <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <i className="bx bx-package"></i>
                        </span>
                        <input
                            type="text"
                            name="product_name"
                            required
                            value={formData.product_name}
                            onChange={handleChange}
                            placeholder="cth: Kopi Arabika Gayo"
                            className="pl-10 w-full p-2.5 border rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm bg-gray-50 focus:bg-white transition-all"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Nama produk harus unik dan mudah diidentifikasi
                    </p>
                </div>

                {/* Deskripsi */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deskripsi Produk
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pt-3">
                            <i className="bx bx-file"></i>
                        </span>
                        <textarea
                            name="description"
                            rows="5"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Tulis deskripsi produk secara lengkap..."
                            className="pl-10 w-full p-2.5 border rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm bg-gray-50 focus:bg-white transition-all resize-none"
                        ></textarea>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Deskripsi opsional, tetapi disarankan untuk informasi lebih lengkap
                    </p>
                </div>

                <hr className="my-2 border-gray-100" />

                {/* Tombol Aksi */}
                <div className="flex justify-end space-x-3 pt-2">
                    <button
                        type="button"
                        onClick={() => navigate("/supplier/products")}
                        className="px-5 py-2.5 border rounded-md text-sm text-gray-600 hover:bg-gray-100 transition-all flex items-center space-x-1"
                    >
                        <i className="bx bx-x"></i>
                        <span>Batal</span>
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-5 py-2.5 bg-amber-600 text-white rounded-md text-sm font-medium hover:bg-amber-700 transition-all flex items-center space-x-2 disabled:bg-amber-400 disabled:cursor-not-allowed shadow-sm"
                    >
                        {loading ? (
                            <>
                                <i className="bx bx-loader-alt animate-spin"></i>
                                <span>Menyimpan...</span>
                            </>
                        ) : (
                            <>
                                <i className="bx bx-save"></i>
                                <span>Simpan Produk</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;