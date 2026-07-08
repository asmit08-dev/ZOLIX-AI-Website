import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt =
  "ZOLIX AI — AI-Powered Cloud Cost Optimization & Management Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#1a1a1a",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "84px",
              height: "84px",
              borderRadius: "20px",
              background: "#dc6a4f",
              color: "#ffffff",
              fontSize: "56px",
              fontWeight: 800,
            }}
          >
            Z
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: "40px",
              fontWeight: 800,
              letterSpacing: "-1px",
            }}
          >
            ZOLIX AI
          </div>
        </div>
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: "68px",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-2px",
            maxWidth: "900px",
          }}
        >
          AI-Powered Cloud Cost Optimization &amp; Management
        </div>
        <div
          style={{
            display: "flex",
            color: "#dc6a4f",
            fontSize: "36px",
            fontWeight: 700,
            marginTop: "28px",
          }}
        >
          Save Up to 60% On Your Cloud Bill
        </div>
      </div>
    ),
    { ...size },
  );
}
