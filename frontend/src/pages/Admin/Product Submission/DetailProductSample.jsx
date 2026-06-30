import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AlertError, AlertSuccess } from "../../../components/Alert";

function DetailProductSample() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null)
    const [reviewNote, setReviewNote] = useState("");
    const [status, setStatus] = useState("");
    const canReview = product?.status === "recived";

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

    const fetchProduct = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(
                `http://localhost:8080/supplier/product?id=${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message ?? "Gagal mengambil data");
            }

            setProduct(data);
            setReviewNote(data.review_note || "");
            setStatus(data.status || "");
        } catch (err) {
            AlertError(err.message);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const handleReview = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `http://localhost:8080/product-sample/review?id=${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        status,
                        review_note: reviewNote,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Gagal update review");
            }

            AlertSuccess("Review berhasil diperbarui");

            setProduct((prev) => ({
                ...prev,
                status,
                review_note: reviewNote,
            }));

            await fetchProduct()
        } catch (err) {
            AlertError(err.message);
        }
    };


    const statusStyle = {
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
        pending: "bg-orange-100 text-orange-700",
        shipped: "bg-blue-100 text-blue-700",
        recived: "bg-yellow-100 text-yellow-700",
    };


    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Data tidak ditemukan
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br  p-6">

            <div className="max-w-4xl mx-auto">

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
                                    : product.status === "shipped"
                                        ? "Dikirim"
                                        : product.status === "recived"
                                            ? "Diterima"
                                            : "Menunggu Dikirim"}
                        </span>
                    </div>
                </div>

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
                                {product.reciver_name || "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">
                                Tanggal Pengajuan
                            </p>
                            <p className="font-semibold">
                                {formatDate(product.submission_date) ?? "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">
                                Nama Revierwer
                            </p>
                            <p className="font-semibold capitalize">
                                {(product.reviewer_name) ?? "-"}
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


                        <div>
                            <p className="text-gray-500 text-sm">
                                Tanggal Review
                            </p>
                            <p className="font-semibold">
                                {formatDate(product.review_date) ?? "-"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Deskripsi Produk
                    </h2>

                    <p className="text-gray-700 leading-relaxed">
                        {product.description ?? "-"}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Review Produk
                    </h2>

                    <div className="space-y-4">

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Status
                            </label>

                            <select
                                value={status}
                                disabled={!canReview}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full border rounded-lg p-3"
                            >
                                <option value="">Pilih Status</option>
                                <option value="approved">Approve</option>
                                <option value="rejected">Reject</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Catatan Review (Opsional)
                            </label>

                            <textarea
                                rows={4}
                                value={reviewNote}
                                disabled={!canReview}
                                onChange={(e) => setReviewNote(e.target.value)}
                                placeholder="Masukkan catatan review..."
                                className="w-full border rounded-lg p-3"
                            />
                        </div>

                        <button
                            onClick={handleReview}
                            disabled={!canReview || !status}
                            className="bg-amber-600 text-white px-5 py-2 rounded-lg hover:bg-amber-700 disabled:bg-gray-400"
                        >
                            Update Review
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DetailProductSample;