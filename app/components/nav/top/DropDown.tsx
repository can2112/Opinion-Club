import React, { useRef, useState } from "react";
import { Copy } from "lucide-react";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { useDisconnect } from "@reown/appkit/react";

// import { CgChevronDown } from "react-icons/cg";

import Link from "next/link";

const { disconnect } = useDisconnect();

const Items = ({ title, path }: { title: string; path: string }) => {
  return (
    <Link
      className="w-full hover:bg-accent cursor-pointer p-1 rounded"
      href={path}
    >
      {title}
    </Link>
  );
};

function DropDown({
  isOpen,
  address,
  onClose,
}: {
  isOpen: boolean;
  address: string | undefined;
  onClose: () => void;
}) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [language, setLangage] = useState("English");
  const [langDropDown, setLangDropDown] = useState(false);

  const handleMouseEnter = () => {
    clearTimeout(onClose as unknown as number);
  };

  const handleMouseLeave = () => {
    setTimeout(onClose, 1000);
  };

  return (
    isOpen && (
      <div
        ref={dropdownRef}
        className="absolute bg-white top-16 right-3 rounded-lg border border-border text-black z-50 w-[250px] md:w-[300px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <section className="flex items-center gap-2 justify-between px-3 py-2">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>

          <p className="flex gap-2 items-center text-sm">
            {address?.slice(0, 4)}....{address?.slice(-4)}
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => navigator?.clipboard?.writeText(address || "")}
            >
              <Copy />
            </Button>
          </p>
        </section>
        <p className="border-border w-full mt-2 bg-border h-[2px]" />
        <div className="px-1 py-2 flex flex-col items-start gap-3">
          <Items title={"Profile"} path={`/profile/${address}`} />

          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
            }}
          >
            {/* language section */}
            {/* <section onClick={() => setLangDropDown(true)} className="relative">
              <p className="cursor-pointer">{language}</p>
              {langDropDown && (
                <div className="fixed bg-white text-black w-44 cursor-pointer">
                  <p
                    onClick={() => setLangage("English")}
                    className={`hover:bg-slate-300 rounded py-1 px-3`}
                  >
                    English
                  </p>
                  <p
                    onClick={() => setLangage("Korean")}
                    className={`hover:bg-slate-300 rounded py-1 px-3`}
                  >
                    Korean
                  </p>
                  <p
                    onClick={() => setLangage("Filipino")}
                    className={`hover:bg-slate-300 rounded py-1 px-3`}
                  >
                    Filipino
                  </p>
                </div>
              )}
            </section> */}
          </div>
        </div>
        <p className="border-border w-full mt-4 bg-border h-[2px]" />
        <div className="h-full flex justify-center items-end py-2 px-3 ">
          <Button
            className="flex w-full items-end bg-red-500 hover:bg-red-600"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              disconnect();
              onClose();
            }}
          >
            <p>Logout</p>
          </Button>
        </div>
      </div>
    )
  );
}

export default DropDown;
