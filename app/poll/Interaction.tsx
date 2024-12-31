import Image from "next/image";
import VoteImage from "../components/icons/Vote.svg";
import CommentImage from "../components/icons/Comment.svg";
import ShareImage from "../components/icons/Share.svg";
import { Button } from "@/components/ui/button";
import VerticalDots from "../components/icons/VDots.svg";
import { BiSolidUpvote } from "react-icons/bi";

import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import { useEffect, useState } from "react";

function Interaction({
  voteUp,
  voteDown,
  questionId,
  address,
  userId,
  vote,
  commentCount,
}: {
  voteUp: number;
  voteDown: number;
  questionId: string;
  address: string | undefined;
  userId: string;
  vote: "voteUp" | "voteDown" | string;
  commentCount: number;
}) {
  const [pollUp, setPollUp] = useState(voteUp);
  const [pollDown, setPollDown] = useState(voteDown);
  const [userVote, setUserVote] = useState({ userId, vote });

  const updateVote = async (voteType: "voteUp" | "voteDown") => {
    try {
      const postRef = doc(firestore, "poll", questionId);
      const postSnapshot = await getDoc(postRef);

      if (postSnapshot.exists() && address) {
        const postData = postSnapshot.data();
        const { votedUsers } = postData;

        const userVote = votedUsers?.find(
          (vote: { userId: string; vote: string }) => {
            return vote.userId === address;
          }
        );
        if (userVote) {
          if (userVote.vote === "voteUp" && voteType === "voteDown") {
            await updateDoc(postRef, {
              voteUp: increment(-1),
              votedUsers: arrayRemove({ userId: address, vote: "voteUp" }),
            });
            await updateDoc(postRef, {
              voteDown: increment(1),
              votedUsers: arrayUnion({ userId: address, vote: "voteDown" }),
            });
            setPollUp((prev) => prev - 1);
            setUserVote({ ...userVote, vote: "voteDown" });
            return setPollDown((prev) => prev + 1);
          } else if (userVote.vote === "voteDown" && voteType === "voteUp") {
            await updateDoc(postRef, {
              voteDown: increment(-1),
              votedUsers: arrayRemove({ userId: address, vote: "voteDown" }),
            });
            await updateDoc(postRef, {
              voteUp: increment(1),
              votedUsers: arrayUnion({ userId: address, vote: "voteUp" }),
            });
            setUserVote({ ...userVote, vote: "voteUp" });
            setPollUp((prev) => prev + 1);
            return setPollDown((prev) => prev - 1);
          } else {
            if (userVote.vote === "voteUp" && voteType === "voteUp") {
              await updateDoc(postRef, {
                voteUp: increment(-1),
                votedUsers: arrayRemove({ userId: address, vote: "voteUp" }),
              });
              setUserVote({ vote: "", userId: "" });
              return setPollUp((prev) => prev - 1);
            } else if (
              userVote.vote === "voteDown" &&
              voteType === "voteDown"
            ) {
              await updateDoc(postRef, {
                voteDown: increment(-1),
                votedUsers: arrayRemove({ userId: address, vote: "voteDown" }),
              });
              setUserVote({ vote: "", userId: "" });
              return setPollDown((prev) => prev - 1);
            }
          }
        }

        if (voteType === "voteUp") {
          await updateDoc(postRef, {
            voteUp: increment(1),
            votedUsers: arrayUnion({ userId: address, vote: "voteUp" }),
          });
          setUserVote({ userId: address, vote: "voteUp" });
          return setPollUp((prev) => prev + 1);
        } else if (voteType === "voteDown") {
          await updateDoc(postRef, {
            voteDown: increment(1),
            votedUsers: arrayUnion({ userId: address, vote: "voteDown" }),
          });
          setUserVote({ userId: address, vote: "voteDown" });
          return setPollDown((prev) => prev + 1);
        }
      } else {
        await setDoc(postRef, {
          voteUp: voteType === "voteUp" ? 1 : 0,
          voteDown: voteType === "voteDown" ? 1 : 0,
          votedUsers: [{ userId: address, vote: voteType }],
        });

        if (voteType === "voteUp" && address) {
          setUserVote({ userId: address, vote: "voteUp" });
          setPollUp((prev) => prev + 1);
        } else if (voteType === "voteDown" && address) {
          setUserVote({ userId: address, vote: "voteDown" });
          setPollDown((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPollUp(voteUp);
    setPollDown(voteDown);
    setUserVote({ userId, vote });
  }, [voteUp, voteDown, userId, vote]);

  return (
    <div className="flex justify-between  items-center mt-5 ">
      <section className="flex gap-8 justify-start   items-center">
        <div
          className="flex justify-start justify-items-start cursor-pointer hover:bg-gray-100 p-1 rounded-lg gap-2"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            updateVote("voteUp");
          }}
        >
          {userVote?.userId === address && userVote?.vote === "voteUp" ? (
            <BiSolidUpvote size={25} color="#3b82f6" />
          ) : (
            <Image
              src={VoteImage}
              alt=""
              width={25}
              height={25}
              className="rotate-180"
            />
          )}

          <p>{pollUp}</p>
        </div>

        <div
          className="flex justify-start justify-items-start cursor-pointer hover:bg-gray-100 p-1 rounded-lg gap-2"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            updateVote("voteDown");
          }}
        >
          {userVote?.userId === address && userVote?.vote === "voteDown" ? (
            <BiSolidUpvote size={25} color="#3b82f6" className="rotate-180" />
          ) : (
            <Image src={VoteImage} alt="" width={25} height={25} />
          )}

          <p>{pollDown}</p>
        </div>

        <div className="flex justify-start justify-items-start cursor-pointer hover:bg-gray-100 p-1 rounded-lg gap-2">
          <Image src={CommentImage} width={25} height={25} alt="comment" />
          <p>{commentCount}</p>
        </div>
      </section>
      <section className="flex items-center gap-5">
        <Button variant={"ghost"} size={"icon"}>
          <Image src={ShareImage} width={25} height={25} alt="comment" />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <Image src={VerticalDots} width={25} height={25} alt="comment" />
        </Button>
      </section>
    </div>
  );
}
export default Interaction;
