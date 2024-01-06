import Link from "next/link";

const AuthSkeleton = ({ type }: { type: "login" | "register" }) => {
  return type === "login" ? login() : register();
};

const register = () => (
  <div className="lg:p-8 animate-shimmer">
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      {/* Header Skeleton */}
      <div className="flex flex-col space-y-2 text-center">
        <div className="h-6 w-3/4 bg-gray-300 rounded-md self-center"></div>
        <div className="h-4 w-1/2 bg-gray-300 rounded-md self-center"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded-md self-center mt-2"></div>
      </div>

      {/* Form Skeleton */}
      <div className="space-y-8 max-w-3xl p-6">
        {/* Repeated block for each form field (Name, Email, Password, Confirm Password) */}
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <div className="h-4 w-1/3 bg-gray-300 rounded-md"></div>
            <div className="mt-2 h-8 w-full bg-gray-300 rounded-md"></div>
          </div>
        ))}

        {/* Button Skeleton */}
        <div className="h-10 w-full bg-gray-300 rounded-md"></div>
      </div>

      {/* Footer Text Skeleton */}
      <div className="px-8">
        <div className="h-4 w-3/4 bg-gray-300 rounded-md self-center mx-auto"></div>
      </div>
    </div>
  </div>
);

const login = () => (
  <div className="lg:p-8 animate-pulse">
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      {/* Header Skeleton */}
      <div className="flex flex-col space-y-2 text-center">
        <div className="h-6 w-3/4 bg-gray-300 rounded-md self-center"></div>
        <div className="h-4 w-1/2 bg-gray-300 rounded-md self-center"></div>
      </div>

      {/* Form Skeleton */}
      <div className="space-y-8 max-w-3xl p-6">
        {/* Repeated block for each form field */}
        <div>
          <div className="h-4 w-1/3 bg-gray-300 rounded-md"></div>
          <div className="mt-2 h-8 w-full bg-gray-300 rounded-md"></div>
        </div>
        <div>
          <div className="h-4 w-1/3 bg-gray-300 rounded-md"></div>
          <div className="mt-2 h-8 w-full bg-gray-300 rounded-md"></div>
        </div>
        {/* Button Skeleton */}
        <div className="h-10 w-full bg-gray-300 rounded-md"></div>
      </div>

      {/* Footer Text Skeleton */}
      <div className="px-8">
        <div className="h-4 w-3/4 bg-gray-300 rounded-md self-center mx-auto"></div>
      </div>
    </div>
  </div>
);

export default AuthSkeleton;
