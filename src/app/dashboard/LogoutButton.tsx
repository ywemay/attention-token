"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-md px-3 py-[10px] text-sm font-medium text-gray-500 transition hover:bg-red-50 hover:text-red-600 dark:text-zinc-500 dark:hover:bg-red-950/40 dark:hover:text-red-400"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 shrink-0"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
      </svg>
      Logout
    </button>
  );
}
