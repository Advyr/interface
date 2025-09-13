"use client";
import Image from "next/image";
import { X, Check } from "lucide-react";

export function SectionFeatures() {
  const traditionalProblems = [
    "Pay per click, not per action",
    "No blockchain transparency",
    "High fraud & bot activity",
    "Manual reconciliation & exports",
    "Centralized intermediaries",
    "Generic targeting, ignores Web3 context",
    "No reward for users/community",
    "Limited trust & accountability",
  ];

  const advyrSolutions = [
    "CPA-only → pay only for verified actions",
    "100% on-chain transparency",
    "Smart contract escrow & payout automation",
    "Fraud-resistant with onchain verification",
    "Community-driven referrals & rewards",
    "Web3-native targeting & analytics",
    "Incentivized user engagement",
    "Scalable, enterprise-ready infrastructure",
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Revolutionary On-Chain Advertising
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Eliminate intermediaries and pay only for verified on-chain actions
            with full transparency.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
            <div className="bg-gray-100 rounded-2xl p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wider">
                  Web2 Ads
                </h3>
              </div>
              <div className="space-y-4">
                {traditionalProblems.map((problem, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-gray-600" />
                    </div>
                    <span className="text-gray-800 text-sm font-medium leading-relaxed">
                      {problem}
                    </span>
                  </div>
                ))}
              </div>
            </div>


            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-200">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-8 h-8 relative">
                    <Image
                      src="/Image/Logo/advyr-top.png"
                      alt="Advyr Logo"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-blue-600 uppercase tracking-wider">
                    Advyr
                  </h3>
                </div>
              </div>
              <div className="space-y-4">
                {advyrSolutions.map((solution, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-800 text-sm font-medium leading-relaxed">
                      {solution}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
