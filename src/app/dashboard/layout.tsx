import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r bg-gray-50/50">
        <div className="flex items-center gap-2 border-b px-6 py-5">
          <span className="text-lg font-bold tracking-tight">Attention</span>
          <span className="rounded-md bg-black px-2 py-0.5 text-xs font-semibold text-white">
            Token
          </span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          <NavItem href="/dashboard" label="Marketplace" icon="🏪" />
          <NavItem href="/dashboard/tokens" label="My Tokens" icon="🪙" />
          <NavItem href="/dashboard/profile" label="Profile" icon="👤" />
        </nav>

        <div className="border-t px-3 py-4">
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-white">{children}</main>
    </div>
  );
}

function NavItem({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
    >
      <span className="text-lg">{icon}</span>
      {label}
    </Link>
  );
}
