"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNavigation = [
  { label: "Home", href: "/admin" },
  { label: "Manage Employee", href: "/admin/manage-employee" },
  { label: "Incentive", href: "/admin/incentive" },
  { label: "Past Incentive", href: "/admin/past-incentive" },
  { label: "Incentive Engine", href: "/admin/incentive-engine" },
];

export function AdminNavigation() {
  const pathname = usePathname();

  return (
    <div className="pt-5">
      <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        Main Menu
      </p>
      <nav aria-label="Admin modules">
        <ul className="space-y-1">
          {adminNavigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.label}>
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
