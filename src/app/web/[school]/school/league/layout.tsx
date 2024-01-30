"use client";
import { useGetLeague } from "@/components/hooks/school/useLeague";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
// import ViewSkeleton from "../skeleton";
import {
  SidebarNav,
  SidebarNavProps,
} from "@/components/routes/sidebar/sidebar-nav";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ViewSkeleton } from "@/components/views/school/views";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    school: string;
  };
};

const Layout = ({ children, params: { school } }: LayoutProps) => {
  const { data: session } = useSession();
  const schoolId = session?.user?.schoolId;

  const qParam = useSearchParams();

  const sportId = qParam.get("sportId");

  const { leagueId } = useParams();

  console.log(sportId);
  console.log(leagueId);

  // Get League Data
  const {
    data: league,
    isLoading: isLeagueLoading,
    isError: isLeagueError,
    error: leagueError,
  } = useGetLeague(sportId ?? "", leagueId as string);

  if (isLeagueLoading || !league) return <ViewSkeleton />;

  const sidebarNavItems: SidebarNavProps["items"] = [
    {
      title: "Dashboard",
      href: `/web/${school}/school/league/${leagueId}?sportId=${sportId}`,
    },
    {
      title: "Teams",
      href: `/web/${school}/school/league/${leagueId}/teams?sportId=${sportId}`,
    },
    {
      title: "Schedule",
      href: `/web/${school}/school/league/${leagueId}/schedule?sportId=${sportId}`,
    },
    {
      title: "Settings",
      href: `/web/${school}/school/league/${leagueId}/settings?sportId=${sportId}`,
    },
  ];

  return (
    <div className="hidden space-y-6 pb-16 md:block h-full overflow-auto no-scrollbar">
      <div className="flex flex-row items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">{league.name}</h2>
          <p className="text-muted-foreground">
            {format(new Date(league.startDate), "PP")} -{" "}
            {format(new Date(league.endDate), "PP")}
          </p>
        </div>

        <div>
          <Badge
          // variant={league.division === "Active" ? "success" : "destructive"}
          >
            {league.division.charAt(0).toUpperCase() + league.division.slice(1)}
          </Badge>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className=" lg:w-1/12">
          <SidebarNav items={sidebarNavItems} />
        </aside>

        <div className="flex-1 lg:max-w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
