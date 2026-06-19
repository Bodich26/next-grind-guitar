import Link from "next/link";
import { PUBLIC_ROUTES } from "@/../routes";
import { cn } from "../lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href={PUBLIC_ROUTES.HOME}
      className={cn("inline-flex items-center gap-3", className)}
    >
      <span className="w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center text-3xl shadow-xl shadow-violet-500/30">
        🎸
      </span>
      <span className="text-3xl font-bold">Grind Guitar</span>
    </Link>
  );
};
