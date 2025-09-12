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
          background: "radial-gradient(125% 125% at 50% 10%, #fff 10%, #475569 250%)",
        }}
      />
      <div className="flex flex-col overflow-hidden relative z-10 pt-20">
        <ContainerScroll
          titleComponent={
            <div className="text-center mb-20">
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                The Onchain Advertising <br />
                <span className="text-4xl md:text-[6rem] font-bold leading-none">
                  Platform for Growth
                </span>
              </h1>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Launch performance-driven campaigns on Base with AI-powered insights, automated CPA
                payouts, and publisher recommendations that scale your reach.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button size="lg" asChild>
                  <Link href="/dashboard">Launch Campaign</Link>
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
              className="object-cover"  /* or object-contain if you prefer no crop */
              priority
              draggable={false}
            />
          </div>
        </ContainerScroll>
      </div>
    </div>
  );
}
