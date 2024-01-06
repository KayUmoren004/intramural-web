import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./sidebar-nav";

// export const metadata: Metadata = {
//   title: "Forms",
//   description: "Advanced form example using react-hook-form and Zod.",
// };

interface SettingsLayoutProps {
  children: React.ReactNode;
  params: {
    school: string;
    userid: string;
    form: string;
  };
}

export default function SettingsLayout({
  children,
  params: { school, userid, form },
}: SettingsLayoutProps) {
  const sidebarNavItems = [
    {
      title: "Profile",
      href: `/web/${school}/account/${userid}/profile`,
    },
    {
      title: "Account",
      href: `/web/${school}/account/${userid}/account`,
    },
    // {
    //   title: "Appearance",
    //   href: "/examples/forms/appearance",
    // },
    {
      title: "Notifications",
      href: `/web/${school}/account/${userid}/notifications`,
    },
    // {
    //   title: "Display",
    //   href: "/examples/forms/display",
    // },
  ];

  return (
    <div className="hidden space-y-6 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">User</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
