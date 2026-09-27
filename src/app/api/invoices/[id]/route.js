import connectDB from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import mongoose from "mongoose";

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid invoice ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const {
      invoiceNumber,
      client,
      project,
      issueDate,
      dueDate,
      amount,
      status,
      notes,
    } = body;

    if (!invoiceNumber || !invoiceNumber.trim()) {
      return Response.json(
        {
          success: false,
          message: "Invoice number is required.",
        },
        { status: 400 }
      );
    }

    const normalizedInvoiceNumber = invoiceNumber.trim().toUpperCase();

    const existingInvoice = await Invoice.findOne({
      invoiceNumber: normalizedInvoiceNumber,
      _id: { $ne: id },
    });

    if (existingInvoice) {
      return Response.json(
        {
          success: false,
          message: "Another invoice already uses this number.",
        },
        { status: 409 }
      );
    }

    const invoice = await Invoice.findByIdAndUpdate(
      id,
      {
        invoiceNumber: normalizedInvoiceNumber,
        client: client || "",
        project: project || "",
        issueDate: issueDate || null,
        dueDate: dueDate || null,
        amount: Number(amount) || 0,
        status: status || "draft",
        notes: notes || "",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!invoice) {
      return Response.json(
        {
          success: false,
          message: "Invoice not found.",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Invoice updated successfully.",
      invoice,
    });
  } catch (error) {
    console.error("UPDATE INVOICE ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to update invoice.",
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
          message: "Invalid invoice ID.",
        },
        { status: 400 }
      );
    }

    const invoice = await Invoice.findByIdAndDelete(id);

    if (!invoice) {
      return Response.json(
        {
          success: false,
          message: "Invoice not found.",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Invoice deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE INVOICE ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to delete invoice.",
      },
      { status: 500 }
    );
  }
}