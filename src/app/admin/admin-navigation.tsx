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
    <div className="pt-7">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
        Main Menu
      </p>
      <nav aria-label="Admin modules">
        <ul className="space-y-2">
          {adminNavigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.label}>
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-xl px-4 py-3.5 text-sm font-semibold ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
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
