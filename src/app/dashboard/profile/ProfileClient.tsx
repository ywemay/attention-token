"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function ProfilePage() {
  const supabase = createClient();
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

  if (!profile) return <div className="p-8 text-sm text-gray-400">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="mt-8 max-w-md space-y-5">
        <div className="rounded-xl border p-5">
          <p className="text-xs text-gray-400">Username</p>
          <p className="mt-1 text-lg font-semibold">{profile.username}</p>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-xs text-gray-400">Role</p>
          <p className="mt-1 capitalize text-lg font-semibold">{profile.role}</p>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-xs text-gray-400">Balance</p>
          <p className="mt-1 text-lg font-semibold">{profile.balance} ATTN</p>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-xs text-gray-400">Member since</p>
          <p className="mt-1 text-lg font-semibold">
            {new Date(profile.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
