"use client";

import { type ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
  dark?: boolean;
}

export function SectionWrapper({
  children,
  className = "",
  id,
  fullWidth = false,
  dark = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative py-24 md:py-32 px-4 md:px-6 ${
        dark ? "bg-surface-container-lowest" : ""
      } ${className}`}
    >
      <div className={fullWidth ? "w-full" : "mx-auto max-w-7xl"}>
        {children}
      </div>
    </section>
  );
}
