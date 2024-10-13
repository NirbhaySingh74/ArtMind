"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BiLoaderCircle } from "react-icons/bi";

const Header = () => {
  const [initialLoading, setInitilLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      setInitilLoading(false);
    }
  }, [status, session]);

  return (
    <div className="fixed top-0 w-full h-[60px] bg-black border-b border-white/60 p-3 flex justify-between items-center">
      <Link href="/">
        <h2 className="font-bold text-xl text-white">Artmind</h2>
      </Link>
      {initialLoading || status === "loading" ? (
        <BiLoaderCircle className="animate-spin text-white text-3xl" />
      ) : !session ? (
        <div className="_menu">
          <Button onClick={() => signIn("google")}>Login</Button>
        </div>
      ) : (
        <Avatar>
          <AvatarImage src={session.user?.image || ""} alt="User avatar" />
          <AvatarFallback>
            {session.user?.name
              ? session.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "U"}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default Header;
