import { redirect } from "next/navigation";
import getCurrentUser from "@/lib/getCurrentUser";
import DashboardSidebar from "@/components/DashboardSidebar";

import connectDB from "@/lib/mongodb";
import Client from "@/models/Client";
import Project from "@/models/Project";
import Invoice from "@/models/Invoice";
import TeamMember from "@/models/TeamMember";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  await connectDB();

  const activeClients = await Client.countDocuments({
    status: "active",
  });

  const activeProjects = await Project.countDocuments({
    status: "active",
  });

  const pendingInvoices = await Invoice.find({
    status: { $in: ["sent", "overdue"] },
  }).lean();

  const pendingInvoiceAmount = pendingInvoices.reduce(
    (total, invoice) => total + (invoice.amount || 0),
    0,
  );

  const paidInvoices = await Invoice.find({
    status: "paid",
  }).lean();

  const totalRevenue = paidInvoices.reduce(
    (total, invoice) => total + (invoice.amount || 0),
    0,
  );

  const now = new Date();

  const revenueMonths = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

    revenueMonths.push({
      label: date.toLocaleString("en-US", {
        month: "short",
      }),
      year: date.getFullYear(),
      month: date.getMonth(),
      amount: 0,
    });
  }

  const [recentClients, recentInvoices, recentProjects, recentTeamMembers] =
    await Promise.all([
      Client.find().sort({ createdAt: -1 }).limit(2).lean(),

      Invoice.find().sort({ createdAt: -1 }).limit(2).lean(),

      Project.find().sort({ updatedAt: -1 }).limit(2).lean(),

      TeamMember.find().sort({ createdAt: -1 }).limit(2).lean(),
    ]);

  paidInvoices.forEach((invoice) => {
    if (!invoice.issueDate) {
      return;
    }

    const invoiceDate = new Date(invoice.issueDate);

    const matchingMonth = revenueMonths.find(
      (item) =>
        item.year === invoiceDate.getFullYear() &&
        item.month === invoiceDate.getMonth(),
    );

    if (matchingMonth) {
      matchingMonth.amount += invoice.amount || 0;
    }
  });

  return (
    <main className="min-h-screen bg-[#f5f4ee] text-[#26352e]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <DashboardSidebar user={user} />

        {/* Main Content */}
        <section className="min-w-0 flex-1 lg:ml-64">
          {/* Top Header */}
          <header className="border-b border-[#26352e]/10 bg-white/70 px-6 py-5 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#26352e]/50">Overview</p>

                <h1 className="mt-1 text-2xl font-bold">
                  Good morning, {user.name}
                </h1>
              </div>

              <div className="hidden rounded-lg border border-[#26352e]/10 bg-white px-4 py-2 text-sm text-[#26352e]/60 sm:block">
                {user.role}
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-6 sm:p-8">
            {/* Stats */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-[#26352e]/10 bg-white p-6 shadow-sm">
                <p className="text-sm text-[#26352e]/50">Total Revenue</p>

                <p className="mt-3 text-3xl font-bold">
                  ${totalRevenue.toLocaleString()}
                </p>

                <p className="mt-2 text-sm text-[#26352e]/50">
                  From paid invoices
                </p>
              </div>

              <a
                href="/dashboard/clients"
                className="block rounded-2xl border border-[#26352e]/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#29473b]/30 hover:shadow-md"
              >
                <p className="text-sm text-[#26352e]/50">Active Clients</p>

                <p className="mt-3 text-3xl font-bold">{activeClients}</p>

                <p className="mt-2 text-sm text-[#26352e]/50">
                  Currently active
                </p>
              </a>

              <a
                href="/dashboard/projects"
                className="block rounded-2xl border border-[#26352e]/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#29473b]/30 hover:shadow-md"
              >
                <p className="text-sm text-[#26352e]/50">Active Projects</p>

                <p className="mt-3 text-3xl font-bold">{activeProjects}</p>

                <p className="mt-2 text-sm text-[#26352e]/50">
                  Currently active
                </p>
              </a>

              <a
                href="/dashboard/invoices"
                className="block rounded-2xl border border-[#26352e]/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#29473b]/30 hover:shadow-md"
              >
                <p className="text-sm text-[#26352e]/50">Pending Invoices</p>

                <p className="mt-3 text-3xl font-bold">
                  ${pendingInvoiceAmount.toLocaleString()}
                </p>

                <p className="mt-2 text-sm text-[#26352e]/50">
                  {pendingInvoices.length} pending invoices
                </p>
              </a>
            </div>

            {/* Lower Dashboard */}
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              {/* Revenue Overview */}
              <div className="rounded-2xl border border-[#26352e]/10 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">Revenue Overview</h2>

                    <p className="mt-1 text-sm text-[#26352e]/50">
                      Revenue performance over the last 6 months
                    </p>
                  </div>

                  <span className="rounded-lg bg-[#f5f4ee] px-3 py-2 text-xs text-[#26352e]/60">
                    6 Months
                  </span>
                </div>

                {/* Chart Placeholder */}
                <div className="mt-8 flex h-64 items-end gap-3">
                  {revenueMonths.map((item, index) => {
                    const maxRevenue = Math.max(
                      ...revenueMonths.map((month) => month.amount),
                      1,
                    );

                    const height =
                      item.amount === 0
                        ? 5
                        : Math.max((item.amount / maxRevenue) * 100, 8);

                    return (
                      <div
                        key={`${item.year}-${item.month}`}
                        className="flex h-full flex-1 items-end"
                      >
                        <div
                          className="w-full rounded-t-lg bg-[#29473b] transition-all"
                          style={{ height: `${height}%` }}
                          title={`${item.label}: $${item.amount.toLocaleString()}`}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 flex justify-between text-xs text-[#26352e]/40">
                  {revenueMonths.map((item) => (
                    <span key={`${item.year}-${item.month}`}>{item.label}</span>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="rounded-2xl border border-[#26352e]/10 bg-white p-6 shadow-sm">
                <div>
                  <h2 className="font-semibold">Recent Activity</h2>

                  <p className="mt-1 text-sm text-[#26352e]/50">
                    Latest workspace activity
                  </p>
                </div>

                <div className="mt-6 space-y-5">
                  {[
                    ...recentClients.map((client) => ({
                      type: "Client",
                      title: `New client added: ${client.name}`,
                      date: client.createdAt,
                    })),

                    ...recentInvoices.map((invoice) => ({
                      type: "Invoice",
                      title: `Invoice ${invoice.invoiceNumber} created`,
                      date: invoice.createdAt,
                    })),

                    ...recentProjects.map((project) => ({
                      type: "Project",
                      title: `Project "${project.name}" updated`,
                      date: project.updatedAt,
                    })),

                    ...recentTeamMembers.map((member) => ({
                      type: "Team",
                      title: `Team member added: ${member.name}`,
                      date: member.createdAt,
                    })),
                  ]
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 6)
                    .map((activity, index) => (
                      <div
                        key={`${activity.type}-${index}`}
                        className="flex gap-3"
                      >
                        <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#29473b]" />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {activity.title}
                          </p>

                          <p className="mt-1 text-xs text-[#26352e]/45">
                            {new Date(activity.date).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
