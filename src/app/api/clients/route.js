import { NextResponse } from "next/server";

import connectToDatabase from "@/lib/mongodb";
import Client from "@/models/Client";

export async function GET() {
  try {
    await connectToDatabase();

    const clients = await Client.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        clients,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get clients error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch clients.",
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
      email,
      company,
      phone,
      status,
      notes,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and email are required.",
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingClient = await Client.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingClient) {
      return NextResponse.json(
        {
          success: false,
          message: "A client with this email already exists.",
        },
        { status: 409 }
      );
    }

    const client = await Client.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      company: company?.trim() || "",
      phone: phone?.trim() || "",
      status: status || "active",
      notes: notes?.trim() || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Client created successfully.",
        client,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create client error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create client.",
      },
      { status: 500 }
    );
  }
}