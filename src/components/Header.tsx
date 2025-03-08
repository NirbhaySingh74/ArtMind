"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BiLoaderCircle } from "react-icons/bi";

export default function Header() {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      setInitialLoading(false);
    }
  }, [status, session]);

  return (
    <div className="fixed top-0 w-full h-[60px] bg-black border-b border-white/60 p-3 md:p-5 flex justify-between items-center z-50">
      <Link href="/">
        <h2 className="font-bold text-xl md:text-2xl">Artmind</h2>
      </Link>
      {initialLoading && status === "loading" ? (
        <BiLoaderCircle className="animate-spin text-2xl md:text-3xl" />
      ) : !session ? (
        <div className="__menu">
          <Button
            onClick={() => signIn("google")}
            className="text-sm md:text-base"
          >
            Login
          </Button>
        </div>
      ) : (
        <div className="flex gap-3 md:gap-5 justify-center items-center">
          <Button
            onClick={() => signOut()}
            variant="destructive"
            className="text-sm md:text-base"
          >
            Logout
          </Button>
          <Link href="/profile">
            <Avatar>
              <AvatarImage src={session.user?.image || ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      )}
    </div>
  );
}
