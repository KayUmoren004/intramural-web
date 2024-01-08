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
  description: z.string(),
  status: z.string(),
  season: z.string(),
  // leagues: z.number(),
});

export type TableType = z.infer<typeof dataSchema>;

export const season = [
  {
    value: "fall",
    label: "Fall",
  },
  {
    values: "spring",
    label: "Spring",
  },
  {
    value: "summer",
    label: "Summer",
  },
  {
    value: "winter",
    label: "Winter",
  },
];

export const statuses = [
  {
    value: "active",
    label: "Active",
    icon: StopwatchIcon,
  },
  {
    value: "inactive",
    label: "Inactive",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];