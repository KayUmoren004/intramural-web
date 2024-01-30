"use client";
import {
  useGetSport,
  useUpdateSport,
  useUpdateSportSettings,
} from "@/components/hooks/school/useSport";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import type { Sport, SportSettings } from "@/lib/types/entities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
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
import { ViewSkeleton } from "@/components/views/school/views";
// import ViewSkeleton from "../../../skeleton";

type PageProps = {};

const Page = ({}: PageProps) => {
  const { data: session } = useSession();
  const schoolId = session?.user.schoolId;

  const { sportId } = useParams();

  const {
    data: sport,
    isLoading: sportIsLoading,
    isError: sportIsError,
    error: sportError,
    refetch,
  } = useGetSport(schoolId as string, sportId as string);

  if (sportIsLoading || !sport)
    return (
      <ViewSkeleton
      // name="Settings"
      // description="This is will edit the settings for the sport."
      />
    );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          This is will edit the settings for the sport.
        </p>
      </div>
      <Separator />
      <SportSettings sport={sport as Sport} refetch={refetch} />
    </div>
  );
};

export default Page;

const sportSettingsFormSchema = z.object({
  name: z.string().min(3, "Name is required"),
  season: z.string().min(3, "Season is required"),
  description: z.string().min(3, "Description is required"),
  rulesUrl: z.string().min(3, "Rules URL is required"),
  maxLeagueSize: z.string(),
});

type SportSettingsFormValues = z.infer<typeof sportSettingsFormSchema>;

const SportSettings = ({
  sport,
  refetch,
}: {
  sport: Sport;
  refetch: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const defaultValues: Partial<SportSettingsFormValues> = {
    name: sport.name,
    season: sport.season,
    description: sport.description,
    rulesUrl: sport.rulesUrl,
    maxLeagueSize: sport.settings.find(
      (setting) => setting.name === "maxLeagueSize"
    )?.value,
  };

  const form = useForm<SportSettingsFormValues>({
    resolver: zodResolver(sportSettingsFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { toast } = useToast();

  const updateSport = useUpdateSport({
    onSuccess: (data) => {},
    onError: (error) => {
      console.log(error);
      toast({
        title: "Error updating settings",
        description: error.message,
      });
    },
  });

  const updateSportSettings = useUpdateSportSettings({
    onSuccess: (data) => {},

    onError: (error) => {
      console.log(error);

      toast({
        title: "Error updating settings",
        description: error.message,
      });
    },
  });

  const onSubmit = (values: SportSettingsFormValues) => {
    setLoading(true);

    const settingsArray: SportSettings[] = [
      {
        value: values.maxLeagueSize,
        name: "maxLeagueSize",
        required: true,
        sportId: String(sport.id),
        id:
          sport.settings.find((setting) => setting.name === "maxLeagueSize")
            ?.id ?? undefined,
      },
    ];

    try {
      updateSport.mutate({
        schoolId: String(sport.schoolId),
        sportId: String(sport.id),
        prevSport: {
          name: values.name ?? sport.name,
          season: values.season ?? sport.season,
          description: values.description ?? sport.description,
          rulesUrl: values.rulesUrl ?? sport.rulesUrl,
          id: String(sport.id),
        },
      });
      updateSportSettings.mutate({
        schoolId: String(sport.schoolId),
        sportId: String(sport.id),
        prevSettings: settingsArray,
      });

      toast({
        title: "Sport settings updated",
        description: "Sport settings updated successfully",
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error updating settings",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <FormDescription>This is the name of the sport.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Season */}
        <FormField
          control={form.control}
          name="season"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Season</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select a Season" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Season</SelectLabel>
                    <SelectItem value="Fall">Fall</SelectItem>
                    <SelectItem value="Spring">Spring</SelectItem>
                    <SelectItem value="Summer">Summer</SelectItem>
                    <SelectItem value="Winter">Winter</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about the sport"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rules URL */}
        <FormField
          control={form.control}
          name="rulesUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rules URL</FormLabel>
              <FormControl>
                <Input
                  placeholder={`https://www.google.com`}
                  autoCapitalize="none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Max League Size */}
        <FormField
          control={form.control}
          name="maxLeagueSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max League Size</FormLabel>
              <FormControl>
                <Input placeholder={`10`} autoCapitalize="none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-fit "
          disabled={!form.formState.isValid}
          type="submit"
        >
          {loading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Update Sport
        </Button>
      </form>
    </Form>
  );
};
