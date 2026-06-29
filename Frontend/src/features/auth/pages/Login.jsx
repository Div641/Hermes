import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hook/useAuth'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import Navbar from '../../../components/Navbar'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);

    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const submitForm = async (event) => {
        event.preventDefault();

        const payload = {
            email,
            password,
        };

        await handleLogin(payload);
        navigate("/");
    };

    if (!loading && user) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="h-screen w-screen bg-gray-200 dark:bg-black transition-colors duration-300 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
            <Navbar />
            <div className="w-full max-w-4xl lg:max-w-5xl md:min-h-[460px] h-auto bg-white dark:bg-slate-900/75 dark:backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-transparent dark:border-gray-800/80 grid grid-cols-1 md:grid-cols-2 transition-all duration-300 my-auto">

                {/* Left Side */}
                <div className="relative h-32 md:h-full min-h-[160px] md:min-h-[460px]">
                    <img
                        src="/hermes.png"
                        alt="Hermes"
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
                        <h1 className="text-white text-3xl md:text-5xl tracking-[8px] md:tracking-[12px] font-light drop-shadow-md">
                            WELCOME
                        </h1>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 dark:bg-slate-900/30 my-auto">

                    <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
                        Login
                    </h1>

                    <form
                        onSubmit={submitForm}
                        className="space-y-4"
                    >

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full border-b border-gray-400 dark:border-gray-600 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-transparent focus:outline-none focus:border-[#091B63] dark:focus:border-blue-400 transition-colors"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full border-b border-gray-400 dark:border-gray-600 py-2 text-base text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-transparent focus:outline-none focus:border-[#091B63] dark:focus:border-blue-400 transition-colors"
                            />

                            <button
                                type="button"
                                className="absolute right-0 top-2 text-xs text-[#091B63] dark:text-blue-400 hover:underline font-medium"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#091B63] hover:bg-[#07144e] dark:bg-blue-600 dark:hover:bg-blue-500 disabled:bg-gray-500 text-white text-base sm:text-lg font-semibold py-3 rounded-xl transition-all shadow-md active:scale-[0.99] mt-2"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                    </form>

                    <p className="mt-5 text-center text-sm text-gray-600 dark:text-zinc-300">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-semibold text-[#31b8c6] transition hover:text-[#45c7d4]">
                            Register
                        </Link>
                    </p>

                </div>

            </div>
        </div>
    );
}

export default Login