import AnimatedCard from "./AnimatedCard";
import { useMode } from "@/contexts/ModeContext";
import { Search, Filter, MoreHorizontal } from "lucide-react";

const users = [
  { name: "Sarah Johnson", email: "sarah.j@company.com", role: "Admin", status: "Active", spent: "$12,400" },
  { name: "Mike Chen", email: "mike.c@company.com", role: "Editor", status: "Active", spent: "$8,200" },
  { name: "Emily Davis", email: "emily.d@company.com", role: "Viewer", status: "Inactive", spent: "$3,100" },
  { name: "James Wilson", email: "james.w@company.com", role: "Editor", status: "Active", spent: "$15,800" },
  { name: "Lisa Anderson", email: "lisa.a@company.com", role: "Admin", status: "Active", spent: "$22,500" },
  { name: "Robert Taylor", email: "robert.t@company.com", role: "Viewer", status: "Pending", spent: "$900" },
  { name: "Anna Martinez", email: "anna.m@company.com", role: "Editor", status: "Active", spent: "$6,700" },
  { name: "David Brown", email: "david.b@company.com", role: "Viewer", status: "Active", spent: "$4,300" },
];

// Standard colors
const statusColors: Record<string, string> = {
  Active: "bg-success/15 text-success",
  Inactive: "bg-muted text-muted-foreground",
  Pending: "bg-warning/15 text-warning",
};

const roleColors: Record<string, string> = {
  Admin: "bg-primary/15 text-primary",
  Editor: "bg-info/15 text-info",
  Viewer: "bg-muted text-muted-foreground",
};

const avatarColors = [
  "bg-primary text-primary-foreground",
  "bg-success text-success-foreground",
  "bg-warning text-foreground",
  "bg-info text-primary-foreground",
];

// Premium colors
const premiumAvatarColors: Record<string, string> = {
  Admin: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white",
  Editor: "bg-gradient-to-r from-green-400 to-teal-500 text-white",
  Viewer: "bg-gradient-to-r from-yellow-400 to-orange-400 text-white",
};

const premiumRoleColors: Record<string, string> = {
  Admin: "bg-purple-500/20 text-purple-600",
  Editor: "bg-green-400/20 text-green-600",
  Viewer: "bg-yellow-400/20 text-yellow-600",
};

const premiumStatusColors: Record<string, string> = {
  Active: "bg-green-500/20 text-green-700",
  Inactive: "bg-gray-400/20 text-gray-700",
  Pending: "bg-yellow-400/20 text-yellow-700",
};

const UsersView = () => {
  const { isPremium } = useMode();

  return (
    <div className="space-y-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: "1,284" },
          { label: "Active Now", value: "342" },
          { label: "New This Month", value: "89" },
          { label: "Churn Rate", value: "2.4%" },
        ].map((m, i) => (
          <AnimatedCard key={i} delay={i * 0.05}>
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className="text-xl font-bold text-foreground mt-1">{m.value}</p>
          </AnimatedCard>
        ))}
      </div>

      {/* Users Table */}
      <AnimatedCard delay={0.15}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-sm font-semibold text-foreground">All Users</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
              <Search size={14} className="text-muted-foreground" />
              <input
                className="bg-transparent text-xs outline-none w-32 placeholder:text-muted-foreground"
                placeholder="Search users..."
              />
            </div>
            <button className="p-1.5 rounded-lg bg-muted">
              <Filter size={14} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2.5 font-medium text-muted-foreground">User</th>
                <th className="text-left py-2.5 font-medium text-muted-foreground">Role</th>
                <th className="text-left py-2.5 font-medium text-muted-foreground">Status</th>
                <th className="text-right py-2.5 font-medium text-muted-foreground">Spent</th>
                <th className="py-2.5 w-8" />
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr
                  key={i}
                  className={`border-b border-border last:border-0 ${
                    isPremium ? "transition-colors duration-150 hover:bg-muted/50" : ""
                  }`}
                >
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold ${
                          isPremium
                            ? premiumAvatarColors[u.role]
                            : avatarColors[i % avatarColors.length]
                        }`}
                      >
                        {u.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{u.name}</p>
                        <p className="text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        isPremium ? premiumRoleColors[u.role] : roleColors[u.role]
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        isPremium ? premiumStatusColors[u.status] : statusColors[u.status]
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="text-right font-medium text-foreground">{u.spent}</td>
                  <td>
                    <MoreHorizontal size={14} className="text-muted-foreground cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list */}
        <div className="md:hidden space-y-3">
          {users.map((u, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    isPremium
                      ? premiumAvatarColors[u.role]
                      : avatarColors[i % avatarColors.length]
                  }`}
                >
                  {u.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">{u.name}</p>
                  <p className="text-[11px]">
                    <span className={`px-1 py-0.5 rounded-full text-[10px] font-medium ${
                      isPremium ? premiumRoleColors[u.role] : roleColors[u.role]
                    }`}>
                      {u.role}
                    </span>{" · "}
                    <span className={`px-1 py-0.5 rounded-full text-[10px] font-medium ${
                      isPremium ? premiumStatusColors[u.status] : statusColors[u.status]
                    }`}>
                      {u.status}
                    </span>
                  </p>
                </div>
              </div>
              <p className="text-xs font-semibold text-foreground">{u.spent}</p>
            </div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
};

export default UsersView;