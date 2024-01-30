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

import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/ui/icons";
import { useCreateSport } from "@/components/hooks/school/useSport";

// {
//   "schoolId": "05ebd62a-0ddb-410d-a656-d0924d354b59",
//   "name": "Soccer",
//   "season": "Fall",
//   "description": "Soccer is the best sport in the world",
//   "rulesUrl": "www.google.com"
// }

// Form Validation
const CreateSportZod = z.object({
  name: z.string().min(3, "Name is required"),
  season: z.string().min(3, "Season is required"),
  description: z.string().min(3, "Description is required"),
  rulesUrl: z.string().min(3, "Rules URL is required"),
});

type CreateSportProps = {
  refetch: () => void;
};

const CreateSport = ({ refetch }: CreateSportProps) => {
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const schoolId = session?.user.schoolId;

  // Form
  const form = useForm<z.infer<typeof CreateSportZod>>({
    resolver: zodResolver(CreateSportZod),
    defaultValues: {
      name: "",
      season: "",
      description: "",
      rulesUrl: "",
    },
  });

  const { toast } = useToast();

  const createSport = useCreateSport({
    onSuccess: (data) => {
      refetch();
      toast({
        title: "Sport created",
        description: "Sport created successfully",
      });
      form.reset();
    },
    onError: (error) => {
      console.log(error);

      toast({
        title: "Error creating sport",
        description: error.message,
      });
    },
  });

  // Handle form submit
  const onSubmit = async (values: z.infer<typeof CreateSportZod>) => {
    setLoading(true);

    // Full body
    const fullBody = {
      schoolId: String(schoolId),
      settings: [],
      ...values,
    };

    try {
      createSport.mutate(fullBody);
    } catch (e: any) {
      console.log(e);

      toast({
        title: "Error signing in",
        description: JSON.stringify(e.message),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create a sport</SheetTitle>
        <SheetDescription>
          Fill out the form below to create a new sport.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Season Dropdown */}
            <FormField
              control={form.control}
              name="season"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Season</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Soccer`}
                      autoCapitalize="words"
                      {...field}
                    />
                  </FormControl>
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
                  Create Sport
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </div>
    </SheetContent>
  );
};

export default CreateSport;
