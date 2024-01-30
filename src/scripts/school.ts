import { requests } from "@/config/agent";
import {
  League,
  LeagueSettings,
  Sport,
  SportSettings,
  Team,
} from "@/lib/types/entities";

export type NewSport = Omit<Sport, "id" | "leagues" | "status">;
export type UpdateSport = Partial<Sport>;
export type UpdateSportSettings = SportSettings[];

export type NewLeague = Omit<League, "id" | "sport">;
export type UpdateLeague = Partial<League>;

export type NewTeam = Omit<Team, "id" | "wins" | "losses" | "ties">;
export type UpdateTeam = Partial<Team>;

export const sport = {
  createSport: (sport: NewSport): Promise<Sport> =>
    requests.post<any>("/sport/create", sport),
  getSports: (schoolId: string): Promise<Sport[]> =>
    requests.get<any>(`/sport/${schoolId}`),
  getSport: (schoolId: string, sportId: string): Promise<Sport> =>
    requests.get<any>(`/sport/${schoolId}/${sportId}`),
  deleteSport: (sportId: string, schoolId: string): Promise<void> =>
    requests.del<any>(`/sport/delete/${schoolId}/${sportId}`),
  updateSport: (
    sport: UpdateSport,
    schoolId: string,
    sportId: string
  ): Promise<Sport> =>
    requests.patch<any>(`/sport/update/${schoolId}/${sportId}`, sport),
  updateSportSettings: (
    sport: SportSettings[],
    schoolId: string,
    sportId: string
  ): Promise<Sport> => {
    return requests.patch<any>(
      `/sport/update/${schoolId}/${sportId}/settings`,
      sport
    );
  },
};

export const league = {
  createLeague: (league: NewLeague): Promise<League> =>
    requests.post<any>("/league/create", league),
  getLeagues: (sportId: string): Promise<League[]> =>
    requests.get<any>(`/league/${sportId}`),
  getSchoolLeagues: (schoolId: string): Promise<League[]> =>
    requests.get<any>(`/league/school/${schoolId}`),
  getLeague: (sportId: string, leagueId: string): Promise<League> =>
    requests.get<any>(`/league/${sportId}/${leagueId}`),
  deleteLeague: (leagueId: string, sportId: string): Promise<void> =>
    requests.del<any>(`/league/delete/${sportId}/${leagueId}`),
  updateLeague: (
    league: UpdateLeague,
    sportId: string,
    leagueId: string
  ): Promise<League> =>
    requests.patch<any>(`/league/update/${sportId}/${leagueId}`, league),
  updateLeagueSettings: (
    league: LeagueSettings[],
    leagueId: string,
    sportId: string
  ): Promise<League> => {
    return requests.patch<any>(
      `/league/update/${sportId}/${leagueId}/settings`,
      league
    );
  },
};

export const team = {
  createTeam: (team: any): Promise<Team> =>
    requests.post<any>("/team/create", team),
  getTeams: (leagueId: string): Promise<Team[]> =>
    requests.get<any>(`/team/${leagueId}`),
  getTeam: (leagueId: string, teamId: string): Promise<Team> =>
    requests.get<any>(`/team/${leagueId}/${teamId}`),
  getSchoolTeams: (schoolId: string): Promise<Team[]> =>
    requests.get<any>(`/team/school/${schoolId}`),
  deleteTeam: (teamId: string, leagueId: string): Promise<void> =>
    requests.del<any>(`/team/delete/${leagueId}/${teamId}`),
  updateTeam: (team: any, leagueId: string, teamId: string): Promise<Team> =>
    requests.patch<any>(`/team/update/${leagueId}/${teamId}`, team),
};
