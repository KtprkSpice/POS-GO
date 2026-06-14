import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AlertError, AlertSuccess } from "../../../components/Alert";

function DetailProductSupplier() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null)

    const formatDate = (date) => {
        if (!date) {
            return "-"
        }

        return new Date(date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:8080/supplier/product?id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (res) => {
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message ?? "Gagal mengambil data");
                }

                return data;
            })
            .then((data) => {
                setProduct(data)
            })
            .catch((err) => {
                AlertError(err)
            })
    }, [id])


    const statusStyle = {
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
        pending: "bg-orange-100 text-orange-700",
    };


    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Data tidak ditemukan
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">

            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="bg-white rounded-2xl shadow p-6 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-amber-600 hover:text-amber-700 mb-3"
                    >
                        ← Kembali
                    </button>

                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-amber-700">
                                {product.product_name ?? "-"}
                            </h1>
                            <p className="text-gray-500 mt-1">
                                Detail kerja sama produk
                            </p>
                        </div>

                        <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${statusStyle[product.status]
                                }`}
                        >
                            {product.status === "approved"
                                ? "Disetujui"
                                : product.status === "rejected"
                                    ? "Ditolak"
                                    : "Menunggu Review"}
                        </span>
                    </div>
                </div>

                {/* Informasi Kerja Sama */}
                <div className="bg-white rounded-2xl shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Informasi Kerja Sama
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">

                        <div>
                            <p className="text-gray-500 text-sm">
                                Supplier
                            </p>
                            <p className="font-semibold">
                                {product.supplier_name ?? "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">
                                Penerima
                            </p>
                            <p className="font-semibold capitalize">
                                {product.reciver_name ?? "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">
                                Tanggal Pengajuan
                            </p>
                            <p className="font-semibold">
                                {formatDate(product.created_at ?? "-")}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">
                                Tanggal Review
                            </p>
                            <p className="font-semibold">
                                {formatDate(product.reviewed_at) ?? "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">
                                Tanggal Diterima
                            </p>
                            <p className="font-semibold">
                                {formatDate(product.recived_at) ?? "-"}
                            </p>
                        </div>

                    </div>
                </div>

                {/* Deskripsi */}
                <div className="bg-white rounded-2xl shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Deskripsi Produk
                    </h2>

                    <p className="text-gray-700 leading-relaxed">
                        {product.description ?? "-"}
                    </p>
                </div>

                {/* Catatan Review */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Catatan Review
                    </h2>

                    <div
                        className={`rounded-xl p-4 ${product.status === "approved"
                            ? "bg-green-50 border border-green-200"
                            : product.status === "rejected"
                                ? "bg-red-50 border border-red-200"
                                : "bg-orange-50 border border-orange-200"
                            }`}
                    >
                        {product.review_note ?? "Belum ada catatan review"}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DetailProductSupplier;