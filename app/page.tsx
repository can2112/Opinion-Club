import Filter from "./Filter";
import { error } from "console";
import Markets from "./Markets";

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

  if (!data || data?.data?.length == 0)
    return <div className=" text-center  ">No Market found</div>;

  return (
    <main className="h-screen md:px-[8%]">
      <div className="">
        <Filter />
      </div>

      <Markets />
    </main>
  );
}
