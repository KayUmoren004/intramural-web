import * as Yup from "yup";
import * as z from "zod";

type ValidationType = {
  domain: string;
};

export const validateLogin = (domain: string) => {
  // Escape special characters for use in a regular expression
  const escapedDomain = domain.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Create a regular expression for the email to match the domain
  const domainRegex = new RegExp(`[\\w-.]+@${escapedDomain}`);

  // Login Schema using Yup
  const LoginYup = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Required")
      .matches(domainRegex, `Email must end with @${domain}`),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  // Login Schema using Zod
  const LoginZod = z.object({
    email: z
      .string()
      .email()
      .includes(`@${domain}`, {
        message: `Email must end with @${domain}`,
      }),
    password: z.string().min(6),
  });

  // Forgot Password Schema using Yup
  const ForgotYup = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  // Forgot Password Schema using Zod
  const ForgotZod = z.object({
    email: z.string().email(),
  });

  // Return both schemas
  return { LoginYup, LoginZod, ForgotYup, ForgotZod };
};

export const validateSignUp = (domain: string) => {
  // Escape special characters for use in a regular expression
  const escapedDomain = domain.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Create a regular expression for the email to match the domain
  const domainRegex = new RegExp(`[\\w-.]+@${escapedDomain}`);

  // SignUp Schema using Yup
  const signUpSchemaYup = Yup.object().shape({
    name: Yup.string()
      .required("Full Name is required")
      .min(6, "Full Name must be at least 6 characters long")
      .max(30, "Full Name must be less than 30 characters long"),
    email: Yup.string()
      .email("Invalid email")
      .required("Required")
      .matches(domainRegex, `Email must end with @${domain}`),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  // SignUp Schema using Zod
  const signUpSchemaZod = z
    .object({
      name: z.string().min(6).max(30),
      email: z
        .string()
        .email()
        .includes(`@${domain}`, {
          message: `Email must end with @${domain}`,
        }),
      password: z.string({}).min(6, {
        message: "Password must be at least 6 characters",
      }),
      confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  return { signUpSchemaYup, signUpSchemaZod };
};
