export default function CTA() {
  return (
    <section className="bg-[#26352e] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/50">
          Get started with Nexus
        </p>

        <h2 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Your business.
          <span className="block text-[#dfe7df]">
            One powerful workspace.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
          Bring your clients, projects, tasks, invoices, and business
          insights together with Nexus.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="w-full rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-[#26352e] transition hover:bg-[#f5f4ee] sm:w-auto">
            Start using Nexus
          </button>

          <button className="w-full rounded-xl border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto">
            Contact us
          </button>
        </div>
      </div>
    </section>
  );
}