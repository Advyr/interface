export default function Trustbar() {
  const partners = [
    { name: "Base", logo: "BASE" },
    { name: "Optimism", logo: "OP" },
    { name: "Coinbase Wallet", logo: "CBW" },
    { name: "Farcaster", logo: "FC" }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-sm text-slate-500 mb-8">
          Trusted by leading Web3 platforms
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
            >
              <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center text-slate-600 font-medium">
                {partner.logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}