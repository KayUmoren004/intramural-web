"use client";
import Kbar from "@/components/Kbar/Kbar";
import { SiteHeader } from "@/components/routes/navbar/site-header";
import { SiteSide } from "@/components/routes/sidebar/site-side";

const WebLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Kbar>
      <section className="w-screen h-[100svh] flex flex-col overflow-hidden relative  ">
        <div className="flex h-full overflow-hidden">
          <SiteSide />
          <div className="flex flex-col h-full w-full overflow-hidden">
            <SiteHeader />
            <div className="flex flex-col h-full overflow-hidden bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative z-0 p-6">
              {children}
            </div>
          </div>
        </div>
      </section>
    </Kbar>
  );
};

export default WebLayout;
