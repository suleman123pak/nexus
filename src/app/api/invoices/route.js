import connectDB from "@/lib/mongodb";
import Invoice from "@/models/Invoice";

export async function GET() {
  try {
    await connectDB();

    const invoices = await Invoice.find()
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({
      success: true,
      invoices,
    });
  } catch (error) {
    console.error("GET INVOICES ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch invoices.",
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
    });

    if (existingInvoice) {
      return Response.json(
        {
          success: false,
          message: "An invoice with this number already exists.",
        },
        { status: 409 }
      );
    }

    const invoice = await Invoice.create({
      invoiceNumber: normalizedInvoiceNumber,
      client: client || "",
      project: project || "",
      issueDate: issueDate || null,
      dueDate: dueDate || null,
      amount: Number(amount) || 0,
      status: status || "draft",
      notes: notes || "",
    });

    return Response.json(
      {
        success: true,
        message: "Invoice created successfully.",
        invoice,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE INVOICE ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to create invoice.",
      },
      { status: 500 }
    );
  }
}