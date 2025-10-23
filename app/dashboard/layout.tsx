import React, { ReactNode } from "react";
import Link from "next/link";
import { Home, User, Settings } from "lucide-react"; // icon library from lucide-react
import { cn } from "@/lib/utils"; // shadcn helper (if you have)
import { Button } from "@/components/ui/button"; // shadcn button

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen  dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64  dark:bg-gray-800 border-r p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
            Dashboard
          </h2>

          <nav className="space-y-2">
            <Link
              href="/"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Home className="h-5 w-5 text-gray-500" />
              <span>Home</span>
            </Link>

            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <User className="h-5 w-5 text-gray-500" />
              <span>Profile</span>
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Settings className="h-5 w-5 text-gray-500" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        <Button variant="outline" className="mt-8 w-full">
          Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
