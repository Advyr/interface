"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Image src="/Image/Logo/advyr.png" alt="Advyr Logo" width={50} height={32} />
            <Link href="/" className="text-xl font-bold text-slate-900">
              Advyr
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#advertiser" className="text-slate-700 hover:text-slate-900 transition-colors">
              Advertiser
            </Link>
            <Link href="#publishers" className="text-slate-700 hover:text-slate-900 transition-colors">
              Publishers
            </Link>
            <Link href="#docs" className="text-slate-700 hover:text-slate-900 transition-colors">
              Docs
            </Link>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}