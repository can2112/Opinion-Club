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
  Icon: React.FC<{ size: number; color: string }>;
}) {
  const pathname = usePathname();
  const color = pathname === route ? "#94d409" : "white";
  return (
    <Link
      href={route}
      className={`flex justify-center items-center flex-col ${
        pathname === route ? "text-primary" : "text-white"
      } `}
    >
      <Icon size={34} color={color} />
      <p>{label}</p>
    </Link>
  );
}

export default NavLink;
