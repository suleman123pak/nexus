"use client";

import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "active",
    phone: "",
  });

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/team");
      const data = await response.json();

      if (data.success) {
        setTeamMembers(data.teamMembers);
      }
    } catch (error) {
      console.error("FETCH TEAM ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openEditForm = (member) => {
    setEditingMember(member);

    setFormData({
      name: member.name || "",
      email: member.email || "",
      role: member.role || "",
      status: member.status || "active",
      phone: member.phone || "",
    });

    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isEditing = !!editingMember;

      const url = isEditing ? `/api/team/${editingMember._id}` : "/api/team";

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
        alert(data.message || "Failed to save team member.");
        return;
      }

      alert(
        isEditing
          ? "Team member updated successfully!"
          : "Team member created successfully!",
      );

      setFormData({
        name: "",
        email: "",
        role: "",
        status: "active",
        phone: "",
      });

      setEditingMember(null);

      await fetchTeamMembers();

      setShowForm(false);
    } catch (error) {
      console.error("SAVE TEAM MEMBER ERROR:", error);

      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FB]">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
         <main className="min-w-0 flex-1 p-8 lg:ml-64">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#26352e]">Team</h2>

              <p className="mt-2 text-gray-500">
                Manage your team members and their roles.
              </p>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="rounded-lg bg-[#29473b] px-5 py-3 font-medium text-white hover:bg-[#20382f]"
            >
              + Add Member
            </button>
          </div>

          {/* Team Members */}
          {loading ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
              <p className="text-gray-500">Loading team members...</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
              <p className="text-gray-500">No team members yet</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Role
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Phone
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {teamMembers.map((member) => (
                    <tr key={member._id} className="border-b border-gray-100">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {member.name}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {member.email}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {member.role || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-medium ${
                            member.status === "active"
                              ? "border-[#29473b]/20 bg-[#29473b]/5 text-[#29473b]"
                              : "border-gray-200 bg-white text-gray-500"
                          }`}
                        >
                          {member.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {member.phone || "-"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => openEditForm(member)}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={async () => {
                              const confirmed = window.confirm(
                                "Are you sure you want to delete this team member?",
                              );

                              if (!confirmed) return;

                              try {
                                const response = await fetch(
                                  `/api/team/${member._id}`,
                                  {
                                    method: "DELETE",
                                  },
                                );

                                const data = await response.json();

                                if (!response.ok) {
                                  alert(
                                    data.message ||
                                      "Failed to delete team member.",
                                  );
                                  return;
                                }

                                alert("Team member deleted successfully.");

                                await fetchTeamMembers();
                              } catch (error) {
                                console.error(
                                  "DELETE TEAM MEMBER ERROR:",
                                  error,
                                );

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

          {/* Add Member Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
              <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-[#26352e]">
                      {editingMember ? "Edit Team Member" : "Add Team Member"}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Add a member to your team.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowForm(false)}
                    className="text-2xl text-gray-400 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
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
                      placeholder="John Doe"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#29473b]"
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
                      placeholder="john@example.com"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#29473b]"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Role
                    </label>

                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="Developer"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#29473b]"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Phone
                    </label>

                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 300 1234567"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#29473b]"
                    />
                  </div>

                  {/* Status */}
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
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="rounded-lg bg-[#29473b] px-5 py-3 font-medium text-white hover:bg-[#20382f]"
                    >
                      {editingMember ? "Update Member" : "Add Member"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
    </div>
  );
}
