import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <nav className="flex items-center gap-6">
            <a href="/dashboard" className="font-semibold">
              RDH Clinical
            </a>
            <a href="/patients" className="text-muted-foreground hover:text-foreground">
              Patients
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Demo Mode</span>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
