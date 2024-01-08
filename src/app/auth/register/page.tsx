"use client";
type CreateAccountProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { validateSignUp } from "@/components/hooks/forms/useValidation";
import * as z from "zod";
import { useState } from "react";
import type { SchoolSelect as selectType } from "@/lib/types/form-schema";
import { signIn } from "next-auth/react";

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
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import { useQuery } from "@tanstack/react-query";

import AuthSkeleton from "@/components/auth/AuthSkeleton";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SchoolSelect } from "@/components/auth/SchoolSelect";
import { useToast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/lib/constants";

type School = {
  label: string;
  value: string;
};

const getSchoolList = async () => {
  try {
    const schoolList: School[] = [];

    const res = await fetch("/api/school/list", {
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

const CreateAccount = ({ searchParams }: CreateAccountProps) => {
  // Get Validation Schema
  const [list, setList] = useState<School[] | undefined>([]);
  const [school, setSchool] = useState<School>({ label: "", value: "" });
  const { signUpSchemaZod } = validateSignUp(school.value ?? "");
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
  const form = useForm<z.infer<typeof signUpSchemaZod>>({
    resolver: zodResolver(signUpSchemaZod),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const { toast } = useToast();

  if (isPending) return <AuthSkeleton type="register" />;

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
  const onSubmit = async (values: z.infer<typeof signUpSchemaZod>) => {
    setIsLoading(true);

    try {
      const { email, password, name } = values;

      const fullUser = {
        name: name,
        email: email,
        password: password,
        schoolDomain: school.value,
        role: "ADMIN",
      };

      // Strip out the domain from the email
      const domain = email.split("@")[1].split(".")[0];

      const res = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify(fullUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.log(res.statusText);

        toast({
          title: "Error signing in",
          description: res.statusText,
        });
      }

      const response = await res.json();

      if (res.status === 201) {
        // Sign In
        await signIn("credentials", {
          email,
          password,
          // redirect: true,
          callbackUrl: `/web/${domain}/dashboard`,
        });
      } else {
        console.log(response);
        toast({
          title: "Error signing in",
          description: JSON.stringify(response),
        });
      }
    } catch (e: any) {
      console.log(e);
      toast({
        title: "Error signing in",
        description: JSON.stringify(e),
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
                Error creating account
              </AlertTitle>
              <AlertDescription className="text-center">
                There was an error creating your account. Please try again.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Hello There!
            </h1>
            <p className="text-sm text-muted-foreground">
              Let&apos;s get you signed up.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {school.label !== "" && school.value !== "" ? (
                <span>
                  {"You are signing up for "}
                  <span className="font-bold text-[#336699]">
                    {school.label}
                  </span>
                  {"."}
                </span>
              ) : (
                "Select your school to continue"
              )}
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
                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={`Jane Doe`}
                              autoCapitalize="words"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={`jane.doe@${school.value}`}
                              autoCapitalize="none"
                              autoComplete="email"
                              autoCorrect="off"
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
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="**********"
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
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="**********"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {!isLoading && (
                      <Button
                        className="w-full"
                        type="submit"
                        disabled={!form.formState.isValid}
                      >
                        Create Account
                      </Button>
                    )}

                    {isLoading && (
                      <Button className="w-full" disabled={isLoading}>
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      </Button>
                    )}
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

export default CreateAccount;
