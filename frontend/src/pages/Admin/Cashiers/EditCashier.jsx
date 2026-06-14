import React, { useEffect, useState } from "react";
import { AlertError, AlertSuccess } from "../../../components/Alert";
import { useNavigate, useParams } from "react-router";

function EditCashier() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        wallet_address: "",
        home_address: "",
    });

    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);
    const [message, setMessage] = useState({ type: "", text: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCashier = async () => {
            try {
                const response = await fetch(`http://localhost:8080/cashier?id=${id}`);
                const data = await response.json();

                if (response.ok) {
                    setFormData({
                        name: data.name || "",
                        email: data.email || "",
                        phone: data.phone || "",
                        wallet_address: data.wallet_address || "",
                        home_address: data.home_address || "",
                    });
                } else {
                    setMessage({ type: "error", text: data.error || "Gagal mengambil data Cashier." });
                    setTimeout(() => {
                        navigate("/admin/cashiers");
                    }, 2000);
                }
            } catch (error) {
                setMessage({ type: "error", text: "Terjadi kesalahan koneksi ke server." });
                setTimeout(() => {
                    navigate("/admin/cashiers");
                }, 2000);
            } finally {
                setFetchingData(false);
            }
        };

        fetchCashier();
    }, [id, navigate]);

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

        try {
            const response = await fetch(`http://localhost:8080/cashier/update?id=${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                AlertSuccess("Berhasil Update Data");
                navigate("/admin/cashiers", {
                    state: {
                        successMessage: data.message || "Cashier berhasil diupdate."
                    }
                });
            } else {
                setMessage({ type: "error", text: data.error || "Gagal mengupdate Cashier." });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Terjadi kesalahan koneksi ke server." });
        } finally {
            setLoading(false);
        }
    };

    if (fetchingData) {
        return (
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
                    <span className="ml-3 text-gray-600">Memuat data cashier...</span>
                </div>
            </div>
        );
    }


    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
            <div className="flex items-center space-x-2 border-b pb-4 mb-6">
                <i className="bx bx-user-plus text-2xl text-amber-600"></i>
                <h2 className="text-xl font-bold text-gray-800">Edit Data Cashier</h2>
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

            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-md mb-6 text-xs flex items-start space-x-2">
                <i className="bx bx-info-circle text-sm mt-0.5"></i>
                <p>
                    <strong>Catatan Sistem:</strong> Membuat kasir baru akan otomatis men-generate akun login di tabel <code>users</code> menggunakan <strong>Email</strong> sebagai username dan <strong>password</strong> sebagai password bawaan.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kasir</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <i className="bx bx-user"></i>
                            </span>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="cth: Fira Agustine"
                                className="pl-10 w-full p-2.5 border rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm bg-gray-50 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <i className="bx bx-envelope"></i>
                            </span>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                disabled
                                placeholder="firagusrtin@email.com"
                                className="cursor-not-allowed pl-10 w-full p-2.5 border rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm bg-gray-50 focus:bg-white transition-all"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon / WhatsApp</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <i className="bx bx-phone"></i>
                            </span>
                            <input
                                type="text"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="0812xxxxxxxx"
                                className="pl-10 w-full p-2.5 border rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm bg-gray-50 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address (Web3)</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <i className="bx bx-wallet"></i>
                            </span>
                            <input
                                type="text"
                                name="wallet_address"
                                required
                                value={formData.wallet_address}
                                onChange={handleChange}
                                placeholder="0x..."
                                className="pl-10 w-full p-2.5 border rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm font-mono bg-gray-50 focus:bg-white transition-all"
                            />
                        </div>
                    </div>
                </div>

                <hr className="my-2 border-gray-100" />

                <div className="bg-gray-50 p-4 rounded-lg space-y-4 border border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
                        <i className="bx bx-store-alt text-amber-600"></i>
                        <span>Informasi Rumah</span>
                    </h3>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Alamat Rumah</label>
                        <textarea
                            name="home_address"
                            required
                            rows="3"
                            value={formData.home_address}
                            onChange={handleChange}
                            placeholder="Tulis alamat rumah lengkap..."
                            className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm bg-white transition-all"
                        ></textarea>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                    <button
                        onClick={() => navigate("/admin/cashiers")}
                        type="button"
                        className="px-5 py-2.5 border rounded-md text-sm text-gray-600 hover:bg-gray-100 transition-all flex items-center space-x-1"
                    >
                        Batal
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
                                <span>Simpan Cashier</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCashier;