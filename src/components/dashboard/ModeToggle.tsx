import { useEffect } from "react";
import { useMode } from "@/contexts/ModeContext";

const ModeToggle = () => {
  const { mode, setMode } = useMode();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Toggle global CSS/Tailwind animations
      document.body.classList.toggle("disable-animations", mode === "standard");

      // Store the mode in localStorage so charts/other components can access
      localStorage.setItem("dashboardMode", mode);
    }
  }, [mode]);

  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
      <button
        onClick={() => setMode("standard")}
        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
          mode === "standard"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground"
        }`}
      >
        Standard
      </button>
      <button
        onClick={() => setMode("premium")}
        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
          mode === "premium"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground"
        }`}
      >
        Premium
      </button>
    </div>
  );
};

export default ModeToggle;