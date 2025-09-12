"use client";
import Image from "next/image";

const palette: Record<string, string> = {
  "/Image/Background/bg-1.png": "59,130,246",
  "/Image/Background/bg-2.png": "14,165,233",
  "/Image/Background/bg-3.png": "99,102,241",
  "/Image/Background/bg-4.png": "56,189,248",
};

export function SectionFeatures() {
  const items = [
    {
      title: "CPA Escrow",
      desc: "Only pay when verified actions occur, secured on-chain with smart contracts.",
      img: "/Image/Background/bg-1.png",
      size: "md:col-span-6 lg:col-span-7 lg:row-span-1",
      minH: "min-h-[180px]",
    },
    {
      title: "Onchain Verification",
      desc: "Transparent, trustless verification of clicks, signups, and conversions. Every interaction is recorded directly on-chain, ensuring advertisers only pay for genuine user actions while eliminating fraud and intermediaries.",
      img: "/Image/Background/bg-2.png",
      size: "md:col-span-6 lg:col-span-5",
      minH: "min-h-[180px]",
    },
    {
      title: "AI Chat Answers",
      desc: "AI agents that answer questions instantly, educate users, and boost conversions. Integrated with real-time data and product knowledge, these agents reduce drop-offs, guide customers seamlessly, and drive higher engagement across campaigns.",
      img: "/Image/Background/bg-3.png",
      size: "md:col-span-6 lg:col-span-5",
      minH: "min-h-[180px]",
    },
    {
      title: "Performance Analytics",
      desc: "Track campaign impact with real-time dashboards and actionable insights.",
      img: "/Image/Background/bg-4.png",
      size: "md:col-span-6 lg:col-span-7",
      minH: "min-h-[180px]",
    },
  ];

  return (
    <section className="py-12 md:py-20 relative min-h-screen w-full bg-white dark:bg-zinc-950 text-gray-800 dark:text-gray-100">
      {/* crosshatch bg section */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75,85,99,.04) 2px, rgba(75,85,99,.04) 3px, transparent 3px, transparent 8px)
          `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-8">
        <div className="text-center">
          <h2 className="text-[24px] md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Powerful features for modern campaigns
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm md:text-base">
            Everything you need to run onchain advertising that performs.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 [grid-auto-flow:dense]">
          {items.map((f) => {
            const glow = palette[f.img] ?? "59,130,246";
            return (
              <div
                key={f.title}
                className={`relative flex flex-col rounded-2xl border border-slate-200/70 p-4 shadow-sm transition-all duration-300 dark:border-slate-700 ${f.size} ${f.minH}`}
                style={{
                  "--glow": glow,
                  background:
                    "radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,0.95) 0%, rgba(241,245,249,0.9) 100%)",
                } as React.CSSProperties}
              >
                <div className="relative w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-zinc-800 mb-3">
                  <div className="relative w-full aspect-[16/7]">
                    <Image
                      src={f.img}
                      alt={f.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white mb-1">
                    {f.title}
                  </h3>
                  <p className="text-xs md:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
