interface Props {
  color: string;
}

export function TypingIndicator({ color }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "2px 4px" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: color,
            opacity: 0.7,
            animation: `bounce 1.2s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}
