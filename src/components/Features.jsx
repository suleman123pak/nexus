const features = [
  {
    number: "01",
    title: "Client Management",
    description:
      "Keep every client, contact, note, and project relationship organized in one place.",
  },
  {
    number: "02",
    title: "Project Management",
    description:
      "Create projects, set deadlines, track progress, and keep your team aligned.",
  },
  {
    number: "03",
    title: "Task Management",
    description:
      "Turn projects into actionable tasks with priorities, statuses, and assignments.",
  },
  {
    number: "04",
    title: "Invoices & Payments",
    description:
      "Create invoices, monitor outstanding payments, and understand your financial position.",
  },
  {
    number: "05",
    title: "Business Analytics",
    description:
      "See revenue, project performance, task completion, and other important business metrics.",
  },
  {
    number: "06",
    title: "Team Collaboration",
    description:
      "Give team members the right access and keep important business activity visible.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-white px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#29473b]">
            Everything in one place
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#26352e] sm:text-5xl">
            Everything your business needs to stay organized.
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#26352e]/60">
            Nexus gives you a single workspace for managing the
            operational side of your business.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[#26352e]/10 bg-[#26352e]/10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="bg-white p-8 transition hover:bg-[#f5f4ee]"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#29473b]">
                  {feature.number}
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f4ee] text-[#26352e]">
                  →
                </span>
              </div>

              <h3 className="mt-10 text-xl font-semibold text-[#26352e]">
                {feature.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#26352e]/60">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}