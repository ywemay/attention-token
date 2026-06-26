"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function DashboardClient() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<{ email?: string | null } | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    };
    getUser();
  }, [supabase, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-xl border p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold">Welcome 👋</h1>
        <p className="text-gray-600">You are signed in as:</p>
        <p className="text-lg font-medium">{user.email ?? "No email available"}</p>
        <button
          onClick={handleLogout}
          className="mt-4 rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
