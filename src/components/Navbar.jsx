export default function Navbar() {
  return (
    <header className="border-b border-[#26352e]/10 bg-[#f5f4ee]/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        
        {/* Logo */}
        <div>
          <a
            href="/"
            className="text-2xl font-bold tracking-tight text-[#26352e]"
          >
            Nexus
          </a>
        </div>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-[#26352e]/70 transition hover:text-[#26352e]"
          >
            Features
          </a>

          <a
            href="#about"
            className="text-sm font-medium text-[#26352e]/70 transition hover:text-[#26352e]"
          >
            About
          </a>

          <a
            href="#pricing"
            className="text-sm font-medium text-[#26352e]/70 transition hover:text-[#26352e]"
          >
            Pricing
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-[#26352e] transition hover:bg-[#26352e]/5 sm:block"
          >
            Log in
          </a>

          <a
            href="/signup"
            className="rounded-lg bg-[#26352e] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#29473b]"
          >
            Get Started
          </a>
        </div>

      </nav>
    </header>
  );
}