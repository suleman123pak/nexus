import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectToDatabase from "@/lib/mongodb";
import Client from "@/models/Client";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid client ID.",
        },
        { status: 400 }
      );
    }

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

    const client = await Client.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        company: company?.trim() || "",
        phone: phone?.trim() || "",
        status: status || "active",
        notes: notes?.trim() || "",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!client) {
      return NextResponse.json(
        {
          success: false,
          message: "Client not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Client updated successfully.",
        client,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update client error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update client.",
      },
      { status: 500 }
    );
  }
}