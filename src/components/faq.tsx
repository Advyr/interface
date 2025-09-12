"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  const faqs = [
    {
      question: "How does CPA escrow work?",
      answer: "Smart contracts hold your campaign funds in escrow until verified user actions are completed. This ensures you only pay for genuine conversions and results."
    },
    {
      question: "What types of actions can be verified onchain?",
      answer: "We can verify token swaps, NFT mints, app downloads, website visits, social media engagement, and custom smart contract interactions."
    },
    {
      question: "Do I get refunds for unused campaign budget?",
      answer: "Yes, any unused budget is automatically refunded to your wallet when your campaign ends or is paused."
    },
    {
      question: "How do I become a publisher on Advyr?",
      answer: "Publishers can apply through our registry system. We verify quality, audience authenticity, and compliance before approval."
    },
    {
      question: "How does the AI chat feature work?",
      answer: "Our AI agents can answer user questions about your product, guide them through sign-up processes, and provide personalized recommendations to increase conversion rates."
    },
    {
      question: "What makes RAG recommendations different?",
      answer: "Our RAG system analyzes your campaign goals, target audience, and historical performance data to recommend the most relevant publishers for optimal results."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to know about Advyr
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-slate-200 rounded-lg px-6 bg-white/80 backdrop-blur"
            >
              <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}