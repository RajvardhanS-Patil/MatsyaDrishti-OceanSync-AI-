import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Climate Impact Analytics | MatsyaDrishti",
  description:
    "Long-term climate impact analysis — ocean temperature trends, species migration forecasting, coral stress projections, and adaptive conservation recommendations through 2050.",
};

export default function ClimateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
