import { useGetSchoolTeams } from "@/components/hooks/school/useTeam";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { ViewError, ViewSkeleton } from "../views";
import { DataTable } from "./table/data-table";
import { useColumns } from "./table/columns";

type TeamProps = {};

const Teams = ({}: TeamProps) => {
  const { data: session } = useSession();
  const schoolId = session?.user.schoolId;

  const {
    data: teams,
    isLoading: teamsIsLoading,
    isError: teamsIsError,
    error: teamsError,
  } = useGetSchoolTeams(schoolId as string);

  const { columns } = useColumns();

  if (teamsIsLoading || !teams) return <ViewSkeleton />;
  if (teamsIsError)
    return <ViewError title="Teams" message={teamsError.message} />;

  // Generate table data
  const tableData = teams.map((team) => {
    const captain = team.captain.name;
    const league = team.league.name;
    const sport = team.league.sport.name;

    return {
      ...team,
      captain,
      league,
      sport,
    };
  });

  // console.log("tableData", tableData);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Top */}
      <div className="mb-2 flex flex-row items-center justify-between">
        <span className="text-4xl font-bold">Teams</span>
        {/* <div>
          <Button onClick={() => console.log("save")} variant="outline">
            Settings
          </Button>
        </div> */}
      </div>

      {/* Separator */}
      <Separator />

      {/* Body */}
      <div className="mt-4">
        <DataTable data={tableData} columns={columns} />
      </div>
    </div>
  );
};

export default Teams;
