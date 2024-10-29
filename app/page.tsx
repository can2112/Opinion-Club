import { CarouselPlugin } from "@/components/cart/Carousel";
import Cart from "@/components/cart/Cart";
import Filter from "@/components/filter/Filter";
import CartSk from "@/components/skeleton/skeleton";
import { Icart } from "@/utils/Interfaces/common";
import { error } from "console";

const fetchMarketData = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/markets`, {
    cache: "no-cache",
  });
  if (!response.ok) {
    throw error("Something went wrong");
  }
  return response.json();
};

export default async function Home() {
  const data = await fetchMarketData();
  if (!data || data?.data?.length == 0)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4   px-1  md:px-5">
        {Array(40)
          .fill(null)
          .map((_, index) => {
            return <CartSk key={index} />;
          })}
      </div>
    );

  return (
    <main className="h-screen md:px-[5%]">
      <div className="">
        <CarouselPlugin data={data.data.slice(0, 4)} />
        <Filter />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pb-20   mt-5">
        {data?.data?.map((ques: Icart) => {
          return (
            <div key={ques.questionId} className="">
              <Cart
                title={ques?.title}
                image={ques.image}
                eventId={ques.questionId}
                endDate={ques.expiryDate}
                vol={ques.tradeCount}
                liqudity={ques?.liquidity}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
