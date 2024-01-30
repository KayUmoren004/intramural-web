import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

import { z } from "zod";

export const dataSchema = z.object({
  id: z.string(),
  name: z.string(),
  division: z.string(),
  sport: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export type TableType = z.infer<typeof dataSchema>;

export const divisions = [
  { value: "varsity", label: "Varsity" },
  { value: "jv", label: "JV" },
  { value: "freshman", label: "Freshman" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "open", label: "Open" },
];
