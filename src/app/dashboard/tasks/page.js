"use client";

import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function TasksPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    project: "",
    assignedTo: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/tasks");
      const data = await response.json();

      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error("FETCH TASKS ERROR:", error);
    } finally {
      setLoading(false);
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

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/team");
      const data = await response.json();

      if (data.success) {
        setTeamMembers(data.teamMembers);
      }
    } catch (error) {
      console.error("FETCH TEAM MEMBERS ERROR:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete task.");
        return;
      }

      await fetchTasks();

      alert("Task deleted successfully!");
    } catch (error) {
      console.error("DELETE TASK ERROR:", error);

      alert("Something went wrong.");
    }
  };

  const openEditForm = (task) => {
    setEditingTask(task);

    setFormData({
      title: task.title || "",
      project: task.project || "",
      assignedTo: task.assignedTo || "",
      priority: task.priority || "medium",
      status: task.status || "todo",
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : "",
      description: task.description || "",
    });

    setShowForm(true);
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchTeamMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isEditing = !!editingTask;

      const url = isEditing ? `/api/tasks/${editingTask._id}` : "/api/tasks";

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
        alert(data.message || "Failed to save task.");
        return;
      }

      alert(
        isEditing ? "Task updated successfully!" : "Task created successfully!",
      );

      setFormData({
        title: "",
        project: "",
        assignedTo: "",
        priority: "medium",
        status: "todo",
        dueDate: "",
        description: "",
      });

      setEditingTask(null);

      await fetchTasks();

      setShowForm(false);
    } catch (error) {
      console.error("SAVE TASK ERROR:", error);

      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FB]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-8 lg:ml-64">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#26352e]">Tasks</h2>

              <p className="mt-2 text-gray-500">
                Manage tasks and keep your projects moving forward.
              </p>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="rounded-lg bg-[#29473b] px-5 py-3 font-medium text-white hover:bg-[#20382f]"
            >
              + New Task
            </button>
          </div>

          {/* Empty State */}
          {loading ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
              <p className="text-gray-500">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
              <p className="text-gray-500">No tasks yet</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Task
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Project
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Assigned To
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Priority
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Due Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tasks.map((task) => (
                    <tr key={task._id} className="border-b border-gray-100">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {task.title}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {task.project || "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {task.assignedTo || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${
                            task.priority === "high"
                              ? "bg-red-100 text-red-700"
                              : task.priority === "medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${
                            task.status === "completed"
                              ? "border-[#29473b]/20 bg-[#29473b]/5 text-[#29473b]"
                              : task.status === "in-progress"
                                ? "border-gray-300 bg-gray-50 text-gray-700"
                                : "border-gray-200 bg-white text-gray-500"
                          }`}
                        >
                          {task.status === "in-progress"
                            ? "In Progress"
                            : task.status === "todo"
                              ? "To Do"
                              : "Completed"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => openEditForm(task)}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(task._id)}
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
          {/* Create Task Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
              <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-100 p-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#26352e]">
                      Create Task
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Add a task to your workspace.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowForm(false)}
                    className="text-2xl text-gray-400 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex min-h-0 flex-1 flex-col"
                >
                  <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
                    {/* Task Title */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Task Title
                      </label>

                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Design homepage"
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#29473b]"
                      />
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

                    {/* Assigned To */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Assigned To
                      </label>

                      <select
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#29473b]"
                      >
                        <option value="">Select a team member</option>

                        {teamMembers.map((member) => (
                          <option key={member._id} value={member.name}>
                            {member.name}
                            {member.role ? ` — ${member.role}` : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Priority */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Priority
                      </label>

                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#29473b]"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
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
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    {/* Due Date */}
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

                    {/* Description */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Description
                      </label>

                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the task..."
                        rows={4}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#29473b]"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-3 border-t border-gray-100 bg-white px-6 py-4">
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
                      {editingTask ? "Update Task" : "Create Task"}
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
