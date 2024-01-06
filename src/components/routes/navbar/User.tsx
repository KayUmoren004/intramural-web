"use client";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "./Avatar";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type UserProps = {};

// const user = {
//   name: "Godson Umoren",
//   email: "jdoe@cityline.app",
//   avatar: "",
//   role: "Admin",
// };

const User = ({}: UserProps) => {
  const { data: session } = useSession();
  const { school } = useParams();
  const { push } = useRouter();
  // console.log("Data - NavB", session);

  const user = session?.user;
  const avatar = "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="relative flex items-center">
          {avatar ? (
            <Image
              src={avatar || "/images/avatar.png"}
              width={24}
              height={24}
              alt="Profile Image"
              className="rounded-full cursor-pointer relative -translate-y-0.5"
              style={{ pointerEvents: "none" }}
            />
          ) : (
            <Avatar name={user?.name || "User"} size=" w-10 h-10" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        avoidCollisions={true}
        className="px-2 my-4"
        align="end"
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => push(`/web/${school}/account/${user?.id}/profile`)}
        >
          Profile
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
        {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;
