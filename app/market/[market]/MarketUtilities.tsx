"use client";
import TooltipBtn from "@/app/components/tooltipBtn/TooltipBtn";
import { TooltipB } from "@/utils/types/common";
import { FaRegStar } from "react-icons/fa";
import { IoLinkSharp } from "react-icons/io5";

function MarketUtilities() {
  const copyCurrentUrl = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const utilities = [
    {
      text: "Add to watchlist",
      // action: copyCurrentUrl,
      icon: FaRegStar,
      actionText: "Added to watchlist",
    },
    {
      text: "Copy Link",
      actionText: "Copied!",
      action: copyCurrentUrl,
      icon: IoLinkSharp,
      styles: "-rotate-45",
    },
  ];

  return (
    <div className="flex justify-between gap-3">
      {utilities?.map((res: TooltipB) => {
        return <TooltipBtn data={res} key={res.text} />;
      })}
    </div>
  );
}
export default MarketUtilities;
