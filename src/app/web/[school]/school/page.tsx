"use client";
import { useSession } from "next-auth/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Sports from "@/components/views/school/sport/sports";
import Leagues from "@/components/views/school/league/leagues";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Teams from "@/components/views/school/team/teams";
import General from "@/components/views/school/sport/general/general";

type PageProps = {};

const Page = ({}: PageProps) => {
  const { data: session } = useSession();

  return (
    <Tabs defaultValue="general" className="w-full h-full">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="sports">Sports</TabsTrigger>
        {/* <TabsTrigger value="leagues">Leagues</TabsTrigger>
        <TabsTrigger value="teams">Teams</TabsTrigger>
        <TabsTrigger value="games">Games</TabsTrigger> */}
      </TabsList>
      <div className="my-6" />
      <TabsContent value="general">
        <General />
      </TabsContent>
      <TabsContent value="sports">
        <Sports />
      </TabsContent>
      {/* <TabsContent value="leagues">
        <Leagues />
      </TabsContent>
      <TabsContent value="teams">
        <Teams />
      </TabsContent>
      <TabsContent value="games">
        <Games />
      </TabsContent> */}
    </Tabs>

    // </div>
  );
};

export default Page;
