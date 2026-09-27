import connectDB from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";

export async function GET() {
  try {
    await connectDB();

    const teamMembers = await TeamMember.find()
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({
      success: true,
      teamMembers,
    });
  } catch (error) {
    console.error("GET TEAM MEMBERS ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch team members.",
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
    });

    if (existingMember) {
      return Response.json(
        {
          success: false,
          message: "A team member with this email already exists.",
        },
        { status: 409 }
      );
    }

    const teamMember = await TeamMember.create({
      name: name.trim(),
      email: normalizedEmail,
      role: role || "",
      status: status || "active",
      phone: phone || "",
    });

    return Response.json(
      {
        success: true,
        message: "Team member created successfully.",
        teamMember,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE TEAM MEMBER ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to create team member.",
      },
      { status: 500 }
    );
  }
}