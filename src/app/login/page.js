"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong.");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f4ee] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <a
            href="/"
            className="text-2xl font-bold tracking-tight text-[#26352e]"
          >
            Nexus
          </a>

          <h1 className="mt-8 text-4xl font-bold text-[#26352e]">
            Welcome back
          </h1>

          <p className="mt-3 text-[#26352e]/70">
            Sign in to continue to your Nexus workspace.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-[#26352e]/10 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#26352e]"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-[#26352e]/15 px-4 py-3 text-[#26352e] outline-none transition focus:border-[#29473b] focus:ring-2 focus:ring-[#29473b]/10"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#26352e]"
                >
                  Password
                </label>

                <a
                  href="/forgot-password"
                  className="text-sm font-medium text-[#29473b] hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-[#26352e]/15 px-4 py-3 text-[#26352e] outline-none transition focus:border-[#29473b] focus:ring-2 focus:ring-[#29473b]/10"
              />
            </div>

            {/* Message */}
            {message && (
              <div className="rounded-xl bg-[#29473b]/10 px-4 py-3 text-sm text-[#29473b]">
                {message}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#26352e] px-4 py-3 font-semibold text-white transition hover:bg-[#29473b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-[#26352e]/60">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-semibold text-[#29473b] hover:underline"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}