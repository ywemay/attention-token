import LogoutButton from "./LogoutButton";
import { NavItem } from "./SidebarNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="flex w-60 flex-col border-r border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        {/* Logo */}
        <div className="flex items-center gap-2.5 border-b border-gray-100 px-6 py-[18px] dark:border-zinc-800">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black dark:bg-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-white dark:text-zinc-950"
            >
              <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7" />
              <path d="M15 7h6v6" />
            </svg>
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-zinc-100">
              Attention
            </span>
            <span className="ml-1 rounded-md bg-black px-1.5 py-0.5 text-[10px] font-semibold text-white dark:bg-white dark:text-zinc-950">
              Token
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          <NavItem
            href="/dashboard"
            label="Marketplace"
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
              </svg>
            }
          />
          <NavItem
            href="/dashboard/tokens"
            label="My Tokens"
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <circle cx="8" cy="8" r="6" />
                <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
                <path d="M7 6h1v4" />
                <path d="m16.71 13.88.7.71-2.82 2.82" />
              </svg>
            }
          />
          <NavItem
            href="/dashboard/profile"
            label="Profile"
            icon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
            }
          />
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 px-3 py-3 dark:border-zinc-800">
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-white dark:bg-zinc-950">
        {children}
      </main>
    </div>
  );
}
