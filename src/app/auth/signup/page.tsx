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
  IconUser,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react";
import { ResponsePayload } from "@/types";
import ResponseError from "@/error/ResponseError";
import Validation from "@/validation/Validation";
import UserValidation from "@/validation/user-validation";
import { ZodError } from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    setLoading(true);
    try {
      Validation.validate(UserValidation.CREATEUSER, formData);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await res.json()) as ResponsePayload;
      if (data.status === "failed") {
        throw new ResponseError(data.statusCode, data.message);
      }

      toast.success(data.message);
      router.push("/");
    } catch (err) {
      if (err instanceof ResponseError) {
        setMessage({ type: "error", text: err.message });
      } else if (err instanceof ZodError) {
        setMessage({ type: "error", text: err.issues[0].message });
      } else {
        setMessage({
          type: "error",
          text: "An error occured! Please try again later",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-indigo-300/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-purple-300/20 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        <Card className="border border-slate-200 shadow-xl backdrop-blur-xl bg-white/90 hover:shadow-2xl transition-all duration-300 rounded-2xl">
          <CardHeader className="text-center pt-8 pb-4">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <CardDescription className="text-slate-600 mt-2">
              Join us today — it only takes a few seconds!
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8">
            {message && (
              <div
                className={`flex items-center gap-2 text-sm p-3 mb-4 rounded-xl border transition-all duration-200 ${
                  message.type === "error"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-green-50 text-green-700 border-green-200"
                }`}
              >
                {message.type === "error" ? (
                  <IconAlertCircle size={18} />
                ) : (
                  <IconCheck size={18} />
                )}
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-black font-medium">
                  Name
                </Label>
                <div className="relative">
                  <IconUser
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
                  />
                  <Input
                    id="name"
                    placeholder="DFA Foundations"
                    className="pl-10 h-11 rounded-xl border-2 border-black  focus:border-yellow-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-black"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-black font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Dfa Academy"
                  className="h-11 rounded-xl border-2 border-black focus:border-yellow-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-black"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-black font-medium">
                  Password
                </Label>
                <div className="relative">
                  <IconLock
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
                  />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-11 rounded-xl border-2 border-black focus:border-yellow-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-black"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-black font-medium"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <IconLock
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
                  />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter password"
                    className="pl-10 h-11 rounded-xl border-2 border-black focus:border-yellow-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-black"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl font-semibold bg-black hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="px-8 pb-8 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="ml-1 font-semibold text-yellow-600 hover:text-yellow-400 hover:underline underline-offset-4"
            >
              Log in
            </Link>
          </CardFooter>
        </Card>

        <p className="text-center text-sm text-slate-500 mt-8">
          DFA Academy © {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </div>
  );
}
