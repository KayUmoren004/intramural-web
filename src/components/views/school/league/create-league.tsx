import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/ui/icons";
import { useCreateLeague } from "@/components/hooks/school/useLeague";
import { league } from "@/scripts/school";
import { useGetSports } from "@/components/hooks/school/useSport";
import type { Sport } from "@/lib/types/entities";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";

// {
//   "sportId": "string",
//   "name": "string",
//   "division": "string",
//   "startDate": "2024-01-08T22:04:20.449Z",
//   "endDate": "2024-01-08T22:04:20.449Z"
// }

// Form Validation
const CreateLeagueZod = z.object({
  name: z.string().min(3, "Name is required"),
  division: z.string().min(3, "Division is required"),
  startDate: z
    .date()
    .min(new Date(), { message: "Date cannot be in the past" }),
  endDate: z.date().min(new Date(), { message: "Date cannot be in the past" }),
});

const divisions = [
  { key: "varsity", value: "Varsity" },
  { key: "jv", value: "JV" },
  { key: "freshman", value: "Freshman" },
  { key: "beginner", value: "Beginner" },
  { key: "intermediate", value: "Intermediate" },
  { key: "advanced", value: "Advanced" },
  { key: "open", value: "Open" },
];

type CreateLeagueProps = {
  refetch: () => void;
  sport: Sport;
};

const CreateLeague = ({ refetch, sport }: CreateLeagueProps) => {
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const schoolId = session?.user.schoolId;

  const { toast } = useToast();

  // Form
  const form = useForm<z.infer<typeof CreateLeagueZod>>({
    resolver: zodResolver(CreateLeagueZod),
    defaultValues: {
      name: "",
      division: "",
      startDate: undefined,
      endDate: undefined,
    },
  });

  const createLeague = useCreateLeague({
    onSuccess: (data) => {
      refetch();
      toast({
        title: "League created!",
        description: "League created successfully",
      });
      form.reset();
    },
    onError: (error) => {
      console.log(error);

      toast({
        title: "Error creating league",
        description: error.message,
      });
    },
  });

  // Handle form submit
  const onSubmit = async (values: z.infer<typeof CreateLeagueZod>) => {
    setLoading(true);

    const newVal = {
      ...values,
      sportId: sport.id,
      settings: [],
    };

    try {
      createLeague.mutate(newVal);
    } catch (e: any) {
      console.log(e);

      toast({
        title: "Error creating league",
        description: JSON.stringify(e.message),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create a league</SheetTitle>
        <SheetDescription>
          Fill out the form below to create a new league.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Sport Select */}

            <Label className="text-xl font-semibold">Sport: {sport.name}</Label>

            {/* Division Select */}
            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                    <Input
                      placeholder={`5 v 5 Soccer League`}
                      autoCapitalize="words"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            {/* Submit */}
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  className="w-full"
                  disabled={!form.formState.isValid}
                  type="submit"
                >
                  {loading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Create League
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </div>
    </SheetContent>
  );
};

export default CreateLeague;
