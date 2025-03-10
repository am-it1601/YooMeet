import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center fixed z-50 w-full bg-sidebar px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-3 pt-2">
        <Image
          width={36}
          height={32}
          alt="logo"
          src={"/images/logo_icon.png"}
          className="max-sm:size-10"
        />
        <p className="text-[28px] font-extrabold text-primary max-sm:hidden">
          YooMeet
        </p>
      </Link>
      <div className="flex items-center justify-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
