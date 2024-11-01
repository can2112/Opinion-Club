import Image from "next/image";
import { IoLinkSharp } from "react-icons/io5";
import { Card, CardContent } from "../../components/ui/card";
import { FaRegStar } from "react-icons/fa";
import { Button } from "../../components/ui/button";
import { FiClock } from "react-icons/fi";
import { formatDate } from "@/utils/common/formatDate";
import Action from "./Action";

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

  const { title, image, expiryDate } = data?.data || {};

  return (
    <main className="px-3  md:px-52  ">
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

      <Card className="py-2 mt-7 text-heading">
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

            <p>$616,807,518</p>
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

      <Card className="mt-5 py-2  text-heading">
        <CardContent className="flex justify-between gap-4 py-4 w-full">
          <Button className="w-full font-bold text-lg bg-green-600/20 text-green-600 hover:bg-green-700/20">
            Yes
          </Button>
          <Button className="w-full font-bold text-lg bg-red-600/20 text-red-500 hover:bg-red-700/20">
            No
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-5 ">
        <CardContent className="py-4 px-2">
          <Action questionId={market} />
        </CardContent>
      </Card>
    </main>
  );
}

export default Page;
