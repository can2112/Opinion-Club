import { formatDate } from "@/utils/common/formatDate";
import Image from "next/image";
import { FiClock } from "react-icons/fi";
import { BsWallet2 } from "react-icons/bs";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import PollAction from "./Action";
import CommentSection from "./Comments";

interface PollProps {
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

async function page(props: PollProps) {
  const searchParams = await props.searchParams;
  const mId = searchParams?.mId;
  const data = await fetchMarketData(mId);
  const approver = process.env.MARKET_APPROVER;
  const { title, description, image, expiryDate, liquidity } = data?.data || {};

  if (mId)
    return (
      <main className="lg:px-[8%]">
        <div className="flex justify-between items-center">
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

          <PollAction approver={approver} questionId={mId} />
        </div>

        <Card className="mt-10 px-3 py-4 ">
          <CardTitle className=" text-2xl ">Description</CardTitle>
          <section className="flex mt-1 text-sm justify-between">
            <div className="flex items-center gap-5">
              <div className="flex items-center  gap-2">
                <BsWallet2 />
                <p className="text-textPrimary">${liquidity}</p>
              </div>

              <div className="flex   items-center gap-2">
                <FiClock size={15} className="cursor-pointer" />
                <p className="text-textPrimary">{formatDate(expiryDate)}</p>
              </div>
            </div>
          </section>
          <CardContent className=" text-textSecondary mt-4 p-0">
            {description}
          </CardContent>
        </Card>

        <div className="mt-7">
          <CommentSection marketId={mId} />
        </div>
      </main>
    );
  else {
    return <h1>something went wrong</h1>;
  }
}
export default page;
