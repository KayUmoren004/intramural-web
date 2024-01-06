"use client";
import { useSession } from "next-auth/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import General from "@/components/views/school/general";
import Sports from "@/components/views/school/sports";
import Leagues from "@/components/views/school/leagues";
import Games from "@/components/views/school/games";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

type PageProps = {};

const Page = ({}: PageProps) => {
  const { data: session } = useSession();

  return (
    <div className="w-full flex flex-row">
      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="sports">Sports</TabsTrigger>
          <TabsTrigger value="leagues">Leagues</TabsTrigger>
          <TabsTrigger value="games">Games</TabsTrigger>
        </TabsList>
        <div className="my-6" />
        <TabsContent value="general">
          <General />
        </TabsContent>
        <TabsContent value="sports">
          <Sports />
        </TabsContent>
        <TabsContent value="leagues">
          <Leagues />
        </TabsContent>
        <TabsContent value="games">
          <Games />
        </TabsContent>
      </Tabs>
      {/* <Button
        variant="outline"
        className=""
        onClick={() => console.log("clicked")}
      >
        Save
      </Button> */}
    </div>
  );
};

export default Page;
