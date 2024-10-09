"use client";
import Cart from "@/components/cart/Cart";
import { Icart } from "@/utils/Interfaces/common";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/api/fetch-questions");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchMarkets"],
    queryFn: fetchData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error:{error.message}</div>;

  return (
    <main className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5 py-5 px-5">
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
