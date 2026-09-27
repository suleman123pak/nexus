import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";
import mongoose from "mongoose";

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid task ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const {
      title,
      project,
      assignedTo,
      priority,
      status,
      dueDate,
      description,
    } = body;

    if (!title || !title.trim()) {
      return Response.json(
        {
          success: false,
          message: "Task title is required.",
        },
        { status: 400 }
      );
    }

    const task = await Task.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        project: project || "",
        assignedTo: assignedTo || "",
        priority: priority || "medium",
        status: status || "todo",
        dueDate: dueDate || null,
        description: description || "",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return Response.json(
        {
          success: false,
          message: "Task not found.",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Task updated successfully.",
      task,
    });
  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to update task.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid task ID.",
        },
        { status: 400 }
      );
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return Response.json(
        {
          success: false,
          message: "Task not found.",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Task deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE TASK ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to delete task.",
      },
      { status: 500 }
    );
  }
}