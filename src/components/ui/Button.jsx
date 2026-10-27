import { cn } from "@/lib/utils";

const variants = {
  primary: { backgroundColor: "#2D6A4F", color: "#FDF6EC" },
  secondary: { backgroundColor: "#FDF6EC", color: "#5C2D0E", border: "1px solid rgba(92,45,14,0.3)" },
  ghost: { backgroundColor: "transparent", color: "#3D1B08" },
  gold: { backgroundColor: "#D4A017", color: "#3D1B08", fontWeight: 700 },
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-sm rounded-xl",
  lg: "px-8 py-4 text-base rounded-xl",
};

export default function Button({ variant = "primary", size = "md", className, children, ...props }) {
  return (
    <button
      style={variants[variant]}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
