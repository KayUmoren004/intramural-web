"use client";
import React, { useEffect, useMemo } from "react";
import Link from "next/link";
// import { FiHome } from "react-icons/fi";

export type breadcrumbType = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};

export const useCrumbs = () => {
  const [breadcrumbs, setBreadcrumbs] = React.useState<breadcrumbType[]>([]);

  // Set Breadcrumbs
  const setCrumbs = (links: breadcrumbType[]) => {
    setBreadcrumbs(links);
  };

  // Get Breadcrumbs
  const getCrumbs = useMemo(() => {
    return () => breadcrumbs;
  }, [breadcrumbs]);

  return {
    setBreadcrumbs: setCrumbs,
    getBreadcrumbs: getCrumbs,
  };
};

export const Breadcrumbs = ({
  // links,
  children,
}: {
  // links: breadcrumbType[];
  children?: React.ReactNode;
}) => {
  const { getBreadcrumbs } = useCrumbs();

  const breadcrumbs = getBreadcrumbs();

  console.log("breadcrumbs", breadcrumbs);

  if (!breadcrumbs.length) return null;

  const links = breadcrumbs;

  return (
    <div className="w-full py-2 border-b flex gap-2 justify-between">
      <div className="flex gap-2 container mx-auto px-6">
        <Link href="/" className="flex items-center justify-center">
          {/* <FiHome /> */}
        </Link>
        <span className=" flex items-center">/</span>
        {links.map((link, index) => {
          const isLastLink = index === links.length - 1;
          return (
            <React.Fragment key={link.href}>
              <Link
                href={link.href}
                className={`
                  flex items-center
                  ${
                    isLastLink
                      ? "font-semibold text-neutral-900"
                      : "text-neutral-500"
                  }
                `}
              >
                {decodeURIComponent(link.name)}
              </Link>
              {index !== links.length - 1 && (
                <span className="text-neutral-500 flex items-center">/</span>
              )}
            </React.Fragment>
          );
        })}
        <div className="ml-auto flex gap-4">{children}</div>
      </div>
    </div>
  );
};
