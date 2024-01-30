"use client";
import {
  useGetSport,
  useUpdateSport,
  useUpdateSportSettings,
} from "@/components/hooks/school/useSport";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import type {
  League,
  LeagueSettings,
  Sport,
  SportSettings,
} from "@/lib/types/entities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/ui/icons";
import ViewSkeleton from "../../../skeleton";
import {
  useGetLeague,
  useUpdateLeague,
  useUpdateLeagueSettings,
} from "@/components/hooks/school/useLeague";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

type PageProps = {};

const Page = ({}: PageProps) => {
  const { data: session } = useSession();
  const schoolId = session?.user.schoolId;

  const { leagueId } = useParams();

  const searchParams = useSearchParams();
  const sportId = searchParams.get("sportId");

  // Get League Data
  const {
    data: league,
    isLoading: isLeagueLoading,
    isError: isLeagueError,
    error: leagueError,
    refetch,
  } = useGetLeague(sportId as string, leagueId as string);

  if (isLeagueLoading || !league)
    return (
      <ViewSkeleton
        name="Settings"
        description="This is will edit the settings for the sport."
      />
    );

  return (
    <div className="space-y-6 h-full">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          This is will edit the settings for the league.
        </p>
      </div>
      <Separator />

      <LeagueSettings league={league as League} refetch={refetch} />
    </div>
  );
};

export default Page;

const divisions = [
  { key: "varsity", value: "Varsity" },
  { key: "jv", value: "JV" },
  { key: "freshman", value: "Freshman" },
  { key: "beginner", value: "Beginner" },
  { key: "intermediate", value: "Intermediate" },
  { key: "advanced", value: "Advanced" },
  { key: "open", value: "Open" },
];

// const customDateValidator = (existingDate: Date) => {
//   if (!existingDate) {
//     return z.date().refine(
//       (inputDate) => inputDate >= new Date(), // New date, must not be in the past
//       {
//         message: "Date cannot be in the past",
//       }
//     );
//   }

//   return z.date().refine(
//     (inputDate) => {
//       if (inputDate.toISOString() === existingDate?.toISOString()) {
//         return true; // Existing date, bypass past date check
//       }
//       return inputDate >= new Date(); // New date, must not be in the past
//     },
//     {
//       message: "Date cannot be in the past",
//     }
//   );
// };

const customDateValidator = (existingDate?: string | Date) => {
  // Convert existingDate to a Date object if it's a valid date string
  const validatedExistingDate =
    existingDate instanceof Date ? existingDate : new Date(existingDate ?? "");

  return z.date().refine(
    (inputDate) => {
      // Check if existingDate is valid
      if (
        validatedExistingDate.toString() === "Invalid Date" ||
        isNaN(validatedExistingDate.getTime())
      ) {
        return inputDate >= new Date(); // New date, must not be in the past
      }

      // Compare inputDate and existingDate
      return (
        inputDate.toISOString() === validatedExistingDate.toISOString() ||
        inputDate >= new Date()
      );
    },
    { message: "Date cannot be in the past" }
  );
};

