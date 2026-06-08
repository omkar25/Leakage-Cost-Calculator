"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, User, AlertCircle, Eye, EyeOff } from "lucide-react";
import TeddyBear from "@/components/TeddyBear";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordTyping, setIsPasswordTyping] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid username or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1b3a5c] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/3 rounded-full" />
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-white/5 rounded-full" />
        <div className="absolute top-1/3 left-1/2 w-16 h-16 bg-white/3 rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Teddy Bear */}
        <div className="flex justify-center -mb-8 relative z-20">
          <TeddyBear
            isPasswordFocused={isPasswordFocused}
            isTyping={isPasswordTyping}
          />
        </div>

        <Card className="w-full border-0 shadow-2xl bg-white rounded-2xl overflow-visible">
          <CardHeader className="text-center pt-10 pb-2">
            <h2 className="text-xl font-bold text-gray-900">Welcome to CXPortal</h2>
            <CardDescription className="text-sm text-gray-500">
              Sign in to access your knowledge OS
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2 text-gray-700 text-sm">
                  <User className="h-4 w-4" />
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  disabled={isLoading}
                  className="h-11 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  onFocus={() => setIsPasswordFocused(false)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 text-gray-700 text-sm">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setIsPasswordTyping(true);
                      setTimeout(() => setIsPasswordTyping(false), 500);
                    }}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                    className="h-11 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 rounded-lg bg-[#1b3a5c] hover:bg-[#152e4a] text-white font-medium text-sm"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <p className="text-center text-xs text-gray-400 mt-4">
                CXPortal Knowledge OS &mdash; One source of truth.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
