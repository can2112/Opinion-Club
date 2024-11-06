import Image from "next/image";
import { IoLinkSharp } from "react-icons/io5";
import { Card, CardContent } from "../../components/ui/card";
import { FaRegStar } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { formatDate } from "@/utils/common/formatDate";
import Client from "./Client";

interface MarketProps {
  params: Promise<{ market: string }>;
}
const fetchMarketData = async (market: string) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER}/markets/fetch/${market}`;
  const response = await fetch(url, {
    cache: "no-cache",
  });
  if (!response.ok) {
    console.log("something went wrong");
  }
  return response.json();
};
async function Page(props: MarketProps) {
  const params = await props.params;
  const { market } = params;

  const data = await fetchMarketData(market);

  const { title, image, expiryDate, tradeVolume } = data?.data || {};

  return (
    <main className=" ">
      <section className="flex justify-between">
        <Image
          src={image}
          width={100}
          height={100}
          alt="logo"
          className="h-20 w-20 rounded-full "
          layout="cover"
        />
        <div className="flex gap-3 items-center">
          <FaRegStar size={27} className="cursor-pointer" />
          <IoLinkSharp size={32} className="-rotate-45 cursor-pointer" />
        </div>
      </section>
      <h1 className="mt-6 text-lg font-bold text-heading">{title}</h1>

      <Card className="py-2 mt-7 shadow-none  text-heading">
        <CardContent>
          <div className="flex items-center mt-4  justify-between ">
            <div className="flex gap-2 items-center font-bold ">
              <Image
                src={"/SVG.svg"}
                width={30}
                height={30}
                alt="sound-bar"
                className="cursor-pointer"
              />
              Amount Bet
            </div>

            <p>${tradeVolume}</p>
          </div>
          <div className="flex items-center mt-4 justify-between ">
            <div className="flex gap-2 items-center font-bold ">
              <FiClock size={28} className="cursor-pointer" />
              End Date
            </div>
            <p>{formatDate(expiryDate)}</p>
          </div>
        </CardContent>
      </Card>

      <Client questionId={market} />
    </main>
  );
}

export default Page;
