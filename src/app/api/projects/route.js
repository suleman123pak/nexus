import { NextResponse } from "next/server";

import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET() {
  try {
    await connectToDatabase();

    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        projects,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get projects error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch projects.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
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

    const project = await Project.create({
      name: name.trim(),
      client: client?.trim() || "",
      status: status || "active",
      startDate: startDate || null,
      dueDate: dueDate || null,
      budget: Number(budget) || 0,
      description: description?.trim() || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully.",
        project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create project error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create project.",
      },
      { status: 500 }
    );
  }
}
