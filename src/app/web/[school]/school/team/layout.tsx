"use client";
import { useGetTeam } from "@/components/hooks/school/useTeam";
import { useParams, useSearchParams } from "next/navigation";
// import ViewSkeleton from "../skeleton";
import {
  SidebarNav,
  SidebarNavProps,
} from "@/components/routes/sidebar/sidebar-nav";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ViewSkeleton } from "@/components/views/school/views";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    school: string;
  };
};

const Layout = ({ children, params: { school } }: LayoutProps) => {
  const qParam = useSearchParams();

  const { teamId } = useParams();

  const leagueId = qParam.get("leagueId");

  // Get Team Data
  const {
    data: team,
    isLoading: isTeamLoading,
    isError: isTeamError,
    error: teamError,
  } = useGetTeam(leagueId ?? "", teamId as string);

  if (isTeamLoading || !team) return <ViewSkeleton />;

  const sidebarNavItems: SidebarNavProps["items"] = [
    {
      title: "Dashboard",
      href: `/web/${school}/school/team/${teamId}?leagueId=${leagueId}`,
    },
    {
      title: "Roster",
      href: `/web/${school}/school/team/${teamId}/roster?leagueId=${leagueId}`,
    },
    {
      title: "Settings",
      href: `/web/${school}/school/team/${teamId}/settings?leagueId=${leagueId}`,
    },
  ];

  return (
    <div className="hidden space-y-6 pb-16 md:block h-full overflow-auto no-scrollbar">
      <div className="flex flex-row items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">{team.name}</h2>
          <p className="text-muted-foreground">Captain: {team.captain.name}</p>
        </div>

        <div>
          <Badge
          // variant={league.division === "Active" ? "success" : "destructive"}
          >
            {team.league.name}
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
