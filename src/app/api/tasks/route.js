import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";

export async function GET() {
  try {
    await connectDB();

    const tasks = await Task.find().sort({ createdAt: -1 }).lean();

    return Response.json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("GET TASKS ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch tasks.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

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

    const task = await Task.create({
      title: title.trim(),
      project: project || "",
      assignedTo: assignedTo || "",
      priority: priority || "medium",
      status: status || "todo",
      dueDate: dueDate || null,
      description: description || "",
    });

    return Response.json(
      {
        success: true,
        message: "Task created successfully.",
        task,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE TASK ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to create task.",
      },
      { status: 500 }
    );
  }
}