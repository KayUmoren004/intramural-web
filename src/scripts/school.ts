import { requests } from "@/config/agent";
import { Sport } from "@/lib/types/entities";

export type NewSport = Omit<Sport, "id" | "leagues" | "status">;
export type UpdateSport = Partial<Sport>;

export const sport = {
  getSports: (schoolId: string): Promise<Sport[]> =>
    requests.get<any>(`/sport/${schoolId}`),
  createSport: (sport: NewSport): Promise<Sport> =>
    requests.post<any>("/sport/create", sport),
  deleteSport: (sportId: string, schoolId: string): Promise<void> =>
    requests.del<any>(`/sport/delete/${schoolId}/${sportId}`),
  updateSport: (
    sport: UpdateSport,
    schoolId: string,
    sportId: string
  ): Promise<Sport> =>
    requests.patch<any>(`/sport/update/${schoolId}/${sportId}`, sport),
};

export const league = {};
