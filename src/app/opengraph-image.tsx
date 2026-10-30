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
          justifyContent: "center",
          padding: "0 96px",
          background: "#fcfbfa",
          color: "#1b263b",
        }}
      >
        <div style={{ fontSize: 40, color: "#f43f5e" }}>Hello, I&apos;m</div>
        <div style={{ fontSize: 132, fontWeight: 900, letterSpacing: -4, lineHeight: 1.05 }}>
          Meet Thakur
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 44,
            background: "#faff00",
            padding: "6px 20px",
            alignSelf: "flex-start",
          }}
        >
          Software Developer · Competitive Programmer
        </div>
      </div>
    ),
    size
  );
}
