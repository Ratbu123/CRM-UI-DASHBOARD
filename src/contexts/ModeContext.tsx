import { createContext, useContext, useState, ReactNode } from "react";

type Mode = "standard" | "premium";

interface ModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  isPremium: boolean;
}

const ModeContext = createContext<ModeContextType>({
  mode: "premium",
  setMode: () => {},
  isPremium: true,
});

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>("premium");
  return (
    <ModeContext.Provider value={{ mode, setMode, isPremium: mode === "premium" }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => useContext(ModeContext);
