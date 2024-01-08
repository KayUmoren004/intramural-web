import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton
export const ViewSkeleton = () => (
  <div>
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Top */}
      <div className="mb-2 flex flex-row items-center justify-between">
        <Skeleton className="w-48 h-10" />
        <Skeleton className="w-24 h-10" />
      </div>

      {/* Separator */}
      <Separator />

      {/* Body */}
      <div className="mt-4">
        <Skeleton className="w-full h-10 mb-2" />
        <Skeleton className="w-full h-40" />
      </div>
    </div>
  </div>
);

// No Data
export const NoData = ({ title }: { title: string }) => (
  <div className="flex flex-col h-full w-full overflow-hidden">
    {/* Top */}
    <div className="mb-2 flex flex-row items-center justify-between">
      <span className="text-4xl font-bold">{title}</span>
    </div>

    {/* Separator */}
    <Separator />

    {/* Body */}
    <div className="mt-4 flex flex-col items-center justify-center">
      <span className="text-2xl font-bold">NO DATA</span>
    </div>
  </div>
);

// Error
export const ViewError = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => (
  <div className="flex flex-col h-full w-full overflow-hidden">
    {/* Top */}
    <div className="mb-2 flex flex-row items-center justify-between">
      <span className="text-4xl font-bold">{title}</span>
    </div>

    {/* Separator */}
    <Separator />

    {/* Body */}
    <div className="mt-4 flex flex-col items-center justify-center">
      <span className="text-lg text-red-500 font-semi">
        An error has occurred: {message}
      </span>
    </div>
  </div>
);