// Custom function to check if the date is today or in the future
const isTodayOrFutureDate = (inputDate: Date, existingDate: Date) => {
  // Check if the date has changed
  if (inputDate.toISOString() === existingDate.toISOString()) {
    return true; // If the date hasn't changed, no need to validate
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time part to midnight
  inputDate.setHours(0, 0, 0, 0); // Reset time part of input date to midnight

  return inputDate >= today;
};

const findSettingValue = (
  settings: LeagueSettings[],
  settingName: string
): string | undefined => {
  return settings.find((setting) => setting.name === settingName)?.value;
};

const LeagueSettings = ({
  league,
  refetch,
}: {
  league: League;
  refetch: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const leagueSettingsFormSchema = z.object({
    name: z.string().min(3, "Name is required"),
    division: z.string().min(3, "Division is required"),
    // startDate: z
    //   .date()
    //   .min(new Date(), { message: "Date cannot be in the past" }),
    // endDate: z.date().min(new Date(), { message: "Date cannot be in the past" }),
    // registrationStartDate: z
    //   .date()
    //   .min(new Date(), { message: "Date cannot be in the past" }),
    // registrationEndDate: z
    //   .date()
    //   .min(new Date(), { message: "Date cannot be in the past" }),
    startDate: customDateValidator(new Date(league.startDate)), // pass existing date
    endDate: customDateValidator(new Date(league.endDate)),
    registrationStartDate: customDateValidator(
      new Date(
        league.settings.find(
          (setting) => setting.name === "registrationStartDate"
        )?.value
      )
    ),
    registrationEndDate: customDateValidator(
      new Date(
        league.settings.find(
          (setting) => setting.name === "registrationEndDate"
        )?.value
      )
    ),
    matchDuration: z.string().min(1, "Match duration is required"),
    maxLeagueTeams: z.string().min(1, "Max team size is required"),
    maxTeamRosterSize: z.string().min(1, "Max team roster size is required"),
    pointSystem: z.object({
      win: z.string().min(1, "Win points is required"),
      loss: z.string().min(1, "Loss points is required"),
      tie: z.string().min(1, "Tie points is required"),
    }),
  });

  type LeagueSettingsFormValues = z.infer<typeof leagueSettingsFormSchema>;

  const defaultValues: Partial<LeagueSettingsFormValues> = {
    name: league.name,
    division: league.division,
    startDate: new Date(league.startDate),
    endDate: new Date(league.endDate),
    registrationStartDate: league.settings.find(
      (setting) => setting.name === "registrationStartDate"
    )?.value
      ? new Date(
          league.settings.find(
            (setting) => setting.name === "registrationStartDate"
          )?.value
        )
      : undefined,
    registrationEndDate: league.settings.find(
      (setting) => setting.name === "registrationEndDate"
    )?.value
      ? new Date(
          league.settings.find(
            (setting) => setting.name === "registrationEndDate"
          )?.value
        )
      : undefined,
    // registrationStartDate: league.settings.find(
    //   (setting) => setting.name === "registrationStartDate"
    // )?.value
    //   ? new Date(
    //       league.settings.find(
    //         (setting) => setting.name === "registrationStartDate"
    //       )?.value as string
    //     )
    //   : undefined,
    // registrationEndDate: league.settings.find(
    //   (setting) => setting.name === "registrationEndDate"
    // )?.value
    //   ? new Date(
    //       league.settings.find(
    //         (setting) => setting.name === "registrationEndDate"
    //       )?.value as string
    //     )
    //   : undefined,
    maxLeagueTeams: league.settings.find(
      (setting) => setting.name === "maxLeagueTeams"
    )?.value as string,
    maxTeamRosterSize: league.settings.find(
      (setting) => setting.name === "maxTeamRosterSize"
    )?.value as string,
    matchDuration: league.settings.find(
      (setting) => setting.name === "matchDuration"
    )?.value as string,
    pointSystem: league.settings.find(
      (setting) => setting.name === "pointSystem"
    )?.value as any,
  };

  const form = useForm<LeagueSettingsFormValues>({
    resolver: zodResolver(leagueSettingsFormSchema),
    // defaultValues: {
    //   ...defaultValues,
    //   registrationStartDate: defaultValues.registrationStartDate
    //     ? new Date(defaultValues.registrationStartDate)
    //     : undefined,
    //   registrationEndDate: defaultValues.registrationEndDate
    //     ? new Date(defaultValues.registrationEndDate)
    //     : undefined,
    // },
    defaultValues,
    mode: "onChange",
  });

  const { toast } = useToast();

  const updateLeague = useUpdateLeague({
    onSuccess: (data) => {},
    onError: (error) => {
      console.log(error);
      toast({
        title: "Error updating settings",
        description: error.message,
      });
    },
  });

  const updateLeagueSettings = useUpdateLeagueSettings({
    onSuccess: (data) => {},
    onError: (error) => {
      console.log(error);

      toast({
        title: "Error updating settings",
        description: error.message,
      });
    },
  });

  const onSubmit = (values: LeagueSettingsFormValues) => {
    setLoading(true);

    const settingsArray: LeagueSettings[] = [
      {
        value: values.maxLeagueTeams,
        name: "maxLeagueTeams",
        required: true,
        leagueId: String(league.id),
        id:
          league.settings.find((setting) => setting.name === "maxLeagueTeams")
            ?.id ?? undefined,
      },
      {
        value: values.maxTeamRosterSize,
        name: "maxTeamRosterSize",
        required: true,
        leagueId: String(league.id),
        id:
          league.settings.find(
            (setting) => setting.name === "maxTeamRosterSize"
          )?.id ?? undefined,
      },
      {
        value: values.matchDuration,
        name: "matchDuration",
        required: true,
        leagueId: String(league.id),
        id:
          league.settings.find((setting) => setting.name === "matchDuration")
            ?.id ?? undefined,
      },
      {
        value: values.pointSystem,
        name: "pointSystem",
        required: true,
        leagueId: String(league.id),
        id:
          league.settings.find((setting) => setting.name === "pointSystem")
            ?.id ?? undefined,
      },
      {
        value: String(values.registrationStartDate),
        name: "registrationStartDate",
        required: true,
        leagueId: String(league.id),
        id:
          league.settings.find(
            (setting) => setting.name === "registrationStartDate"
          )?.id ?? undefined,
      },
      {
        value: String(values.registrationEndDate),
        name: "registrationEndDate",
        required: true,
        leagueId: String(league.id),
        id:
          league.settings.find(
            (setting) => setting.name === "registrationEndDate"
          )?.id ?? undefined,
      },
    ];

    try {
      console.log(values);
      console.log(settingsArray);

      updateLeague.mutate({
        sportId: String(league.sportId),
        leagueId: String(league.id),
        prevLeague: {
          name: values.name ?? league.name,
          division: values.division ?? league.division,
          startDate: values.startDate ?? league.startDate,
          endDate: values.endDate ?? league.endDate,
          id: String(league.id),
        },
      });

      updateLeagueSettings.mutate({
        sportId: String(league.sportId),
        leagueId: String(league.id),
        prevSettings: settingsArray,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error updating settings",
        description: error.message,
      });
    } finally {
      form.reset();
      setLoading(false);
    }
  };

  console.log(league);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-3xl w-full mb-auto"
      >
        {/* Division Select */}
        <FormField
          control={form.control}
          name="division"
          render={({ field }) => (
            <FormItem className="w-96">
              <FormLabel>Division</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select a Division" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Divisions</SelectLabel>
                    {divisions.map((division) => (
                      <SelectItem key={division.key} value={division.key}>
                        {division.value}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="sport" {...field} />
              </FormControl>
              {/* <FormDescription>This is the name of the sport.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* League Dates */}
        <div className="grid grid-cols-2 gap-4">
          {/* Start Date */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>League Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const today = new Date();
                        // Set the time to midnight
                        today.setHours(0, 0, 0, 0);
                        return date < today; // Compare only the dates
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* End Date */}
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>League End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "wpl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const today = new Date();
                        // Set the time to midnight
                        today.setHours(0, 0, 0, 0);
                        return date < today; // Compare only the dates
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Separator */}
        <Separator />

        {/* Registration Dates */}
        <div className="grid grid-cols-2 gap-4">
          {/* Registration Start Date */}
          <FormField
            control={form.control}
            name="registrationStartDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>League Registration Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "wpl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const today = new Date();
                        // Set the time to midnight
                        today.setHours(0, 0, 0, 0);
                        return date < today; // Compare only the dates
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Registration End Date */}
          <FormField
            control={form.control}
            name="registrationEndDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>League Registration End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "wpl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const today = new Date();
                        // Set the time to midnight
                        today.setHours(0, 0, 0, 0);
                        return date < today; // Compare only the dates
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Separator */}
        <Separator />

        <div className="grid grid-cols-3 gap-4">
          {/* Match Duration */}
          <FormField
            control={form.control}
            name="matchDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Match Duration in Mins (Per Half)</FormLabel>
                <FormControl>
                  <Input placeholder="60" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Max Team Size */}
          <FormField
            control={form.control}
            name="maxLeagueTeams"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Teams in League</FormLabel>
                <FormControl>
                  <Input placeholder="10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Max Team Roster Size */}
          <FormField
            control={form.control}
            name="maxTeamRosterSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Team Roster Size</FormLabel>
                <FormControl>
                  <Input placeholder="10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Separator */}
        <Separator />

        {/* Point System */}
        <div>
          <h3 className="text-lg font-medium">Point System</h3>
          <p className="text-sm text-muted-foreground">
            This is will edit the point system for the league.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-2">
            {/* Win Points */}
            <FormField
              control={form.control}
              name="pointSystem.win"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Win Points</FormLabel>
                  <FormControl>
                    <Input placeholder="3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Loss Points */}
            <FormField
              control={form.control}
              name="pointSystem.loss"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loss Points</FormLabel>
                  <FormControl>
                    <Input placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tie Points */}
            <FormField
              control={form.control}
              name="pointSystem.tie"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tie Points</FormLabel>
                  <FormControl>
                    <Input placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit */}
        <Button
          className="w-fit"
          disabled={!form.formState.isDirty}
          type="submit"
        >
          {loading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Update League
        </Button>
      </form>
    </Form>
  );
};
