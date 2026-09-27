"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Settings saved successfully.");
  };

  return (
    <div className="min-h-screen bg-[#F5F8FB]">
      <DashboardSidebar />

      <main className="min-w-0 flex-1 p-8 lg:ml-64">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#26352e]">
            Settings
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your account and workspace settings.
          </p>
        </div>

        <div className="max-w-4xl space-y-6">
          {/* Profile Settings */}
          <section className="rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-6 py-5">
              <h2 className="text-lg font-semibold text-[#26352e]">
                Profile
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Update your personal account information.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#29473b]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#29473b]"
                />
              </div>

              {/* Save */}
              <div className="flex justify-end border-t border-gray-100 pt-5">
                <button
                  type="submit"
                  className="rounded-lg bg-[#29473b] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#20382f]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </section>

          {/* Account */}
          <section className="rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-6 py-5">
              <h2 className="text-lg font-semibold text-[#26352e]">
                Account
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage your account security.
              </p>
            </div>

            <div className="flex items-center justify-between gap-6 p-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Password
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Change your account password.
                </p>
              </div>

              <button
                type="button"
                className="shrink-0 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Change Password
              </button>
            </div>
          </section>

          {/* Workspace */}
          <section className="rounded-2xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-6 py-5">
              <h2 className="text-lg font-semibold text-[#26352e]">
                Workspace
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Information about your Nexus workspace.
              </p>
            </div>

            <div className="p-6">
              <div className="rounded-xl bg-[#F5F8FB] p-5">
                <p className="text-sm font-medium text-[#26352e]">
                  Nexus Business Workspace
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Manage your clients, projects, tasks, invoices, and
                  team from one place.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}