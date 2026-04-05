import AnimatedCard from "./AnimatedCard";
import { useState } from "react";

const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${checked ? "bg-primary" : "bg-muted"}`}
  >
    <div
      className={`w-4 h-4 rounded-full bg-card absolute top-0.5 transition-transform duration-200 ${
        checked ? "translate-x-5.5 left-0.5" : "left-0.5"
      }`}
      style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }}
    />
  </button>
);

const SettingsView = () => {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Profile */}
      <AnimatedCard delay={0}>
        <h3 className="text-sm font-semibold text-foreground mb-4">Profile Settings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Full Name</label>
            <input className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30" defaultValue="John Doe" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Email</label>
            <input className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30" defaultValue="john@craftui.com" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Company</label>
            <input className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30" defaultValue="CraftUI Inc." />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Role</label>
            <input className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30" defaultValue="Administrator" />
          </div>
        </div>
      </AnimatedCard>

      {/* Notifications */}
      <AnimatedCard delay={0.1}>
        <h3 className="text-sm font-semibold text-foreground mb-4">Notifications</h3>
        <div className="space-y-4">
          {[
            { label: "Push Notifications", desc: "Receive push notifications on your device", checked: notifications, onChange: () => setNotifications(!notifications) },
            { label: "Email Alerts", desc: "Get email alerts for important updates", checked: emailAlerts, onChange: () => setEmailAlerts(!emailAlerts) },
            { label: "Marketing Emails", desc: "Receive tips and product updates", checked: marketing, onChange: () => setMarketing(!marketing) },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <ToggleSwitch checked={item.checked} onChange={item.onChange} />
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Security */}
      <AnimatedCard delay={0.15}>
        <h3 className="text-sm font-semibold text-foreground mb-4">Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Add extra security to your account</p>
            </div>
            <ToggleSwitch checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Auto-Save</p>
              <p className="text-xs text-muted-foreground">Automatically save changes</p>
            </div>
            <ToggleSwitch checked={autoSave} onChange={() => setAutoSave(!autoSave)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Change Password</label>
            <input type="password" className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30" placeholder="••••••••" />
          </div>
        </div>
      </AnimatedCard>

      <button className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold">
        Save Changes
      </button>
    </div>
  );
};

export default SettingsView;
