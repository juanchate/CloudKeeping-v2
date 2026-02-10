import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a2e4a 0%, #111e32 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            CloudKeeping
          </div>
          <div
            style={{
              width: "60px",
              height: "3px",
              background: "#C8922A",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              fontSize: "24px",
              color: "rgba(255,255,255,0.55)",
              maxWidth: "700px",
              textAlign: "center",
              lineHeight: "1.5",
            }}
          >
            Professional Accounting, Bookkeeping &amp; Tax Services
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
