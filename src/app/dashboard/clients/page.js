"use client";

import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";

const emptyForm = {
  name: "",
  email: "",
  company: "",
  phone: "",
  status: "active",
  notes: "",
};

export default function ClientsPage() {
  const [clients, setClients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const [editingClient, setEditingClient] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/clients");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch clients.");
      }

      setClients(data.clients);
    } catch (error) {
      console.error("Fetch clients error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function openAddForm() {
    setEditingClient(null);
    setFormData(emptyForm);
    setFormMessage("");
    setShowForm(true);
  }

  function openEditForm(client) {
    setEditingClient(client);

    setFormData({
      name: client.name || "",
      email: client.email || "",
      company: client.company || "",
      phone: client.phone || "",
      status: client.status || "active",
      notes: client.notes || "",
    });

    setFormMessage("");
    setShowForm(true);
  }

  function closeForm() {
    if (saving) {
      return;
    }

    setShowForm(false);
    setEditingClient(null);
    setFormMessage("");
    setFormData(emptyForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);
    setFormMessage("");

    try {
      const url = editingClient
        ? `/api/clients/${editingClient._id}`
        : "/api/clients";

      const method = editingClient ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormMessage(
          data.message ||
            `Unable to ${editingClient ? "update" : "create"} client.`
        );

        return;
      }

      if (editingClient) {
        setClients((previous) =>
          previous.map((client) =>
            client._id === data.client._id
              ? data.client
              : client
          )
        );
      } else {
        setClients((previous) => [
          data.client,
          ...previous,
        ]);
      }

      closeForm();
    } catch (error) {
      console.error("Save client error:", error);

      setFormMessage(
        "Unable to connect to the server."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f4ee] text-[#26352e]">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <section className="min-w-0 flex-1 lg:ml-64">

          {/* Header */}
          <header className="border-b border-[#26352e]/10 bg-white/70 px-6 py-5 backdrop-blur">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-[#26352e]/50">
                  Workspace
                </p>

                <h1 className="mt-1 text-2xl font-bold">
                  Clients
                </h1>
              </div>

              <button
                type="button"
                onClick={openAddForm}
                className="rounded-xl bg-[#26352e] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#29473b]"
              >
                Add Client
              </button>

            </div>
          </header>

          {/* Content */}
          <div className="p-6 sm:p-8">

            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                Your Clients
              </h2>

              <p className="mt-1 text-sm text-[#26352e]/55">
                Manage your customers and their business information.
              </p>
            </div>

            {/* Loading */}
            {loading && (
              <div className="rounded-2xl border border-[#26352e]/10 bg-white p-8 text-center shadow-sm">
                <p className="text-sm text-[#26352e]/60">
                  Loading clients...
                </p>
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
                <p className="text-sm text-red-600">
                  {error}
                </p>
              </div>
            )}

            {/* Empty State */}
            {!loading &&
              !error &&
              clients.length === 0 && (
                <div className="rounded-2xl border border-[#26352e]/10 bg-white p-12 text-center shadow-sm">

                  <h3 className="text-lg font-semibold">
                    No clients yet
                  </h3>

                  <p className="mt-2 text-sm text-[#26352e]/55">
                    Add your first client to get started.
                  </p>

                  <button
                    type="button"
                    onClick={openAddForm}
                    className="mt-6 rounded-xl bg-[#26352e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#29473b]"
                  >
                    Add Your First Client
                  </button>

                </div>
              )}

            {/* Clients Table */}
            {!loading &&
              !error &&
              clients.length > 0 && (
                <div className="overflow-hidden rounded-2xl border border-[#26352e]/10 bg-white shadow-sm">

                  <div className="overflow-x-auto">

                    <table className="w-full min-w-[850px]">

                      <thead className="border-b border-[#26352e]/10 bg-[#f8f8f4]">
                        <tr>

                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#26352e]/50">
                            Client
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#26352e]/50">
                            Company
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#26352e]/50">
                            Email
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#26352e]/50">
                            Phone
                          </th>

                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#26352e]/50">
                            Status
                          </th>

                          <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#26352e]/50">
                            Action
                          </th>

                        </tr>
                      </thead>

                      <tbody className="divide-y divide-[#26352e]/10">

                        {clients.map((client) => (
                          <tr
                            key={client._id}
                            className="transition hover:bg-[#f8f8f4]"
                          >

                            <td className="px-6 py-5">
                              <p className="font-semibold">
                                {client.name}
                              </p>

                              <p className="mt-1 text-xs text-[#26352e]/45">
                                Added{" "}
                                {new Date(
                                  client.createdAt
                                ).toLocaleDateString()}
                              </p>
                            </td>

                            <td className="px-6 py-5 text-sm text-[#26352e]/70">
                              {client.company || "—"}
                            </td>

                            <td className="px-6 py-5 text-sm text-[#26352e]/70">
                              {client.email}
                            </td>

                            <td className="px-6 py-5 text-sm text-[#26352e]/70">
                              {client.phone || "—"}
                            </td>

                            <td className="px-6 py-5">
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                  client.status === "active"
                                    ? "bg-[#29473b]/10 text-[#29473b]"
                                    : "bg-[#26352e]/10 text-[#26352e]/60"
                                }`}
                              >
                                {client.status}
                              </span>
                            </td>

                            <td className="px-6 py-5 text-right">

                              <button
                                type="button"
                                onClick={() =>
                                  openEditForm(client)
                                }
                                className="rounded-lg border border-[#26352e]/15 px-3 py-2 text-xs font-semibold text-[#26352e] transition hover:bg-[#f5f4ee]"
                              >
                                Edit
                              </button>

                            </td>

                          </tr>
                        ))}

                      </tbody>

                    </table>

                  </div>

                </div>
              )}

          </div>

        </section>

      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#26352e]/40 px-4 py-8">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#26352e]/10 px-6 py-5">

              <div>
                <h2 className="text-xl font-bold">
                  {editingClient
                    ? "Edit Client"
                    : "Add Client"}
                </h2>

                <p className="mt-1 text-sm text-[#26352e]/50">
                  {editingClient
                    ? "Update this client's information."
                    : "Add a new client to your workspace."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg px-3 py-2 text-xl text-[#26352e]/50 transition hover:bg-[#f5f4ee] hover:text-[#26352e]"
              >
                ×
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  required
                  className="w-full rounded-xl border border-[#26352e]/15 px-4 py-3 outline-none transition focus:border-[#29473b]"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full rounded-xl border border-[#26352e]/15 px-4 py-3 outline-none transition focus:border-[#29473b]"
                />
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-sm font-medium"
                >
                  Company
                </label>

                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Acme Inc."
                  className="w-full rounded-xl border border-[#26352e]/15 px-4 py-3 outline-none transition focus:border-[#29473b]"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 555 123 4567"
                  className="w-full rounded-xl border border-[#26352e]/15 px-4 py-3 outline-none transition focus:border-[#29473b]"
                />
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium"
                >
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#26352e]/15 bg-white px-4 py-3 outline-none transition focus:border-[#29473b]"
                >
                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes"
                  className="mb-2 block text-sm font-medium"
                >
                  Notes
                </label>

                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any notes about this client..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-[#26352e]/15 px-4 py-3 outline-none transition focus:border-[#29473b]"
                />
              </div>

              {/* Form Error */}
              {formMessage && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {formMessage}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="flex-1 rounded-xl border border-[#26352e]/15 px-4 py-3 text-sm font-semibold transition hover:bg-[#f5f4ee] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-[#26352e] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#29473b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingClient
                      ? "Save Changes"
                      : "Save Client"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </main>
  );
}