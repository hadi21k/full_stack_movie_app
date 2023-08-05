"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Account = () => {
  const { data: session } = useSession();
  return (
    <DropdownMenu className="relative">
      <DropdownMenuTrigger className="outline-none">
        <Image
          src={session?.user?.image}
          alt="profile"
          width={40}
          height={40}
          className="rounded-full"
          priority={true}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute right-0 top-1">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/search">
          <DropdownMenuItem className="md:hidden">Search</DropdownMenuItem>
        </Link>
        <Link href={`/collections`}>
          <DropdownMenuItem className="lg:hidden">Collections</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Account;
