import { ImageResponse } from "next/og";

export const alt = "Meet Thakur | Software Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background: "#0a0a09",
          color: "#eeece6",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#85837c", letterSpacing: 4 }}>
          <span>MEEEET.DEV</span>
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 12, height: 12, borderRadius: 12, background: "#10b981" }} />
            ENGINEERING INTERN @ EIGHTFOLD AI
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 168, fontWeight: 700, letterSpacing: -8, lineHeight: 0.9, display: "flex" }}>
            Meet Thakur<span style={{ color: "#ff6a33" }}>.</span>
          </div>
          <div style={{ marginTop: 32, fontSize: 40, color: "#c4c2bb" }}>
            LLM systems · Data pipelines · Full-stack products
          </div>
        </div>
        <div style={{ display: "flex", height: 6, width: 160, background: "#ff6a33", borderRadius: 6 }} />
      </div>
    ),
    size
  );
}
