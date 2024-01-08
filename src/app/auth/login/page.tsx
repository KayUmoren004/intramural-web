"use client";
type SignInProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

type School = {
  label: string;
  value: string;
};

import { signIn, useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { validateLogin } from "@/components/hooks/forms/useValidation";
import * as z from "zod";
import { useEffect, useState } from "react";
import type { SchoolSelect as selectType } from "@/lib/types/form-schema";

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
import { SchoolSelect } from "@/components/auth/SchoolSelect";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import { useQuery } from "@tanstack/react-query";
import AuthSkeleton from "@/components/auth/AuthSkeleton";
import { useRouter, useSearchParams } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { RocketIcon } from "@radix-ui/react-icons";

const getSchoolList = async () => {
  try {
    const schoolList: School[] = [];

    const res = await fetch("http://localhost:3000/api/school/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    data.forEach((doc: any) => {
      schoolList.push({
        label: doc.name,
        value: doc.domain.domain,
      });
    });

    return { schoolList };
  } catch (e: any) {
    return { error: e };
  }
};

const SignIn = ({ searchParams }: SignInProps) => {
  // Get Validation Schema
  const [list, setList] = useState<School[] | undefined>([]);
  const [school, setSchool] = useState<School>({ label: "", value: "" });
  const { LoginZod } = validateLogin(school.value ?? "");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isPending, error, data } = useQuery({
    queryKey: ["schools"],
    queryFn: async () => {
      const res = (await getSchoolList()).schoolList;

      // Set School List
      setList(res);

      return res;
    },
  });

  // Define Form
  const form = useForm<z.infer<typeof LoginZod>>({
    resolver: zodResolver(LoginZod),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();

  if (isPending) return <AuthSkeleton type="login" />;

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "No data";

  const fakedata: selectType = {
    title: "School",
    setString: "school",
    setValue: setSchool,
    placeholder: "Select a school...",
    data: list ?? [],
  };

  // Handle Form Submit
  const onSubmit = async (values: z.infer<typeof LoginZod>) => {
    setIsLoading(true);

    try {
      const { email, password } = values;

      // Strip out the domain from the email
      const domain = email.split("@")[1].split(".")[0];

      // Sign In
      const request = await signIn("credentials", {
        email,
        password,
        callbackUrl: `/web/${domain}/dashboard/`,
      });

      if (request?.error) {
        // const error = JSON.parse(res?.error ?? "");

        const error = JSON.parse(request?.error ?? "");

        toast({
          title: "Error signing in",
          description: error.message,
        });
      }
    } catch (e: any) {
      console.log(e);

      toast({
        title: "Error signing in",
        description: e.stack,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Form */}
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {/* Alert */}
          {!!searchParams.error && (
            <Alert className="flex flex-col items-center justify-center text-center space-x-2 border-red-500">
              <AlertTitle className="text-red-500 font-bold">
                Error signing in
              </AlertTitle>
              <AlertDescription className="text-center">
                Invalid credentials
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back!
            </h1>
            <p className="text-sm text-muted-foreground">
              {school.label !== "" && school.value !== ""
                ? "Enter your credentials to continue"
                : "Select your school to continue"}
            </p>
          </div>

          {/* <UserAuthForm /> */}
          <div className="grid gap-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 max-w-3xl p-6"
              >
                {/* school select */}
                <SchoolSelect {...fakedata} setValue={setSchool} />

                {school.label !== "" && school.value !== "" ? (
                  <>
                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Email <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={`jane.doe@${school.value}`}
                              autoCapitalize="none"
                              autoComplete="email"
                              autoCorrect="off"
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Password <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="current-password"
                              type="password"
                              placeholder="**********"
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button className="w-full" type="submit">
                      {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      )}

                      {!isLoading && "Sign In"}
                    </Button>
                  </>
                ) : null}
              </form>
            </Form>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
