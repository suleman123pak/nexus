import connectDB from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";
import mongoose from "mongoose";

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid team member ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const {
      name,
      email,
      role,
      status,
      phone,
    } = body;

    if (!name || !name.trim()) {
      return Response.json(
        {
          success: false,
          message: "Name is required.",
        },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return Response.json(
        {
          success: false,
          message: "Email is required.",
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingMember = await TeamMember.findOne({
      email: normalizedEmail,
      _id: { $ne: id },
    });

    if (existingMember) {
      return Response.json(
        {
          success: false,
          message: "Another team member already uses this email.",
        },
        { status: 409 }
      );
    }

    const teamMember = await TeamMember.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        email: normalizedEmail,
        role: role || "",
        status: status || "active",
        phone: phone || "",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!teamMember) {
      return Response.json(
        {
          success: false,
          message: "Team member not found.",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Team member updated successfully.",
      teamMember,
    });
  } catch (error) {
    console.error("UPDATE TEAM MEMBER ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to update team member.",
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
          message: "Invalid team member ID.",
        },
        { status: 400 }
      );
    }

    const teamMember = await TeamMember.findByIdAndDelete(id);

    if (!teamMember) {
      return Response.json(
        {
          success: false,
          message: "Team member not found.",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Team member deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE TEAM MEMBER ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to delete team member.",
      },
      { status: 500 }
    );
  }
}