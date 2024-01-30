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
  captain: z.string(),
  league: z.string(),
  wins: z.number(),
  losses: z.number(),
  ties: z.number(),
  sport: z.string(),
});

export type TableType = z.infer<typeof dataSchema>;
