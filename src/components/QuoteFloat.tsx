import { Link } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";

export function QuoteFloat() {
  const { count } = useQuote();
  if (count <= 0) return null;

  return (
    <Link
      to="/cotizar"
      aria-label={`Ver mi cotización (${count} ${count === 1 ? "producto" : "productos"})`}
      className="group fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 rounded-full px-4 py-3 font-semibold text-white shadow-[0_10px_30px_-8px_rgba(233,67,126,0.6)] transition hover:scale-105"
      style={{ background: "var(--brand-magenta)" }}
    >
      <span
        className="absolute inset-0 -z-10 rounded-full opacity-70 blur-md"
        style={{ background: "var(--brand-magenta)" }}
      />
      <div className="relative">
        <ClipboardList className="h-6 w-6" />
        <span
          className="absolute -right-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1 text-[11px] font-bold leading-none text-white ring-2 ring-white"
          style={{ background: "var(--brand-cyan)" }}
        >
          {count}
        </span>
      </div>
      <span className="hidden text-sm sm:inline">Mi cotización</span>
    </Link>
  );
}
