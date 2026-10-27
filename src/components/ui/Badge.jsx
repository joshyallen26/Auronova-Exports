export default function Badge({ children, variant = "cert", className = "" }) {
  const styles = {
    cert: {
      backgroundColor: "rgba(45,106,79,0.1)",
      color: "#1E4D38",
      border: "1px solid rgba(45,106,79,0.2)",
    },
    category: {
      backgroundColor: "rgba(92,45,14,0.08)",
      color: "#5C2D0E",
      border: "1px solid rgba(92,45,14,0.2)",
    },
    gold: {
      backgroundColor: "rgba(212,160,23,0.15)",
      color: "#A87D0E",
      border: "1px solid rgba(212,160,23,0.3)",
    },
    green: {
      backgroundColor: "rgba(45,106,79,0.12)",
      color: "#1E4D38",
      border: "1px solid rgba(45,106,79,0.25)",
    },
  };

  return (
    <span
      style={styles[variant] || styles.cert}
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}
