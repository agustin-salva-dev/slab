"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/tailwind";

export function DashboardNav() {
  const pathname = usePathname();

  const navLinks = [
    { name: "My Slabs", href: "/dashboard" },
    { name: "Analytics", href: "/dashboard/analytics" },
    { name: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <section className="w-full flex gap-5 justify-center items-center text-sm antialiased">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "cursor-pointer transition-colors duration-200 font-power-ultra",
              isActive ? "text-white" : "text-my-secondary t-color hover-white",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {link.name}
          </Link>
        );
      })}
    </section>
  );
}
