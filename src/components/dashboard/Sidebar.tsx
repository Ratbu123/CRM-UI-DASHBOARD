import { useMode } from "@/contexts/ModeContext";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  Bell,
  Calendar,
  FileText,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";

export type NavItem = "dashboard" | "analytics" | "users" | "settings";

interface SidebarProps {
  active: NavItem;
  onNavigate: (item: NavItem) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const navItems: { id: NavItem; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

const secondaryItems = [
  { label: "Notifications", icon: Bell },
  { label: "Calendar", icon: Calendar },
  { label: "Documents", icon: FileText },
  { label: "Messages", icon: MessageSquare },
];

const updates = [
  { text: "Item sale #340.00", detail: "+$890.00", time: "" },
  { text: "New lead created", detail: "30 min", time: "" },
  { text: "Item sale #360.20", detail: "+$940.00", time: "" },
  { text: "Items upload complete", detail: "45 min", time: "" },
  { text: "Email notifications sent", detail: "2 hrs", time: "" },
];

const events = [
  { time: "09:00AM", title: "Meeting with a client", desc: "Talk to boost website traffic" },
  { time: "10:30AM", title: "New project discussion", desc: "Business Cards & Logo" },
];

const Sidebar = ({ active, onNavigate, mobileOpen, onMobileClose }: SidebarProps) => {
  const { isPremium } = useMode();
  const transClass = isPremium ? "transition-all duration-200" : "";

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-foreground/30 z-40 lg:hidden" onClick={onMobileClose} />
      )}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[260px] bg-sidebar text-sidebar-foreground flex flex-col
          lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"} ${transClass} scrollbar-hidden overflow-y-auto`}
      >
        <button className="absolute top-4 right-4 lg:hidden" onClick={onMobileClose}>
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="px-6 pt-6 pb-4">
          <div className="w-12 h-12 rounded-xl bg-sidebar-active/20 flex items-center justify-center text-xl font-bold">
            C
          </div>
          <p className="mt-4 text-sm opacity-80">Welcome,</p>
          <p className="text-lg font-bold tracking-wide">CRAFTUI</p>
        </div>

        {/* Nav */}
        <nav className="px-3 flex-1 space-y-1">
          <p className="px-3 text-[10px] uppercase tracking-wider opacity-60 mb-2">Main</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); onMobileClose(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${transClass}
                  ${isActive ? "bg-sidebar-active/20 text-sidebar-active" : "opacity-70 hover:opacity-100 hover:bg-sidebar-active/10"}`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}

          <p className="px-3 pt-4 text-[10px] uppercase tracking-wider opacity-60 mb-2">Other</p>
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm opacity-70 hover:opacity-100 hover:bg-sidebar-active/10 ${transClass}`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}

          {/* Latest Updates */}
          <div className="mt-6 px-1">
            <p className="text-[10px] uppercase tracking-wider opacity-60 mb-3">Latest updates</p>
            <div className="space-y-2">
              {updates.map((u, i) => (
                <div key={i} className="flex items-center justify-between bg-sidebar-active/10 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-sidebar-active/50" />
                    <span className="text-xs">{u.text}</span>
                  </div>
                  <span className="text-[10px] opacity-60">{u.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mt-5 px-1 pb-6">
            <p className="text-[10px] uppercase tracking-wider opacity-60 mb-3">Upcoming events</p>
            <div className="space-y-2">
              {events.map((e, i) => (
                <div key={i} className="bg-sidebar-active/10 rounded-lg px-3 py-2">
                  <p className="text-[10px] opacity-60 mb-0.5">{e.time}</p>
                  <p className="text-xs font-medium">{e.title}</p>
                  <p className="text-[10px] opacity-60">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export const MobileMenuButton = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="lg:hidden p-2 rounded-lg hover:bg-muted">
    <Menu size={20} />
  </button>
);

export default Sidebar;
