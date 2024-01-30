import { useParams } from "next/navigation";

type SidebarConfig = {
  logo: string;
  links: {
    label: string;
    icon: any;
    key: string;
    href: string;
  }[];
};

export const Config = () => {
  const { school } = useParams();
  // console.log("SidebarConfig school", school);
  const sidebarConfig = {
    logo: "https://picsum.photos/200",
    links: [
      // ADMIN
      {
        label: "Dashboard",
        icon: "dashboard",
        key: "dashboard",
        href: "/web/" + school + "/dashboard",
      },
      {
        label: "School",
        icon: "school",
        key: "school",
        href: "/web/" + school + "/school",
      },
      {
        label: "Users",
        icon: "users",
        key: "users",
        href: "/web/" + school + "/users",
      },
      {
        label: "Settings",
        icon: "settings",
        key: "settings",
        href: "/web/" + school + "/settings",
      },
    ],
  } as SidebarConfig;

  return { sidebarConfig };
};
