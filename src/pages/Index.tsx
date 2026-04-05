import { useState } from "react";
import { ModeProvider } from "@/contexts/ModeContext";
import ModeToggle from "@/components/dashboard/ModeToggle";
import Sidebar, { MobileMenuButton, type NavItem } from "@/components/dashboard/Sidebar";
import DashboardView from "@/components/dashboard/DashboardView";
import AnalyticsView from "@/components/dashboard/AnalyticsView";
import UsersView from "@/components/dashboard/UsersView";
import SettingsView from "@/components/dashboard/SettingsView";
import { Bell, Search } from "lucide-react";

const titles: Record<NavItem, string> = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  users: "Users",
  settings: "Settings",
};

const views: Record<NavItem, React.FC> = {
  dashboard: DashboardView,
  analytics: AnalyticsView,
  users: UsersView,
  settings: SettingsView,
};

const Index = () => {
  const [active, setActive] = useState<NavItem>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const View = views[active];

  return (
    <ModeProvider>
      <div className="min-h-screen bg-background">
        <Sidebar active={active} onNavigate={setActive} mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

        <div className="lg:ml-[260px]">
          {/* Top bar */}
          <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border px-4 lg:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MobileMenuButton onClick={() => setMobileOpen(true)} />
              <h1 className="text-lg font-bold text-foreground">{titles[active]}</h1>
            </div>
            <div className="flex items-center gap-3">
              <ModeToggle />
              <div className="hidden sm:flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
                <Search size={14} className="text-muted-foreground" />
                <input className="bg-transparent text-xs outline-none w-32 placeholder:text-muted-foreground" placeholder="Search..." />
              </div>
              <div className="relative">
                <Bell size={18} className="text-muted-foreground" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-background" />
              </div>
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                JD
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="p-4 lg:p-6">
            <View />
          </main>
        </div>
      </div>
    </ModeProvider>
  );
};

export default Index;
