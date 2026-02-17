const Footer = () => (
  <footer className="py-8 px-6 border-t border-border">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="text-lg font-display font-bold text-primary">SAPIVI</span>
        <span className="text-xs text-muted-foreground">ISO 9001:2015</span>
      </div>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Sapivi. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
