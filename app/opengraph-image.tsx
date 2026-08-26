import { ImageResponse } from "next/og";

export const alt = "Portfolio of Muhamad Hilal Fakhri - Software Developer & AI Enthusiast";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const TECH = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Golang"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(56,130,246,0.16), transparent 50%), radial-gradient(circle at 90% 90%, rgba(16,185,129,0.12), transparent 45%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            color: "#a1a1aa",
            fontSize: 26,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 9999,
              backgroundColor: "#fafafa",
              color: "#0a0a0a",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            MH
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#fafafa", fontWeight: 600 }}>
              Muhamad Hilal Fakhri
            </span>
            <span style={{ fontSize: 22 }}>muhamadhilalf.my.id</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: "-2px",
              lineHeight: 1.05,
            }}
          >
            Software Developer
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 52,
              fontWeight: 500,
              letterSpacing: "-1px",
              color: "#8b8b94",
            }}
          >
            &amp; AI Enthusiast
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#a1a1aa",
              maxWidth: 860,
              lineHeight: 1.4,
            }}
          >
            Building structured, efficient, responsive, and user-centered
            applications.
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {TECH.map((tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 9999,
                border: "1px solid rgba(250,250,250,0.18)",
                backgroundColor: "rgba(250,250,250,0.06)",
                color: "#d4d4d8",
                fontSize: 24,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
