"use client";
import { usePathname, useRouter } from "next/navigation";
import { IoArrowBackCircleOutline } from "react-icons/io5";

export function BackIcon() {
  const router = useRouter();
  const path = usePathname();

  return (
    <>
      {path != "/" && (
        <IoArrowBackCircleOutline
          size={32}
          className="cursor-pointer hover:bg-slate-300"
          onClick={() => router.back()}
        />
      )}
    </>
  );
}
