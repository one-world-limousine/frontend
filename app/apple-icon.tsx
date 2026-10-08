import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// The bronze "O" and swoosh from the logo, on charcoal.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1f2024" }}>
        <svg width="140" height="140" viewBox="0 0 64 64">
          <ellipse cx="32" cy="31" rx="15" ry="19" fill="none" stroke="#e3aa3c" strokeWidth="5" />
          <path d="M9 46 C 22 52, 40 40, 56 18" fill="none" stroke="#e3aa3c" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
