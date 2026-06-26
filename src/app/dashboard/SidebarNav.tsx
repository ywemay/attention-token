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
      className={
        `flex items-center gap-3 rounded-md px-3 py-[10px] text-sm font-semibold transition-all duration-150 ` +
        (isActive
          ? "bg-blue-50 text-blue-700"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900")
      }
    >
      <span
        className={`shrink-0 transition-colors duration-150 ${
          isActive
            ? "text-blue-600"
            : "text-gray-400 group-hover:text-gray-600"
        }`}
      >
        {icon}
      </span>

      <span>{label}</span>
    </Link>
  );
}
