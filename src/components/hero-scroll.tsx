"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HeroScroll() {
  return (
    <div className="min-h-screen w-full relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #fff 10%, #475569 250%)",
        }}
      />
      <div className="flex flex-col overflow-hidden relative z-10 pt-20">
        <ContainerScroll
          titleComponent={
            <div className="text-center mb-20">
              <h1 className="text-balance font-semibold text-neutral-900 dark:text-white leading-tight">
                <span className="block text-[clamp(1.75rem,2.2vw,2.5rem)] tracking-tight">
                  The Future of Ads is
                </span>

                <span className="mt-1 block font-extrabold leading-none">
                  <span className="text-[clamp(2.75rem,8vw,5rem)]">
                    Fully{" "}
                    <span className="relative inline-block align-baseline group">
                      <span
                        className="
            bg-[linear-gradient(90deg,#0B4DFF_0%,#93C5FD_50%,#3B82F6_100%)]
            bg-clip-text text-transparent
            bg-[length:200%_100%]
            motion-reduce:bg-[length:100%_100%]
            group-hover:animate-[shine_3s_linear_infinite]
            [text-shadow:0_1px_1px_rgba(0,0,0,0.1)]
          "
                      >
                        Onchain.
                      </span>

                      <svg
                        className="absolute -bottom-2 left-0 w-[110%] h-[10px] md:h-[14px] translate-x-[-5%] pointer-events-none"
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <defs>
                          <linearGradient
                            id="waveBlue"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#0B4DFF" />
                            <stop offset="50%" stopColor="#93C5FD" />
                            <stop offset="100%" stopColor="#3B82F6" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0 6 Q 20 1, 40 6 T 80 6 T 120 6"
                          fill="none"
                          stroke="url(#waveBlue)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          className="
              opacity-60
              motion-safe:[stroke-dasharray:140]
              motion-safe:[stroke-dashoffset:140]
              motion-safe:animate-[waveDraw_1.2s_ease-out_forwards]
            "
                        />
                      </svg>

                      <span
                        className="
            absolute inset-x-0 -bottom-2 h-[10px]
            [filter:blur(4px)]
            opacity-20
            bg-[radial-gradient(50%_100%_at_50%_50%,rgba(11,77,255,0.15),transparent_70%)]
            pointer-events-none
          "
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </span>
              </h1>

              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Run transparent, verifiable, and performance-based campaigns.
                With onchain tracking, AI-powered targeting, and automated CPA
                payouts, your ads finally deliver trust and scale without
                intermediaries.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button size="lg" asChild>
                  <Link href="/dashboard">Launch App</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Book a Demo</Link>
                </Button>
              </div>
            </div>
          }
        >
          {/* Full-bleed media: let it fill the whole inner frame */}
          <div className="relative h-full w-full">
            <Image
              src="/Image/Background/bg-hero.png"
              alt="Advyr Dashboard Preview"
              fill
              sizes="100vw"
              className="object-cover" /* or object-contain if you prefer no crop */
              priority
              draggable={false}
            />
          </div>
        </ContainerScroll>
      </div>
    </div>
  );
}
