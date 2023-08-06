"use client";
import { Button } from "@/components/ui/button";
import { useSession, signIn } from "next-auth/react";
import Account from "./Account";
import Search from "./Search";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <nav
      className={`fixed inset-0 z-30 h-[60px] text-white bg-background/20 backdrop-filter backdrop-blur-md ${
        pathname === "/" ? "lg:ml-[200px]" : ""
      }`}
    >
      <div className="container h-full mx-auto px-1 sm:px-4 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-primary font-bold">MovieFlex</h1>
        </Link>
        {pathname === "/" && <Search />}
        <div className="flex items-center">
          {status === "loading" ? (
            <Skeleton className="w-[40px] h-[40px] rounded-full bg-neutral-500" />
          ) : session ? (
            <Account />
          ) : (
            <Button
              className="bg-primary hover:bg-foreground text-white"
              onClick={() => signIn("google")}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
