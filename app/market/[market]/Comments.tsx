"use client";
import { useEffect, useState } from "react";
import { firestore } from "../../../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  increment,
  getDoc,
} from "firebase/firestore";
import { Avatar } from "@/app/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

interface Comment {
  id: string;
  text: string;
  likes: number;
  createdAt: Date;
  user: string;
  likedBy: string[];
}

interface Reply {
  user: string;
  id: string;
  text: string;
  createdAt: Date;
}

interface CommentSectionProps {
  marketId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ marketId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const { address } = useAccount();

  useEffect(() => {
    const commentsRef = collection(firestore, "markets", marketId, "comments");
    const q = query(commentsRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setComments([]);
        return;
      }
      const fetchedComments = snapshot?.docs?.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];
      setComments(fetchedComments);
    });

    return unsubscribe;
  }, [marketId]);

  const handleAddComment = async () => {
    if (!address) {
      return toast.warning("Please Connect your wallet");
    }
    if (!newComment.trim()) return;

    const commentsRef = collection(firestore, "markets", marketId, "comments");
    await addDoc(commentsRef, {
      text: newComment,
      user: address,
      createdAt: serverTimestamp(),
      likes: 0,
    });

    setNewComment("");
  };

  const handleLike = async (commentId: string) => {
    if (!address) {
      return toast.warning("Please connect your wallet");
    }
    const commentRef = doc(
      firestore,
      "markets",
      marketId,
      "comments",
      commentId
    );

    const docuemt = await getDoc(commentRef);

    if (docuemt.exists()) {
      const commentData = docuemt.data();
      const likedBy = commentData.likedBy || [];

      if (likedBy.includes(address)) {
        await updateDoc(commentRef, {
          likes: increment(-1),
          likedBy: likedBy.filter((id: string) => id !== address),
        });
      } else {
        await updateDoc(commentRef, {
          likes: increment(1),
          likedBy: [...likedBy, address],
        });
      }
    }
  };

  const handleReply = async (commentId: string, replyText: string) => {
    if (!replyText.trim()) return;
    const repliesRef = collection(
      firestore,
      "markets",
      marketId,
      "comments",
      commentId,
      "replies"
    );

    await addDoc(repliesRef, {
      text: replyText,
      createdAt: serverTimestamp(),
      user: address,
    });
  };

  return (
    <div className="mt-4">
      <h3>Comments</h3>
      <section className="relative mt-2 z-30">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="bg-white z-30  broder-border  border outline-black text-textPrimary placeholder:text-textPrimary font-normal w-full py-2 px-3 rounded-lg"
        />
        <Button
          className="text-blue-500 hover:text-blue-600 absolute right-0 top-1 text-lg"
          variant={"ghost"}
          onClick={handleAddComment}
        >
          Post
        </Button>
      </section>

      <div>
        {comments?.map((comment) => {
          return (
            <Comment
              user={comment?.user}
              key={comment.id}
              comment={comment}
              marketId={marketId}
              onLike={() => handleLike(comment.id)}
              onReply={(replyText) => handleReply(comment.id, replyText)}
              address={address}
            />
          );
        })}
      </div>
    </div>
  );
};

interface CommentProps {
  comment: Comment;
  marketId: string;
  onLike: () => void;
  onReply: (replyText: string) => void;
  user: string;
  address: string | undefined;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  marketId,
  onLike,
  onReply,
  user,
  address,
}) => {
  const [replyText, setReplyText] = useState<string>("");
  const [replies, setReplies] = useState<Reply[]>([]);
  const [openReplyInput, setOpenReplyInput] = useState(false);
  const [openReplies, setOpenReplies] = useState(false);
  const LikedByMe = address ? comment?.likedBy?.includes(address) : false;

  useEffect(() => {
    const repliesRef = collection(
      firestore,
      "markets",
      marketId,
      "comments",
      comment.id,
      "replies"
    );
    const q = query(repliesRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReplies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Reply[];
      setReplies(fetchedReplies);
    });
    return unsubscribe;
  }, [comment?.id, marketId]);

  return (
    <div className="mb-2 mt-5 z-30">
      <section className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <p className="text-textSecondary">
          {user?.slice(0, 4)}....{user?.slice(-4)}
        </p>
      </section>

      <div className="px-10">
        <p className="mt-1 font-semibold text-textPrimary">{comment?.text}</p>

        <section className="flex gap-5 mt-1 items-center">
          <Button
            onClick={onLike}
            className="flex items-center p-0"
            variant={"ghost"}
          >
            {LikedByMe ? (
              <FaHeart color="red" />
            ) : (
              <FaHeart color={"#5d5d61"} />
            )}
            {comment.likes || 0}
          </Button>
          {address && (
            <Button
              variant={"ghost"}
              onClick={() => setOpenReplyInput(true)}
              className="text-textSecondary"
            >
              Reply
            </Button>
          )}
        </section>
        {openReplyInput && (
          <div className=" flex gap-4 items-center relative">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="bg-white  broder-border  border outline-black text-textPrimary placeholder:text-textPrimary font-normal w-full py-2 px-3 rounded-lg"
            />
            <Button
              className="text-blue-500 hover:text-blue-600 absolute right-24 top-1 text-lg"
              variant={"ghost"}
              onClick={() => {
                onReply(replyText);
                setReplyText("");
              }}
            >
              Post
            </Button>
            <Button onClick={() => setOpenReplyInput(false)}>Cancel</Button>
          </div>
        )}

        {replies?.length > 0 && (
          <Button
            className="p-0"
            variant={"ghost"}
            onClick={() => setOpenReplies((prev) => !prev)}
          >
            {openReplies ? "Hide" : "Show"} replies {replies.length}{" "}
          </Button>
        )}

        {openReplies && (
          <div className="px-8 flex flex-col gap-2 mt-2 z-30">
            {replies?.map((reply) => {
              return (
                <div key={reply?.id}>
                  <section className="flex gap-3">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <p className="text-textSecondary">
                      {reply.user?.slice(0, 4)}....{reply?.user?.slice(-4)}
                    </p>
                  </section>
                  <p className="px-10 text-textPrimary font-semibold">
                    {reply.text}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
