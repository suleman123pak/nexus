"use client";

import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  const [formData, setFormData] = useState({
    invoiceNumber: "",
    client: "",
    project: "",
    issueDate: "",
    dueDate: "",
    amount: "",
    status: "draft",
    notes: "",
  });

  const fetchInvoices = async () => {
    try {
      const response = await fetch("/api/invoices");
      const data = await response.json();

      if (data.success) {
        setInvoices(data.invoices);
      }
    } catch (error) {
      console.error("FETCH INVOICES ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/clients");
      const data = await response.json();

      if (data.success) {
        setClients(data.clients);
      }
    } catch (error) {
      console.error("FETCH CLIENTS ERROR:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();

      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error("FETCH PROJECTS ERROR:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
    fetchClients();
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openEditForm = (invoice) => {
    setEditingInvoice(invoice);

    setFormData({
      invoiceNumber: invoice.invoiceNumber || "",
      client: invoice.client || "",
      project: invoice.project || "",
      issueDate: invoice.issueDate
        ? new Date(invoice.issueDate).toISOString().split("T")[0]
        : "",
      dueDate: invoice.dueDate
        ? new Date(invoice.dueDate).toISOString().split("T")[0]
        : "",
      amount: invoice.amount ?? "",
      status: invoice.status || "draft",
      notes: invoice.notes || "",
    });

    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isEditing = !!editingInvoice;

      const url = isEditing
        ? `/api/invoices/${editingInvoice._id}`
        : "/api/invoices";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to save invoice.");
        return;
      }

      alert(
        isEditing
          ? "Invoice updated successfully."
          : "Invoice created successfully.",
      );

      setFormData({
        invoiceNumber: "",
        client: "",
        project: "",
        issueDate: "",
        dueDate: "",
        amount: "",
        status: "draft",
        notes: "",
      });

      setEditingInvoice(null);

      await fetchInvoices();

      setShowForm(false);
    } catch (error) {
      console.error("SAVE INVOICE ERROR:", error);

      alert("Something went wrong.");
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString();
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US").format(amount || 0);
  };

  return (
    <div className="min-h-screen bg-[#F5F8FB]">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="min-w-0 flex-1 p-8 lg:ml-64">
        <div className="border-b border-gray-200 bg-white px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#26352e]">
                Invoices
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage your invoices and payments.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingInvoice(null);

                setFormData({
                  invoiceNumber: "",
                  client: "",
                  project: "",
                  issueDate: "",
                  dueDate: "",
                  amount: "",
                  status: "draft",
                  notes: "",
                });

                setShowForm(true);
              }}
              className="rounded-lg bg-[#29473b] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#213a30]"
            >
              + Create Invoice
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {loading ? (
              <div className="p-8 text-center text-sm text-gray-500">
                Loading invoices...
              </div>
            ) : invoices.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-gray-500">No invoices yet.</p>

                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Create your first invoice
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-gray-200 bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Invoice
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Client
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Project
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Amount
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Due Date
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Status
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {invoices.map((invoice) => (
                      <tr key={invoice._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {invoice.invoiceNumber}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {invoice.client || "-"}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {invoice.project || "-"}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-700">
                          {formatAmount(invoice.amount)}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(invoice.dueDate)}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${
                              invoice.status === "paid"
                                ? "border-[#29473b]/20 bg-[#29473b]/5 text-[#29473b]"
                                : invoice.status === "overdue"
                                  ? "border-red-200 bg-red-50 text-red-600"
                                  : invoice.status === "sent"
                                    ? "border-gray-300 bg-gray-50 text-gray-700"
                                    : "border-gray-200 bg-white text-gray-500"
                            }`}
                          >
                            {invoice.status.charAt(0).toUpperCase() +
                              invoice.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => openEditForm(invoice)}
                              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={async () => {
                                const confirmed = window.confirm(
                                  "Are you sure you want to delete this invoice?",
                                );

                                if (!confirmed) return;

                                try {
                                  const response = await fetch(
                                    `/api/invoices/${invoice._id}`,
                                    {
                                      method: "DELETE",
                                    },
                                  );

                                  const data = await response.json();

                                  if (!response.ok) {
                                    alert(
                                      data.message ||
                                        "Failed to delete invoice.",
                                    );
                                    return;
                                  }

                                  alert("Invoice deleted successfully.");

                                  await fetchInvoices();
                                } catch (error) {
                                  console.error("DELETE INVOICE ERROR:", error);

                                  alert("Something went wrong.");
                                }
                              }}
                              className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Create Invoice Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div>
                <h3 className="text-lg font-semibold text-[#26352e]">
                  {editingInvoice ? "Edit Invoice" : "Create Invoice"}
                </h3>

                <p className="mt-1 text-sm text-gray-500">Add a new invoice.</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingInvoice(null);
                }}
                className="text-2xl leading-none text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
                {/* Invoice Number */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Invoice Number
                  </label>

                  <input
                    type="text"
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={handleChange}
                    placeholder="INV-001"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#29473b]"
                  />
                </div>

                {/* Client */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Client
                  </label>

                  <select
                    name="client"
                    value={formData.client}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#29473b]"
                  >
                    <option value="">Select a client</option>

                    {clients.map((client) => (
                      <option key={client._id} value={client.name}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Project
                  </label>

                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#29473b]"
                  >
                    <option value="">Select a project</option>

                    {projects.map((project) => (
                      <option key={project._id} value={project.name}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Issue Date
                    </label>

                    <input
                      type="date"
                      name="issueDate"
                      value={formData.issueDate}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#29473b]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Due Date
                    </label>

                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#29473b]"
                    />
                  </div>
                </div>

                {/* Amount + Status */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Amount
                    </label>

                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      placeholder="0"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#29473b]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Status
                    </label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#29473b]"
                    >
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Notes
                  </label>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Additional invoice notes..."
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#29473b]"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 border-t border-gray-100 bg-white px-6 py-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingInvoice(null);
                  }}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#29473b] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#213a30]"
                >
                  {editingInvoice ? "Update Invoice" : "Create Invoice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
