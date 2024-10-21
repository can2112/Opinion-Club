"use client";
import Cart from "@/components/cart/Cart";
import CartSk from "@/components/skeleton/skeleton";
import { Icart } from "@/utils/Interfaces/common";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const fetchData = async () => {
    const url = `${process.env.NEXT_PUBLIC_API}/fetch-questions`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchMarkets"],
    queryFn: fetchData,
  });

  if (error) return <div>Error:{error.message}</div>;
  if (isLoading)
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
        {data?.data.map((ques: Icart) => {
          return (
            <div key={ques.questionId} className="">
              <Cart
                title={ques?.title}
                image={ques.image}
                eventId={ques.questionId}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
