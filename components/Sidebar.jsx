"use client";
import {
  RectangleGroupIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    pathname === "/" && (
      <div className="fixed -left-full lg:inset-0 px-4 min-h-screen bg-background border-r border-gray-600  w-[200px] text-white">
        <div className="mt-[65px] flex flex-col space-y-4">
          <Button
            asChild
            className="flex space-x-2 w-full py-2 rounded-xl items-center justify-start"
          >
            <Link href="/">
              <RectangleGroupIcon className="w-7 h-7" />
              <h1 className="font-bold">Browse</h1>
            </Link>
          </Button>
          {session && (
            <Button
              asChild
              className="flex space-x-2 w-full py-2 rounded-xl items-center justify-start"
            >
              <Link href="/collections"
                prefetch={true}
              >
                <CircleStackIcon className="w-7 h-7" />
                <h1 className="font-bold">Collections</h1>
              </Link>
            </Button>
          )}
        </div>
      </div>
    )
  );
};

export default Sidebar;
