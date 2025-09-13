"use client";

import Image from "next/image";

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-4 mb-12">
            <div className="w-16 h-16 relative">
              <Image
                src="/Image/Logo/advyr-top.png"
                alt="Base Logo"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div className="w-px h-16 bg-gray-200"></div>
            <h2 className="text-4xl font-bold text-gray-900">
              Community-First Advertising
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-xl text-gray-700 font-medium leading-relaxed">
              We believe in ads that belong to the community.
            </p>
            <div className="relative text-5xl text-blue-600 font-bold leading-tight">
              On Base, visibility is limitless—because Base is for <br />
              <span className="relative inline-block text-4xl">
                everyone
                <div className="absolute inset-0 -m-3">
                  <svg viewBox="0 0 200 60" className="w-full h-full">
                    <ellipse
                      cx="100"
                      cy="30"
                      rx="95"
                      ry="25"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3"
                      strokeDasharray="0"
                      opacity="0.6"
                    />
                    <ellipse
                      cx="100"
                      cy="30"
                      rx="90"
                      ry="22"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2"
                      strokeDasharray="0"
                      opacity="0.4"
                    />
                    <ellipse
                      cx="100"
                      cy="30"
                      rx="100"
                      ry="28"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2"
                      strokeDasharray="0"
                      opacity="0.5"
                    />
                  </svg>
                </div>
              </span>
              .
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-2xl shadow-sm hover:shadow-md hover:bg-blue-50 transition-all duration-300">
            <div className="w-8 h-8 relative">
              <Image
                src="/Image/Logo/base-logo.png"
                alt="Base Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-lg font-medium">
              Built on Base, Made for Everyone
            </span>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-100 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full opacity-30"></div>
      </div>
    </section>
  );
}
