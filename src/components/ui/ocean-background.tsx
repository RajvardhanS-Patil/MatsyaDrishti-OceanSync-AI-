"use client";

export function OceanBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`fixed inset-0 z-0 overflow-hidden ${className}`}>
      {/* Deep ocean gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040D12] via-[#0a151a] to-[#060f14]" />

      {/* Animated depth layers */}
      <div
        className="absolute inset-0 opacity-30 animate-wave-bg"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(92, 131, 116, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(115, 151, 151, 0.1) 0%, transparent 40%), radial-gradient(ellipse at 50% 80%, rgba(166, 207, 190, 0.08) 0%, transparent 50%)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Subtle light rays from above */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(166, 207, 190, 0.15) 0%, transparent 30%)",
        }}
      />

      {/* Bottom depth fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#040D12] to-transparent" />
    </div>
  );
}
