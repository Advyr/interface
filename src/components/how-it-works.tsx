"use client";

export default function OnchainFlow() {
  const steps = [
    {
      number: "01",
      title: "Create Campaign",
      description:
        "Set your budget, target audience, and campaign objectives with our intuitive interface.",
    },
    {
      number: "02",
      title: "Display on Publishers",
      description:
        "Your ads go live across our verified publisher network automatically, ensuring maximum reach.",
    },
    {
      number: "03",
      title: "User Action Verified",
      description:
        "Smart contracts verify genuine user actions and conversions onchain, providing trustless transparency.",
    },
    {
      number: "04",
      title: "Auto Payout & Insights",
      description:
        "Payments are released automatically with detailed performance analytics for campaign optimization.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Onchain Flow
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Launch your campaign in minutes with our streamlined onchain process
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 shadow-lg">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {step.description}
              </p>

              {/* wave connector */}
              {index < steps.length - 1 && (
                <svg
                  className="hidden lg:block absolute top-8 left-1/2 w-full h-16 text-blue-300 -z-10"
                  viewBox="0 0 200 50"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 25 C50 0, 150 50, 200 25"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
