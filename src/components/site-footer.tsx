import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
            <div className="space-y-2">
              <Link href="#features" className="block text-slate-600 hover:text-slate-900">Features</Link>
              <Link href="#pricing" className="block text-slate-600 hover:text-slate-900">Pricing</Link>
              <Link href="/dashboard" className="block text-slate-600 hover:text-slate-900">Dashboard</Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Publishers</h3>
            <div className="space-y-2">
              <Link href="/publishers" className="block text-slate-600 hover:text-slate-900">Join Network</Link>
              <Link href="/publishers" className="block text-slate-600 hover:text-slate-900">Requirements</Link>
              <Link href="/publishers" className="block text-slate-600 hover:text-slate-900">Payouts</Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Resources</h3>
            <div className="space-y-2">
              <Link href="/docs" className="block text-slate-600 hover:text-slate-900">Documentation</Link>
              <Link href="/blog" className="block text-slate-600 hover:text-slate-900">Blog</Link>
              <Link href="/support" className="block text-slate-600 hover:text-slate-900">Support</Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-slate-600 hover:text-slate-900">About</Link>
              <Link href="/contact" className="block text-slate-600 hover:text-slate-900">Contact</Link>
              <Link href="/careers" className="block text-slate-600 hover:text-slate-900">Careers</Link>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200">
          <div className="text-slate-900 font-semibold text-lg">
            Advyr
          </div>
          <div className="text-slate-600 text-sm mt-4 md:mt-0">
            © 2024 Advyr. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}