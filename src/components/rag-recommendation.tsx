"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function RagRecommendation() {
  const [showResults, setShowResults] = useState(false);

  const recommendations = [
    {
      name: "CryptoNews Daily",
      relevance: 95,
      audience: "DeFi Enthusiasts",
      reach: "50K monthly"
    },
    {
      name: "Base Builders Hub", 
      relevance: 89,
      audience: "Developers",
      reach: "25K monthly"
    },
    {
      name: "Web3 Gaming Portal",
      relevance: 82,
      audience: "GameFi Users", 
      reach: "75K monthly"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            AI-Powered Publisher Recommendations
          </h2>
          <p className="text-lg text-slate-600">
            Get personalized publisher suggestions based on your project and goals
          </p>
        </div>

        <Card className="p-8 rounded-2xl shadow-lg border border-slate-200/60 bg-white/80 backdrop-blur mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Project Description
              </label>
              <textarea 
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Describe your project, target audience, and campaign goals..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Campaign Objective
              </label>
              <select className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>App Downloads</option>
                <option>Website Traffic</option>
                <option>Token Swaps</option>
                <option>NFT Mints</option>
                <option>Social Engagement</option>
              </select>
            </div>
            
            <Button 
              onClick={() => setShowResults(true)}
              className="w-full"
              size="lg"
            >
              Get Publisher Recommendations
            </Button>
          </div>
        </Card>

        {showResults && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Recommended Publishers
            </h3>
            {recommendations.map((pub, index) => (
              <Card key={index} className="p-6 rounded-2xl shadow-lg border border-slate-200/60 bg-white/80 backdrop-blur">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-slate-900">
                        {pub.name}
                      </h4>
                      <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {pub.relevance}% match
                      </div>
                    </div>
                    <div className="flex gap-6 text-sm text-slate-600">
                      <span>Audience: {pub.audience}</span>
                      <span>Reach: {pub.reach}</span>
                    </div>
                  </div>
                  <Button variant="outline">
                    Select Publisher
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}