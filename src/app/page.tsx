export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl || supabaseUrl === "your_supabase_project_url_here") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-md rounded-xl border p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold">Attention Token</h1>
          <p className="mt-2 text-gray-500">
            Supabase not configured yet. Add your
            <code className="mx-1 rounded bg-gray-100 px-1.5 py-0.5 text-sm">
              NEXT_PUBLIC_SUPABASE_URL
            </code>
            and
            <code className="mx-1 rounded bg-gray-100 px-1.5 py-0.5 text-sm">
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </code>
            to
            <code className="mx-1 rounded bg-gray-100 px-1.5 py-0.5 text-sm">.env.local</code>.
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
