"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { MENU_LINKS } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
const MobileNav = () => {
  const pathName = usePathname();
  return (
    <section className="w-full max-w-[120px]">
      <Sheet>
        <SheetTrigger asChild>
          <Menu height={36} width={36} className="cursor-pointer sm:hidden" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-sidebar border-none">
          <Link href="/" className="flex items-center gap-2 p-6">
            <Image
              width={36}
              height={32}
              alt="logo"
              src={"/images/logo_icon.png"}
              className="max-sm:size-10"
            />
            <p className="text-[28px] font-extrabold text-sidebar-primary-foreground">
              YooMeet
            </p>
          </Link>
          <div className="flex  h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex flex-col h-full gap-6 pt-16 text-sidebar-foreground">
                {MENU_LINKS.map((menu) => {
                  console.log(pathName);
                  const isActive =
                    pathName === menu.route ||
                    pathName.startsWith(`${menu.route}/`);
                  console.log(isActive);
                  return (
                    <SheetClose asChild key={menu.route}>
                      <Link
                        href={menu.route}
                        key={menu.label}
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-l-lg w-full max-w-72",
                          {
                            "bg-sidebar-primary text-sidebar-primary-foreground":
                              isActive,
                          }
                        )}
                      >
                        <DynamicIcon name={menu.imgUrl} color="red" size={18} />

                        <p className="font-semibold">{menu.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
