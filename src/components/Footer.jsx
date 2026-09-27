const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Dashboard", href: "/dashboard" },
  ],

  Company: [
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
    { label: "Careers", href: "#" },
  ],

  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Privacy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#f5f4ee] px-6 pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-[#26352e]/10 pb-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          
          {/* Brand */}
          <div>
            <a
              href="/"
              className="text-2xl font-bold tracking-tight text-[#26352e]"
            >
              Nexus
            </a>

            <p className="mt-4 max-w-sm text-sm leading-7 text-[#26352e]/55">
              A modern business operations platform designed to help
              teams organize work, manage clients, and understand
              performance.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-[#26352e]">
                {category}
              </h3>

              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#26352e]/55 transition hover:text-[#26352e]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 py-7 text-sm text-[#26352e]/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 Nexus. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="transition hover:text-[#26352e]"
            >
              Privacy
            </a>

            <a
              href="#"
              className="transition hover:text-[#26352e]"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}