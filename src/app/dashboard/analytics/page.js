"use client";

import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function AnalyticsPage() {
    const user = {
    name: "Owner",
    email: "owner@nexus.com",
  };
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/analytics");
      const data = await response.json();

      if (data.success) {
        setAnalytics(data.analytics);
      }
    } catch (error) {
      console.error("FETCH ANALYTICS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US").format(amount || 0);
  };

  const taskChartData = analytics
    ? [
        {
          status: "To Do",
          count: analytics.todoTasks,
        },
        {
          status: "In Progress",
          count: analytics.inProgressTasks,
        },
        {
          status: "Completed",
          count: analytics.completedTasks,
        },
      ]
    : [];

  const invoiceChartData = analytics
    ? [
        {
          status: "Paid",
          amount: analytics.paidAmount,
        },
        {
          status: "Unpaid",
          amount: analytics.unpaidAmount,
        },
      ]
    : [];

  const projectChartData = analytics
    ? [
        {
          status: "Active",
          count: analytics.activeProjects,
        },
        {
          status: "Completed",
          count: analytics.completedProjects,
        },
        {
          status: "On Hold",
          count: analytics.onHoldProjects,
        },
      ]
    : [];

  const teamChartData = analytics
    ? [
        {
          status: "Active",
          count: analytics.activeTeamMembers,
        },
        {
          status: "Inactive",
          count: analytics.inactiveTeamMembers,
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-[#F5F8FB]">
      {/* Sidebar */}
      <DashboardSidebar user={user} />

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white px-6 py-5">
          <h2 className="text-2xl font-semibold text-[#26352e]">Analytics</h2>

          <p className="mt-1 text-sm text-gray-500">
            Track your business performance and financial activity.
          </p>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
              Loading analytics...
            </div>
          ) : analytics ? (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <p className="text-sm text-gray-500">Total Clients</p>

                  <p className="mt-3 text-3xl font-semibold text-[#26352e]">
                    {analytics.totalClients}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <p className="text-sm text-gray-500">Total Projects</p>

                  <p className="mt-3 text-3xl font-semibold text-[#26352e]">
                    {analytics.totalProjects}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <p className="text-sm text-gray-500">Total Tasks</p>

                  <p className="mt-3 text-3xl font-semibold text-[#26352e]">
                    {analytics.totalTasks}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <p className="text-sm text-gray-500">Total Invoices</p>

                  <p className="mt-3 text-3xl font-semibold text-[#26352e]">
                    {analytics.totalInvoices}
                  </p>
                </div>
              </div>

              {/* Invoice Overview */}
              <div className="mt-6">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-[#26352e]">
                        Invoice Overview
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Summary of your invoice activity.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 p-5">
                      <p className="text-sm text-gray-500">Total Amount</p>

                      <p className="mt-2 text-2xl font-semibold text-[#26352e]">
                        {formatAmount(analytics.totalAmount)}
                      </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-5">
                      <p className="text-sm text-gray-500">Paid Amount</p>

                      <p className="mt-2 text-2xl font-semibold text-[#29473b]">
                        {formatAmount(analytics.paidAmount)}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {analytics.paidInvoices} paid invoice
                        {analytics.paidInvoices !== 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-5">
                      <p className="text-sm text-gray-500">Unpaid Amount</p>

                      <p className="mt-2 text-2xl font-semibold text-gray-700">
                        {formatAmount(analytics.unpaidAmount)}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {analytics.unpaidInvoices} unpaid invoice
                        {analytics.unpaidInvoices !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Task Status */}
              <div className="mt-6">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#26352e]">
                      Task Status
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Overview of your current task progress.
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="space-y-5">
                      {taskChartData.map((item) => {
                        const percentage =
                          analytics.totalTasks > 0
                            ? (item.count / analytics.totalTasks) * 100
                            : 0;

                        return (
                          <div key={item.status}>
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">
                                {item.status}
                              </span>

                              <span className="text-sm text-gray-500">
                                {item.count}
                              </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                              <div
                                className="h-full rounded-full bg-[#29473b]"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {/* Invoice Status */}
              <div className="mt-6">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#26352e]">
                      Invoice Status
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Overview of paid and unpaid invoice amounts.
                    </p>
                  </div>

                  <div className="mt-6 space-y-5">
                    {invoiceChartData.map((item) => {
                      const percentage =
                        analytics.totalAmount > 0
                          ? (item.amount / analytics.totalAmount) * 100
                          : 0;

                      return (
                        <div key={item.status}>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">
                              {item.status}
                            </span>

                            <span className="text-sm text-gray-500">
                              {formatAmount(item.amount)}
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className={`h-full rounded-full ${
                                item.status === "Paid"
                                  ? "bg-[#29473b]"
                                  : "bg-gray-400"
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* Project Status */}
              <div className="mt-6">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#26352e]">
                      Project Status
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Overview of your current project activity.
                    </p>
                  </div>

                  <div className="mt-6 space-y-5">
                    {projectChartData.map((item) => {
                      const percentage =
                        analytics.totalProjects > 0
                          ? (item.count / analytics.totalProjects) * 100
                          : 0;

                      return (
                        <div key={item.status}>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">
                              {item.status}
                            </span>

                            <span className="text-sm text-gray-500">
                              {item.count}
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className="h-full rounded-full bg-[#29473b]"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* Team Status */}
              <div className="mt-6">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#26352e]">
                      Team Status
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Overview of your current team members.
                    </p>
                  </div>

                  <div className="mt-6 space-y-5">
                    {teamChartData.map((item) => {
                      const totalTeamMembers =
                        analytics.activeTeamMembers +
                        analytics.inactiveTeamMembers;

                      const percentage =
                        totalTeamMembers > 0
                          ? (item.count / totalTeamMembers) * 100
                          : 0;

                      return (
                        <div key={item.status}>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">
                              {item.status}
                            </span>

                            <span className="text-sm text-gray-500">
                              {item.count}
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className="h-full rounded-full bg-[#29473b]"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
              Unable to load analytics.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
