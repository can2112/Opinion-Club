import Cart from "@/components/cart/Cart";
import CartSk from "@/components/skeleton/skeleton";
import serverClient from "@/utils/clients/serverClient";
import { Icart } from "@/utils/Interfaces/common";

export default async function Home() {
  const data = await serverClient.get("/markets").then((res) => res.data);

  if (!data || data.length == 0)
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
    <main className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-1  md:px-5">
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
