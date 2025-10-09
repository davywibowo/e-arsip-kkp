"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  IconMail,
  IconLock,
  IconEye,
  IconEyeOff,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          remember: formData.rememberMe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      setSuccess(true);

      if (data.token) {
        if (formData.rememberMe) {
          localStorage.setItem("authToken", data.token);
        } else {
          sessionStorage.setItem("authToken", data.token);
        }
      }

      setTimeout(() => {
        window.location.href = data.redirectUrl || "/dashboard";
      }, 1500);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-indigo-300/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-purple-300/20 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        <Card className="border border-slate-200 shadow-xl backdrop-blur-xl bg-white/90 hover:shadow-2xl transition-all duration-300 rounded-2xl">
          <CardHeader className="text-center pt-8 pb-4">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-600 bg-clip-text text-transparent">
              Sign In
            </CardTitle>
            <CardDescription className="text-slate-600 mt-2">
              Welcome back! Please enter your credentials.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Success message */}
              {success && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                  <IconCheck size={18} />
                  <span>Login successful! Redirecting...</span>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  <IconAlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-black mb-2"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <IconMail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
                    size={20}
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                    className="pl-10 h-11 rounded-xl border-2 border-black focus:border-yellow-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-black"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-black"
                  >
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <IconLock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
                    size={20}
                  />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                    className="pl-10 pr-10 h-11 rounded-xl border-2 border-black focus:border-yellow-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? (
                      <IconEyeOff size={20} />
                    ) : (
                      <IconEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-4 h-4 accent-indigo-600 cursor-pointer"
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-sm text-slate-600 cursor-pointer select-none"
                >
                  Remember me for 30 days
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || success}
                className="w-full h-11 rounded-xl font-semibold bg-black hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Signing in...
                  </div>
                ) : success ? (
                  <div className="flex items-center justify-center gap-2">
                    <IconCheck size={18} />
                    Success
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="px-8 pb-8">
            <div className="w-full text-center text-sm text-slate-600">
              <div className="h-px bg-slate-200 my-4" />
              Don’t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-semibold text-yellow-600 hover:text-yellow-700 hover:underline underline-offset-4"
              >
                Create one
              </Link>
            </div>
          </CardFooter>
        </Card>

        <p className="text-center text-sm text-slate-500 mt-8">
          DFA Academy © {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </div>
  );
}
