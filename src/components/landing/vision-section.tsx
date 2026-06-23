"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CTAButton } from "@/components/ui/cta-button";

export function VisionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-32 md:py-40 px-6"
    >
      {/* Parallax background image */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-[130%] w-full object-cover opacity-30"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQIJ4N8sbpz8f9YsZPIbRSiiAHykktKW0L3TzmgVFk0jDsZim8zB0CPY8Oc1z3stk5pgFedU5dyr6pFiSYi_aiEoKaj_PWsprmrbvNHKCF0ylxz-M6yxLT4n1Yqov_dew--QKv0-GjppNviJcR6LGoLe6RQa13vn2qh16f_S6FuoByPvfehHWdxygVxkdoGFkuKGBe8_9hpYKuWruOgw2BNZbssbUoOvL7oz4g6V8sFLilFLIOkXnHldCo7c2t4DXyJWsnJYaWlY-U"
          alt="Futuristic underwater ocean station with glowing data conduits"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/60 via-transparent to-surface/80" />
      </motion.div>

      {/* Glass CTA panel */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl glass-panel rounded-3xl p-12 md:p-20 text-center border border-border-glow"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2
          className="text-white mb-6"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.15,
          }}
        >
          Redefining Marine <br />
          <motion.span
            className="text-primary italic"
            animate={{
              textShadow: [
                "0 0 10px rgba(166, 207, 190, 0)",
                "0 0 30px rgba(166, 207, 190, 0.4)",
                "0 0 10px rgba(166, 207, 190, 0)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Sovereignty
          </motion.span>
        </h2>
        <p className="text-lg text-on-surface-variant mb-10 max-w-xl mx-auto">
          Join the coalition of nations and enterprises securing the future of
          our oceans through unparalleled data clarity.
        </p>
        <div className="flex flex-col gap-4 justify-center sm:flex-row">
          <CTAButton variant="primary" size="large">
            Request Strategic Access
          </CTAButton>
          <CTAButton variant="ghost" size="large">
            Technical Papers
          </CTAButton>
        </div>
      </motion.div>
    </section>
  );
}
