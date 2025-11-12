import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { loginSchema } from "@/lib/validation";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const { toast } = useToast();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(`${backendUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include"
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Login failed. Please try again.");
            }

            toast({
                title: result.message,
            });

            navigate("/home");
        } catch (err: any) {
            setError(err.message);
            toast({
                title: "Login failed",
                description: err.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-start pt-20 bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Log In</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            {...register("email")}
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Email address"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password with Eye Icon */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none pr-12"
                            placeholder="Password"
                            autoComplete="off"
                        />
                        <span
                            // type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-[40px] flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                            tabIndex={-1}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:scale-105 transition-transform shadow-lg ${loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? "Logging In..." : "Log In"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-gray-500">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Google Login */}
                <button className="w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition">
                    <img
                        src="https://www.svgrepo.com/show/355037/google.svg"
                        alt="Google Logo"
                        className="h-6 mr-2"
                    />
                    Log In with Google
                </button>
                {/* Signup Link */}
                <div className="mt-6 text-center">
                    <span className="text-gray-500">Don't have an account? </span>
                    <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
