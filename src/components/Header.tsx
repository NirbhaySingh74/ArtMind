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
    <div className="fixed top-0 w-full h-[60px] bg-black border-b border-white/60 p-3 flex justify-between items-center z-50">
      <Link href="/">
        <h2 className="font-bold text-xl  cursor-pointer">Artmind</h2>
      </Link>
      {initialLoading || status === "loading" ? (
        <BiLoaderCircle className="animate-spin " />
      ) : !session ? (
        <div className="__menu">
          <Button onClick={() => signIn("google")}>Login</Button>
        </div>
      ) : (
        <Avatar>
          <AvatarImage src={session.user?.image || ""} alt="User avatar" />
          <AvatarFallback>NS</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default Header;
