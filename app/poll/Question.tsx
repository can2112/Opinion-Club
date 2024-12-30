import { PollQuestionProp } from "@/utils/types/common";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import Interaction from "./Interaction";
import { Noto_Sans } from "next/font/google";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  style: "normal",
});

function Question({
  title,
  postedBy,
  createdAt,
  description,
  questionId,
}: PollQuestionProp) {
  const [votes, setVotes] = useState({ voteUp: 0, voteDown: 0 });
  const { address } = useAccount();
  const [userVote, setUserVote] = useState({ userId: "", vote: "" });

  type Vote = {
    userId: string;
    vote: "voteUp" | "voteDown";
  };
  const getVoteCount = async () => {
    const votesRef = doc(firestore, "poll", questionId);
    try {
      const snapShot = await getDoc(votesRef);
      if (snapShot.exists()) {
        const data = snapShot?.data();
        const { voteUp, voteDown, votedUsers } = data;
        const userVote = votedUsers?.find((vote: Vote) => {
          return vote.userId === address;
        });
        setUserVote(userVote);
        return setVotes({ voteDown, voteUp });
      } else {
        return setVotes({ voteDown: 0, voteUp: 0 });
      }
    } catch (error) {
      console.error("Error fetching votes:", error);
      return setVotes({ voteDown: 0, voteUp: 0 });
    }
  };

  useEffect(() => {
    getVoteCount();
  }, [address, questionId]);

  return (
    <div className="bg-white p-3 rounded-xl">
      <section className="flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <p className={`text-textSecondary text-sm ${noto.className} `}>
            Posted by {postedBy}
          </p>
        </div>
        <div>
          <p className="text-textSecondary text-sm">
            {typeof createdAt === "string" && createdAt}
          </p>
        </div>
      </section>
      <h1 className="mt-2 text-heading font-semibold text-md-custom">
        {title}
      </h1>
      <p className="mt-3 text-textPrimary text-sm">{description}</p>
      <Interaction
        {...votes}
        userId={userVote?.userId}
        vote={userVote?.vote}
        questionId={questionId}
        address={address}
      />
    </div>
  );
}
export default Question;
