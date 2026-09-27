import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SwarmDebug | Autonomous Code Resolution",
  description: "Multi-agent code anomaly detection and resolution command center.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#071015] text-white antialiased">{children}</body>
    </html>
  );
}