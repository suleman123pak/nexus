const plans = [
  {
    name: "Starter",
    description: "For individuals and small businesses getting organized.",
    price: "$19",
    period: "/month",
    features: [
      "Up to 3 team members",
      "Client management",
      "Project management",
      "Task management",
      "Basic dashboard",
    ],
    button: "Start with Starter",
    featured: false,
  },
  {
    name: "Growth",
    description: "For growing teams that need more control and visibility.",
    price: "$49",
    period: "/month",
    features: [
      "Up to 15 team members",
      "Everything in Starter",
      "Invoices & payments",
      "Business analytics",
      "Team collaboration",
      "Advanced dashboard",
    ],
    button: "Start with Growth",
    featured: true,
  },
  {
    name: "Business",
    description: "For established businesses managing complex operations.",
    price: "$99",
    period: "/month",
    features: [
      "Unlimited team members",
      "Everything in Growth",
      "Advanced analytics",
      "Priority support",
      "Custom workflows",
      "Business reporting",
    ],
    button: "Choose Business",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="bg-white px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#29473b]">
            Simple pricing
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#26352e] sm:text-5xl">
            Choose the plan that fits your business.
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#26352e]/60">
            Start with the tools you need today and upgrade as your
            business grows.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-2xl border p-8 ${
                plan.featured
                  ? "border-[#26352e] bg-[#26352e] text-white shadow-xl"
                  : "border-[#26352e]/10 bg-[#f5f4ee]"
              }`}
            >
              {/* Popular badge */}
              {plan.featured && (
                <div className="absolute right-6 top-6 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </div>
              )}

              <h3
                className={`text-xl font-semibold ${
                  plan.featured
                    ? "text-white"
                    : "text-[#26352e]"
                }`}
              >
                {plan.name}
              </h3>

              <p
                className={`mt-3 min-h-[56px] text-sm leading-6 ${
                  plan.featured
                    ? "text-white/65"
                    : "text-[#26352e]/60"
                }`}
              >
                {plan.description}
              </p>

              {/* Price */}
              <div className="mt-8 flex items-end">
                <span
                  className={`text-5xl font-bold tracking-tight ${
                    plan.featured
                      ? "text-white"
                      : "text-[#26352e]"
                  }`}
                >
                  {plan.price}
                </span>

                <span
                  className={`mb-1 ml-2 text-sm ${
                    plan.featured
                      ? "text-white/50"
                      : "text-[#26352e]/50"
                  }`}
                >
                  {plan.period}
                </span>
              </div>

              {/* Button */}
              <button
                className={`mt-8 w-full rounded-xl px-5 py-3.5 text-sm font-semibold transition ${
                  plan.featured
                    ? "bg-white text-[#26352e] hover:bg-[#f5f4ee]"
                    : "bg-[#26352e] text-white hover:bg-[#29473b]"
                }`}
              >
                {plan.button}
              </button>

              {/* Features */}
              <div
                className={`my-8 h-px ${
                  plan.featured
                    ? "bg-white/10"
                    : "bg-[#26352e]/10"
                }`}
              />

              <p
                className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                  plan.featured
                    ? "text-white/50"
                    : "text-[#26352e]/40"
                }`}
              >
                Includes
              </p>

              <ul className="mt-5 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3"
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${
                        plan.featured
                          ? "bg-white/10 text-white"
                          : "bg-[#26352e]/5 text-[#29473b]"
                      }`}
                    >
                      ✓
                    </span>

                    <span
                      className={`text-sm ${
                        plan.featured
                          ? "text-white/75"
                          : "text-[#26352e]/65"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}