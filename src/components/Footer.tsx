const Footer = () => (
  <footer className="py-8 px-6 border-t border-border bg-card">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="SAPIVI Logo" className="h-12 w-auto object-contain" />
        <span className="text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">
          ISO 9001:2015
        </span>
      </div>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Sapivi. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
