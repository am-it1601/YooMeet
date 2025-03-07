"use client";
import { MENU_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { DynamicIcon } from "lucide-react/dynamic";

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <section className="sticky left-0 top-0 flex-container h-screen w-fit flex-col justify-between bg-sidebar p-6 pt-28 text-sidebar-foreground max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {MENU_LINKS.map((menu) => {
          const isActive =
            pathName === menu.route || pathName.startsWith(`${menu.route}/`);
          console.log(isActive);
          return (
            <Link
              href={menu.route}
              key={menu.label}
              className={cn(
                "flex gap-4 items-center p-4 rounded-l-lg justify-start",
                {
                  "bg-sidebar-primary text-sidebar-primary-foreground":
                    isActive,
                }
              )}
            >
              <DynamicIcon name={menu.imgUrl} size={24} />
              <p className="text-xl font-semibold max-lg:hidden">
                {menu.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
