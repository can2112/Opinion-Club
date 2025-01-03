import Image from "next/image";
import { FiClock } from "react-icons/fi";
import { formatDate } from "@/utils/common/formatDate";
import Client from "./Client";
import { Metadata } from "next";
import MarketUtilities from "./MarketUtilities";

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
          <section className="flex  gap-12 items-center">
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
            <h1 className=" text-lg font-bold text-heading">{title}</h1>
          </section>

          <section className="flex mt-12 justify-between">
            <div className="flex items-center gap-5">
              <div className="flex flex-col gap-1">
                <p className="text-textSecondary">${tradeVolume} Vol.</p>
              </div>

              <div className="flex   items-center gap-2">
                <FiClock size={15} className="cursor-pointer" />
                <p className="text-textSecondary">{formatDate(expiryDate)}</p>
              </div>
            </div>
            <MarketUtilities />
          </section>
        </>
      </Client>
    </main>
  );
}

export default Page;
