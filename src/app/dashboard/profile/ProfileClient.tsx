"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useTheme } from "@/lib/theme";

export default function ProfilePage() {
  const supabase = createClient();
  const { resolved, toggle, theme } = useTheme();
  const [profile, setProfile] = useState<{
    username: string;
    role: string;
    balance: number;
    created_at: string;
  } | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("username, role, balance, created_at")
        .eq("id", user.id)
        .single();
      if (data) setProfile(data);
    };
    load();
  }, [supabase]);

  if (!profile) {
    return (
      <div className="p-8 text-sm text-gray-400 dark:text-zinc-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-100">
        Profile
      </h1>

      <div className="mt-8 max-w-md space-y-5">
        {/* Theme Toggle */}
        <div className="rounded-xl border border-gray-200 p-5 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 dark:text-zinc-500">
                Theme
              </p>
              <p className="mt-1 text-base font-semibold text-gray-900 dark:text-zinc-100">
                {resolved === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </p>
            </div>
            <button
              onClick={toggle}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ${
                resolved === "dark"
                  ? "bg-blue-600"
                  : "bg-gray-200 dark:bg-zinc-700"
              }`}
              role="switch"
              aria-checked={resolved === "dark"}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ${
                  resolved === "dark" ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          {theme !== resolved && (
            <p className="mt-2 text-xs text-gray-400 dark:text-zinc-500">
              Following system preference. Toggle to override.
            </p>
          )}
        </div>

        {/* Username */}
        <div className="rounded-xl border border-gray-200 p-5 dark:border-zinc-800">
          <p className="text-xs text-gray-400 dark:text-zinc-500">Username</p>
          <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-zinc-100">
            {profile.username}
          </p>
        </div>

        {/* Role */}
        <div className="rounded-xl border border-gray-200 p-5 dark:border-zinc-800">
          <p className="text-xs text-gray-400 dark:text-zinc-500">Role</p>
          <p className="mt-1 text-lg font-semibold capitalize text-gray-900 dark:text-zinc-100">
            {profile.role}
          </p>
        </div>

        {/* Balance */}
        <div className="rounded-xl border border-gray-200 p-5 dark:border-zinc-800">
          <p className="text-xs text-gray-400 dark:text-zinc-500">Balance</p>
          <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-zinc-100">
            {profile.balance} ATTN
          </p>
        </div>

        {/* Member since */}
        <div className="rounded-xl border border-gray-200 p-5 dark:border-zinc-800">
          <p className="text-xs text-gray-400 dark:text-zinc-500">
            Member since
          </p>
          <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-zinc-100">
            {new Date(profile.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
