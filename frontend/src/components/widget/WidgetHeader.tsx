interface Props {
  title: string;
  subtitle: string;
  primaryColor: string;
  layout: "left" | "center" | "right";
}

const alignMap: Record<Props["layout"], React.CSSProperties["alignItems"]> = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

export function WidgetHeader({ title, subtitle, primaryColor, layout }: Props) {
  return (
    <header
      style={{
        backgroundColor: primaryColor,
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: alignMap[layout],
        flexShrink: 0,
      }}
    >
      <span style={{ color: "#fff", fontWeight: 700, fontSize: "16px" }}>
        {title}
      </span>
      <span
        style={{
          color: "rgba(255,255,255,0.8)",
          fontSize: "13px",
          marginTop: "2px",
        }}
      >
        {subtitle}
      </span>
    </header>
  );
}
