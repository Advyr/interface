import { Card } from "@/components/ui/card";

export default function FeatureGrid() {
  const features = [
    {
      title: "CPA Escrow",
      description: "Smart contracts hold payments until verified actions complete"
    },
    {
      title: "Onchain Verification",
      description: "Transparent, trustless verification of user actions and conversions"
    },
    {
      title: "AI Chat Answers",
      description: "AI agents answer user questions and guide them through campaigns"
    },
    {
      title: "RAG Publisher Recommendation",
      description: "AI recommends optimal publishers based on your campaign goals"
    },
    {
      title: "Publisher Registry",
      description: "Verified network of quality publishers across Web3 ecosystems"
    },
    {
      title: "Refund Unused Budget",
      description: "Automatic refunds for unspent campaign budgets"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Powerful Features for Modern Campaigns
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to run successful onchain advertising campaigns
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 rounded-2xl shadow-lg border border-slate-200/60 bg-white/80 backdrop-blur">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}