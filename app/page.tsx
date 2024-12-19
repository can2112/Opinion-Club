import Filter from "./Filter";
import { error } from "console";
import Markets from "./Markets";
import { CarouselPlugin } from "./Carousel";

const fetchMarketData = async () => {
  const response = await fetch(`${process.env.SERVER_URL}/markets`, {
    cache: "no-cache",
  });
  if (!response.ok) {
    throw error("Something went wrong");
  }
  return response.json();
};

export default async function Home() {
  const data = await fetchMarketData();
  const markets = data?.data?.markets;

  if (!markets || markets?.length == 0)
    return <div className=" text-center  ">No Market found</div>;

  return (
    <main className="h-screen md:px-[8%]">
      <div className="">
        <Filter />
      </div>
      <section className="mt-4">
        {markets && <CarouselPlugin data={markets?.slice(0, 4)} />}
      </section>

      <Markets />
    </main>
  );
}
