"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavItem({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-md px-3 py-[10px] text-sm font-medium transition ${
        isActive
          ? "bg-gray-100 text-gray-900"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <span
        className={`shrink-0 ${
          isActive ? "text-gray-900" : "text-gray-400"
        }`}
      >
        {icon}
      </span>
      {label}
    </Link>
  );
}
