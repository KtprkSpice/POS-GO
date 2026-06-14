import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import LogoPos from "../../assets/logo.jpg"
import { AlertCircle, CheckCircle, Envelope, Eye, EyeSlash, Hashtag, LoaderLines, LoaderLinesAlt, Lock, Send, Shield } from "@boxicons/react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const response = await fetch("http://localhost:8080/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setOtpSent(true);
                setMessage({ type: "success", text: "Kode OTP telah dikirim ke email Anda!" });
            } else {
                setMessage({ type: "error", text: data.error || "Email tidak ditemukan!" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Terjadi kesalahan koneksi ke server." });
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage({ type: "error", text: "Password tidak cocok!" });
            return;
        }

        if (newPassword.length < 6) {
            setMessage({ type: "error", text: "Password minimal 6 karakter!" });
            return;
        }

        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const response = await fetch("http://localhost:8080/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    otp,
                    new_password: newPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: "Password berhasil direset! Silahkan login." });
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setMessage({ type: "error", text: data.error || "Gagal mereset password!" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Terjadi kesalahan koneksi ke server." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8 md:p-10">
                <div className="text-center">
                    <div className="flex justify-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 overflow-hidden">
                            <img
                                src={LogoPos}
                                alt="Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Lupa Password?
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {!otpSent
                            ? "Masukkan email Anda untuk mereset password"
                            : "Masukkan kode OTP dan password baru Anda"}
                    </p>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-lg text-sm flex items-center space-x-2 ${message.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                        }`}>
                        {message.type === "success" ? (
                            <CheckCircle className="w-5 h-5" />
                        ) : (
                            <AlertCircle className="w-5 h-5" />
                        )}
                        <span>{message.text}</span>
                    </div>
                )}

                {!otpSent ? (
                    <form className="mt-8 space-y-6" onSubmit={handleSendOTP}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <Envelope className="w-5 h-5" />
                                </span>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-amber-400 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? (
                                <>
                                    <LoaderLines className="w-5 h-5 animate-spin" />
                                    <span>Mengirim...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    <span>Kirim Kode OTP</span>
                                </>
                            )}
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            <Link to="/login" className="text-amber-600 hover:text-amber-700 font-medium">
                                Kembali ke Login
                            </Link>
                        </p>
                    </form>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kode OTP
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                        <Hashtag className="w-5 h-5" />
                                    </span>
                                    <input
                                        type="text"
                                        required
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                        placeholder="Masukkan kode OTP"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password Baru
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                        <Lock className="w-5 h-5" />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="pl-10 pr-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                        placeholder="Minimal 6 karakter"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <Eye className="w-5 h-5" /> : <EyeSlash className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Konfirmasi Password Baru
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                        <Shield className="w-5 h-5" />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                        placeholder="Ulangi password baru"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-amber-400 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? (
                                <>
                                    <LoaderLinesAlt className="w-5 h-5 animate-spin" />
                                    <span>Memproses...</span>
                                </>
                            ) : (
                                <>
                                    {/* <Reset className="w-5 h-5" /> */}
                                    <span>Reset Password</span>
                                </>
                            )}
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            <button
                                type="button"
                                onClick={() => {
                                    setOtpSent(false);
                                    setOtp("");
                                }}
                                className="text-amber-600 hover:text-amber-700 font-medium"
                            >
                                Kirim Ulang Kode OTP
                            </button>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;