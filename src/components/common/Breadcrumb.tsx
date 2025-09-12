"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const pathMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/agents": "Agents", 
  "/ads": "Ads",
  "/publishers": "Publishers",
  "/referrals": "Referrals",
  "/settings": "Settings"
};

export function Breadcrumb() {
  const pathname = usePathname();
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    // Always start with Dashboard
    breadcrumbs.push({
      label: "Dashboard",
      href: "/dashboard"
    });
    
    // Add current page if it's not dashboard
    if (pathname !== "/dashboard") {
      const currentLabel = pathMap[pathname] || "Page";
      breadcrumbs.push({
        label: currentLabel,
        href: pathname
      });
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="flex items-center space-x-2 text-sm">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
          )}
          
          {index === breadcrumbs.length - 1 ? (
            // Current page - not clickable
            <span className="text-gray-500 font-medium">
              {breadcrumb.label}
            </span>
          ) : (
            // Previous pages - clickable
            <Link
              href={breadcrumb.href}
              className={cn(
                "text-gray-700 hover:text-gray-900 font-medium transition-colors"
              )}
            >
              {breadcrumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}