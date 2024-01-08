import { useQuery, useMutation } from "@tanstack/react-query";
import { sport } from "@/scripts/school";
import type { NewSport, UpdateSport } from "@/scripts/school";

export type UpdateParams = {
  prevSport: UpdateSport;
  schoolId: string;
  sportId: string;
};

// Get all Sports
export const useGetSports = (schoolId: string) => {
  return useQuery({
    queryKey: ["sports", schoolId],
    queryFn: () => sport.getSports(schoolId),
  });
};

// Create a Sport
export const useCreateSport = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any, variables: any, context: any) => void;
  onError?: (error: any, variables: any, context: any) => void;
}) => {
  return useMutation({
    mutationFn: (newSport: NewSport) => sport.createSport(newSport),
    onSuccess,
    onError,
  });
};

// Delete a Sport
export const useDeleteSport = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any, variables: any, context: any) => void;
  onError?: (error: any, variables: any, context: any) => void;
}) => {
  return useMutation({
    mutationFn: (body: { sportId: string; schoolId: string }) =>
      sport.deleteSport(body.sportId, body.schoolId),
    onSuccess,
    onError,
  });
};

// Update a Sport
export const useUpdateSport = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any, variables: any, context: any) => void;
  onError?: (error: any, variables: any, context: any) => void;
}) => {
  return useMutation({
    mutationFn: ({ prevSport, schoolId, sportId }: UpdateParams) =>
      sport.updateSport(prevSport, schoolId, sportId),
    onSuccess,
    onError,
  });
};
