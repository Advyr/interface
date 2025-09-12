"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export function SectionPersonas() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = 120;
    const step = Math.ceil(target / 120);
    const id = setInterval(() => {
      setCount((c) => {
        const n = c + step;
        if (n >= target) {
          clearInterval(id);
          return target;
        }
        return n;
      });
    }, 16);
    return () => clearInterval(id);
  }, []);

  const roundedHundreds = Math.max(100, Math.floor(count / 100) * 100);

  const logos = [
    { name: "Cat Town", src: "/Image/base-eco/cat-town.jpg" },
    { name: "Gig Bot", src: "/Image/base-eco/gig-bot.png" },
    { name: "Join Creator Base", src: "/Image/base-eco/join-creator-base.jpg" },
    { name: "Mint Club", src: "/Image/base-eco/mint-club.jpg" },
    { name: "Neda Pay", src: "/Image/base-eco/neda-pay.jpg" },
    { name: "Noice", src: "/Image/base-eco/noice.jpg" },
    { name: "Rovify", src: "/Image/base-eco/rovify.jpg" },
    { name: "Scenario Protocol", src: "/Image/base-eco/scenario-protocol.jpg" },
    { name: "Subunit", src: "/Image/base-eco/subunit.jpg" },
    { name: "Suite", src: "/Image/base-eco/suite.jpg" },
    { name: "Tumbuh", src: "/Image/base-eco/tumbuh.jpg" },
    { name: "Yolo Protocol", src: "/Image/base-eco/yolo-protocol.jpg" },
  ];

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.06) 0, rgba(37,99,235,0) 40%), radial-gradient(circle at 80% 30%, rgba(15,23,42,0.06) 0, rgba(15,23,42,0) 35%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(2,6,23,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(2,6,23,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(70% 50% at 50% 35%, rgba(0,0,0,1), rgba(0,0,0,0))",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          Discover and Grow Onchain Projects
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Advyr helps projects reach the right audiences with transparent
          onchain ads, AI insights, and performance-driven campaigns.
        </p>

        <div className="mt-10">
          <p className="text-2xl md:text-4xl font-semibold text-slate-900 dark:text-white flex items-center justify-center gap-3 flex-wrap">
            There are{" "}
            <span className="text-blue-600">
              {roundedHundreds.toLocaleString()}+
            </span>{" "}
            projects building on{" "}
            <span className="inline-flex items-center gap-2">
              <Image
                src="/Image/Logo/base-logo.jpg"
                alt="Base logo"
                width={40}
                height={40}
                className="rounded-lg object-contain"
              />
              Base.
            </span>
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            From DeFi to DAOs, teams trust Advyr to acquire and retain users.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex flex-col items-center justify-center rounded-xl border border-slate-200/60 bg-white/70 p-4 dark:border-slate-700/40 dark:bg-zinc-900 gap-2"
              title={logo.name}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                className="h-8 w-8 rounded-full object-contain"
                width={32}
                height={32}
              />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 text-center leading-tight">
                {logo.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-8">
            <Image
              src="/Image/Logo/advyr.png"
              alt="Advyr Logo"
              width={60}
              height={40}
              className="object-contain"
            />
            <span className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Powered by Advyr
            </span>
          </div>

          <p className="text-center text-slate-600 dark:text-slate-300 max-w-3xl mb-10 text-lg flex items-center justify-center flex-wrap gap-2">
            Join the ecosystem of projects using Advyr to reach their target
            audiences with precision, transparency, and performance-driven
            results on{" "}
            <span className="inline-flex items-center gap-1">
              <Image
                src="/Image/Logo/base-logo.jpg"
                alt="Base logo"
                width={20}
                height={20}
                className="rounded-lg object-contain"
              />
              Base.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
