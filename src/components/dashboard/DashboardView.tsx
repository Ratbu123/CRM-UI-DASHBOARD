import AnimatedCard from "./AnimatedCard";
import { useMode } from "@/contexts/ModeContext";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";

const salesData = [
  { month: "Jan", value: 30000 },
  { month: "Feb", value: 35000 },
  { month: "Mar", value: 48200 },
  { month: "Apr", value: 38000 },
  { month: "May", value: 32000 },
  { month: "Jun", value: 36000 },
  { month: "Jul", value: 40000 },
];

const incomeData = [
  { name: "Marketing Channels", value: 22000, color: "hsl(240,60%,65%)" },
  { name: "Direct Sales", value: 8400, color: "hsl(340,70%,65%)" },
  { name: "Offline Channels", value: 18400, color: "hsl(210,80%,60%)" },
  { name: "Other Channels", value: 15300, color: "hsl(25,90%,60%)" },
];

const incomeBarData = [
  { month: "Mar 01", value: 48200 },
  { month: "Mar 05", value: 32000 },
  { month: "Mar 10", value: 41000 },
];

const latestEvents = [
  { type: "Invoice", id: "RAA-06-19-1890678", sub: "New Middleton LLC.", amount: "$118.00", date: "" },
  { type: "Client", id: "Bernard Stanley", sub: "bernard.stanley@gmail.com", amount: "$1208.00", date: "" },
  { type: "Meeting", id: "Meeting with the client", sub: "24 Vandervort Springs", amount: "", date: "29 Oct 2019" },
  { type: "Invoice", id: "RAA-04-19-190043", sub: "Tyriquemouth LLC.", amount: "$578.00", date: "" },
];

const eventColors: Record<string, string> = {
  Invoice: "bg-primary/20 text-primary",
  Client: "bg-success/20 text-success",
  Meeting: "bg-warning/20 text-warning",
};

const TimePeriodTabs = ({ active = "Month" }: { active?: string }) => (
  <div className="flex gap-1 bg-muted rounded-lg p-0.5 text-[11px]">
    {["Day", "Week", "Month"].map((t) => (
      <button
        key={t}
        className={`px-2.5 py-1 rounded-md font-medium ${
          t === active ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
        }`}
      >
        {t}
      </button>
    ))}
  </div>
);

const DashboardView = () => {
  const { isPremium } = useMode();

  return (
    <div className="space-y-5">
      {/* Top row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Sales Chart */}
        <AnimatedCard className="lg:col-span-3" delay={0}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-foreground">Your Sales</h3>
            <TimePeriodTabs />
          </div>
          <p className="text-2xl font-bold text-foreground">$142.000</p>
          <p className="text-xs text-muted-foreground mb-3">Total Income</p>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(240,60%,65%)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(240,60%,65%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(228,10%,50%)" }} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid hsl(228,20%,91%)", fontSize: 12 }}
                  formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="value" stroke="hsl(240,60%,65%)" strokeWidth={2.5} fill="url(#salesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>

        {/* Latest Events */}
        <AnimatedCard className="lg:col-span-2" delay={0.1}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Latest Events</h3>
            <span className="text-xs text-primary font-medium cursor-pointer">View all</span>
          </div>
          <div className="space-y-3">
            {latestEvents.map((ev, i) => (
              <div key={i} className={`flex items-center justify-between ${isPremium ? "transition-colors duration-150 hover:bg-muted/50 -mx-2 px-2 rounded-lg" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${eventColors[ev.type] || "bg-muted text-muted-foreground"}`}>
                    {ev.type[0]}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{ev.id}</p>
                    <p className="text-[11px] text-muted-foreground">{ev.sub}</p>
                  </div>
                </div>
                <div className="text-right">
                  {ev.amount && <p className="text-xs font-semibold text-foreground">{ev.amount}</p>}
                  {ev.date && <p className="text-[11px] text-muted-foreground">{ev.date}</p>}
                  <span className="text-[11px] text-primary cursor-pointer">Details</span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Income Breakdown */}
        <AnimatedCard delay={0.2}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Income Breakdown</h3>
            <TimePeriodTabs active="Day" />
          </div>
          <div className="flex items-center gap-6">
            <div className="w-[160px] h-[160px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={incomeData} cx="50%" cy="50%" innerRadius={50} outerRadius={72} paddingAngle={3} dataKey="value">
                    {incomeData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-foreground">$85k</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
              {incomeData.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  <div>
                    <p className="text-muted-foreground">{d.name}</p>
                    <p className="font-semibold text-foreground">${(d.value / 1000).toFixed(1)}k</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedCard>

        {/* Income Details */}
        <AnimatedCard delay={0.3}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-foreground">Income Details</h3>
            <TimePeriodTabs active="Week" />
          </div>
          <p className="text-2xl font-bold text-foreground">$142.000 <span className="text-xs text-success font-medium">↑</span></p>
          <p className="text-xs text-muted-foreground mb-3">Total Income</p>
          <div className="h-[120px] mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeBarData} barCategoryGap="30%">
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(228,10%,50%)" }} />
                <YAxis hide />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="hsl(152,60%,82%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-foreground">$142.000</p>
              <p className="text-[11px] text-muted-foreground">Total sales</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">$200.000</p>
              <p className="text-[11px] text-muted-foreground">Topsellings</p>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">$142.000</p>
              <p className="text-[11px] text-muted-foreground">Income</p>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default DashboardView;
