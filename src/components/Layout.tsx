import { Outlet } from "react-router-dom";
import ModernNavigation from "./ModernNavigation";
import ModernFooter from "./ModernFooter";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <ModernNavigation />
      <Outlet />
      <ModernFooter />
    </div>
  );
}
