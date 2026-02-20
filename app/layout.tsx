import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cicely — Version Control for Blender",
  description:
    "Cicely brings GitHub-style version control to Blender. Track changes, branch timelines, diff your meshes, and collaborate — without leaving your creative flow.",
  keywords: [
    "blender version control",
    "blender git",
    "3D file versioning",
    "blender collaboration",
    "blender workflow",
    "blender diff viewer",
    "cicely app",
  ],
  authors: [{ name: "Cicely" }],
  openGraph: {
    title: "Cicely — Version Control for Blender",
    description:
      "GitHub-style version control for Blender artists. Never lose a creative breakthrough again.",
    type: "website",
    url: "https://cicely.app",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cicely — Version Control for Blender",
    description:
      "GitHub-style version control for Blender artists. Never lose a creative breakthrough again.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
