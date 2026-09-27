"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function DashboardSidebar({ user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    {
      title: "Workspace",
      items: [
        { name: "Overview", href: "/dashboard" },
        { name: "Clients", href: "/dashboard/clients" },
        { name: "Projects", href: "/dashboard/projects" },
        { name: "Tasks", href: "/dashboard/tasks" },
        { name: "Invoices", href: "/dashboard/invoices" },
      ],
    },
    {
      title: "Manage",
      items: [
        { name: "Team", href: "/dashboard/team" },
        { name: "Analytics", href: "/dashboard/analytics" },
        { name: "Settings", href: "/dashboard/settings" },
      ],
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 bg-[#26352e] text-white md:flex md:flex-col">
        {/* Logo */}
        <div className="border-b border-white/10 px-6 py-6">
          <a href="/" className="text-2xl font-bold tracking-tight">
            Nexus
          </a>

          <p className="mt-1 text-xs text-white/50">
            Business workspace
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <p
                className={`mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-white/40 ${
                  section.title === "Manage" ? "mt-8" : ""
                }`}
              >
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive =
                    item.href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname.startsWith(item.href);

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`flex items-center rounded-lg px-3 py-2.5 text-sm transition ${
                        isActive
                          ? "bg-white/10 font-medium text-white"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar User */}
        <div className="border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-3">
            <p className="truncate text-sm font-medium text-white">
              {user?.name || "User"}
            </p>

            <p className="mt-1 truncate text-xs text-white/50">
              {user?.email || ""}
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#26352e] px-5 py-4 text-white md:hidden">
        <div>
          <a href="/" className="text-lg font-bold tracking-tight">
            Nexus
          </a>

          <p className="text-xs text-white/50">
            Business workspace
          </p>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="rounded-lg border border-white/20 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
        >
          Menu
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 h-full w-full bg-black/40"
          />

          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-72 overflow-y-auto bg-[#26352e] text-white shadow-xl">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
              <div>
                <a
                  href="/"
                  className="text-lg font-bold tracking-tight"
                >
                  Nexus
                </a>

                <p className="mt-1 text-xs text-white/50">
                  Business workspace
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl leading-none text-white/50 transition hover:text-white"
              >
                ×
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="px-4 py-6">
              {navigation.map((section) => (
                <div key={section.title}>
                  <p
                    className={`mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-white/40 ${
                      section.title === "Manage" ? "mt-8" : ""
                    }`}
                  >
                    {section.title}
                  </p>

                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const isActive =
                        item.href === "/dashboard"
                          ? pathname === "/dashboard"
                          : pathname.startsWith(item.href);

                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center rounded-lg px-3 py-3 text-sm transition ${
                            isActive
                              ? "bg-white/10 font-medium text-white"
                              : "text-white/60 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {item.name}
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* Mobile User */}
            <div className="border-t border-white/10 p-4">
              <div className="rounded-xl bg-white/5 p-3">
                <p className="truncate text-sm font-medium text-white">
                  {user?.name || "User"}
                </p>

                <p className="mt-1 truncate text-xs text-white/50">
                  {user?.email || ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}