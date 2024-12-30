import { error } from "console";
import Client from "./Client";

async function page() {
  const fetcPollhData = async () => {
    const response = await fetch(
      `${process.env.SERVER_URL}/markets/approvals?next_id=`
    );
    if (!response.ok) {
      throw error("something went wrong");
    }
    return response.json();
  };
  const pollData = await fetcPollhData();
  const markets = pollData.data;

  return (
    <div>
      <h1 className="font-bold  text-2xl my-5">Vote</h1>
      <Client markets={markets} />
    </div>
  );
}
export default page;
