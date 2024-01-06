"use client";
import { useSession } from "next-auth/react";

type PageProps = {};

const Page = ({}: PageProps) => {
  const session = useSession();
  // console.log("session - dash", session);

  return (
    <div>
      <h1>Settings Page</h1>
    </div>
  );
};

export default Page;
