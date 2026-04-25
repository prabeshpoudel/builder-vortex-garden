import React from "react";
import { cn } from "@/lib/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
}

export default function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      className={cn(
        "rounded-lg px-4 py-2 font-semibold transition disabled:opacity-50",
        variant === "primary" && "bg-blue-700 text-white hover:bg-blue-800",
        variant === "secondary" && "bg-red-600 text-white hover:bg-red-700",
        variant === "outline" && "border border-slate-300 hover:bg-slate-100",
        variant === "danger" && "bg-red-700 text-white hover:bg-red-800",
        className,
      )}
      {...props}
    />
  );
}
