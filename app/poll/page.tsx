import Question from "./Question";

function page() {
  return (
    <div>
      <h1 className="font-bold  text-2xl mb-5">Vote</h1>
      <Question
        title={"Who will win the presedential election"}
        postedBy={"Satashi"}
        timeAgo={"22 hours ago"}
        description={
          "Here's your summary of Kamala's speech on the economy: 1. Our country has come a long way since Biden and I took office 2. The price of food is up 50% today than it was four years ago."
        }
      />
    </div>
  );
}
export default page;
