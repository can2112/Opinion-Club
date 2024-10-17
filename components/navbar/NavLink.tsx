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
  Icon?: React.FC<{ size: number; color: string }>;
}) {
  const pathname = usePathname();
  const color = pathname === route ? "#1ad5c7" : "white";
  return (
    <Link
      href={route}
      className={`flex justify-center items-center flex-col ${
        pathname === route ? "text-primary" : "text-white"
      } `}
    >
      {Icon && <Icon size={34} color={color} />}
      <p className="tracking-widest">{label}</p>
    </Link>
  );
}

export default NavLink;
