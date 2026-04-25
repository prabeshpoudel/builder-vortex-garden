import { cn } from "@/lib/utils";

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn(
      "rounded-full px-3 py-1 text-xs font-semibold uppercase",
      status === "upcoming" && "bg-blue-100 text-blue-700",
      status === "live" && "bg-red-100 text-red-700",
      status === "completed" && "bg-emerald-100 text-emerald-700",
      status === "open" && "bg-emerald-100 text-emerald-700",
      status === "closed" && "bg-amber-100 text-amber-700",
    )}>{status}</span>
  );
}
