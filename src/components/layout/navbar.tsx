"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, Bell, Settings, Rss } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 bg-surface-glass backdrop-blur-md border-b border-border-glow">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <motion.span
              className="text-2xl md:text-3xl font-bold text-primary tracking-tight"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              whileHover={{ textShadow: "0 0 20px rgba(166, 207, 190, 0.5)" }}
            >
              MatsyaDrishti
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.span
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1">
            <motion.button
              className="p-2 rounded-lg text-on-surface-variant hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Rss className="h-5 w-5" />
            </motion.button>
            <motion.button
              className="p-2 rounded-lg text-on-surface-variant hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="h-5 w-5" />
            </motion.button>
            <motion.button
              className="relative p-2 rounded-lg text-on-surface-variant hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-status-critical" />
            </motion.button>
          </div>

          {/* Avatar */}
          <div className="hidden md:block h-8 w-8 rounded-full overflow-hidden border border-primary/30 bg-primary-container">
            <div className="h-full w-full flex items-center justify-center text-xs font-bold text-on-primary-container">
              MD
            </div>
          </div>

          {/* Mobile menu toggle */}
          <motion.button
            className="lg:hidden p-2 rounded-lg text-on-surface-variant"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-border-glow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-2 p-6">
              {NAV_ITEMS.map((item, i) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-on-surface-variant hover:bg-surface-container-highest hover:text-primary"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
