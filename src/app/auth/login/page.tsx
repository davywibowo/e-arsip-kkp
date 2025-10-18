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
  IconLock,
  IconEye,
  IconEyeOff,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react";
import Validation from "@/validation/Validation";
import UserValidation from "@/validation/user-validation";
import ResponseError from "@/error/ResponseError";
import { ZodError } from "zod";
import { ResponsePayload } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
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
      Validation.validate(UserValidation.LOGIN, formData);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = (await response.json()) as ResponsePayload;
      if (data.status === "failed") {
        throw new ResponseError(data.statusCode, data.message);
      }

      toast.success(data.message);
      router.push("/");
      router.refresh();
    } catch (err) {
      if (err instanceof ResponseError) {
        setError(err.message);
      } else if (err instanceof ZodError) {
        setError(err.issues[0].message);
      } else {
        setError("An error occured! Please try again later!");
      }
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
                  htmlFor="username"
                  className="text-sm font-medium text-black mb-2"
                >
                  Username
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="DFA Academy"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                    className="h-11 rounded-xl border-2 border-black focus:border-yellow-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-black"
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

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || success}
                className="w-full h-11 rounded-xl font-semibold bg-black hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader />
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
