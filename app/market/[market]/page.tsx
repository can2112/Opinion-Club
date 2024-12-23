import Image from "next/image";
import { IoLinkSharp } from "react-icons/io5";
import { Card, CardContent } from "../../components/ui/card";
import { FaRegStar } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { formatDate } from "@/utils/common/formatDate";
import Client from "./Client";
import { Metadata } from "next";

interface MarketProps {
  params: Promise<{ market: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const fetchMarketData = async (market: string | undefined) => {
  if (!market) return;
  const url = `${process.env.SERVER_URL}/markets/fetch/${market}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.log("something went wrong");
    return;
  }
  return response.json();
};

export async function generateMetadata(params: MarketProps): Promise<Metadata> {
  const title = await params.params;
  return {
    title: {
      absolute: `Opinion Club | ${decodeURI(title.market)}`,
    },
  };
}

async function Page(props: MarketProps) {
  const searchParams = await props.searchParams;
  const mId = searchParams?.mId;
  const data = await fetchMarketData(mId);

  const { title, image, expiryDate, tradeVolume } = data?.data || {};

  return (
    <main className="lg:px-[8%] ">
      <Client questionId={mId || ""}>
        <>
          <section className="flex justify-between">
            {image && (
              <Image
                src={image}
                width={100}
                height={100}
                alt="logo"
                className="h-20 w-20 rounded-full "
                layout="cover"
              />
            )}

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
        </>
      </Client>
    </main>
  );
}

export default Page;
