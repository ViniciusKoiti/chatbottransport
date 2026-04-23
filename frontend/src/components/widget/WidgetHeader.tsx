import type { ReactNode } from "react";

interface Props {
  title: string;
  subtitle: string;
  primaryColor: string;
  layout: "left" | "center" | "right";
  avatar?: ReactNode;
}

const alignMap: Record<Props["layout"], React.CSSProperties["alignItems"]> = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

export function WidgetHeader({ title, subtitle, primaryColor, layout, avatar }: Props) {
  return (
    <header
      style={{
        backgroundColor: primaryColor,
        padding: "16px 20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flexShrink: 0,
      }}
    >
      {avatar && (
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: "#fff",
          }}
        >
          {avatar}
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          alignItems: alignMap[layout],
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
      </div>
    </header>
  );
}
