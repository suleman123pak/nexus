"use client";

import { useState } from "react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await fetch("/api/auth/signup", {
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

      setMessage("Account created successfully!");
      
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f4ee] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#26352e]">
            Create your account
          </h1>

          <p className="mt-3 text-[#26352e]/70">
            Start managing your business with Nexus.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm border border-[#26352e]/10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#26352e]"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Suleman Rana"
                required
                className="w-full rounded-xl border border-[#26352e]/15 px-4 py-3 outline-none focus:border-[#29473b]"
              />
            </div>

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
                className="w-full rounded-xl border border-[#26352e]/15 px-4 py-3 outline-none focus:border-[#29473b]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#26352e]"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                minLength={8}
                required
                className="w-full rounded-xl border border-[#26352e]/15 px-4 py-3 outline-none focus:border-[#29473b]"
              />
            </div>

            {message && (
              <div className="rounded-xl bg-[#29473b]/10 px-4 py-3 text-sm text-[#29473b]">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#26352e] px-4 py-3 font-semibold text-white transition hover:bg-[#29473b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#26352e]/60">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-[#29473b] hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}