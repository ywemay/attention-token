"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";

const DUMMY_TRANSACTIONS = [
  { id: "t1", type: "earned", description: "Completed: Subscribe TechWithAlex", amount: 5, date: "2026-06-25" },
  { id: "t2", type: "spent", description: "Bought: Logo Design Pack", amount: -6, date: "2026-06-24" },
  { id: "t3", type: "earned", description: "Completed: ArtByMia comment", amount: 3, date: "2026-06-23" },
  { id: "t4", type: "spent", description: "Bought: Fix Mobile CSS Bugs", amount: -7, date: "2026-06-22" },
  { id: "t5", type: "earned", description: "Referral bonus", amount: 2, date: "2026-06-21" },
  { id: "t6", type: "earned", description: "Initial sign-up reward", amount: 10, date: "2026-06-20" },
];

export default function TokensPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<{ balance: number; username: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("balance, username")
        .eq("id", user.id)
        .single();
      if (data) setProfile(data);
    };
    load();
  }, [supabase]);

  const balance = profile?.balance ?? 42;

  return (
    <div className="p-8">
      {/* Balance Hero */}
      <div className="mb-10 rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-200 p-8 text-center shadow-lg dark:from-yellow-600 dark:via-yellow-500 dark:to-orange-500">
        <p className="text-sm font-medium text-yellow-900/70 dark:text-yellow-50/80">
          Your Balance
        </p>
        <p className="mt-2 text-5xl font-extrabold tracking-tight text-yellow-900 dark:text-yellow-50">
          {balance} <span className="text-2xl font-bold">ATTN</span>
        </p>
        <p className="mt-1 text-sm text-yellow-900/60 dark:text-yellow-50/70">
          {profile?.username ?? "Anonymous"}
        </p>
      </div>

      {/* Transaction History */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-zinc-100">
          Transaction History
        </h2>
        <div className="mt-4 space-y-2">
          {DUMMY_TRANSACTIONS.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 px-5 py-3 transition hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm ${
                    tx.amount > 0
                      ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400"
                  }`}
                >
                  {tx.amount > 0 ? "↑" : "↓"}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-zinc-200">
                    {tx.description}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-zinc-500">
                    {tx.date}
                  </p>
                </div>
              </div>
              <span
                className={`text-sm font-bold ${
                  tx.amount > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                {tx.amount > 0 ? "+" : ""}
                {tx.amount} ATTN
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
