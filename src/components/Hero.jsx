export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f5f4ee] px-6 pb-20 pt-24 sm:pb-28 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-[#26352e]/10 bg-white/60 px-4 py-2">
            <span className="mr-2 h-2 w-2 rounded-full bg-[#29473b]" />

            <span className="text-sm font-medium text-[#26352e]">
              Built for modern businesses
            </span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-[#26352e] sm:text-6xl lg:text-7xl">
            Run your business from
            <span className="block text-[#29473b]">
              one powerful platform.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#26352e]/65 sm:text-xl">
            Nexus brings clients, projects, tasks, invoices, and business
            insights together in one simple workspace.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/signup"
              className="w-full rounded-xl bg-[#26352e] px-7 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#29473b] sm:w-auto"
            >
              Start using Nexus
            </a>

            <a
              href="#features"
              className="w-full rounded-xl border border-[#26352e]/15 bg-white/60 px-7 py-3.5 text-center text-sm font-semibold text-[#26352e] transition hover:bg-white sm:w-auto"
            >
              Explore features
            </a>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mx-auto mt-20 max-w-6xl">
          <div className="overflow-hidden rounded-2xl border border-[#26352e]/10 bg-white shadow-2xl shadow-[#26352e]/10">
            
            {/* Browser Bar */}
            <div className="flex items-center gap-2 border-b border-[#26352e]/10 px-5 py-4">
              <div className="h-3 w-3 rounded-full bg-[#26352e]/20" />
              <div className="h-3 w-3 rounded-full bg-[#26352e]/20" />
              <div className="h-3 w-3 rounded-full bg-[#26352e]/20" />

              <div className="ml-4 h-7 flex-1 rounded-lg bg-[#f5f4ee]" />
            </div>

            {/* Dashboard */}
            <div className="grid min-h-[420px] grid-cols-1 md:grid-cols-[210px_1fr]">
              
              {/* Sidebar */}
              <aside className="hidden border-r border-[#26352e]/10 bg-[#26352e] p-5 md:block">
                <div className="mb-10 text-lg font-bold text-white">
                  Nexus
                </div>

                <div className="space-y-2">
                  <div className="rounded-lg bg-white/10 px-4 py-3 text-sm text-white">
                    Overview
                  </div>

                  <div className="px-4 py-3 text-sm text-white/60">
                    Clients
                  </div>

                  <div className="px-4 py-3 text-sm text-white/60">
                    Projects
                  </div>

                  <div className="px-4 py-3 text-sm text-white/60">
                    Tasks
                  </div>

                  <div className="px-4 py-3 text-sm text-white/60">
                    Invoices
                  </div>
                </div>
              </aside>

              {/* Main Dashboard */}
              <div className="bg-[#f8f8f4] p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#26352e]/50">
                      Overview
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-[#26352e]">
                      Good morning, Suleman
                    </h2>
                  </div>

                  <div className="hidden rounded-lg border border-[#26352e]/10 bg-white px-4 py-2 text-sm text-[#26352e]/60 sm:block">
                    This month
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-[#26352e]/10 bg-white p-5">
                    <p className="text-sm text-[#26352e]/50">
                      Revenue
                    </p>

                    <p className="mt-2 text-2xl font-bold text-[#26352e]">
                      $48,290
                    </p>

                    <p className="mt-2 text-xs text-[#29473b]">
                      +12.5% this month
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#26352e]/10 bg-white p-5">
                    <p className="text-sm text-[#26352e]/50">
                      Projects
                    </p>

                    <p className="mt-2 text-2xl font-bold text-[#26352e]">
                      24
                    </p>

                    <p className="mt-2 text-xs text-[#29473b]">
                      8 active
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#26352e]/10 bg-white p-5">
                    <p className="text-sm text-[#26352e]/50">
                      Tasks
                    </p>

                    <p className="mt-2 text-2xl font-bold text-[#26352e]">
                      86%
                    </p>

                    <p className="mt-2 text-xs text-[#29473b]">
                      Completion rate
                    </p>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="mt-5 rounded-xl border border-[#26352e]/10 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[#26352e]">
                      Revenue overview
                    </p>

                    <span className="text-xs text-[#26352e]/40">
                      Last 6 months
                    </span>
                  </div>

                  <div className="mt-6 flex h-32 items-end gap-3">
                    <div className="h-[35%] flex-1 rounded-t-md bg-[#29473b]/20" />
                    <div className="h-[50%] flex-1 rounded-t-md bg-[#29473b]/30" />
                    <div className="h-[42%] flex-1 rounded-t-md bg-[#29473b]/25" />
                    <div className="h-[65%] flex-1 rounded-t-md bg-[#29473b]/40" />
                    <div className="h-[78%] flex-1 rounded-t-md bg-[#29473b]/50" />
                    <div className="h-[92%] flex-1 rounded-t-md bg-[#29473b]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}