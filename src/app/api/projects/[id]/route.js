import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const {
      name,
      client,
      status,
      startDate,
      dueDate,
      budget,
      description,
    } = body;

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Project name is required.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const project = await Project.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        client: client?.trim() || "",
        status: status || "active",
        startDate: startDate || null,
        dueDate: dueDate || null,
        budget: Number(budget) || 0,
        description: description?.trim() || "",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Project updated successfully.",
        project,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update project error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update project.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project ID.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Project deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete project error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete project.",
      },
      { status: 500 }
    );
  }
}
