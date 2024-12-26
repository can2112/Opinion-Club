"use client";

import { IMarkets } from "@/utils/Interfaces/common";
import MarketCard from "./MarketCard";
import Scroll from "./components/scroll/Scroll";

function Markets({ initialData }: { initialData: IMarkets }) {
  const rederMarkets = (markets: IMarkets) => {
    return (
      <MarketCard
        title={markets?.title}
        image={markets.image}
        eventId={markets?.questionId}
        endDate={markets?.expiryDate}
        vol={markets?.tradeCount}
        liqudity={markets?.liquidity}
      />
    );
  };

  return (
    <div className="mt-4">
      <Scroll
        apiRoute="/api/fetch-markets"
        renderFun={rederMarkets}
        objName="markets"
        layoutStyle="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-20 mt-5"
        initialData={initialData}
      />
    </div>
  );
}
export default Markets;
