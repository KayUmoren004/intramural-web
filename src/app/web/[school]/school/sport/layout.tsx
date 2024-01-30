"use client";
import { useGetSport } from "@/components/hooks/school/useSport";
import {
  SidebarNav,
  SidebarNavProps,
} from "@/components/routes/sidebar/sidebar-nav";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";
// import ViewSkeleton from "../skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumbs,
  breadcrumbType,
  useCrumbs,
} from "@/components/ui/breadcrumbs";
import { School } from "lucide-react";
import { useEffect, useState } from "react";
import { ViewSkeleton } from "@/components/views/school/views";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    school: string;
  };
};

const Layout = ({ children, params: { school } }: LayoutProps) => {
  const { data: session } = useSession();
  const [schoolId, setSchoolId] = useState<string | undefined>(undefined);
  const { sportId } = useParams();

  useEffect(() => {
    if (session?.user?.schoolId) {
      setSchoolId(session.user.schoolId);
    }
  }, [session]);

  // console.log(schoolId);

  // Get Sport Data
  const {
    data: sport,
    isLoading: isSportLoading,
    isError: isSportError,
    error: sportError,
  } = useGetSport(schoolId ?? "", sportId as string);

  if (isSportLoading || !sport)
    return (
      <ViewSkeleton
      // // name="Sport"
      // description="Manage your sport and settings."
      />
    );

  const sidebarNavItems: SidebarNavProps["items"] = [
    {
      title: "Dashboard",
      href: `/web/${school}/school/sport/${sportId}`,
    },
    {
      title: "Leagues",
      href: `/web/${school}/school/sport/${sportId}/leagues`,
    },
    // {
    //   title: "Schedule",
    //   href: `/web/${school}/school/sport/${sportId}/schedule`,
    // },
    // {
    //   title: "Roster",
    //   href: `/web/${school}/school/sport/${sportId}/roster`,
    // },
    {
      title: "Settings",
      href: `/web/${school}/school/sport/${sportId}/settings`,
    },
  ];

  return (
    <div className="hidden space-y-6 pb-16 md:block">
      {/* <Breadcrumbs links={breadcrumbs} /> */}
      <div className="flex flex-row items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            {sport.name} - {sport.season}
          </h2>
          <p className="text-muted-foreground">
            {sport.description ??
              "Manage your account settings and set e-mail preferences."}
          </p>
        </div>

        <div>
          <Badge
            variant={sport.status === "Active" ? "success" : "destructive"}
          >
            {sport.status}
          </Badge>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/12">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
