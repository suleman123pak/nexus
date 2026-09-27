"use client";

import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    client: "",
    status: "active",
    startDate: "",
    dueDate: "",
    budget: "",
    description: "",
  });

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch projects.");
      }

      setProjects(data.projects);
    } catch (error) {
      console.error("Fetch projects error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openEditForm = (project) => {
    setEditingProject(project);

    setFormData({
      name: project.name || "",
      client: project.client || "",
      status: project.status || "active",
      startDate: project.startDate
        ? new Date(project.startDate).toISOString().split("T")[0]
        : "",
      dueDate: project.dueDate
        ? new Date(project.dueDate).toISOString().split("T")[0]
        : "",
      budget: project.budget ?? "",
      description: project.description || "",
    });

    setShowForm(true);
  };

  const handleDelete = async (projectId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to delete project.");
        return;
      }

      alert("Project deleted successfully.");

      fetchProjects();
    } catch (error) {
      console.error("Delete project error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingProject
        ? `/api/projects/${editingProject._id}`
        : "/api/projects";

      const method = editingProject ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to save project.");
        return;
      }

      alert(
        editingProject
          ? "Project updated successfully."
          : "Project created successfully.",
      );

      setFormData({
        name: "",
        client: "",
        status: "active",
        startDate: "",
        dueDate: "",
        budget: "",
        description: "",
      });

      setEditingProject(null);
      setShowForm(false);

      fetchProjects();
    } catch (error) {
      console.error("Save project error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FB]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-8 lg:ml-64">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#26352e]">Projects</h2>

              <p className="mt-2 text-gray-500">
                Manage your projects and track their progress.
              </p>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="rounded-lg bg-[#29473b] px-5 py-3 font-medium text-white hover:bg-[#20382f]"
            >
              + New Project
            </button>
          </div>

          {/* Empty State */}
          {/* Projects */}
          {loading ? (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-gray-100">
              <p className="text-gray-500">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-gray-100">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#29473b]/10">
                <span className="text-2xl">📁</span>
              </div>

              <h3 className="text-xl font-semibold text-[#26352e]">
                No projects yet
              </h3>

              <p className="mt-2 text-gray-500">
                Create your first project to start managing your work.
              </p>

              <button
                onClick={() => setShowForm(true)}
                className="mt-6 rounded-lg bg-[#29473b] px-5 py-3 font-medium text-white hover:bg-[#20382f]"
              >
                Create Project
              </button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 text-left">
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                        Project
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                        Client
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                        Status
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                        Due Date
                      </th>

                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                        Budget
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {projects.map((project) => (
                      <tr
                        key={project._id}
                        className="border-b border-gray-100 last:border-b-0"
                      >
                        <td className="px-6 py-5">
                          <div>
                            <p className="font-semibold text-[#26352e]">
                              {project.name}
                            </p>

                            {project.description && (
                              <p className="mt-1 max-w-md truncate text-sm text-gray-500">
                                {project.description}
                              </p>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-5 text-gray-600">
                          {project.client || "—"}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                              project.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : project.status === "on-hold"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {project.status}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-gray-600">
                          {project.dueDate
                            ? new Date(project.dueDate).toLocaleDateString()
                            : "—"}
                        </td>

                        <td className="px-6 py-5 text-gray-600">
                          ${Number(project.budget || 0).toLocaleString()}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => openEditForm(project)}
                              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(project._id)}
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
            </div>
          )}

          {/* Create Project Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
              <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-[#26352e]">
                      {editingProject ? "Edit Project" : "Create Project"}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Add a new project to your workspace.
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
                  {/* Project Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Project Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Website Redesign"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#29473b]"
                    />
                  </div>

                  {/* Client */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Client
                    </label>

                    <input
                      type="text"
                      name="client"
                      value={formData.client}
                      onChange={handleChange}
                      placeholder="Client name"
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
                      <option value="completed">Completed</option>
                      <option value="on-hold">On Hold</option>
                    </select>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Start Date
                      </label>

                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
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

                  {/* Budget */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Budget
                    </label>

                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="5000"
                      min="0"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#29473b]"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the project..."
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#29473b]"
                    />
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
                      {editingProject ? "Update Project" : "Create Project"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
