const steps = [
  {
    number: "01",
    title: "Add your business",
    description:
      "Create your Nexus workspace and add the clients, projects, and team members you work with.",
  },
  {
    number: "02",
    title: "Organize your work",
    description:
      "Turn your projects into tasks, assign responsibilities, set priorities, and track deadlines.",
  },
  {
    number: "03",
    title: "Track performance",
    description:
      "Use your dashboard to understand revenue, project progress, outstanding invoices, and team activity.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="about"
      className="bg-[#f5f4ee] px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          
          {/* Left side */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#29473b]">
              How it works
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#26352e] sm:text-5xl">
              Simple enough to use.
              <span className="block text-[#29473b]">
                Powerful enough to grow with you.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-8 text-[#26352e]/60">
              Nexus brings the most important parts of your business
              workflow together without making your team learn a
              complicated system.
            </p>
          </div>

          {/* Right side */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative flex gap-6 border-b border-[#26352e]/10 py-8 first:pt-0 last:border-b-0"
              >
                {/* Number */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#26352e] text-sm font-semibold text-white">
                  {step.number}
                </div>

                {/* Connector */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-6 top-20 h-8 w-px bg-[#26352e]/15" />
                )}

                {/* Content */}
                <div>
                  <h3 className="text-xl font-semibold text-[#26352e]">
                    {step.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-7 text-[#26352e]/60">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}