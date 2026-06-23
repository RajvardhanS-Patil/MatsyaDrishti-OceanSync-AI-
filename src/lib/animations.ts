import type { Variants, Transition } from "framer-motion";

/* ── Shared Transition Presets ──────────────────────────── */

export const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

export const smoothTransition: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

/* ── Page Transition ───────────────────────────────────── */

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

/* ── Fade Animations ───────────────────────────────────── */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

/* ── Slide Animations ──────────────────────────────────── */

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Scale Animations ──────────────────────────────────── */

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ── Stagger Container ─────────────────────────────────── */

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Glow Pulse ────────────────────────────────────────── */

export const glowPulse: Variants = {
  initial: {
    boxShadow: "0 0 0px rgba(166, 207, 190, 0)",
  },
  animate: {
    boxShadow: [
      "0 0 0px rgba(166, 207, 190, 0)",
      "0 0 20px rgba(166, 207, 190, 0.3)",
      "0 0 0px rgba(166, 207, 190, 0)",
    ],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

/* ── Floating Animation ────────────────────────────────── */

export const floating: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

/* ── Counter Animation Helper ──────────────────────────── */

export function createCounterAnimation(
  from: number,
  to: number,
  duration = 2
) {
  return {
    initial: { value: from },
    animate: {
      value: to,
      transition: { duration, ease: "easeOut" },
    },
  };
}
