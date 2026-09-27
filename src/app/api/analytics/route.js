import connectDB from "@/lib/mongodb";
import Client from "@/models/Client";
import Project from "@/models/Project";
import Task from "@/models/Task";
import Invoice from "@/models/Invoice";
import TeamMember from "@/models/TeamMember";

export async function GET() {
  try {
    await connectDB();

    const [
      totalClients,
      totalProjects,
      totalTasks,
      totalInvoices,
      paidInvoices,
      unpaidInvoices,
      todoTasks,
      inProgressTasks,
      completedTasks,
      activeProjects,
      completedProjects,
      onHoldProjects,
      activeTeamMembers,
      inactiveTeamMembers,
    ] = await Promise.all([
      Client.countDocuments(),
      Project.countDocuments(),
      Task.countDocuments(),
      Invoice.countDocuments(),
      Invoice.countDocuments({ status: "paid" }),
      Invoice.countDocuments({
        status: { $in: ["draft", "sent", "overdue"] },
      }),
      Task.countDocuments({ status: "todo" }),
      Task.countDocuments({ status: "in-progress" }),
      Task.countDocuments({ status: "completed" }),
      Project.countDocuments({ status: "active" }),
      Project.countDocuments({ status: "completed" }),
      Project.countDocuments({ status: "on-hold" }),
      TeamMember.countDocuments({ status: "active" }),
      TeamMember.countDocuments({ status: "inactive" }),
    ]);

    const invoiceTotals = await Invoice.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          paidAmount: {
            $sum: {
              $cond: [{ $eq: ["$status", "paid"] }, "$amount", 0],
            },
          },
          unpaidAmount: {
            $sum: {
              $cond: [
                {
                  $in: ["$status", ["draft", "sent", "overdue"]],
                },
                "$amount",
                0,
              ],
            },
          },
        },
      },
    ]);

    const totals = invoiceTotals[0] || {
      totalAmount: 0,
      paidAmount: 0,
      unpaidAmount: 0,
    };

    return Response.json({
      success: true,
      analytics: {
        totalClients,
        totalProjects,
        totalTasks,
        totalInvoices,
        paidInvoices,
        unpaidInvoices,
        totalAmount: totals.totalAmount,
        paidAmount: totals.paidAmount,
        unpaidAmount: totals.unpaidAmount,

        todoTasks,
        inProgressTasks,
        completedTasks,
        activeProjects,
        completedProjects,
        onHoldProjects,
        activeTeamMembers,
        inactiveTeamMembers,
      },
    });
  } catch (error) {
    console.error("GET ANALYTICS ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch analytics.",
      },
      { status: 500 },
    );
  }
}
