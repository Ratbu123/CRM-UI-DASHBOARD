import { useMode } from "@/contexts/ModeContext";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedCard = ({ children, className = "", delay = 0 }: AnimatedCardProps) => {
  const { isPremium } = useMode();

  if (!isPremium) {
    return <div className={`bg-card rounded-xl border border-border p-5 ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={{ y: -2, boxShadow: "0 8px 30px -12px hsl(var(--primary) / 0.15)" }}
      className={`bg-card rounded-xl border border-border p-5 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
