import AnimatedCard from "./AnimatedCard";
import { useMode } from "@/contexts/ModeContext";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area,
} from "recharts";
import { TrendingUp, TrendingDown, Eye, MousePointerClick, Clock } from "lucide-react";

const trafficData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  visitors: Math.floor(8000 + Math.random() * 12000),
  pageViews: Math.floor(15000 + Math.random() * 20000),
}));

const conversionData = Array.from({ length: 7 }, (_, i) => ({
  day: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i],
  rate: +(2 + Math.random() * 4).toFixed(1),
}));

const sourceData = [
  { source: "Google", sessions: 14520, pct: 42 },
  { source: "Direct", sessions: 8230, pct: 24 },
  { source: "Social", sessions: 6100, pct: 18 },
  { source: "Referral", sessions: 3800, pct: 11 },
  { source: "Email", sessions: 1700, pct: 5 },
];

const metrics = [
  { label: "Total Visitors", value: "34,350", change: "+12.5%", up: true, icon: Eye },
  { label: "Click Rate", value: "4.8%", change: "+0.6%", up: true, icon: MousePointerClick },
  { label: "Avg. Duration", value: "3m 42s", change: "-8s", up: false, icon: Clock },
  { label: "Bounce Rate", value: "32.1%", change: "-2.3%", up: true, icon: TrendingDown },
];

const AnalyticsView = () => {
  const { isPremium } = useMode();

  return (
    <div className="space-y-5">
      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <AnimatedCard key={i} delay={i * 0.05}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                  <Icon size={16} className="text-accent-foreground" />
                </div>
                <span className="text-xs text-muted-foreground">{m.label}</span>
              </div>
              <p className="text-xl font-bold text-foreground">{m.value}</p>
              <p className={`text-xs font-medium ${m.up ? "text-success" : "text-destructive"}`}>
                {m.change}
              </p>
            </AnimatedCard>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <AnimatedCard className="lg:col-span-2" delay={0.15}>
          <h3 className="text-sm font-semibold text-foreground mb-4">Traffic Overview</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(240,60%,65%)" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="hsl(240,60%,65%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(228,10%,50%)" }} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(228,20%,91%)", fontSize: 12 }} />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="hsl(240,60%,65%)"
                  strokeWidth={2}
                  fill="url(#aGrad)"
                  isAnimationActive={isPremium} // ✅ animation controlled here
                />
                <Area
                  type="monotone"
                  dataKey="pageViews"
                  stroke="hsl(152,60%,52%)"
                  strokeWidth={2}
                  fill="transparent"
                  isAnimationActive={isPremium} // ✅ animation controlled here
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.2}>
          <h3 className="text-sm font-semibold text-foreground mb-4">Conversion Rate</h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(228,10%,50%)" }} />
                <YAxis hide />
                <Bar
                  dataKey="rate"
                  radius={[6, 6, 0, 0]}
                  fill="hsl(240,60%,65%)"
                  isAnimationActive={isPremium} // ✅ animation controlled here
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AnimatedCard>
      </div>

      {/* Traffic Sources */}
      <AnimatedCard delay={0.25}>
        <h3 className="text-sm font-semibold text-foreground mb-4">Traffic Sources</h3>
        <div className="space-y-3">
          {sourceData.map((s, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="w-16 text-xs font-medium text-foreground">{s.source}</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${s.pct}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-16 text-right">{s.sessions.toLocaleString()}</span>
              <span className="text-xs font-medium text-foreground w-10 text-right">{s.pct}%</span>
            </div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
};

export default AnalyticsView;