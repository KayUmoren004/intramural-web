import { useQuery, useMutation } from "@tanstack/react-query";
import { team } from "@/scripts/school";
import type { NewTeam, UpdateTeam } from "@/scripts/school";

export type UpdateParams = {
  prevTeam: UpdateTeam;
  leagueId: string;
  teamId: string;
};

// Get all Teams
export const useGetTeams = (leagueId: string) => {
  return useQuery({
    queryKey: ["teams", leagueId],
    queryFn: () => team.getTeams(leagueId),
  });
};

// Get all Teams for a School
export const useGetSchoolTeams = (schoolId: string) => {
  return useQuery({
    queryKey: ["schoolTeams", schoolId],
    queryFn: () => team.getSchoolTeams(schoolId),
  });
};

// Get a Team
export const useGetTeam = (leagueId: string, teamId: string) => {
  return useQuery({
    queryKey: ["team", leagueId, teamId],
    queryFn: () => team.getTeam(leagueId, teamId),
  });
};

// Create a Team
export const useCreateTeam = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any, variables: any, context: any) => void;
  onError?: (error: any, variables: any, context: any) => void;
}) => {
  return useMutation({
    mutationFn: (newTeam: NewTeam) => team.createTeam(newTeam),
    onSuccess,
    onError,
  });
};

// Delete a Team
export const useDeleteTeam = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any, variables: any, context: any) => void;
  onError?: (error: any, variables: any, context: any) => void;
}) => {
  return useMutation({
    mutationFn: (body: { teamId: string; leagueId: string }) =>
      team.deleteTeam(body.teamId, body.leagueId),
    onSuccess,
    onError,
  });
};

// Update a Team
export const useUpdateTeam = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any, variables: any, context: any) => void;
  onError?: (error: any, variables: any, context: any) => void;
}) => {
  return useMutation({
    mutationFn: (body: UpdateParams) =>
      team.updateTeam(body.prevTeam, body.leagueId, body.teamId),
    onSuccess,
    onError,
  });
};
