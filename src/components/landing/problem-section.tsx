"use client";

import { useEffect, useRef, useState } from "react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { ScrollReveal } from "@/components/animations";

function AnimatedCounter({
  target,
  suffix = "",
  duration = 2,
  color = "text-status-critical",
}: {
  target: number;
  suffix?: string;
  duration?: number;
  color?: string;
}) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const startTime = performance.now();
          const durationMs = duration * 1000;

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;

            if (target >= 1000) {
              setDisplay((current / 1000).toFixed(1) + "k");
            } else if (target < 10) {
              setDisplay(current.toFixed(1));
            } else {
              setDisplay(Math.round(current).toString());
            }

            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div ref={ref}>
      <span
        className={`font-bold text-[32px] ${color} block mb-1`}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {display}
        {suffix}
      </span>
    </div>
  );
}

export function ProblemSection() {
  return (
    <SectionWrapper className="pt-40">
      <div className="grid items-center gap-16 md:grid-cols-2">
        {/* Left content */}
        <div>
          <AnimatedHeading
            as="h2"
            className="font-headline-lg text-white mb-6"
          >
            A Marine Crisis in{" "}
            <span className="text-status-critical underline decoration-status-critical/30">
              Silent Mode
            </span>
          </AnimatedHeading>

          <ScrollReveal delay={0.1}>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              Global marine health is declining at a rate that exceeds current
              monitoring capabilities. Fragmented data, delayed reporting, and
              manual analysis are failing to protect critical biodiversity and
              commercial logistics.
            </p>
          </ScrollReveal>

          {/* KPI Cards */}
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 gap-6">
              <GlassCard className="p-6" hoverScale>
                <AnimatedCounter
                  target={35}
                  suffix="%"
                  color="text-status-critical"
                />
                <span className="font-label-caps text-on-surface-variant">
                  Coral Bleaching
                </span>
              </GlassCard>
              <GlassCard className="p-6" hoverScale>
                <AnimatedCounter
                  target={2400}
                  color="text-status-warning"
                />
                <span className="font-label-caps text-on-surface-variant">
                  Illegal Drifters
                </span>
              </GlassCard>
            </div>
          </ScrollReveal>
        </div>

        {/* Right image */}
        <ScrollReveal direction="right" delay={0.2}>
          <div className="group relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-3xl transition-all group-hover:bg-primary/10" />
            <div className="relative overflow-hidden rounded-2xl border border-border-glow h-[400px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVQQSyDsZCA88l7VDYWsufAJFIaMqER_6bNgHUVHlnMPBxpVjZ8s_t3IBCAdY1M_LGPoxOp8IkIivfYs8St2KX_YX8O0eCMFm33bRJb0VjBDIHy4pgjJIbvlDF8I7Tj8T38qSY0cTs26ccL6Y1TvNcjBtto1NT9O4I97jA-04XLXRw8CDvTrm2AYPQIxbnUiAvEJW4VhRBVX84cz9j6YJrpfYuCdNsJycY1-XGnmL3TJsSTUckDaK0qRsEPadl8p1vxgO3oZZl6gNT"
                alt="Dark ocean with bioluminescent algae and marine pollution — depicting the silent crisis facing our oceans"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
}
