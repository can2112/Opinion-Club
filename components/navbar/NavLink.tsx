"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function NavLink({
  route,
  label,
  Icon,
}: {
  route: string;
  label: string;
  Icon?: React.FC<{ size?: number; color: string }>;
}) {
  const pathname = usePathname();
  const color = pathname === route ? "#1E9C6C" : "#000000";
  return (
    <Link
      href={route}
      className={`flex justify-center items-center flex-col ${
        pathname === route ? "text-[#1E9C6C]" : "text-black"
      } `}
    >
      {Icon && <Icon size={34} color={color} />}
      <p className={`tracking-widest text-sm`}>{label}</p>
    </Link>
  );
}

export default NavLink;
