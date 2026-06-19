import { useEffect, useState } from "react";
import {
    Search,
    Package,
    CheckCircle,
    Truck
} from "@boxicons/react";
import { useNavigate } from "react-router";
import { AlertError, AlertSuccess, ReviewSwal } from "../../../components/Alert";

function ProductSamples() {

    const [samples, setSamples] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const fetchSamples = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(
                "http://localhost:8080/product-samples",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Gagal memuat sample produk");
            }

            const data = await res.json();

            setSamples(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setSamples([]);
        }
    };

    useEffect(() => {
        fetchSamples();
    }, []);

    const handleReceive = async (id) => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(
                `http://localhost:8080/product-sample/receive?id=${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Gagal mengirim review");
            }

            AlertSuccess("Sample telah diterima");

            fetchSamples();
        } catch (err) {
            console.error(err);
            AlertError(err.message);
        }
    }

    const filteredSamples = samples.filter((item) =>
        item.product_name
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    const shippedCount = samples.filter(
        (item) => item.status === "shipped"
    ).length;

    const receivedCount = samples.filter(
        (item) => item.status === "received"
    ).length;

    const statusStyle = {
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
        pending: "bg-orange-100 text-orange-700",
        shipped: "bg-blue-100 text-blue-700",
        recived: "bg-yellow-100 text-yellow-700",
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">

            {/* HEADER */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

                <h1 className="text-3xl font-bold text-slate-800">
                    Product Sample Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Pantau sample produk yang dikirim supplier ke toko
                </p>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                <div className="bg-white rounded-xl p-5 shadow">
                    <div className="flex items-center gap-3">
                        <Package className="w-8 h-8 text-slate-700" />
                        <div>
                            <p className="text-sm text-gray-500">
                                Total Sample
                            </p>
                            <h3 className="text-2xl font-bold">
                                {samples.length}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow">
                    <div className="flex items-center gap-3">
                        <Truck className="w-8 h-8 text-blue-600" />
                        <div>
                            <p className="text-sm text-gray-500">
                                Sedang Dikirim
                            </p>
                            <h3 className="text-2xl font-bold">
                                {shippedCount}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                        <div>
                            <p className="text-sm text-gray-500">
                                Sudah Diterima
                            </p>
                            <h3 className="text-2xl font-bold">
                                {receivedCount}
                            </h3>
                        </div>
                    </div>
                </div>

            </div>

            {/* SEARCH */}
            <div className="bg-white rounded-xl shadow p-4 mb-6">

                <div className="relative">

                    <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />

                    <input
                        type="text"
                        placeholder="Cari produk sample..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

            </div>

            {/* PRODUCT SAMPLE LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredSamples.map((sample) => (
                    <div
                        key={sample.id}
                        className="bg-white rounded-2xl shadow hover:shadow-lg transition-all"
                    >
                        <div className="p-5">

                            <div className="flex justify-between items-start mb-4">

                                <h3 className="text-xl font-semibold capitalize">
                                    {sample.product_name}
                                </h3>

                                <span
                                    className={`px-4 py-2 rounded-full text-sm font-semibold ${statusStyle[sample.status]
                                        }`}
                                >
                                    {sample.status === "approved"
                                        ? "Disetujui"
                                        : sample.status === "rejected"
                                            ? "Ditolak"
                                            : sample.status === "shipped"
                                                ? "Dikirim"
                                                : sample.status === "recived"
                                                    ? "Diterima"
                                                    : "Menunggu Dikirim"}
                                </span>

                            </div>

                            <div className="space-y-3 text-sm">

                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Supplier
                                    </span>
                                    <span className="font-semibold capitalize">
                                        {sample.supplier_name ?? "-"}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Penerima
                                    </span>
                                    <span className="font-semibold capitalize">
                                        {sample.reciver_name ?? "-"}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Dikirim Pada
                                    </span>
                                    <span className="font-semibold">
                                        {formatDate(sample.submission_date)}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Diterima Pada
                                    </span>
                                    <span className="font-semibold">
                                        {formatDate(sample.recived_at)}
                                    </span>
                                </div>

                            </div>

                            <div className="flex gap-2 mt-6">

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/admin/product/sample/${sample.id}`
                                        )
                                    }
                                    className="flex-1 border border-slate-400 text-slate-700 py-2 rounded-lg hover:bg-slate-50"
                                >
                                    Detail
                                </button>

                                {sample.status === "shipped" && (
                                    <button
                                        onClick={() =>
                                            handleReceive(sample.id)
                                        }
                                        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                                    >
                                        Receive Products
                                    </button>
                                )}

                            </div>

                        </div>
                    </div>
                ))}


            </div>

            {filteredSamples.length === 0 && (
                <div className="bg-white rounded-xl p-10 text-center shadow mt-6">

                    <Package className="mx-auto mb-3 w-12 h-12 text-gray-300" />

                    <h3 className="text-lg font-semibold text-gray-500">
                        Tidak ada sample produk
                    </h3>

                    <p className="text-gray-400 mt-2">
                        Sample yang dikirim supplier akan muncul di sini
                    </p>

                </div>
            )}

        </div>
    );
}

export default ProductSamples;