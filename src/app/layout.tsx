import type { Metadata } from "next";
import "./globals.css";
import { PageLayout } from "@/components/layout/page-layout";

export const metadata: Metadata = {
  title: "MatsyaDrishti | OceanSync AI — Marine Intelligence Platform",
  description:
    "AI-powered Digital Twin of the Coastal Ecosystem. Real-time intelligence for sustainable fishing, biodiversity monitoring, and ocean health analysis powered by INCOIS telemetry and eDNA sensors.",
  keywords: [
    "MatsyaDrishti",
    "OceanSync AI",
    "Digital Twin",
    "Marine Intelligence",
    "Coastal Ecosystem",
    "Sustainable Fishing",
    "INCOIS",
    "eDNA",
    "Biodiversity",
    "Ocean Health",
  ],
  authors: [{ name: "MatsyaDrishti Team" }],
  openGraph: {
    title: "MatsyaDrishti | OceanSync AI",
    description:
      "AI-powered Digital Twin of the Coastal Ecosystem for marine intelligence and conservation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full">
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
